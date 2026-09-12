import {
  randomUUID,
  randomInt,
  randomBytes,
  createHmac,
  createCipheriv,
  createDecipheriv,
  timingSafeEqual,
} from "crypto";

/**
 * Vixify OTP core — code generation, hashing, message encryption, validation.
 *
 * Security model:
 * - Codes are generated with a CSPRNG (crypto.randomInt).
 * - Codes are stored as HMAC-SHA256 hashes (one-way) for verification.
 * - The full SMS message (containing the code) is stored AES-256-GCM
 *   encrypted so the operator's gateway can decrypt+send it, but the code
 *   is never stored or logged in plaintext at rest.
 * - The plaintext code is returned in the request-otp response ONLY when
 *   SANDBOX_MODE=true (dev-only, clearly labeled).
 */

// ---- Config (from env) ----
const OTP_HASH_SECRET = process.env.OTP_HASH_SECRET || "vixify_dev_hash_secret";
const MESSAGE_ENC_KEY = process.env.OTP_HASH_SECRET || "vixify_dev_hash_secret"; // reuse for dev; separate key in prod
export const SANDBOX_MODE = process.env.SANDBOX_MODE === "true";
export const GATEWAY_SECRET = process.env.GATEWAY_SECRET || "";
export const CODE_TTL_SECONDS = 120; // 2 minutes
export const RESEND_COOLDOWN_SECONDS = 60; // 60s between OTPs per phone
export const DAILY_LIMIT = 20; // max 20 requests/day per phone
export const MAX_VERIFY_ATTEMPTS = 5;

// Derive a 32-byte AES key from the secret (SHA-256 → 32 bytes)
const AES_KEY = createHmac("sha256", MESSAGE_ENC_KEY).update("vixify-aes-key").digest();

// ---- Phone validation (Iranian mobile 09xxxxxxxxx) ----
const PHONE_RE = /^09\d{9}$/;
const E164_RE = /^\+989\d{9}$/;

/** Validate + normalize. Accepts 09xxxxxxxxx or +989xxxxxxxxx → 09xxxxxxxxx. Returns null if invalid. */
export function normalizePhone(phone: string): string | null {
  const t = phone.trim().replace(/[\s\-()]/g, "");
  if (E164_RE.test(t)) return "0" + t.slice(3);
  if (PHONE_RE.test(t)) return t;
  return null;
}

// ---- Code generation ----
export function generateCode(): string {
  // crypto.randomInt is CSPRNG; range [0, 1_000_000) → pad to 6 digits
  const n = randomInt(0, 1_000_000);
  return n.toString().padStart(6, "0");
}

// ---- Hashing (HMAC-SHA256, one-way) ----
export function hashCode(code: string): string {
  return createHmac("sha256", OTP_HASH_SECRET).update(code).digest("hex");
}
export function verifyCodeHash(code: string, storedHash: string): boolean {
  const computed = Buffer.from(hashCode(code), "hex");
  const stored = Buffer.from(storedHash, "hex");
  if (computed.length !== stored.length) return false;
  return timingSafeEqual(computed, stored);
}

// ---- Message composition ----
export function composeMessage(code: string, brand = "Vixify"): string {
  return `Your ${brand} code is ${code} — Vixify`;
}

// ---- Message encryption (AES-256-GCM, reversible for gateway) ----
export function encryptMessage(message: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", AES_KEY, iv);
  const enc = Buffer.concat([cipher.update(message, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // format: base64(iv(12) + tag(16) + ciphertext)
  return Buffer.concat([iv, tag, enc]).toString("base64");
}
export function decryptMessage(encBase64: string): string {
  const buf = Buffer.from(encBase64, "base64");
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const enc = buf.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", AES_KEY, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return dec.toString("utf8");
}

// ---- Gateway auth ----
export function checkGatewaySecret(header: string | null): boolean {
  if (!header || !GATEWAY_SECRET) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(GATEWAY_SECRET);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// ---- ID generation ----
export function generateOtpId(): string {
  return `otp_${randomUUID()}`;
}

// ---- Time helpers ----
export function now(): Date {
  return new Date();
}
export function expiryFromNow(): Date {
  return new Date(Date.now() + CODE_TTL_SECONDS * 1000);
}
export function secondsUntil(date: Date | null): number {
  if (!date) return 0;
  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 1000));
}

// ---- Stable error codes (published in /docs) ----

export interface OtpError {
  code: string;
  message: string;
  httpStatus: number;
  details?: Record<string, number | string>;
}

export function jsonError(error: OtpError): Response {
  return Response.json(
    { code: error.code, message: error.message, ...error.details },
    { status: error.httpStatus }
  );
}

export function jsonOk(data: Record<string, unknown>): Response {
  return Response.json(data, { status: 200 });
}

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
    details: { limit: DAILY_LIMIT },
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
