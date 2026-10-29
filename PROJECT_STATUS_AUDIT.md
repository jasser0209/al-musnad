# 🔍 Technical Audit & Codebase Snapshot
**Project:** Teacher's Activity Bank (بنك أنشطة المعلم)  
**Date:** October 28, 2026  
**Auditor:** Principal Backend Architect  
**Target Reference:** `COMPLETE_BACKEND_ARCHITECTURE.md`

---

## 1. File Tree & Completion Status

This table audits every file defined in Section 7 of `COMPLETE_BACKEND_ARCHITECTURE.md`, along with Phase 2 frontend/actions placeholders.

### Backend Infrastructure & Data Layer
| File Path | Status | Notes |
|---|---|---|
| `.env.example` | `[COMPLETED]` | Includes Supabase DB URL, Direct URL, storage bucket, limits |
| `.gitignore` | `[COMPLETED]` | Standard Next.js/Node/Prisma exclusions |
| `package.json` | `[COMPLETED]` | Next 15, React 19, Prisma 6, Supabase SSR & JS, Zod 3 |
| `tsconfig.json` | `[COMPLETED]` | TypeScript 5 Strict mode, paths alias `@/*` -> `./src/*` |
| `next.config.ts` | `[COMPLETED]` | 25MB body size limit & Supabase storage remote patterns |
| `README.md` | `[COMPLETED]` | Setup instructions and quickstart guide |
| `COMPLETE_BACKEND_ARCHITECTURE.md` | `[COMPLETED]` | Master architecture blueprint |
| `prisma/schema.prisma` | `[COMPLETED]` | 7 models, relational constraints, compound indexes |
| `prisma/seed.ts` | `[COMPLETED]` | Grades 1-6, 8 subjects with icons/colors, 8 categories |
| `supabase/sql/rls-policies.sql` | `[COMPLETED]` | Row Level Security policies for all tables and storage |
| `supabase/sql/triggers.sql` | `[COMPLETED]` | User sync trigger & updated_at automatic triggers |

### Application Core & Services (`src/`)
| File Path | Status | Notes |
|---|---|---|
| `src/middleware.ts` | `[COMPLETED]` | Edge auth session refresh and protected route redirects |
| `src/config/constants.ts` | `[COMPLETED]` | `MAX_FILE_SIZE_MB`, `ALLOWED_FILE_TYPES`, pagination constants |
| `src/types/api.ts` | `[COMPLETED]` | DTOs, Prisma matching models, standard response envelopes |
| `src/types/index.ts` | `[COMPLETED]` | Barrel export of all shared types |
| `src/lib/db.ts` | `[COMPLETED]` | PrismaClient singleton with hot-reload protection |
| `src/lib/supabase/client.ts` | `[COMPLETED]` | Browser-side Supabase client (`@supabase/ssr`) |
| `src/lib/supabase/server.ts` | `[COMPLETED]` | Server cookie client & admin client (service role) |
| `src/lib/supabase/middleware.ts` | `[COMPLETED]` | Session refresh helper for Next.js middleware |
| `src/lib/utils/api-response.ts` | `[COMPLETED]` | `successResponse` & `errorResponse` (AppError, Zod, Prisma) |
| `src/lib/utils/errors.ts` | `[COMPLETED]` | `AppError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ValidationError`, `FileTooLargeError`, `InvalidFileTypeError` |
| `src/lib/utils/pagination.ts` | `[COMPLETED]` | `getPaginationParams` and `buildPaginationMeta` |
| `src/lib/validators/auth.ts` | `[COMPLETED]` | Sign up, sign in, and profile update schemas |
| `src/lib/validators/common.ts` | `[COMPLETED]` | `uuidSchema`, `paginationSchema`, `worksheetSortSchema`, `slugSchema` |
| `src/lib/validators/worksheet.ts` | `[COMPLETED]` | Create, update, and search/filter schemas |
| `src/services/worksheet.service.ts` | `[COMPLETED]` | Bilingual search, filters, CRUD, auto-publish, uploader privacy |
| `src/services/storage.service.ts` | `[COMPLETED]` | PDF upload to private bucket, signed URL generation, delete |
| `src/services/favorite.service.ts` | `[COMPLETED]` | Atomic favorite toggle & paginated user favorites |
| `src/services/download.service.ts` | `[COMPLETED]` | Idempotent download upsert + counter increment + signed URL |

