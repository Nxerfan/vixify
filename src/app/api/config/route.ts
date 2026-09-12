import { NextResponse } from "next/server";
import { SANDBOX_MODE, CODE_TTL_SECONDS, RESEND_COOLDOWN_SECONDS, MAX_VERIFY_ATTEMPTS, DAILY_LIMIT } from "@/lib/otp";

export const runtime = "nodejs";

/** Public config for the hosted /verify page. No secrets. */
export async function GET() {
  return NextResponse.json({
    sandbox: SANDBOX_MODE,
    code_ttl_seconds: CODE_TTL_SECONDS,
    resend_cooldown_seconds: RESEND_COOLDOWN_SECONDS,
    max_attempts: MAX_VERIFY_ATTEMPTS,
    daily_limit: DAILY_LIMIT,
  });
}
