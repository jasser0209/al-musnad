/**
 * Custom Error Classes for Teacher's Activity Bank
 *
 * Provides strongly-typed application errors with HTTP status codes,
 * machine-readable codes, and optional error details.
 */

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