### API Route Handlers (`src/app/api/`)
| File Path | Status | Notes |
|---|---|---|
| `src/app/api/auth/callback/route.ts` | `[COMPLETED]` | Supabase OAuth code exchange callback |
| `src/app/api/auth/me/route.ts` | `[COMPLETED]` | Authenticated user profile with statistics |
| `src/app/api/worksheets/route.ts` | `[COMPLETED]` | GET (filter/search/paginate), POST (multipart upload) |
| `src/app/api/worksheets/[id]/route.ts` | `[COMPLETED]` | GET (detail), PATCH (update), DELETE (soft archive) |
| `src/app/api/worksheets/[id]/download/route.ts` | `[COMPLETED]` | GET (idempotent tracking + signed URL) |
| `src/app/api/worksheets/[id]/favorite/route.ts` | `[COMPLETED]` | POST (atomic toggle) |
| `src/app/api/grades/route.ts` | `[COMPLETED]` | GET (ordered by `sortOrder: 'asc'`) |
| `src/app/api/subjects/route.ts` | `[COMPLETED]` | GET (ordered by `sortOrder: 'asc'`) |
| `src/app/api/categories/route.ts` | `[COMPLETED]` | GET (ordered by `sortOrder: 'asc'`) |
| `src/app/api/me/favorites/route.ts` | `[COMPLETED]` | GET (paginated favorited worksheets) |
| `src/app/api/me/downloads/route.ts` | `[COMPLETED]` | GET (paginated download history) |
| `src/app/api/me/uploads/route.ts` | `[COMPLETED]` | GET (paginated uploader's worksheets) |

### Phase 2 Frontend & Server Actions
| File Path | Status | Notes |
|---|---|---|
| `src/app/globals.css` | `[COMPLETED]` | Cairo font setup, RTL helpers, Tailwind directives |
| `src/app/layout.tsx` | `[COMPLETED]` | Root layout with Arabic RTL, Cairo Google font, Navbar, and Footer |
| `src/app/page.tsx` | `[COMPLETED]` | Home page with Hero section, FilterBar, WorksheetCard grid, and Pagination |
| `src/components/layout/Navbar.tsx` | `[COMPLETED]` | Responsive navigation, logo, upload CTA button, live session state |
| `src/components/worksheets/WorksheetCard.tsx` | `[COMPLETED]` | Subject cover color, badges, teacher card, stats, favorite toggle |
| `src/components/worksheets/FilterBar.tsx` | `[COMPLETED]` | Search input, grade, subject, category dropdowns, URL searchParams sync |
| `src/app/(main)/browse/page.tsx` | `[COMPLETED]` | Catalog redirect view linking to homepage catalog |
| `src/app/(main)/worksheet/[id]/page.tsx` | `[COMPLETED]` | Activity detail, <object> + <iframe> PDF viewer, direct download, favorite toggle |
| `src/app/(main)/upload/page.tsx` | `[COMPLETED]` | Drag-and-drop PDF upload, taxonomy dropdowns, tags, multipart form submission |
| `src/app/(auth)/login/page.tsx` | `[COMPLETED]` | Email/Password login + Google OAuth with validation |
| `src/app/(auth)/register/page.tsx` | `[COMPLETED]` | Teacher registration with name, school, email, password |
| `src/app/(main)/profile/page.tsx` | `[COMPLETED]` | Teacher profile stats, edit profile modal, 3 tabs: uploads, favorites, downloads |
| `src/actions/worksheet.actions.ts` | `[COMPLETED]` | Server Actions: createWorksheetAction, updateWorksheetAction, archiveWorksheetAction |
| `src/actions/favorite.actions.ts` | `[COMPLETED]` | Server Action: toggleFavoriteAction with cache revalidation |
| `src/actions/profile.actions.ts` | `[COMPLETED]` | Server Action: updateProfileAction with Zod validation |
| `src/actions/admin.actions.ts` | `[COMPLETED]` | Server Actions: admin role verification, KPI retrieval, worksheet moderation & role toggle |
| `src/app/admin/dashboard/page.tsx` | `[COMPLETED]` | Full RTL Arabic Admin Dashboard: 4 KPIs, worksheet moderation table, teacher management table |

---

## 2. Verification of Critical Backend Fixes

### Fix 1: Auto-Publish on Upload
*Location:* `src/services/worksheet.service.ts` -> `createWorksheet`
```typescript
export async function createWorksheet(data: CreateWorksheetData) {
  return db.worksheet.create({
    data: {
      title: data.title,
      titleAr: data.titleAr ?? null,
      description: data.description ?? null,
      descriptionAr: data.descriptionAr ?? null,
      categoryId: data.categoryId,
      gradeId: data.gradeId,
      subjectId: data.subjectId,
      uploadedBy: data.uploadedBy,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileSize: data.fileSize,
      thumbnailUrl: data.thumbnailUrl ?? null,
      pageCount: data.pageCount ?? null,
      tags: data.tags ?? [],
      status: WorksheetStatus.PUBLISHED, // <-- FORCED PUBLISHED
    },
    select: publicWorksheetSelect,
  });
}
```

### Fix 2: Public Uploader Field Selection (Email Excluded)
*Location:* `src/services/worksheet.service.ts` -> `publicWorksheetSelect`
```typescript
export const publicWorksheetSelect = {
  id: true,
  title: true,
  titleAr: true,
  description: true,
  descriptionAr: true,
  categoryId: true,
  gradeId: true,
  subjectId: true,
  uploadedBy: true,
  fileUrl: true,
  fileName: true,
  fileSize: true,
  thumbnailUrl: true,
  pageCount: true,
  status: true,
  tags: true,
  downloadCount: true,
  favoriteCount: true,
  createdAt: true,
  updatedAt: true,
  category: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  grade: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  subject: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      color: true,
      icon: true,
      sortOrder: true,
    },
  },
  uploader: {
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      school: true,
      // email is strictly omitted to protect teacher privacy
    },
  },
} as const;
```

### Fix 3: Idempotent Download Tracking
*Location:* `src/services/download.service.ts` -> `recordAndGetDownloadUrl`
```typescript
  // Atomic transaction: upsert download log and increment counter
  const now = new Date();
  await db.$transaction([
    db.download.upsert({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
      create: {
        userId,
        worksheetId,
        downloadedAt: now,
      },
      update: {
        downloadedAt: now,
      },
    }),
    db.worksheet.update({
      where: { id: worksheetId },
      data: {
        downloadCount: { increment: 1 },
      },
    }),
  ]);
```

### Fix 4: Atomic Favorite Toggle
*Location:* `src/services/favorite.service.ts` -> `toggleFavorite`
```typescript
  return db.$transaction(async (tx) => {
    const existing = await tx.favorite.findUnique({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
    });

    if (existing) {
      // Remove favorite
      await tx.favorite.delete({
        where: { id: existing.id },
      });

      // Fetch current count to guard against negative values
      const current = await tx.worksheet.findUnique({
        where: { id: worksheetId },
        select: { favoriteCount: true },
      });

      const currentCount = current?.favoriteCount ?? 0;
      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: currentCount > 0 ? { decrement: 1 } : 0,
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: false,
        favoriteCount: updated.favoriteCount,
      };
    } else {
      // Add favorite
      await tx.favorite.create({
        data: {
          userId,
          worksheetId,
        },
      });

      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: { increment: 1 },
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: true,
        favoriteCount: updated.favoriteCount,
      };
    }
  });
```

---

## 3. Full Code Dump of Completed Files

### File: `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  trailingSlash: false,
};

