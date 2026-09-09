"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Check } from "lucide-react";
import { MagneticButton } from "@/components/brand/magnetic-button";
import { useLocale } from "@/i18n/locale-context";
import styles from "./hero.module.scss";

export function Hero() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
      aria-labelledby="hero-title"
    >
      <div className={styles.heroGlow} aria-hidden />
      <div className={styles.gridBg} aria-hidden />

      <div className="container-edge relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* left: copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-xs font-medium text-gold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="vixify-pulse-ring absolute inline-flex h-full w-full rounded-full bg-gold" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={item}
              className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("hero.title").replace(t("hero.titleAccent"), "")}
              <span className="text-gradient-gold">{t("hero.titleAccent")}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="/pricing"
                className="group bg-gold text-gold-foreground shadow-[0_8px_30px_-8px_color-mix(in_oklch,var(--gold)_60%,transparent)] hover:brightness-105"
              >
                {t("hero.ctaPrimary")}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.25}
                />
              </MagneticButton>
              <MagneticButton
                href="/docs"
                strength={0.2}
                className="border border-border bg-card/50 text-foreground backdrop-blur hover:border-gold/40 hover:text-gold"
              >
                <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                {t("hero.ctaSecondary")}
              </MagneticButton>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-4 font-mono text-xs text-muted-foreground"
            >
              {t("hero.trust")}
            </motion.p>
          </motion.div>

          {/* right: live terminal + phone */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr] lg:grid-cols-1 xl:grid-cols-[1.15fr_0.85fr]">
              <Terminal />
              <Phone />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  const { t } = useLocale();
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalDots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.terminalTitle}>{t("hero.terminal.title")}</span>
      </div>
      <div className={styles.terminalBody}>
        <div className={styles.line}>
          <span className={styles.prompt}>$</span>
          <span className={styles.method}>POST</span>
          <span className={styles.path}>/api/request-otp</span>
        </div>
        <div className={styles.payload}>
          <span className={styles.muted}>payload </span>
          {t("hero.terminal.payload")}
        </div>
        <div className={styles.line}>
          <span className={styles.ok}>200 OK</span>
          <span className={styles.muted}>· pending</span>
          <span className="vixify-caret ml-0.5 inline-block h-3.5 w-2 bg-gold align-middle" />
        </div>

        <div className={styles.codeBox}>
          <span className={`${styles.muted} text-xs`}>{t("hero.terminal.codeLabel")}</span>
          <span className={styles.codeDigits}>{t("hero.terminal.codeValue")}</span>
        </div>

        <div className={styles.gateway}>
          <span className={styles.gatewayDot} />
          {t("hero.terminal.gateway")}
        </div>
        <div className={styles.sent}>
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          {t("hero.terminal.sent")}
        </div>
      </div>
    </div>
  );
}

function Phone() {
  const { t } = useLocale();
  return (
    <div className={`${styles.phone} vixify-float`}>
      <div className={styles.phoneScreen}>
        <div className={styles.phoneSender}>Vixify · now</div>
        <div className={styles.phoneMsgBody}>
          {t("hero.terminal.codeLabel")}:{" "}
          <span className={styles.phoneCode}>{t("hero.terminal.codeValue")}</span>
        </div>
        <div className={styles.phoneMsgBody} style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          — Vixify
        </div>
        <div className={styles.phoneFooter}>{t("hero.phone.label")}</div>
      </div>
    </div>
  );
}
