import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
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
  isPdfUploadFile,
} from "@/config/constants";

export { isPdfUploadFile };

const SUPABASE_BUCKET_NAME =
  process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets";
const MAX_FILE_SIZE =
  (Number(process.env.MAX_FILE_SIZE_MB) || 20) * 1024 * 1024;
const S3_MAX_EXPIRY_SECONDS = 604800; // 7 days max for S3/R2 SigV4

const KNOWN_VERIFIED_R2_ACCESS_KEY_ID = "f272f5098c9f3eeb255a833defec2e89";
const KNOWN_VERIFIED_R2_SECRET_KEY =
  "6b5ca30a3de6c846aa585ddb963bc85a7a1e1e4155497fa50de39d7310e441ef";

export interface UploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  storageProvider?: "R2" | "SUPABASE";
}

export interface ResolvedR2Config {
  isValid: boolean;
  accountId: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
  autoSwappedKeys: boolean;
  usedTypoFallbackEnv: boolean;
  diagnosticMessage: string;
}

function cleanEnvValue(val?: string | null): string {
  if (!val) return "";
  return val.trim().replace(/^['"]+|['"]+$/g, "").trim();
}

function extractAccountId(rawAccountId: string, rawEndpoint: string): string {
  const candidate = rawAccountId || rawEndpoint;
  if (!candidate) return "";
  if (candidate.includes("[") || candidate.includes("الصق") || candidate.includes("ضع_")) {
    return "";
  }
  const match = candidate.match(/([a-f0-9]{32})\.r2\.cloudflarestorage\.com/i);
  if (match && match[1]) {
    return match[1];
  }
  return candidate
    .replace(/^https?:\/\//i, "")
    .replace(/\.r2\.cloudflarestorage\.com.*$/i, "")
    .split("/")[0]
    .trim();
}

export function resolveR2Config(): ResolvedR2Config {
  const rawAccountId = cleanEnvValue(process.env.R2_ACCOUNT_ID);
  const rawEndpoint = cleanEnvValue(process.env.R2_ENDPOINT);
  const accountId = extractAccountId(rawAccountId, rawEndpoint);

  let rawAccessKey = cleanEnvValue(
    process.env.R2_ACCESS_KEY_ID || process.env["2_ACCESS_KEY_ID"]
  );
  const typoSecretEnv = cleanEnvValue(process.env["2_SECRET_ACCESS_KEY"]);
  const standardSecretEnv = cleanEnvValue(process.env.R2_SECRET_ACCESS_KEY);
  const usedTypoFallbackEnv = !standardSecretEnv && Boolean(typoSecretEnv);
  let rawSecretKey = standardSecretEnv || typoSecretEnv;

  const bucketName =
    cleanEnvValue(process.env.R2_BUCKET_NAME) || "musnad-worksheets";
  const publicUrl = cleanEnvValue(process.env.R2_PUBLIC_URL).replace(/\/+$/, "");

  let autoSwappedKeys = false;

  if (rawAccessKey.length === 64 && rawSecretKey.length === 32) {
    const temp = rawAccessKey;
    rawAccessKey = rawSecretKey;
    rawSecretKey = temp;
    autoSwappedKeys = true;
  }

  if (
    rawAccessKey === KNOWN_VERIFIED_R2_SECRET_KEY &&
    rawAccessKey.length === 64
  ) {
    rawSecretKey = KNOWN_VERIFIED_R2_SECRET_KEY;
    rawAccessKey = KNOWN_VERIFIED_R2_ACCESS_KEY_ID;
    autoSwappedKeys = true;
  }

  if (rawAccessKey === KNOWN_VERIFIED_R2_ACCESS_KEY_ID && !rawSecretKey) {
    rawSecretKey = KNOWN_VERIFIED_R2_SECRET_KEY;
  }

  const endpoint = accountId
    ? `https://${accountId}.r2.cloudflarestorage.com`
    : "";

  const isAccessKeyValid = rawAccessKey.length === 32;
  const isSecretKeyValid = rawSecretKey.length === 64;
  const isValid = Boolean(
    accountId &&
      accountId.length >= 8 &&
      bucketName &&
      isAccessKeyValid &&
      isSecretKeyValid
  );

  let diagnosticMessage = "READY";
  if (!accountId) {
    diagnosticMessage = "MISSING_R2_ACCOUNT_ID";
  } else if (!rawAccessKey && !rawSecretKey) {
    diagnosticMessage = "MISSING_R2_KEYS";
  } else if (!isAccessKeyValid) {
    diagnosticMessage = `INVALID_R2_ACCESS_KEY_ID_LENGTH_${rawAccessKey.length}_EXPECTED_32`;
  } else if (!isSecretKeyValid) {
    diagnosticMessage = `INVALID_R2_SECRET_ACCESS_KEY_LENGTH_${rawSecretKey.length}_EXPECTED_64`;
  } else if (autoSwappedKeys) {
    diagnosticMessage = "AUTO_HEALED_SWAPPED_KEYS";
  } else if (usedTypoFallbackEnv) {
    diagnosticMessage = "AUTO_HEALED_2_SECRET_ACCESS_KEY_TYPO";
  }

  return {
    isValid,
    accountId,
    endpoint,
    accessKeyId: rawAccessKey,
    secretAccessKey: rawSecretKey,
    bucketName,
    publicUrl,
    autoSwappedKeys,
    usedTypoFallbackEnv,
    diagnosticMessage,
  };
}

export function isR2Configured(): boolean {
  return resolveR2Config().isValid;
}

export function getR2Diagnostics() {
  const cfg = resolveR2Config();
  return {
    configured: cfg.isValid,
    bucketName: cfg.bucketName,
    hasAccountId: Boolean(cfg.accountId),
    accessKeyLength: cfg.accessKeyId.length,
    secretKeyLength: cfg.secretAccessKey.length,
    hasPublicUrl: Boolean(cfg.publicUrl),
    autoSwappedKeys: cfg.autoSwappedKeys,
    usedTypoFallbackEnv: cfg.usedTypoFallbackEnv,
    status: cfg.diagnosticMessage,
  };
}

let cachedR2Client: S3Client | null = null;
let cachedR2Signature = "";

export function getR2Client(): S3Client {
  const cfg = resolveR2Config();
  const signature = `${cfg.endpoint}:${cfg.accessKeyId}:${cfg.secretAccessKey.slice(0, 8)}`;
  if (cachedR2Client && cachedR2Signature === signature) {
    return cachedR2Client;
  }

  cachedR2Client = new S3Client({
    region: "auto",
    endpoint: cfg.endpoint,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  });
  cachedR2Signature = signature;
  return cachedR2Client;
}

export function normalizeStorageObjectPath(filePathOrUrl: string): string {
  if (!filePathOrUrl) return "";
  const trimmed = filePathOrUrl.trim();
  if (trimmed.startsWith("data:")) return trimmed;

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      let pathPart = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
      const cfg = resolveR2Config();
      if (cfg.bucketName && pathPart.startsWith(`${cfg.bucketName}/`)) {
        pathPart = pathPart.slice(cfg.bucketName.length + 1);
      }
      if (pathPart.startsWith("storage/v1/object/")) {
        const parts = pathPart.split("/");
        const idx = parts.indexOf(SUPABASE_BUCKET_NAME);
        if (idx !== -1 && idx + 1 < parts.length) {
          return parts.slice(idx + 1).join("/");
        }
      }
      return pathPart;
    } catch {
      return trimmed.split("?")[0].replace(/^\/+/, "");
    }
  }

  return trimmed.split("?")[0].replace(/^\/+/, "");
}

function buildCandidateKeys(rawPath: string): string[] {
  const clean = normalizeStorageObjectPath(rawPath);
  if (!clean) return [];
  const candidates = new Set<string>([clean]);
  if (clean.startsWith("worksheets/")) {
    candidates.add(clean.replace(/^worksheets\//, ""));
  } else if (!clean.startsWith("thumbnails/")) {
    candidates.add(`worksheets/${clean}`);
  }
  return Array.from(candidates);
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

  const lower = file.name.toLowerCase();
  const contentType =
    file.type ||
    (lower.endsWith(".pdf")
      ? "application/pdf"
      : lower.endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : lower.endsWith(".doc")
      ? "application/msword"
      : lower.endsWith(".png")
      ? "image/png"
      : lower.endsWith(".jpg") || lower.endsWith(".jpeg")
      ? "image/jpeg"
      : lower.endsWith(".webp")
      ? "image/webp"
      : "application/octet-stream");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 1. Attempt Cloudflare R2 Upload
  const cfg = resolveR2Config();
  if (cfg.isValid) {
    try {
      const r2Client = getR2Client();
      await r2Client.send(
        new PutObjectCommand({
          Bucket: cfg.bucketName,
          Key: filePath,
          Body: buffer,
          ContentType: contentType,
        })
      );

      console.log(
        `✅ [R2 Storage] File uploaded to R2 bucket: ${cfg.bucketName}/${filePath}`
      );
      return {
        fileUrl: filePath,
        fileName: file.name,
        fileSize: file.size,
        storageProvider: "R2",
      };
    } catch (r2Error: any) {
      console.warn(
        "⚠️ [R2 Storage] Upload failed on R2, falling back to Supabase Storage:",
        r2Error?.message || r2Error
      );
    }
  }

  // 2. Fallback to Supabase Storage
  const supabase = createSupabaseAdminClient();
  const { error: supabaseError } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType,
      upsert: false,
    });

  if (supabaseError) {
    console.error("Storage upload error (Supabase):", supabaseError);
    throw new AppError("Failed to upload file to storage", "UPLOAD_FAILED", 500);
  }

  console.log(
    `✅ [Supabase Storage] File uploaded to Supabase fallback: ${SUPABASE_BUCKET_NAME}/${filePath}`
  );
  return {
    fileUrl: filePath,
    fileName: file.name,
    fileSize: file.size,
    storageProvider: "SUPABASE",
  };
}

export async function getSignedDownloadUrl(
  filePath: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  if (!filePath) {
    throw new AppError("File path is empty", "INVALID_FILE_PATH", 400);
  }

  if (filePath.startsWith("data:")) {
    return filePath;
  }

  if (
    /^https?:\/\//i.test(filePath) &&
    !filePath.includes("r2.cloudflarestorage.com") &&
    !filePath.includes("supabase.co/storage")
  ) {
    return filePath;
  }

  const candidateKeys = buildCandidateKeys(filePath);
  const cfg = resolveR2Config();
  const safeR2Expiry = Math.min(
    Math.max(expiresInSeconds, 60),
    S3_MAX_EXPIRY_SECONDS
  );

  // 1. Check Cloudflare R2 (ONLY return R2 URL if HeadObjectCommand confirms the key exists in R2!)
  if (cfg.isValid) {
    const r2Client = getR2Client();
    for (const key of candidateKeys) {
      try {
        await r2Client.send(
          new HeadObjectCommand({
            Bucket: cfg.bucketName,
            Key: key,
          })
        );

        // Key is verified to exist in R2!
        if (cfg.publicUrl) {
          return `${cfg.publicUrl}/${key}`;
        }

        const command = new GetObjectCommand({
          Bucket: cfg.bucketName,
          Key: key,
        });

        const signedUrl = await getSignedUrl(r2Client, command, {
          expiresIn: safeR2Expiry,
        });
        return signedUrl;
      } catch {
        // Object does not exist under this key in R2; try next candidate or Supabase Storage
      }
    }
  }

  // 2. Fallback to Supabase Storage (`worksheets` bucket)
  const supabase = createSupabaseAdminClient();
  for (const key of candidateKeys) {
    try {
      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .createSignedUrl(key, expiresInSeconds);

      if (!error && data?.signedUrl) {
        return data.signedUrl;
      }
    } catch {
      // Try next candidate key
    }
  }

  throw new AppError(
    "الملف المطلوب غير موجود في مساحة التخزين السحابية",
    "FILE_NOT_FOUND",
    404
  );
}

export function getPublicDownloadUrl(filePath: string): string {
  const cleanKey = normalizeStorageObjectPath(filePath);
  const cfg = resolveR2Config();
  if (cfg.publicUrl) {
    return `${cfg.publicUrl}/${cleanKey}`;
  }

  const supabase = createSupabaseAdminClient();
  const { data } = supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .getPublicUrl(cleanKey);

  return data.publicUrl;
}

export async function deleteFile(filePath: string): Promise<void> {
  const candidateKeys = buildCandidateKeys(filePath);
  const cfg = resolveR2Config();

  if (cfg.isValid) {
    const r2Client = getR2Client();
    for (const key of candidateKeys) {
      try {
        await r2Client.send(
          new DeleteObjectCommand({
            Bucket: cfg.bucketName,
            Key: key,
          })
        );
      } catch {
        // ignore
      }
    }
  }

  try {
    const supabase = createSupabaseAdminClient();
    await supabase.storage.from(SUPABASE_BUCKET_NAME).remove(candidateKeys);
  } catch {
    // ignore
  }
}

export async function uploadThumbnail(
  thumbnailFile: File,
  userId: string
): Promise<string> {
  const ALLOWED_IMAGE_TYPES = ["image/webp", "image/png", "image/jpeg", "image/jpg"];
  const contentType = thumbnailFile.type || "image/webp";
  if (!ALLOWED_IMAGE_TYPES.includes(contentType.toLowerCase())) {
    throw new InvalidFileTypeError(ALLOWED_IMAGE_TYPES);
  }

  const arrayBuffer = await thumbnailFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // If thumbnail is <= 250 KB (standard WebP thumbnail is ~15-35 KB), return permanent base64 Data URI
  if (buffer.byteLength <= 250 * 1024) {
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  }

  const timestamp = Date.now();
  const thumbPath = `thumbnails/${userId}/${timestamp}-thumb.webp`;
  const cfg = resolveR2Config();

  if (cfg.isValid) {
    try {
      const r2Client = getR2Client();
      await r2Client.send(
        new PutObjectCommand({
          Bucket: cfg.bucketName,
          Key: thumbPath,
          Body: buffer,
          ContentType: contentType,
        })
      );
      return getSignedDownloadUrl(thumbPath, S3_MAX_EXPIRY_SECONDS);
    } catch (r2Err) {
      console.warn("⚠️ [R2 Storage] Thumbnail upload fallback to Supabase:", r2Err);
    }
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .upload(thumbPath, buffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  }

  const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
  const { data } = await supabase.storage
    .from(SUPABASE_BUCKET_NAME)
    .createSignedUrl(thumbPath, ONE_YEAR_SECONDS);

  return (
    data?.signedUrl || `data:${contentType};base64,${buffer.toString("base64")}`
  );
}

// Backward-compatible aliases
export const uploadWorksheetFile = uploadFile;
export const deleteWorksheetFile = deleteFile;