export default nextConfig;
```

### File: `src/config/constants.ts`
```typescript
export const APP_CONFIG = {
  name: "Teacher's Activity Bank",
  nameAr: "بنك أنشطة المعلم",
  description: "Browse, search, preview, and download primary school educational activities and worksheets.",
  descriptionAr: "منصة تعليمية متكاملة لمعلمي المرحلة الابتدائية لتصفح، معاينة، تحميل ومشاركة أوراق العمل والأنشطة.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ALLOWED_FILE_TYPES = ["application/pdf"] as const;
export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[number];

export const ALLOWED_FILE_EXTENSIONS = [".pdf"] as const;

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

export const STORAGE_BUCKETS = {
  WORKSHEETS: process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets",
} as const;

export const SIGNED_URL_EXPIRY_SECONDS = 3600; // 1 hour
```

### File: `src/types/api.ts`
```typescript
export type Role = "TEACHER" | "ADMIN";
export type WorksheetStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type WorksheetSortOption = "newest" | "popular" | "downloads" | "title";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: Role;
  school: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  sortOrder: number;
  createdAt: Date | string;
}

export interface Grade {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  sortOrder: number;
  createdAt: Date | string;
}

export interface Subject {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  color: string | null;
  icon: string | null;
  sortOrder: number;
  createdAt: Date | string;
}

export interface Worksheet {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  categoryId: string;
  gradeId: string;
  subjectId: string;
  uploadedBy: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl: string | null;
  pageCount: number | null;
  status: WorksheetStatus;
  tags: string[];
  downloadCount: number;
  favoriteCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface WorksheetWithRelations extends Worksheet {
  category: Category;
  grade: Grade;
  subject: Subject;
  uploader: Pick<User, "id" | "name" | "avatarUrl">;
}

export interface WorksheetFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  grade?: string;
  subject?: string;
  category?: string;
  tags?: string[];
  sort?: WorksheetSortOption;
  status?: WorksheetStatus;
}

export interface Download {
  id: string;
  userId: string;
  worksheetId: string;
  downloadedAt: Date | string;
}

export interface Favorite {
  id: string;
  userId: string;
  worksheetId: string;
  createdAt: Date | string;
}
```

### File: `src/types/index.ts`
```typescript
export * from "./api";
```

### File: `src/lib/db.ts`
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```

### File: `src/lib/supabase/client.ts`
```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
```

### File: `src/lib/supabase/server.ts`
```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options as CookieOptions)
          );
        } catch {
        }
      },
    },
  });
}

export function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createServerClient(supabaseUrl, serviceRoleKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
      },
    },
  });
}
```

### File: `src/lib/supabase/middleware.ts`
```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedPaths = ["/upload", "/profile", "/admin"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

### File: `src/lib/utils/errors.ts`
```typescript
import type { ApiErrorDetail } from "@/types/api";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: ApiErrorDetail[];

  constructor(
    message: string,
    code: string = "INTERNAL_SERVER_ERROR",
    statusCode: number = 500,
    details?: ApiErrorDetail[]
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "UNAUTHORIZED", 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "You do not have permission to access this resource") {
    super(message, "FORBIDDEN", 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, "NOT_FOUND", 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed", details?: ApiErrorDetail[]) {
    super(message, "VALIDATION_ERROR", 400, details);
  }
}

export class FileTooLargeError extends AppError {
  constructor(maxSizeMB: number) {
    super(
      `File exceeds the maximum allowable size of ${maxSizeMB}MB`,
      "FILE_TOO_LARGE",
      413
    );
  }
}

export class InvalidFileTypeError extends AppError {
  constructor(allowedTypes: readonly string[]) {
    super(
      `Invalid file type. Allowed formats: ${allowedTypes.join(", ")}`,
      "INVALID_FILE_TYPE",
      415
    );
  }
}
```

### File: `src/lib/utils/api-response.ts`
```typescript
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "./errors";
import type {
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginationMeta,
  ApiErrorDetail,
} from "@/types/api";

export function successResponse<T>(
  data: T,
  meta?: PaginationMeta,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
    ...(meta ? { meta } : {}),
  };

  return NextResponse.json(body, { status });
}

export function errorResponse(
  error: unknown,
  fallbackStatus: number = 500
): NextResponse<ApiErrorResponse> {
  if (error instanceof AppError) {
    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details && error.details.length > 0 ? { details: error.details } : {}),
      },
    };

    return NextResponse.json(body, { status: error.statusCode });
  }

  if (error instanceof ZodError) {
    const details: ApiErrorDetail[] = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input parameters",
        details,
      },
    };

    return NextResponse.json(body, { status: 400 });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = Array.isArray(error.meta?.target)
          ? error.meta?.target.join(", ")
          : (error.meta?.target as string | undefined) ?? "field";

        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "CONFLICT",
            message: `A record with this ${target} already exists`,
          },
        };
        return NextResponse.json(body, { status: 409 });
      }

      case "P2025": {
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "The requested record was not found",
          },
        };
        return NextResponse.json(body, { status: 404 });
      }

      case "P2003": {
        const fieldName = (error.meta?.field_name as string | undefined) ?? "foreign key";
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "FOREIGN_KEY_VIOLATION",
            message: `Invalid reference provided for ${fieldName}`,
          },
        };
        return NextResponse.json(body, { status: 400 });
      }

      default: {
        const body: ApiErrorResponse = {
          success: false,
          error: {
            code: "DATABASE_ERROR",
            message: "A database error occurred",
          },
        };
        return NextResponse.json(body, { status: 500 });
      }
    }
  }

  console.error("[Unhandled Exception]:", error);

  const fallbackBody: ApiErrorResponse = {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message:
        error instanceof Error ? error.message : "An unexpected server error occurred",
    },
  };

  return NextResponse.json(fallbackBody, { status: fallbackStatus });
}
```

### File: `src/lib/utils/pagination.ts`
```typescript
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/config/constants";
import type { PaginationMeta } from "@/types/api";

