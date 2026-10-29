/**
 * Storage Service — Al-Musnad (المسند) v15.0
 *
 * Primary: Cloudflare R2 Storage (10GB Free Tier) via AWS S3 Client SDK
 * Fallback: Supabase Storage Bucket ("worksheets")
 *
 * Supports:
 * - PDF documents (`.pdf`)
 * - Microsoft Word documents (`.doc`, `.docx`)
 * - Images (`.png`, `.jpg`, `.jpeg`, `.webp`)
 */

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import {
  FileTooLargeError,
  InvalidFileTypeError,
  AppError,
} from "@/lib/utils/errors";
import {
  ALLOWED_FILE_EXTENSIONS,
  isSupportedUploadFile,
} from "@/config/constants";

const SUPABASE_BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets";
const MAX_FILE_SIZE =
  (Number(process.env.MAX_FILE_SIZE_MB) || 20) * 1024 * 1024;

export interface UploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  storageProvider?: "R2" | "SUPABASE";
}

/**
 * Checks if Cloudflare R2 credentials are valid and provided.
 */
export function isR2Configured(): boolean {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
  const bucketName = process.env.R2_BUCKET_NAME?.trim();

  return Boolean(
    accountId &&
      !accountId.includes("[") &&
      !accountId.includes("الصق") &&
      accountId.length >= 8 &&
      accessKeyId &&
      secretAccessKey &&
      bucketName
  );
}

/**
 * Creates an S3Client targeted at Cloudflare R2 endpoint.
 */
export function getR2Client(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID!.trim();
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!.trim(),
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!.trim(),
    },
  });
}

/**
 * Uploads a file with Cloudflare R2 primary and Supabase fallback.
 */
export async function uploadFile(
  file: File,
  userId: string
): Promise<UploadResult> {
  if (!isSupportedUploadFile(file)) {
    throw new InvalidFileTypeError(ALLOWED_FILE_EXTENSIONS);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new FileTooLargeError(Number(process.env.MAX_FILE_SIZE_MB) || 20);
  }

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${userId}/${timestamp}-${sanitizedName}`;

  const contentType =
    file.type ||
    (file.name.toLowerCase().endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : file.name.toLowerCase().endsWith(".doc")
      ? "application/msword"
      : "application/octet-stream");

  // 1. Attempt Cloudflare R2 Upload
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await r2Client.send(
        new PutObjectCommand({
          Bucket: r2Bucket,
          Key: filePath,
          Body: buffer,
          ContentType: contentType,
        })
      );

      console.log(`✅ [R2 Storage] File uploaded successfully to R2 bucket: ${r2Bucket}/${filePath}`);
      return {
        fileUrl: filePath,
        fileName: file.name,
        fileSize: file.size,
        storageProvider: "R2",
      };
    } catch (r2Error: any) {
      console.warn("⚠️ [R2 Storage] Failed to upload to Cloudflare R2, falling back to Supabase Storage:", r2Error?.message || r2Error);
    }
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { error: supabaseError } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(filePath, file, {
      contentType,
      upsert: false,
    });

  if (supabaseError) {
    console.error("Storage upload error (Supabase):", supabaseError);
    throw new AppError("Failed to upload file to storage", "UPLOAD_FAILED", 500);
  }

  console.log(`✅ [Supabase Storage] File uploaded to Supabase fallback: ${SUPABASE_BUCKET_NAME}/${filePath}`);
  return {
    fileUrl: filePath,
    fileName: file.name,
    fileSize: file.size,
    storageProvider: "SUPABASE",
  };
}

/**
 * Generates a presigned or public download URL with R2 and Supabase fallback.
 */
export async function getSignedDownloadUrl(
  filePath: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  // 1. Try Cloudflare R2
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      const command = new GetObjectCommand({
        Bucket: r2Bucket,
        Key: filePath,
      });

      const signedUrl = await getSignedUrl(r2Client, command, {
        expiresIn: expiresInSeconds,
      });
      return signedUrl;
    } catch (r2Error) {
      console.warn("⚠️ [R2 Storage] Error generating R2 signed URL, falling back to public or Supabase:", r2Error);
      if (process.env.R2_PUBLIC_URL) {
        const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
        return `${cleanBase}/${filePath}`;
      }
    }
  }

  // If R2 Public URL is explicitly configured, use direct fast CDN link
  if (process.env.R2_PUBLIC_URL && isR2Configured()) {
    const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
    return `${cleanBase}/${filePath}`;
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    console.error("Signed URL error (Supabase):", error);
    // As a last-resort fallback, if public URL is configured
    if (process.env.R2_PUBLIC_URL) {
      const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
      return `${cleanBase}/${filePath}`;
    }
    throw new AppError("Failed to generate download URL", "DOWNLOAD_FAILED", 500);
  }

  return data.signedUrl;
}

/**
 * Returns direct public URL via Cloudflare R2 CDN if configured, or Supabase public URL.
 */
export function getPublicDownloadUrl(filePath: string): string {
  if (process.env.R2_PUBLIC_URL) {
    const cleanBase = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
    return `${cleanBase}/${filePath}`;
  }

  const supabase = createSupabaseAdminClient();
  const { data } = supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Deletes a file from Cloudflare R2 and Supabase Storage.
 */
export async function deleteFile(filePath: string): Promise<void> {
  // 1. Try deleting from R2
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: r2Bucket,
          Key: filePath,
        })
      );
      console.log(`🗑️ [R2 Storage] Deleted object from R2: ${filePath}`);
    } catch (r2Error: any) {
      console.warn("⚠️ [R2 Storage] Error deleting from R2:", r2Error?.message || r2Error);
    }
  }

  // 2. Also ensure deletion from Supabase Storage fallback
  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.warn("Storage delete notice (Supabase):", error.message);
    }
  } catch (err: any) {
    console.warn("Supabase delete notice:", err?.message || err);
  }
}

/**
 * Uploads a thumbnail with R2 primary and Supabase fallback.
 */
export async function uploadThumbnail(
  thumbnailFile: File,
  userId: string
): Promise<string> {
  const ALLOWED_IMAGE_TYPES = ["image/webp", "image/png", "image/jpeg"];
  if (!ALLOWED_IMAGE_TYPES.includes(thumbnailFile.type)) {
    throw new InvalidFileTypeError(ALLOWED_IMAGE_TYPES);
  }

  const timestamp = Date.now();
  const thumbPath = `thumbnails/${userId}/${timestamp}-thumb.webp`;

  // 1. Try R2
  if (isR2Configured()) {
    try {
      const r2Client = getR2Client();
      const r2Bucket = process.env.R2_BUCKET_NAME ?? "musnad-worksheets";
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await r2Client.send(
        new PutObjectCommand({
          Bucket: r2Bucket,
          Key: thumbPath,
          Body: buffer,
          ContentType: thumbnailFile.type,
        })
      );

      const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
      return getSignedDownloadUrl(thumbPath, ONE_YEAR_SECONDS);
    } catch (r2Err) {
      console.warn("⚠️ [R2 Storage] Thumbnail upload fallback to Supabase:", r2Err);
    }
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(thumbPath, thumbnailFile, {
      contentType: thumbnailFile.type,
      upsert: false,
    });

  if (error) {
    console.error("Thumbnail upload error:", error);
    throw new AppError(
      "Failed to upload thumbnail",
      "THUMBNAIL_UPLOAD_FAILED",
      500
    );
  }

  const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
  return getSignedDownloadUrl(thumbPath, ONE_YEAR_SECONDS);
}
