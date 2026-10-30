import { NextRequest } from "next/server";

interface RateBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateBucket>();

export interface RateLimitConfig {
  keyPrefix?: string;
  maxRequests: number;
  windowMs: number;
}

export function getClientIp(req?: NextRequest | null): string {
  if (!req) return "unknown";
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const prefix = config.keyPrefix || "rl";
  const fullKey = `${prefix}:${identifier}`;
  const existing = buckets.get(fullKey);

  if (!existing || now > existing.resetAt) {
    buckets.set(fullKey, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= config.maxRequests) {
    const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, config.maxRequests - existing.count),
    retryAfterSeconds: 0,
  };
}