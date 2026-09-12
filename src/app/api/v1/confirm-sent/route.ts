import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ERRORS,
  checkGatewaySecret,
  jsonError,
  jsonOk,
} from "@/lib/otp";

/**
 * POST /api/v1/confirm-sent
 *
 * Operator-only. Marks a claimed OTP as `sent` after the gateway phone has
 * dispatched the SMS. Triggers the otp.sent webhook (webhook delivery comes
 * with the dashboard/backend stage).
 *
 * Header: x-gateway-secret: <GATEWAY_SECRET>
 * Body: { id: string }
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-gateway-secret");
  if (!checkGatewaySecret(secret)) {
    return jsonError(ERRORS.GATEWAY_UNAUTHORIZED());
  }

  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return jsonError(ERRORS.OTP_NOT_FOUND());
  }

  const id = body.id;
  if (!id) {
    return jsonError(ERRORS.OTP_NOT_FOUND());
  }

  const otp = await db.otpRequest.findUnique({
    where: { id },
    select: { id: true, status: true },
  });

  if (!otp) {
    return jsonError(ERRORS.OTP_NOT_FOUND());
  }

  if (otp.status === "sent") {
    return jsonError(ERRORS.ALREADY_SENT());
  }

  await db.otpRequest.update({
    where: { id: otp.id },
    data: { status: "sent", sentAt: new Date() },
  });

  return jsonOk({ id: otp.id, status: "sent" });
}