export interface PaginationParams {
  skip: number;
  take: number;
  page: number;
  limit: number;
}

export function getPaginationParams(
  pageInput?: number | string | null,
  limitInput?: number | string | null
): PaginationParams {
  const parsedPage = Number(pageInput);
  const parsedLimit = Number(limitInput);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const rawLimit =
    Number.isInteger(parsedLimit) && parsedLimit > 0
      ? parsedLimit
      : DEFAULT_PAGE_SIZE;
  const limit = Math.min(rawLimit, MAX_PAGE_SIZE);

  const skip = (page - 1) * limit;
  const take = limit;

  return { skip, take, page, limit };
}

export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  const safeTotal = Math.max(0, total);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(safeTotal / safeLimit);

  return {
    page,
    limit,
    total: safeTotal,
    totalPages,
  };
}
```

### File: `src/lib/validators/common.ts`
```typescript
import { z } from "zod";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/config/constants";

export const uuidSchema = z
  .string()
  .trim()
  .uuid({ message: "Invalid UUID format" });

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int({ message: "Page must be an integer" })
    .min(1, { message: "Page must be greater than or equal to 1" })
    .default(1),
  limit: z.coerce
    .number()
    .int({ message: "Limit must be an integer" })
    .min(1, { message: "Limit must be greater than or equal to 1" })
    .max(MAX_PAGE_SIZE, { message: `Limit cannot exceed ${MAX_PAGE_SIZE}` })
    .default(DEFAULT_PAGE_SIZE),
});

export const worksheetSortSchema = z
  .enum(["newest", "popular", "downloads", "title"], {
    errorMap: () => ({
      message: "Sort must be one of: 'newest', 'popular', 'downloads', 'title'",
    }),
  })
  .default("newest");

export const slugSchema = z
  .string()
  .trim()
  .min(1, { message: "Slug is required" })
  .max(100, { message: "Slug must be 100 characters or fewer" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must contain only lowercase alphanumeric characters and hyphens",
  });

export const searchSchema = z
  .string()
  .trim()
  .min(1, { message: "Search term cannot be empty" })
  .max(200, { message: "Search term must be 200 characters or fewer" });
```

### File: `src/lib/validators/worksheet.ts`
```typescript
import { z } from "zod";
import { WorksheetStatus } from "@prisma/client";
import { uuidSchema, paginationSchema, worksheetSortSchema } from "./common";

export const createWorksheetSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be under 255 characters"),
  titleAr: z
    .string()
    .trim()
    .max(255, "Arabic title must be under 255 characters")
    .optional(),
  description: z
    .string()
    .trim()
    .max(2000, "Description must be under 2000 characters")
    .optional(),
  descriptionAr: z
    .string()
    .trim()
    .max(2000, "Arabic description must be under 2000 characters")
    .optional(),
  categoryId: uuidSchema,
  gradeId: uuidSchema,
  subjectId: uuidSchema,
  tags: z
    .array(z.string().trim().min(1).max(50))
    .max(10, "Maximum 10 tags allowed")
    .default([]),
});

export const updateWorksheetSchema = createWorksheetSchema
  .partial()
  .extend({
    status: z.nativeEnum(WorksheetStatus).optional(),
  });

export const worksheetFilterSchema = paginationSchema.extend({
  search: z.string().trim().max(200).optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  category: z.string().optional(),
  tags: z
    .string()
    .transform((val) => val.split(",").map((t) => t.trim()))
    .optional(),
  sort: worksheetSortSchema,
  status: z.nativeEnum(WorksheetStatus).optional(),
});

export type CreateWorksheetInput = z.infer<typeof createWorksheetSchema>;
export type UpdateWorksheetInput = z.infer<typeof updateWorksheetSchema>;
export type WorksheetFilterInput = z.infer<typeof worksheetFilterSchema>;
```

### File: `src/lib/validators/auth.ts`
```typescript
import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be under 72 characters"),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be under 255 characters"),
  school: z.string().trim().max(255).optional(),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(255)
    .optional(),
  school: z.string().trim().max(255).optional(),
  avatarUrl: z.string().url("Invalid URL").optional().nullable(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
```

### File: `src/services/worksheet.service.ts`
```typescript
import { db } from "@/lib/db";
import { Prisma, WorksheetStatus } from "@prisma/client";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import { NotFoundError, ForbiddenError } from "@/lib/utils/errors";
import type { WorksheetFilterInput, CreateWorksheetInput, UpdateWorksheetInput } from "@/lib/validators/worksheet";

export const publicWorksheetSelect = {
  id: true,
  title: true,
  titleAr: true,
  description: true,
  descriptionAr: true,
  categoryId: true,
  gradeId: true,
  subjectId: true,
  uploadedBy: true,
  fileUrl: true,
  fileName: true,
  fileSize: true,
  thumbnailUrl: true,
  pageCount: true,
  status: true,
  tags: true,
  downloadCount: true,
  favoriteCount: true,
  createdAt: true,
  updatedAt: true,
  category: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  grade: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      sortOrder: true,
    },
  },
  subject: {
    select: {
      id: true,
      name: true,
      nameAr: true,
      slug: true,
      color: true,
      icon: true,
      sortOrder: true,
    },
  },
  uploader: {
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      school: true,
    },
  },
} as const;

