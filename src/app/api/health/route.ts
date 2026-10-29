/**
 * GET /api/health — System Health, Database Connectivity & Version Endpoint (Al-Musnad v12.0)
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { APP_CONFIG, STORAGE_BUCKETS } from "@/config/constants";

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

  return NextResponse.json({
    success: true,
    platform: APP_CONFIG.nameAr,
    version: "13.0.0",
    status: databaseConnected && supabaseConfigured ? "HEALTHY" : "DEGRADED",
    latencyMs: Date.now() - startedAt,
    services: {
      postgresqlDatabase: databaseConnected ? "CONNECTED" : "DISCONNECTED",
      supabaseAuthAndStorage: supabaseConfigured ? "CONFIGURED" : "MISSING_ENV",
      storageBucket: STORAGE_BUCKETS.WORKSHEETS,
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
