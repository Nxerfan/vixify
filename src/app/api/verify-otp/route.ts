import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ERRORS,
  MAX_VERIFY_ATTEMPTS,
  jsonError,
  jsonOk,
  normalizePhone,
  verifyCodeHash,
} from "@/lib/otp";

/**
 * POST /api/verify-otp
 *
 * Verifies the code the user entered against the stored hash for the phone.
 * Max 5 wrong attempts per code, then the code is blocked.
 *
 * Body: { phone: string, code: string }
 */
export async function POST(request: NextRequest) {
  let body: { phone?: string; code?: string };
  try {
    body = await request.json();
  } catch {
    return jsonError(ERRORS.INVALID_PHONE("Invalid JSON body."));
  }

  const phone = normalizePhone(body.phone ?? "");
  if (!phone) {
    return jsonError(ERRORS.INVALID_PHONE());
  }

  const code = (body.code ?? "").trim();
  if (!/^\d{6}$/.test(code)) {
    return jsonError(ERRORS.INVALID_OTP(0));
  }

  // Fetch the most recent OTP for this phone.
  const otp = await db.otpRequest.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) {
    return jsonError(ERRORS.NO_ACTIVE_OTP());
  }

  const now = new Date();

  // Already verified → already-used.
  if (otp.status === "verified") {
    return jsonError(ERRORS.OTP_ALREADY_USED());
  }

  // Blocked after too many wrong attempts.
  if (otp.status === "blocked") {
    return jsonError(ERRORS.OTP_BLOCKED());
  }

  // Expired.
  if (otp.status === "expired" || now > otp.expiresAt) {
    if (otp.status !== "expired") {
      await db.otpRequest.update({
        where: { id: otp.id },
        data: { status: "expired" },
      });
    }
    return jsonError(ERRORS.OTP_EXPIRED());
  }

  // Only pending/sent are verifiable.
  if (otp.status !== "pending" && otp.status !== "sent") {
    return jsonError(ERRORS.NO_ACTIVE_OTP());
  }

  // Check the code (constant-time).
  const matched = verifyCodeHash(code, otp.codeHash);

  if (matched) {
    await db.otpRequest.update({
      where: { id: otp.id },
      data: { status: "verified", verifiedAt: now },
    });
    return jsonOk({
      verified: true,
      verified_at: now.toISOString(),
    });
  }

  // Wrong code — increment attempts, block if exceeded.
  const nextAttempts = otp.attempts + 1;
  const remaining = Math.max(0, MAX_VERIFY_ATTEMPTS - nextAttempts);

  if (nextAttempts >= MAX_VERIFY_ATTEMPTS) {
    await db.otpRequest.update({
      where: { id: otp.id },
      data: { status: "blocked", attempts: nextAttempts },
    });
    return jsonError(ERRORS.OTP_BLOCKED());
  }

  await db.otpRequest.update({
    where: { id: otp.id },
    data: { attempts: nextAttempts },
  });

  return jsonError(ERRORS.INVALID_OTP(remaining));
}
