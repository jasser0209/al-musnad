import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { APP_CONFIG, STORAGE_BUCKETS } from "@/config/constants";
import { isR2Configured, getR2Diagnostics } from "@/services/storage.service";

export async function GET() {
  const startedAt = Date.now();
  let databaseConnected = false;
  let usersCount = 0;
  let worksheetsCount = 0;

  try {
    const [uCount, wCount] = await Promise.all([
      db.user.count(),
      db.worksheet.count(),
    ]);
    databaseConnected = true;
    usersCount = uCount;
    worksheetsCount = wCount;
  } catch {
    databaseConnected = false;
  }

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const r2Ready = isR2Configured();
  const r2Diagnostics = getR2Diagnostics();

  return NextResponse.json({
    success: true,
    platform: APP_CONFIG.nameAr,
    version: "16.0.0",
    status: databaseConnected && supabaseConfigured ? "HEALTHY" : "DEGRADED",
    latencyMs: Date.now() - startedAt,
    services: {
      postgresqlDatabase: databaseConnected ? "CONNECTED" : "DISCONNECTED",
      supabaseAuth: supabaseConfigured ? "CONFIGURED" : "MISSING_ENV",
      storageProvider: r2Ready ? "CLOUDFLARE_R2_10GB" : "SUPABASE_STORAGE",
      cloudflareR2: r2Ready ? "ACTIVE_10GB" : "FALLBACK",
      storageBucket: r2Ready
        ? r2Diagnostics.bucketName
        : STORAGE_BUCKETS.WORKSHEETS,
      r2Diagnostics,
    },
    metrics: databaseConnected
      ? {
          registeredUsers: usersCount,
          totalWorksheets: worksheetsCount,
        }
      : null,
    timestamp: new Date().toISOString(),
  });
}