export async function listWorksheets(filters: WorksheetFilterInput) {
  const { page, limit, search, grade, subject, category, tags, sort, status } = filters;
  const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(page, limit);

  const where: Prisma.WorksheetWhereInput = {
    status: status ?? WorksheetStatus.PUBLISHED,
  };

  if (grade) {
    where.grade = { slug: grade };
  }

  if (subject) {
    where.subject = { slug: subject };
  }

  if (category) {
    where.category = { slug: category };
  }

  if (tags && tags.length > 0) {
    where.tags = { hasSome: tags };
  }

  if (search && search.trim().length > 0) {
    const term = search.trim();
    where.OR = [
      { title: { contains: term, mode: "insensitive" } },
      { titleAr: { contains: term, mode: "insensitive" } },
      { description: { contains: term, mode: "insensitive" } },
      { descriptionAr: { contains: term, mode: "insensitive" } },
      { tags: { has: term } },
    ];
  }

  const orderBy: Prisma.WorksheetOrderByWithRelationInput = (() => {
    switch (sort) {
      case "popular":
        return { favoriteCount: "desc" };
      case "downloads":
        return { downloadCount: "desc" };
      case "title":
        return { title: "asc" };
      case "newest":
      default:
        return { createdAt: "desc" };
    }
  })();

  const [total, worksheets] = await Promise.all([
    db.worksheet.count({ where }),
    db.worksheet.findMany({
      where,
      select: publicWorksheetSelect,
      orderBy,
      skip,
      take,
    }),
  ]);

  return {
    data: worksheets,
    meta: buildPaginationMeta(total, currentPage, currentLimit),
  };
}

export async function getWorksheetById(id: string) {
  const worksheet = await db.worksheet.findUnique({
    where: { id },
    select: publicWorksheetSelect,
  });

  if (!worksheet) {
    throw new NotFoundError("Worksheet");
  }

  return worksheet;
}

export interface CreateWorksheetData extends CreateWorksheetInput {
  uploadedBy: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl?: string;
  pageCount?: number;
}

export async function createWorksheet(data: CreateWorksheetData) {
  return db.worksheet.create({
    data: {
      title: data.title,
      titleAr: data.titleAr ?? null,
      description: data.description ?? null,
      descriptionAr: data.descriptionAr ?? null,
      categoryId: data.categoryId,
      gradeId: data.gradeId,
      subjectId: data.subjectId,
      uploadedBy: data.uploadedBy,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileSize: data.fileSize,
      thumbnailUrl: data.thumbnailUrl ?? null,
      pageCount: data.pageCount ?? null,
      tags: data.tags ?? [],
      status: WorksheetStatus.PUBLISHED,
    },
    select: publicWorksheetSelect,
  });
}

export async function updateWorksheet(
  id: string,
  userId: string,
  data: UpdateWorksheetInput,
  userRole?: string
) {
  const existing = await db.worksheet.findUnique({
    where: { id },
    select: { id: true, uploadedBy: true },
  });

  if (!existing) {
    throw new NotFoundError("Worksheet");
  }

  if (existing.uploadedBy !== userId && userRole !== "ADMIN") {
    throw new ForbiddenError("You can only edit your own worksheets");
  }

  return db.worksheet.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.titleAr !== undefined ? { titleAr: data.titleAr } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.descriptionAr !== undefined ? { descriptionAr: data.descriptionAr } : {}),
      ...(data.categoryId !== undefined ? { categoryId: data.categoryId } : {}),
      ...(data.gradeId !== undefined ? { gradeId: data.gradeId } : {}),
      ...(data.subjectId !== undefined ? { subjectId: data.subjectId } : {}),
      ...(data.tags !== undefined ? { tags: data.tags } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    },
    select: publicWorksheetSelect,
  });
}

export async function archiveWorksheet(
  id: string,
  userId: string,
  userRole?: string
) {
  const existing = await db.worksheet.findUnique({
    where: { id },
    select: { id: true, uploadedBy: true },
  });

  if (!existing) {
    throw new NotFoundError("Worksheet");
  }

  if (existing.uploadedBy !== userId && userRole !== "ADMIN") {
    throw new ForbiddenError("You can only archive your own worksheets");
  }

  await db.worksheet.update({
    where: { id },
    data: { status: WorksheetStatus.ARCHIVED },
  });

  return { success: true, archived: true, id };
}

