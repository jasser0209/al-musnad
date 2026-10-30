import { db } from "@/lib/db";

export interface LogActivityInput {
  actorId?: string | null;
  actorName: string;
  actorRole: string;
  action:
    | "USER_REGISTERED"
    | "WORKSHEET_UPLOADED"
    | "WORKSHEET_ENDORSED"
    | "WORKSHEET_UNENDORSED"
    | "WORKSHEET_DELETED"
    | "WORKSHEET_STATUS_CHANGED"
    | "USER_VERIFIED"
    | "USER_UNVERIFIED"
    | "VERIFICATION_CODE_CREATED"
    | "VERIFICATION_CODE_DELETED"
    | "VERIFICATION_CODE_REDEEMED"
    | "USER_BANNED"
    | "USER_UNBANNED"
    | "USER_ROLE_CHANGED"
    | "PROFILE_APPROVED"
    | "PROFILE_REJECTED"
    | "INSPECTOR_PRIORITY_REPORT"
    | "DIRECT_MESSAGE_SENT"
    | "USER_ACCOUNT_LOCKED"
    | "USER_ACCOUNT_UNLOCKED"
    | (string & {});
  targetType: "WORKSHEET" | "USER" | "VERIFICATION_CODE" | "REPORT" | "SUPPORT_TICKET" | "SYSTEM";
  targetId?: string | null;
  details?: string | null;
  ipAddress?: string | null;
}

export async function logPlatformActivity(input: LogActivityInput): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        actorId: input.actorId || null,
        actorName: input.actorName,
        actorRole: input.actorRole,
        action: input.action,
        targetType: input.targetType,
        targetId: input.targetId || null,
        details: input.details || null,
        ipAddress: input.ipAddress || null,
      },
    });
  } catch (err) {
    // Non-blocking so logging never interrupts user actions if migration hasn't run yet
    console.warn("[AuditLog] Non-fatal warning recording activity:", err);
  }
}

export async function listAuditLogs(options?: {
  limit?: number;
  offset?: number;
  action?: string;
}) {
  try {
    const limit = options?.limit ?? 100;
    const offset = options?.offset ?? 0;
    const where = options?.action && options.action !== "ALL" ? { action: options.action } : {};

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.auditLog.count({ where }),
    ]);

    return { logs, total };
  } catch (err) {
    console.warn("[AuditLog] Could not fetch audit logs:", err);
    return { logs: [], total: 0 };
  }
}