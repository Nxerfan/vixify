import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ERRORS,
  decryptMessage,
  checkGatewaySecret,
  jsonError,
  jsonOk,
} from "@/lib/otp";

/**
 * GET /api/v1/get-pending-sms
 *
 * Operator-only. Returns the oldest unclaimed pending OTP (phone + decrypted
 * message text) and atomically marks it as claimed so it is never handed out
 * twice. The gateway phone then sends the SMS and calls /api/v1/confirm-sent.
 *
 * Header: x-gateway-secret: <GATEWAY_SECRET>
 */
export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-gateway-secret");
  if (!checkGatewaySecret(secret)) {
    return jsonError(ERRORS.GATEWAY_UNAUTHORIZED());
  }

  // Find the oldest pending OTP that has not been claimed yet.
  const pending = await db.otpRequest.findFirst({
    where: { status: "pending", claimedAt: null },
    orderBy: { createdAt: "asc" },
    select: { id: true, phone: true, messageEnc: true, expiresAt: true },
  });

  if (!pending) {
    return jsonError(ERRORS.NO_PENDING_OTP());
  }

  // Mark as claimed so a duplicate poll doesn't hand it out twice.
  await db.otpRequest.update({
    where: { id: pending.id },
    data: { claimedAt: new Date() },
  });

  // Decrypt the message text (contains the code) for the gateway to send.
  const message = decryptMessage(pending.messageEnc);

  return jsonOk({
    id: pending.id,
    phone: pending.phone,
    message,
    expires_at: pending.expiresAt.toISOString(),
  });
}
