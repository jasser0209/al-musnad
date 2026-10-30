import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const env = {};
const envContent = fs.readFileSync(".env", "utf8");
envContent.split("\n").forEach((l) => {
  const i = l.indexOf("=");
  if (i > 0) {
    const k = l.substring(0, i).trim();
    const v = l.substring(i + 1).trim().replace(/^['"]|['"]$/g, "");
    env[k] = v;
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

async function listRecursive(folder = "") {
  const { data, error } = await supabase.storage.from("worksheets").list(folder);
  if (error || !data) {
    console.error("List error:", folder, error);
    return [];
  }

  let files = [];
  for (const item of data) {
    const fullPath = folder ? `${folder}/${item.name}` : item.name;
    if (item.id === null) {
      const sub = await listRecursive(fullPath);
      files = files.concat(sub);
    } else {
      files.push({ path: fullPath, size: item.metadata?.size, type: item.metadata?.mimetype });
    }
  }
  return files;
}

async function main() {
  console.log("🔄 Starting Supabase -> Cloudflare R2 Sync...");
  const files = await listRecursive("");
  console.log(`Found ${files.length} file(s) in Supabase Storage.`);

  for (const f of files) {
    console.log(`Checking file: ${f.path}`);
    let existsInR2 = false;
    try {
      await s3.send(new HeadObjectCommand({ Bucket: env.R2_BUCKET_NAME, Key: f.path }));
      existsInR2 = true;
      console.log(`  Already in R2: ${f.path}`);
    } catch {
      existsInR2 = false;
    }

    if (!existsInR2) {
      console.log(`  Downloading from Supabase: ${f.path}...`);
      const { data, error } = await supabase.storage.from("worksheets").download(f.path);
      if (error || !data) {
        console.error(`  Failed to download ${f.path}:`, error);
        continue;
      }

      const buffer = Buffer.from(await data.arrayBuffer());
      const contentType = f.type || (f.path.endsWith(".pdf") ? "application/pdf" : "application/octet-stream");

      console.log(`  Uploading to R2 (${buffer.length} bytes)...`);
      await s3.send(
        new PutObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: f.path,
          Body: buffer,
          ContentType: contentType,
        })
      );
      console.log(`  ✅ Successfully synced to R2: ${f.path}`);
    }
  }

  console.log("🎉 Sync finished!");
}

main().catch(console.error);
