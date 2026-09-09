"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/brand/magnetic-button";
import { VixifyMark } from "@/components/brand/vixify-logo";
import { useLocale } from "@/i18n/locale-context";

export function FinalCta() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="cta"
      className="relative scroll-mt-20 py-20 sm:py-28"
      aria-labelledby="cta-title"
    >
      <div className="container-edge">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-gold/30 p-8 sm:p-14 lg:p-20"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, color-mix(in oklch, var(--gold) 16%, var(--card)) 0%, var(--card) 55%, var(--background) 100%)",
          }}
        >
          {/* decorative grid + grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--gold) 1px, transparent 1px), linear-gradient(to bottom, var(--gold) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
            }}
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
              {t("cta.kicker")}
            </span>

            <h2
              id="cta-title"
              className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("cta.title")}
            </h2>

            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("cta.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href="#top"
                className="group bg-gold text-gold-foreground shadow-[0_10px_40px_-10px_color-mix(in_oklch,var(--gold)_70%,transparent)] hover:brightness-105"
              >
                <VixifyMark size={18} />
                {t("cta.primary")}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.25}
                />
              </MagneticButton>
              <MagneticButton
                href="#docs"
                strength={0.2}
                className="border border-border bg-background/50 text-foreground backdrop-blur hover:border-gold/40 hover:text-gold"
              >
                <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                {t("cta.secondary")}
              </MagneticButton>
            </div>

            <p className="mt-5 font-mono text-xs text-muted-foreground">
              {t("cta.noCard")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