export async function getUserUploads(userId: string, pageInput?: number, limitInput?: number) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const where: Prisma.WorksheetWhereInput = {
    uploadedBy: userId,
  };

  const [total, worksheets] = await Promise.all([
    db.worksheet.count({ where }),
    db.worksheet.findMany({
      where,
      select: publicWorksheetSelect,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    data: worksheets,
    meta: buildPaginationMeta(total, page, limit),
  };
}
```

### File: `src/services/storage.service.ts`
```typescript
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { FileTooLargeError, InvalidFileTypeError, AppError } from "@/lib/utils/errors";

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET ?? "worksheets";
const MAX_FILE_SIZE = (Number(process.env.MAX_FILE_SIZE_MB) || 20) * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf"];

interface UploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

export async function uploadFile(
  file: File,
  userId: string
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new InvalidFileTypeError(ALLOWED_TYPES);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new FileTooLargeError(Number(process.env.MAX_FILE_SIZE_MB) || 20);
  }

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${userId}/${timestamp}-${sanitizedName}`;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      contentType: file.type,
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
    throw new AppError("Failed to generate download URL", "DOWNLOAD_FAILED", 500);
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
```

### File: `src/services/favorite.service.ts`
```typescript
import { db } from "@/lib/db";
import { NotFoundError } from "@/lib/utils/errors";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import { publicWorksheetSelect } from "@/services/worksheet.service";

export interface ToggleFavoriteResult {
  isFavorited: boolean;
  favoriteCount: number;
}

export async function toggleFavorite(
  worksheetId: string,
  userId: string
): Promise<ToggleFavoriteResult> {
  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: { id: true, status: true },
  });

  if (!worksheet || worksheet.status === "ARCHIVED") {
    throw new NotFoundError("Worksheet");
  }

  return db.$transaction(async (tx) => {
    const existing = await tx.favorite.findUnique({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
    });

    if (existing) {
      await tx.favorite.delete({
        where: { id: existing.id },
      });

      const current = await tx.worksheet.findUnique({
        where: { id: worksheetId },
        select: { favoriteCount: true },
      });

      const currentCount = current?.favoriteCount ?? 0;
      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: currentCount > 0 ? { decrement: 1 } : 0,
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: false,
        favoriteCount: updated.favoriteCount,
      };
    } else {
      await tx.favorite.create({
        data: {
          userId,
          worksheetId,
        },
      });

      const updated = await tx.worksheet.update({
        where: { id: worksheetId },
        data: {
          favoriteCount: { increment: 1 },
        },
        select: { favoriteCount: true },
      });

      return {
        isFavorited: true,
        favoriteCount: updated.favoriteCount,
      };
    }
  });
}

export async function getUserFavorites(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const [total, favorites] = await Promise.all([
    db.favorite.count({ where: { userId } }),
    db.favorite.findMany({
      where: { userId },
      select: {
        id: true,
        createdAt: true,
        worksheet: {
          select: publicWorksheetSelect,
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    data: favorites.map((f) => f.worksheet),
    meta: buildPaginationMeta(total, page, limit),
  };
}
```

### File: `src/services/download.service.ts`
```typescript
import { db } from "@/lib/db";
import { SIGNED_URL_EXPIRY_SECONDS } from "@/config/constants";
import { getSignedDownloadUrl } from "@/services/storage.service";
import { NotFoundError } from "@/lib/utils/errors";
import { getPaginationParams, buildPaginationMeta } from "@/lib/utils/pagination";
import { publicWorksheetSelect } from "@/services/worksheet.service";

export interface DownloadUrlResult {
  downloadUrl: string;
  fileName: string;
  expiresIn: number;
}

export async function recordAndGetDownloadUrl(
  worksheetId: string,
  userId: string
): Promise<DownloadUrlResult> {
  const worksheet = await db.worksheet.findUnique({
    where: { id: worksheetId },
    select: {
      id: true,
      fileUrl: true,
      fileName: true,
      status: true,
    },
  });

  if (!worksheet || worksheet.status === "ARCHIVED") {
    throw new NotFoundError("Worksheet");
  }

  const now = new Date();
  await db.$transaction([
    db.download.upsert({
      where: {
        userId_worksheetId: {
          userId,
          worksheetId,
        },
      },
      create: {
        userId,
        worksheetId,
        downloadedAt: now,
      },
      update: {
        downloadedAt: now,
      },
    }),
    db.worksheet.update({
      where: { id: worksheetId },
      data: {
        downloadCount: { increment: 1 },
      },
    }),
  ]);

  const downloadUrl = await getSignedDownloadUrl(
    worksheet.fileUrl,
    SIGNED_URL_EXPIRY_SECONDS
  );

  return {
    downloadUrl,
    fileName: worksheet.fileName,
    expiresIn: SIGNED_URL_EXPIRY_SECONDS,
  };
}

export async function getUserDownloads(
  userId: string,
  pageInput?: number,
  limitInput?: number
) {
  const { skip, take, page, limit } = getPaginationParams(pageInput, limitInput);

  const [total, downloads] = await Promise.all([
    db.download.count({ where: { userId } }),
    db.download.findMany({
      where: { userId },
      select: {
        id: true,
        downloadedAt: true,
        worksheet: {
          select: publicWorksheetSelect,
        },
      },
      orderBy: { downloadedAt: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    data: downloads.map((record) => ({
      ...record.worksheet,
      downloadedAt: record.downloadedAt,
    })),
    meta: buildPaginationMeta(total, page, limit),
  };
}
```

### File: `src/middleware.ts`
```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### File: `src/app/api/auth/callback/route.ts`
```typescript
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}
```

### File: `src/app/api/auth/me/route.ts`
```typescript
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("Not authenticated");
    }

    const profile = await db.user.findUnique({
      where: { id: user.id },
      include: {
        _count: {
          select: {
            worksheets: true,
            favorites: true,
            downloads: true,
          },
        },
      },
    });

    return successResponse(profile);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/worksheets/route.ts`
```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { worksheetFilterSchema, createWorksheetSchema } from "@/lib/validators/worksheet";
import { listWorksheets, createWorksheet } from "@/services/worksheet.service";
import { uploadFile } from "@/services/storage.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const filters = worksheetFilterSchema.parse(searchParams);
    const result = await listWorksheets(filters);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const metadataRaw = formData.get("metadata") as string | null;

    if (!file) {
      return errorResponse(
        { message: "File is required", code: "MISSING_FILE", statusCode: 400 },
        400
      );
    }

    const metadata = createWorksheetSchema.parse(
      metadataRaw ? JSON.parse(metadataRaw) : {}
    );

    const uploadResult = await uploadFile(file, user.id);

    const worksheet = await createWorksheet({
      ...metadata,
      uploadedBy: user.id,
      fileUrl: uploadResult.fileUrl,
      fileName: uploadResult.fileName,
      fileSize: uploadResult.fileSize,
    });

    return successResponse(worksheet, undefined, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/worksheets/[id]/route.ts`
```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { updateWorksheetSchema } from "@/lib/validators/worksheet";
import {
  getWorksheetById,
  updateWorksheet,
  archiveWorksheet,
} from "@/services/worksheet.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const worksheet = await getWorksheetById(id);
    return successResponse(worksheet);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const body = await request.json();
    const validatedData = updateWorksheetSchema.parse(body);

    const updated = await updateWorksheet(
      id,
      user.id,
      validatedData,
      dbUser?.role
    );

    return successResponse(updated);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    const result = await archiveWorksheet(id, user.id, dbUser?.role);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/worksheets/[id]/download/route.ts`
```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { recordAndGetDownloadUrl } from "@/services/download.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("You must be logged in to download worksheets");
    }

    const result = await recordAndGetDownloadUrl(id, user.id);

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/worksheets/[id]/favorite/route.ts`
```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { uuidSchema } from "@/lib/validators/common";
import { toggleFavorite } from "@/services/favorite.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnauthorizedError } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    uuidSchema.parse(id);

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError("You must be logged in to favorite worksheets");
    }

    const result = await toggleFavorite(id, user.id);

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/grades/route.ts`
```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";

