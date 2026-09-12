/**
 * Vixify OTP core — crypto, validation, rate-limit config.
 *
 * Security rules enforced here:
 * - Codes generated with crypto.randomInt (CSPRNG), never Math.random.
 * - Codes stored as HMAC-SHA256(code) using OTP_HASH_SECRET — never plaintext.
 * - Codes never appear in logs (db.ts query logging only sees the hash).
 * - In production (SANDBOX_MODE=false) the code is never returned in any API response.
 */

import crypto from "crypto";

// ---- Config ----

export const CONFIG = {
  sandbox: process.env.SANDBOX_MODE === "true",
  hashSecret:
    process.env.OTP_HASH_SECRET ??
    "vixify_INSECURE_default_hash_secret_SET_OTP_HASH_SECRET",
  gatewaySecret:
    process.env.GATEWAY_SECRET ??
    "vixify_INSECURE_default_gateway_secret_SET_GATEWAY_SECRET",
  codeLength: 6,
  expirySeconds: 120, // 2 minutes
  resendCooldownSeconds: 60, // 60s between OTPs per phone
  dailyLimitPerPhone: 20, // 20 OTPs / day per phone
  maxVerifyAttempts: 5, // then block the code
} as const;

// ---- Phone ----

const IRANIAN_MOBILE_RE = /^09\d{9}$/; // 09xxxxxxxxx (11 digits)
const E164_IRANIAN_RE = /^\+989\d{9}$/; // +989xxxxxxxxx

/**
 * Normalize and validate an Iranian mobile number.
 * Accepts 09xxxxxxxxx or +989xxxxxxxxx, normalizes to 09xxxxxxxxx.
 * Returns null if invalid.
 */
export function normalizePhone(input: string): string | null {
  const trimmed = input.trim().replace(/[\s\-()]/g, "");
  if (E164_IRANIAN_RE.test(trimmed)) {
    return "0" + trimmed.slice(3); // +989... → 09...
  }
  if (IRANIAN_MOBILE_RE.test(trimmed)) {
    return trimmed;
  }
  return null;
}

// ---- Code generation + hashing ----

/** Generate a cryptographically secure 6-digit code, zero-padded. */
export function generateCode(): string {
  const n = crypto.randomInt(0, 1_000_000);
  return String(n).padStart(CONFIG.codeLength, "0");
}

/** HMAC-SHA256 the code with the server secret. Constant comparison via verifyCode. */
export function hashCode(code: string): string {
  return crypto
    .createHmac("sha256", CONFIG.hashSecret)
    .update(code)
    .digest("hex");
}

/** Constant-time comparison of a plaintext code against a stored hash. */
export function verifyCode(code: string, storedHash: string): boolean {
  const candidate = hashCode(code);
  const a = Buffer.from(candidate, "hex");
  const b = Buffer.from(storedHash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// ---- Gateway auth ----

export function checkGatewaySecret(header: string | null): boolean {
  if (!header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(CONFIG.gatewaySecret);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// ---- SMS message builder ----

/**
 * Build the SMS message body. In the hosted verify flow the brand is "Vixify".
 * Plan-gated branding comes later with the auth/billing stage.
 */
export function buildSmsMessage(code: string, brand = "Vixify"): string {
  return `Your ${brand} code is ${code} — Vixify`;
}

// ---- Response helpers ----

export interface OtpError {
  code: string;
  message: string;
  httpStatus: number;
  details?: Record<string, number | string>;
}

export function jsonError(error: OtpError) {
  return Response.json(
    { code: error.code, message: error.message, ...error.details },
    { status: error.httpStatus }
  );
}

export function jsonOk(data: Record<string, unknown>) {
  return Response.json(data, { status: 200 });
}

// ---- Stable error codes (published in /docs) ----

export const ERRORS = {
  INVALID_PHONE: (msg = "Invalid phone number. Use 09xxxxxxxxx format."): OtpError => ({
    code: "INVALID_PHONE",
    message: msg,
    httpStatus: 422,
  }),
  RATE_LIMITED_COOLDOWN: (retryAfterSeconds: number): OtpError => ({
    code: "RATE_LIMITED_COOLDOWN",
    message: "Please wait before requesting another code.",
    httpStatus: 429,
    details: { retry_after_seconds: retryAfterSeconds },
  }),
  RATE_LIMITED_DAILY: (): OtpError => ({
    code: "RATE_LIMITED_DAILY",
    message: "Daily OTP limit reached for this phone number.",
    httpStatus: 429,
    details: { limit: CONFIG.dailyLimitPerPhone },
  }),
  OTP_EXPIRED: (): OtpError => ({
    code: "OTP_EXPIRED",
    message: "The code has expired. Please request a new one.",
    httpStatus: 422,
  }),
  OTP_ALREADY_USED: (): OtpError => ({
    code: "OTP_ALREADY_USED",
    message: "This code has already been used.",
    httpStatus: 422,
  }),
  NO_ACTIVE_OTP: (): OtpError => ({
    code: "NO_ACTIVE_OTP",
    message: "No active code found for this phone number.",
    httpStatus: 404,
  }),
  OTP_BLOCKED: (): OtpError => ({
    code: "OTP_BLOCKED",
    message: "Too many wrong attempts. Please request a new code.",
    httpStatus: 422,
  }),
  INVALID_OTP: (remaining: number): OtpError => ({
    code: "INVALID_OTP",
    message: "The code you entered is incorrect.",
    httpStatus: 422,
    details: { remaining_attempts: remaining },
  }),
  GATEWAY_UNAUTHORIZED: (): OtpError => ({
    code: "GATEWAY_UNAUTHORIZED",
    message: "Missing or invalid gateway secret.",
    httpStatus: 401,
  }),
  NO_PENDING_OTP: (): OtpError => ({
    code: "NO_PENDING_OTP",
    message: "No pending OTPs to send.",
    httpStatus: 404,
  }),
  OTP_NOT_FOUND: (): OtpError => ({
    code: "OTP_NOT_FOUND",
    message: "OTP not found.",
    httpStatus: 404,
  }),
  ALREADY_SENT: (): OtpError => ({
    code: "ALREADY_SENT",
    message: "This OTP has already been marked as sent.",
    httpStatus: 409,
  }),
} as const;
