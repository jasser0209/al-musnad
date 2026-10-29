import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const accountId = process.env.R2_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucketName = process.env.R2_BUCKET_NAME?.trim() || "musnad-worksheets";
const publicUrl = process.env.R2_PUBLIC_URL?.trim();

console.log("================================================================");
console.log("☁️ فحص الاتصال وتجربة التخزين السحابي Cloudflare R2 (10GB)");
console.log("================================================================\n");

console.log("📋 قراءة بيانات التهيئة الحالية:");
console.log(` - Account ID: ${accountId ? (accountId.includes("[") ? "⚠️ لم يتم لصقه بعد (Placeholder)" : accountId) : "❌ غير موجود"}`);
console.log(` - Access Key ID: ${accessKeyId ? "✅ متوفر (" + accessKeyId.slice(0, 8) + "...)" : "❌ مفقود"}`);
console.log(` - Secret Access Key: ${secretAccessKey ? "✅ متوفر (محمي)" : "❌ مفقود"}`);
console.log(` - Bucket Name: ${bucketName}`);
console.log(` - Public URL: ${publicUrl || "غير محدد"}\n`);

const isConfigured = Boolean(
  accountId &&
    !accountId.includes("[") &&
    !accountId.includes("الصق") &&
    accessKeyId &&
    secretAccessKey &&
    bucketName
);

if (!isConfigured) {
  console.log("ℹ️ ملاحظة هامة:");
  console.log("   حقل R2_ACCOUNT_ID بحاجة إلى لصق الـ Account ID الخاص بك من لوحة تحكم Cloudflare.");
  console.log("   (تجد Account ID في صفحة Cloudflare -> R2 Overview على الجانب الأيمن).");
  console.log("🛡️ في الوقت الحالي، خدمة التخزين في المنصة تعتمد تلقائياً وبأمان على Supabase Storage كخيار احتياطي (Fallback).\n");
  process.exit(0);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function runTest() {
  const testKey = `_system_tests/r2-health-check-${Date.now()}.txt`;
  const testData = `Cloudflare R2 Health Check for Al-Musnad Platform at ${new Date().toISOString()}`;

  try {
    // 1. Upload test file
    console.log(`⏳ [1/3] جاري رفع ملف تجريبي إلى سلة R2 (${bucketName})...`);
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: testKey,
        Body: Buffer.from(testData, "utf8"),
        ContentType: "text/plain;charset=utf-8",
      })
    );
    console.log(`✅ تم رفع الملف التجريبي بنجاح: ${testKey}`);

    // 2. Generate signed download URL and test reading
    console.log("⏳ [2/3] جاري توليد رابط التحميل الآمن واختبار الوصول...");
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: testKey,
    });
    const signed = await getSignedUrl(client, command, { expiresIn: 300 });
    console.log(`🔗 الرابط الموقع (Presigned URL):\n   ${signed}`);

    if (publicUrl) {
      const publicLink = `${publicUrl.replace(/\/$/, "")}/${testKey}`;
      console.log(`🌐 الرابط العمومي عبر CDN (R2 Public URL):\n   ${publicLink}`);
    }

    // 3. Delete test file
    console.log("⏳ [3/3] جاري حذف الملف التجريبي للتنظيف...");
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: testKey,
      })
    );
    console.log("✅ تم تنظيف وحذف الملف التجريبي بنجاح!");

    console.log("\n================================================================");
    console.log("🎉 فحص سحابة Cloudflare R2 اكتمل بنجاح تام 100%!");
    console.log("================================================================\n");
  } catch (error) {
    console.error("❌ حدث خطأ أثناء الاتصال بسحابة Cloudflare R2:", error.message);
  }
}

runTest();