export async function GET() {
  try {
    const grades = await db.grade.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return successResponse(grades);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/subjects/route.ts`
```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";

export async function GET() {
  try {
    const subjects = await db.subject.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return successResponse(subjects);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/categories/route.ts`
```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/utils/api-response";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return successResponse(categories);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/me/favorites/route.ts`
```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserFavorites } from "@/services/favorite.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { paginationSchema } from "@/lib/validators/common";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new UnauthorizedError();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = paginationSchema.parse(searchParams);

    const result = await getUserFavorites(user.id, page, limit);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/me/downloads/route.ts`
```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserDownloads } from "@/services/download.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { paginationSchema } from "@/lib/validators/common";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new UnauthorizedError();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = paginationSchema.parse(searchParams);

    const result = await getUserDownloads(user.id, page, limit);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `src/app/api/me/uploads/route.ts`
```typescript
import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserUploads } from "@/services/worksheet.service";
import { successResponse, errorResponse } from "@/lib/utils/api-response";
import { paginationSchema } from "@/lib/validators/common";
import { UnauthorizedError } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new UnauthorizedError();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = paginationSchema.parse(searchParams);

    const result = await getUserUploads(user.id, page, limit);
    return successResponse(result.data, result.meta);
  } catch (error) {
    return errorResponse(error);
  }
}
```

### File: `prisma/schema.prisma`
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearchPostgres"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum Role {
  TEACHER
  ADMIN
}

enum WorksheetStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model User {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email     String   @unique @db.VarChar(255)
  name      String   @db.VarChar(255)
  avatarUrl String?  @map("avatar_url") @db.Text
  role      Role     @default(TEACHER)
  school    String?  @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()
  updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamptz()

  worksheets Worksheet[]
  downloads  Download[]
  favorites  Favorite[]

  @@map("users")
}

model Category {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String   @unique @db.VarChar(100)
  nameAr    String   @unique @map("name_ar") @db.VarChar(100)
  slug      String   @unique @db.VarChar(100)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  worksheets Worksheet[]

  @@map("categories")
}

model Grade {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String   @unique @db.VarChar(100)
  nameAr    String   @unique @map("name_ar") @db.VarChar(100)
  slug      String   @unique @db.VarChar(100)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  worksheets Worksheet[]

  @@map("grades")
}

model Subject {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String   @unique @db.VarChar(100)
  nameAr    String   @unique @map("name_ar") @db.VarChar(100)
  slug      String   @unique @db.VarChar(100)
  color     String?  @db.VarChar(7)
  icon      String?  @db.VarChar(50)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz()

  worksheets Worksheet[]

  @@map("subjects")
}

model Worksheet {
  id            String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title         String          @db.VarChar(255)
  titleAr       String?         @map("title_ar") @db.VarChar(255)
  description   String?         @db.Text
  descriptionAr String?         @map("description_ar") @db.Text
  categoryId    String          @map("category_id") @db.Uuid
  gradeId       String          @map("grade_id") @db.Uuid
  subjectId     String          @map("subject_id") @db.Uuid
  uploadedBy    String          @map("uploaded_by") @db.Uuid
  fileUrl       String          @map("file_url") @db.Text
  fileName      String          @map("file_name") @db.VarChar(255)
  fileSize      Int             @map("file_size")
  thumbnailUrl  String?         @map("thumbnail_url") @db.Text
  pageCount     Int?            @map("page_count")
  status        WorksheetStatus @default(DRAFT)
  tags          String[]        @default([])
  downloadCount Int             @default(0) @map("download_count")
  favoriteCount Int             @default(0) @map("favorite_count")
  createdAt     DateTime        @default(now()) @map("created_at") @db.Timestamptz()
  updatedAt     DateTime        @updatedAt @map("updated_at") @db.Timestamptz()

  category  Category   @relation(fields: [categoryId], references: [id])
  grade     Grade      @relation(fields: [gradeId], references: [id])
  subject   Subject    @relation(fields: [subjectId], references: [id])
  uploader  User       @relation(fields: [uploadedBy], references: [id])
  downloads Download[]
  favorites Favorite[]

  @@index([status])
  @@index([gradeId])
  @@index([subjectId])
  @@index([categoryId])
  @@index([uploadedBy])
  @@index([createdAt(sort: Desc)])
  @@index([gradeId, subjectId])
  @@map("worksheets")
}

model Download {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId       String   @map("user_id") @db.Uuid
  worksheetId  String   @map("worksheet_id") @db.Uuid
  downloadedAt DateTime @default(now()) @map("downloaded_at") @db.Timestamptz()

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  worksheet Worksheet @relation(fields: [worksheetId], references: [id], onDelete: Cascade)

  @@unique([userId, worksheetId])
  @@index([userId])
  @@map("downloads")
}

model Favorite {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId      String   @map("user_id") @db.Uuid
  worksheetId String   @map("worksheet_id") @db.Uuid
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz()

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  worksheet Worksheet @relation(fields: [worksheetId], references: [id], onDelete: Cascade)

  @@unique([userId, worksheetId])
  @@index([userId])
  @@map("favorites")
}
```

### File: `prisma/seed.ts`
```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const grades = [
    { name: "Grade 1", nameAr: "الصف الأول", slug: "grade-1", sortOrder: 1 },
    { name: "Grade 2", nameAr: "الصف الثاني", slug: "grade-2", sortOrder: 2 },
    { name: "Grade 3", nameAr: "الصف الثالث", slug: "grade-3", sortOrder: 3 },
    { name: "Grade 4", nameAr: "الصف الرابع", slug: "grade-4", sortOrder: 4 },
    { name: "Grade 5", nameAr: "الصف الخامس", slug: "grade-5", sortOrder: 5 },
    { name: "Grade 6", nameAr: "الصف السادس", slug: "grade-6", sortOrder: 6 },
  ];

  for (const grade of grades) {
    await prisma.grade.upsert({
      where: { slug: grade.slug },
      update: {},
      create: grade,
    });
  }
  console.log(`  ✅ ${grades.length} grades seeded`);

  const subjects = [
    { name: "Arabic", nameAr: "اللغة العربية", slug: "arabic", color: "#2563EB", icon: "book-open", sortOrder: 1 },
    { name: "Mathematics", nameAr: "الرياضيات", slug: "math", color: "#DC2626", icon: "calculator", sortOrder: 2 },
    { name: "Science", nameAr: "العلوم", slug: "science", color: "#16A34A", icon: "flask-conical", sortOrder: 3 },
    { name: "English", nameAr: "اللغة الإنجليزية", slug: "english", color: "#9333EA", icon: "languages", sortOrder: 4 },
    { name: "Islamic Studies", nameAr: "التربية الإسلامية", slug: "islamic-studies", color: "#0D9488", icon: "moon-star", sortOrder: 5 },
    { name: "Social Studies", nameAr: "الدراسات الاجتماعية", slug: "social-studies", color: "#EA580C", icon: "globe", sortOrder: 6 },
    { name: "Art", nameAr: "التربية الفنية", slug: "art", color: "#DB2777", icon: "palette", sortOrder: 7 },
    { name: "Physical Education", nameAr: "التربية البدنية", slug: "pe", color: "#65A30D", icon: "dumbbell", sortOrder: 8 },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: {},
      create: subject,
    });
  }
  console.log(`  ✅ ${subjects.length} subjects seeded`);

  const categories = [
    { name: "Worksheet", nameAr: "ورقة عمل", slug: "worksheet", sortOrder: 1 },
    { name: "Quiz", nameAr: "اختبار قصير", slug: "quiz", sortOrder: 2 },
    { name: "Activity", nameAr: "نشاط", slug: "activity", sortOrder: 3 },
    { name: "Coloring Page", nameAr: "صفحة تلوين", slug: "coloring", sortOrder: 4 },
    { name: "Flashcards", nameAr: "بطاقات تعليمية", slug: "flashcards", sortOrder: 5 },
    { name: "Game", nameAr: "لعبة تعليمية", slug: "game", sortOrder: 6 },
    { name: "Lesson Plan", nameAr: "خطة درس", slug: "lesson-plan", sortOrder: 7 },
    { name: "Exam", nameAr: "اختبار", slug: "exam", sortOrder: 8 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`  ✅ ${categories.length} categories seeded`);

  console.log("\n🎉 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### File: `supabase/sql/rls-policies.sql`
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role full access to users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Anyone can view published worksheets"
  ON worksheets FOR SELECT
  USING (status = 'PUBLISHED');

CREATE POLICY "Users can view own worksheets"
  ON worksheets FOR SELECT
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can create worksheets"
  ON worksheets FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update own worksheets"
  ON worksheets FOR UPDATE
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Service role full access to worksheets"
  ON worksheets FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Users can view own downloads"
  ON downloads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to downloads"
  ON downloads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to favorites"
  ON favorites FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view grades"
  ON grades FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view subjects"
  ON subjects FOR SELECT
  USING (true);

CREATE POLICY "Service role full access to categories"
  ON categories FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to grades"
  ON grades FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to subjects"
  ON subjects FOR ALL
  USING (auth.role() = 'service_role');
```

### File: `supabase/sql/triggers.sql`
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    'TEACHER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE TRIGGER set_updated_at_worksheets
  BEFORE UPDATE ON worksheets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
```

---

## 4. Known Issues / Missing Dependencies

1. **Uninstalled Node Packages (`node_modules`)**:
   - `npm install` has not yet been executed in the project directory. The root contains `package.json`, but no local `node_modules` exists yet.
   - Consequence: Until `npm install` is executed, local TypeScript compilation (`npx tsc --noEmit`) and Prisma client generation (`npx prisma generate`) cannot run locally.

2. **Generated Prisma Client Requirement**:
   - Files referencing `@prisma/client` (`src/lib/db.ts`, `src/services/worksheet.service.ts`, `src/lib/utils/api-response.ts`) require `npx prisma generate` to generate the custom schema client from `prisma/schema.prisma`.

3. **Frontend Packages Not Yet in `package.json` (Phase 2 Dependency)**:
   - `lucide-react` (for icons referenced in taxonomies and card UI).
   - `tailwindcss`, `postcss`, `autoprefixer` (or Tailwind CSS v4) required for Phase 2 styling.
   - `@pdf-lib` or `react-pdf` for in-browser PDF rendering if previews are rendered client-side.

4. **Direct Auth API Endpoints vs. Supabase Client**:
   - `src/app/api/auth/callback/route.ts` and `src/app/api/auth/me/route.ts` are implemented.
   - Dedicated REST endpoints for email/password sign-in and sign-up (`/api/auth/signin` and `/api/auth/signup`) are not created as separate route handlers because in Supabase SSR architecture, authentication is handled directly via `createSupabaseBrowserClient().auth.signInWithPassword()` / `signUp()` on the client side, while keeping cookies synchronized via `src/middleware.ts`.
