export type Role =
  | "INSTITUTION"
  | "INSPECTOR"
  | "TEACHER"
  | "STUDENT"
  | "MODERATOR"
  | "ADMIN";

export type AccountRoleOption =
  | "INSTITUTION"
  | "INSPECTOR"
  | "TEACHER"
  | "STUDENT";

export type WorksheetStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type TargetAudience =
  | "ALL"
  | "SAME_ROLE_ONLY"
  | "TEACHERS_ONLY"
  | "TEACHERS_AND_STUDENTS"
  | "INSTITUTIONS_ONLY";

export type ProfileEditStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";
export type WorksheetSortOption =
  | "newest"
  | "oldest"
  | "popular"
  | "downloads"
  | "title";

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

export interface PendingProfileData {
  name?: string;
  username?: string;
  school?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  requestedAt?: string;
}

export interface User {
  id: string;
  email: string;
  username?: string | null;
  name: string;
  avatarUrl: string | null;
  role: Role;
  school: string | null;
  studentGrade?: string | null;
  bio?: string | null;
  subscriptionPlan?: string;
  profileEditStatus?: ProfileEditStatus;
  pendingProfileData?: PendingProfileData | null;
  followersCount?: number;
  favoritedByCount?: number;
  isVerified?: boolean;
  inspectorPending?: boolean;
  inspectorCode?: string | null;
  isBanned?: boolean;
  banReason?: string | null;
  failedLoginAttempts?: number;
  lockedAt?: string | Date | null;
  lockReason?: string | null;
  presenceStatus?: "ONLINE" | "OFFLINE" | "GHOST" | string;
  lastSeenAt?: string | Date | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  sortOrder: number;
  createdAt?: string;
}

export interface Grade {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  sortOrder: number;
  createdAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  color?: string | null;
  icon?: string | null;
  sortOrder: number;
  createdAt?: string;
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
  audience: TargetAudience;
  isEndorsed: boolean;
  endorsedById: string | null;
  endorsedAt: string | Date | null;
  tags: string[];
  downloadCount: number;
  favoriteCount: number;
  ratingAvg: number;
  reviewCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface WorksheetWithRelations extends Worksheet {
  previewUrl?: string | null;
  category: Category;
  grade: Grade;
  subject: Subject;
  uploader: {
    id: string;
    name: string;
    username?: string | null;
    avatarUrl: string | null;
    school: string | null;
    role: Role;
    bio?: string | null;
    followersCount?: number;
    favoritedByCount?: number;
    isVerified?: boolean;
    isBanned?: boolean;
    presenceStatus?: string;
    lastSeenAt?: string | Date | null;
  };
  endorsedBy?: {
    id: string;
    name: string;
    username?: string | null;
    role: Role;
    school?: string | null;
  } | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  isOfficialDirective?: boolean;
  isPrivateToPublisher?: boolean;
  userId: string;
  worksheetId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    username?: string | null;
    avatarUrl: string | null;
    school: string | null;
    role?: Role;
    isVerified?: boolean;
    presenceStatus?: string;
    lastSeenAt?: string | Date | null;
  };
}

export interface VerificationCodeItem {
  id: string;
  code: string;
  targetRole: Role;
  note: string | null;
  isUsed: boolean;
  usedById: string | null;
  usedAt: string | null;
  createdById: string;
  createdAt: string;
  createdBy?: { id: string; name: string; username?: string | null };
  usedBy?: {
    id: string;
    name: string;
    username?: string | null;
    email: string;
    role: Role;
  } | null;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  actorId: string | null;
  actorName: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string | null;
  details: string | null;
  ipAddress: string | null;
  createdAt: string | Date;
}

export interface SchoolTrimester {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  tag: string;
  sortOrder: number;
}

