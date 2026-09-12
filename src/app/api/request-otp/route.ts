import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  CODE_TTL_SECONDS,
  DAILY_LIMIT,
  ERRORS,
  RESEND_COOLDOWN_SECONDS,
  SANDBOX_MODE,
  composeMessage,
  encryptMessage,
  generateCode,
  generateOtpId,
  hashCode,
  jsonError,
  jsonOk,
  normalizePhone,
} from "@/lib/otp";

/**
 * POST /api/request-otp
 *
 * Generates a 6-digit code for an Iranian mobile number, stores it hashed
 * (codeHash) + the SMS message encrypted (messageEnc) with status `pending`,
 * and returns success. Delivery is asynchronous via the gateway.
 *
 * Rate limits (per phone):
 *   - 60s resend cooldown
 *   - 20 requests / day
 *
 * Body: { phone: string, brand?: string }
 */
export async function POST(request: NextRequest) {
  let body: { phone?: string; brand?: string };
  try {
    body = await request.json();
  } catch {
    return jsonError(ERRORS.INVALID_PHONE("Invalid JSON body."));
  }

  const phone = normalizePhone(body.phone ?? "");
  if (!phone) {
    return jsonError(ERRORS.INVALID_PHONE());
  }

  const brand = body.brand ?? "Vixify";
  const now = new Date();

  // ---- Rate limit: 60s resend cooldown (most recent OTP for this phone) ----
  const recent = await db.otpRequest.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  if (recent) {
    const elapsedSec = Math.floor((now.getTime() - recent.createdAt.getTime()) / 1000);
    if (elapsedSec < RESEND_COOLDOWN_SECONDS) {
      return jsonError(
        ERRORS.RATE_LIMITED_COOLDOWN(RESEND_COOLDOWN_SECONDS - elapsedSec)
      );
    }
  }

  // ---- Rate limit: 20 / day per phone ----
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const todayCount = await db.otpRequest.count({
    where: { phone, createdAt: { gte: dayAgo } },
  });
  if (todayCount >= DAILY_LIMIT) {
    return jsonError(ERRORS.RATE_LIMITED_DAILY());
  }

  // ---- Generate + store ----
  const code = generateCode();
  const codeHash = hashCode(code);
  const message = composeMessage(code, brand);
  const messageEnc = encryptMessage(message);
  const expiresAt = new Date(now.getTime() + CODE_TTL_SECONDS * 1000);

  const otp = await db.otpRequest.create({
    data: {
      id: generateOtpId(),
      phone,
      codeHash,
      messageEnc,
      status: "pending",
      expiresAt,
      sandbox: SANDBOX_MODE,
    },
    select: { id: true, expiresAt: true, createdAt: true },
  });

  // ---- Build response ----
  const expiresInSeconds = Math.max(
    0,
    Math.floor((otp.expiresAt.getTime() - now.getTime()) / 1000)
  );
  const resendAvailableInSeconds = Math.max(
    0,
    RESEND_COOLDOWN_SECONDS -
      Math.floor((now.getTime() - otp.createdAt.getTime()) / 1000)
  );

  const response: Record<string, unknown> = {
    id: otp.id,
    status: "pending",
    expires_in_seconds: expiresInSeconds,
    resend_available_in_seconds: resendAvailableInSeconds,
  };

  // Sandbox: expose the code via the labeled dev path so the flow is testable
  // without a real SIM gateway. Production never returns the code.
  if (SANDBOX_MODE) {
    response.code = code;
    response.sandbox = true;
  }

  return jsonOk(response);
}
