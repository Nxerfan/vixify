"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/locale-context";
import { VixifyMark } from "@/components/brand/vixify-logo";
import { cn } from "@/lib/utils";

type Phase = "phone" | "code" | "success";
type Status = "idle" | "loading" | "error" | "ok";

interface ApiError {
  code: string;
  message: string;
  retry_after_seconds?: number;
  remaining_attempts?: number;
  limit?: number;
}

export default function VerifyPage() {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const params = useSearchParams();

  const [phase, setPhase] = useState<Phase>("phone");
  const [phone, setPhone] = useState(""); // 9 digits after 09
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [sandboxCode, setSandboxCode] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number>(0);
  const [resendIn, setResendIn] = useState<number>(0);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Deep link: /verify?phone=09121234567 — one-time read from URL params.
  useEffect(() => {
    const p = params.get("phone");
    if (p) {
      const normalized = p.replace(/\D/g, "");
      if (normalized.startsWith("09") && normalized.length === 11) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPhone(normalized.slice(2));
      } else if (normalized.startsWith("989") && normalized.length === 12) {
        setPhone(normalized.slice(3));
      }
    }
  }, [params]);

  // Countdown timers
  useEffect(() => {
    if (expiresIn <= 0 && resendIn <= 0) return;
    const interval = setInterval(() => {
      setExpiresIn((s) => (s > 0 ? s - 1 : 0));
      setResendIn((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresIn, resendIn]);

  const fullPhone = `09${phone}`;
  const phoneValid = /^\d{9}$/.test(phone);

  const mapError = useCallback(
    (err: ApiError): string => {
      const seconds = err.retry_after_seconds;
      const remaining = err.remaining_attempts;
      switch (err.code) {
        case "INVALID_PHONE":
          return t("verify.error.INVALID_PHONE");
        case "RATE_LIMITED_COOLDOWN":
          return t("verify.error.RATE_LIMITED_COOLDOWN").replace(
            "{seconds}",
            String(seconds ?? 0)
          );
        case "RATE_LIMITED_DAILY":
          return t("verify.error.RATE_LIMITED_DAILY");
        case "OTP_EXPIRED":
          return t("verify.error.OTP_EXPIRED");
        case "OTP_ALREADY_USED":
          return t("verify.error.OTP_ALREADY_USED");
        case "NO_ACTIVE_OTP":
          return t("verify.error.NO_ACTIVE_OTP");
        case "OTP_BLOCKED":
          return t("verify.error.OTP_BLOCKED");
        case "INVALID_OTP":
          return t("verify.error.INVALID_OTP").replace(
            "{remaining}",
            String(remaining ?? 0)
          );
        default:
          return t("verify.error.GENERIC");
      }
    },
    [t]
  );

  // ---- Request OTP ----
  const handleRequest = useCallback(async () => {
    if (!phoneValid) {
      setError(t("verify.phone.invalid"));
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    setSandboxCode(null);
    try {
      const res = await fetch("/api/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(mapError(data as ApiError));
        setStatus("error");
        return;
      }
      setExpiresIn(data.expires_in_seconds ?? 120);
      setResendIn(data.resend_available_in_seconds ?? 60);
      if (data.sandbox && data.code) {
        setSandboxCode(data.code);
      }
      setCode(["", "", "", "", "", ""]);
      setPhase("code");
      setStatus("idle");
      setTimeout(() => codeRefs.current[0]?.focus(), 100);
    } catch {
      setError(t("verify.error.GENERIC"));
      setStatus("error");
    }
  }, [phoneValid, fullPhone, mapError, t]);

  // ---- Verify OTP ----
  const handleVerify = useCallback(async () => {
    const entered = code.join("");
    if (!/^\d{6}$/.test(entered)) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, code: entered }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(mapError(data as ApiError));
        setStatus("error");
        setCode(["", "", "", "", "", ""]);
        setTimeout(() => codeRefs.current[0]?.focus(), 100);
        return;
      }
      setPhase("success");
      setStatus("ok");
    } catch {
      setError(t("verify.error.GENERIC"));
      setStatus("error");
    }
  }, [code, fullPhone, mapError, t]);

  // ---- Resend ----
  const handleResend = useCallback(async () => {
    if (resendIn > 0) return;
    setStatus("loading");
    setError("");
    setSandboxCode(null);
    try {
      const res = await fetch("/api/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(mapError(data as ApiError));
        setStatus("error");
        return;
      }
      setExpiresIn(data.expires_in_seconds ?? 120);
      setResendIn(data.resend_available_in_seconds ?? 60);
      if (data.sandbox && data.code) setSandboxCode(data.code);
      setCode(["", "", "", "", "", ""]);
      setStatus("idle");
      setTimeout(() => codeRefs.current[0]?.focus(), 100);
    } catch {
      setError(t("verify.error.GENERIC"));
      setStatus("error");
    }
  }, [resendIn, fullPhone, mapError, t]);

  // ---- Code input handlers ----
  const handleCodeChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = digit;
    setCode(next);
    setError("");
    setStatus("idle");
    if (digit && i < 5) codeRefs.current[i + 1]?.focus();
    // auto-submit when all 6 filled
    if (digit && i === 5 && next.every((d) => d !== "")) {
      setTimeout(() => {
        setCode(next);
        // trigger verify with the complete code
        verifyWithCode(next.join(""));
      }, 50);
    }
  };

  const verifyWithCode = useCallback(
    async (entered: string) => {
      if (!/^\d{6}$/.test(entered)) return;
      setStatus("loading");
      setError("");
      try {
        const res = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhone, code: entered }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(mapError(data as ApiError));
          setStatus("error");
          setCode(["", "", "", "", "", ""]);
          setTimeout(() => codeRefs.current[0]?.focus(), 100);
          return;
        }
        setPhase("success");
        setStatus("ok");
      } catch {
        setError(t("verify.error.GENERIC"));
        setStatus("error");
      }
    },
    [fullPhone, mapError, t]
  );

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      codeRefs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) codeRefs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) codeRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      const next = ["", "", "", "", "", ""];
      for (let i = 0; i < pasted.length && i < 6; i++) next[i] = pasted[i];
      setCode(next);
      if (pasted.length === 6) verifyWithCode(pasted);
      else codeRefs.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 30%, color-mix(in oklch, var(--gold) 10%, transparent) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-xl sm:p-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <VixifyMark size={48} />
            <span className="kicker mt-3">{t("verify.page.kicker")}</span>
          </div>

          {/* Sandbox banner */}
          <div
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400"
            role="status"
          >
            <AlertCircle className="h-3.5 w-3.5" strokeWidth={2} />
            {t("verify.sandbox.banner")}
          </div>

          <AnimatePresence mode="wait">
            {phase === "phone" && (
              <motion.div
                key="phone"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <h1
                  className="text-center text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t("verify.page.title")}
                </h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {t("verify.page.subtitle")}
                </p>

                <div className="mt-6">
                  <label
                    htmlFor="phone-input"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    {t("verify.phone.label")}
                  </label>
                  <div className="flex items-stretch gap-2">
                    <span className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background/50 px-4 font-mono text-lg font-semibold text-muted-foreground">
                      {t("verify.phone.prefix")}
                    </span>
                    <input
                      id="phone-input"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 9);
                        setPhone(val);
                        setError("");
                        setStatus("idle");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && phoneValid) handleRequest();
                      }}
                      placeholder={t("verify.phone.placeholder")}
                      aria-invalid={status === "error"}
                      aria-describedby="phone-preview phone-error"
                      className="min-h-11 w-full rounded-xl border border-border bg-background px-4 font-mono text-lg text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    />
                  </div>
                  {phone && (
                    <p
                      id="phone-preview"
                      className="mt-2 font-mono text-xs text-muted-foreground"
                      dir="ltr"
                    >
                      {t("verify.phone.preview")}: <span className="text-gold">{fullPhone}</span>
                    </p>
                  )}
                </div>

                <div
                  id="phone-error"
                  role="alert"
                  aria-live="polite"
                  className="mt-3 min-h-5"
                >
                  {status === "error" && error && (
                    <p className="flex items-center gap-1.5 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2} />
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleRequest}
                  disabled={!phoneValid || status === "loading"}
                  className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                      {t("verify.requesting")}
                    </>
                  ) : (
                    <>
                      {t("verify.page.kicker")}
                      {locale === "fa" ? (
                        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                      ) : (
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      )}
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {phase === "code" && (
              <motion.div
                key="code"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <h1
                  className="text-center text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t("verify.code.title")}
                </h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {t("verify.code.subtitle")}{" "}
                  <span className="font-mono text-gold" dir="ltr">
                    {fullPhone}
                  </span>
                </p>

                {/* Sandbox code display */}
                {sandboxCode && (
                  <div
                    className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-center"
                    role="status"
                  >
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      {t("verify.sandbox.note")}
                    </p>
                    <p
                      className="mt-1 font-mono text-2xl font-bold tracking-[0.3em] text-amber-600 dark:text-amber-400"
                      dir="ltr"
                    >
                      {sandboxCode}
                    </p>
                  </div>
                )}

                {/* Code input slots */}
                <div className="mt-6 flex justify-center gap-2" dir="ltr">
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        codeRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      aria-label={`${t("verify.code.label")} ${i + 1}`}
                      className="h-14 w-12 rounded-xl border border-border bg-background text-center font-mono text-2xl font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-16 sm:w-14"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    />
                  ))}
                </div>

                {/* Countdowns */}
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span
                    className={cn(
                      "font-mono",
                      expiresIn <= 30 ? "text-destructive" : "text-muted-foreground"
                    )}
                  >
                    {t("verify.code.expiresIn").replace("{seconds}", String(expiresIn))}
                  </span>
                  {resendIn > 0 ? (
                    <span className="font-mono text-muted-foreground">
                      {t("verify.code.resendIn").replace("{seconds}", String(resendIn))}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={status === "loading"}
                      className="inline-flex items-center gap-1 font-medium text-gold hover:underline disabled:opacity-50"
                    >
                      <RefreshCw className="h-3 w-3" strokeWidth={2} />
                      {t("verify.code.resend")}
                    </button>
                  )}
                </div>

                {/* Error */}
                <div role="alert" aria-live="polite" className="mt-3 min-h-5">
                  {status === "error" && error && (
                    <p className="flex items-center gap-1.5 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2} />
                      {error}
                    </p>
                  )}
                </div>

                {/* Verify button */}
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={code.some((d) => !d) || status === "loading"}
                  className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                      {t("verify.submitting")}
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                      {t("verify.submit")}
                    </>
                  )}
                </button>

                {/* Change number */}
                <button
                  type="button"
                  onClick={() => {
                    setPhase("phone");
                    setStatus("idle");
                    setError("");
                    setCode(["", "", "", "", "", ""]);
                  }}
                  className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  {t("verify.code.changeNumber")}
                </button>
              </motion.div>
            )}

            {phase === "success" && (
              <motion.div
                key="success"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={reduceMotion ? { opacity: 0 } : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gold"
                >
                  <Check className="h-10 w-10 text-gold-foreground" strokeWidth={3} />
                </motion.div>
                <h1
                  className="mt-5 text-2xl font-semibold tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t("verify.success.title")}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("verify.success.desc")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPhase("phone");
                    setPhone("");
                    setCode(["", "", "", "", "", ""]);
                    setStatus("idle");
                    setError("");
                    setSandboxCode(null);
                  }}
                  className="mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-gold/40 hover:text-gold"
                >
                  <RefreshCw className="h-4 w-4" strokeWidth={2} />
                  {t("verify.success.again")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Managed service note */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {t("footer.tagline")}
        </p>
      </motion.div>
    </div>
  );
}
