"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-context";

interface VixifyLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  withDodge?: boolean;
  style?: CSSProperties;
}

/**
 * Vixify logo — the "verified V" mark + wordmark.
 *
 * The mark is a geometric V whose right arm sweeps up into a checkmark tail,
 * seated in a rounded badge. When `withDodge` is set, the mark translates
 * away from the cursor with a spring, then settles back — playful but
 * professional. Fully respects prefers-reduced-motion.
 */
export function VixifyLogo({
  className,
  showWordmark = true,
  size = 36,
  withDodge = true,
  style,
}: VixifyLogoProps) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!withDodge || reduceMotion) return;
    const el = wrapRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 140;
      if (dist < radius) {
        // push away from cursor, stronger when closer
        const force = (1 - dist / radius) * 14;
        const angle = Math.atan2(dy, dx);
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [withDodge, reduceMotion, x, y]);

  return (
    <span
      ref={wrapRef}
      className={cn("inline-flex items-center gap-2.5", className)}
      style={style}
    >
      <motion.span
        style={{ x: sx, y: sy, display: "inline-flex" }}
        aria-hidden={false}
      >
        <VixifyMark size={size} />
      </motion.span>
      {showWordmark && (
        <span
          className="font-semibold tracking-tight text-[1.05rem] leading-none"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {t("meta.name")}
        </span>
      )}
    </span>
  );
}

/**
 * The standalone verified-V mark. A rounded badge with a V that
 * doubles as a checkmark — drawn as one continuous gold stroke.
 */
export function VixifyMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Vixify"
    >
      <defs>
        <linearGradient id="vixGold" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE89A" />
          <stop offset="0.5" stopColor="#FFDD6F" />
          <stop offset="1" stopColor="#E8B83C" />
        </linearGradient>
      </defs>
      {/* badge */}
      <rect
        x="2.5"
        y="2.5"
        width="35"
        height="35"
        rx="11"
        stroke="url(#vixGold)"
        strokeWidth="1.6"
        fill="var(--card)"
        opacity="0.92"
      />
      {/* inner gold wash */}
      <rect x="4" y="4" width="32" height="32" rx="10" fill="url(#vixGold)" opacity="0.08" />
      {/* the V → check: left arm down to vertex, right arm sweeping into check tail */}
      <path
        d="M11 13 L19.5 27 L24.5 19.5 M19.5 27 L29 10.5"
        stroke="url(#vixGold)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* verification node at the check tip */}
      <circle cx="29" cy="10.5" r="2.1" fill="url(#vixGold)" />
    </svg>
  );
}
