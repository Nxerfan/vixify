"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useLocale } from "@/i18n/locale-context";

interface PageHeaderProps {
  kickerKey: string;
  titleKey: string;
  subtitleKey?: string;
  children?: ReactNode;
}

/**
 * Shared hero band for sub-pages. Provides consistent top padding to clear the
 * fixed header, a kicker / title / subtitle stack, and an entrance animation.
 */
export function PageHeader({
  kickerKey,
  titleKey,
  subtitleKey,
  children,
}: PageHeaderProps) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border pt-28 pb-10 sm:pt-36 sm:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, color-mix(in oklch, var(--gold) 12%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="container-edge relative">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="kicker">{t(kickerKey)}</span>
          <h1
            className="mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {t(titleKey)}
          </h1>
          {subtitleKey && (
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t(subtitleKey)}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
