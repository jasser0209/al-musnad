/**
 * Storage Service — Al-Musnad (المسند) v6.0
 *
 * Supports uploading:
 * - PDF documents (`.pdf`)
 * - Microsoft Word documents (`.doc`, `.docx`)
 * - Images (`.png`, `.jpg`, `.jpeg`, `.webp`)
 */

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

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets";
const MAX_FILE_SIZE =
  (Number(process.env.MAX_FILE_SIZE_MB) || 20) * 1024 * 1024;

interface UploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

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

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new AppError("Failed to upload file", "UPLOAD_FAILED", 500);
  }

  return {
    fileUrl: filePath,
    fileName: file.name,
    fileSize: file.size,
  };
}

export async function getSignedDownloadUrl(
  filePath: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    console.error("Signed URL error:", error);
    throw new AppError(
      "Failed to generate download URL",
      "DOWNLOAD_FAILED",
      500
    );
  }

  return data.signedUrl;
}

export async function deleteFile(filePath: string): Promise<void> {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error("Storage delete error:", error);
  }
}

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

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
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