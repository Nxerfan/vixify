"use client";

import { motion, useReducedMotion } from "framer-motion";
import { KeyRound, Download, Send } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import { SectionHeading } from "./features-grid";

const STEPS = [
  {
    icon: <KeyRound className="h-5 w-5" strokeWidth={1.75} />,
    titleKey: "how.step1.title",
    descKey: "how.step1.desc",
    cmdKey: "how.step1.cmd",
  },
  {
    icon: <Download className="h-5 w-5" strokeWidth={1.75} />,
    titleKey: "how.step2.title",
    descKey: "how.step2.desc",
    cmdKey: "how.step2.cmd",
  },
  {
    icon: <Send className="h-5 w-5" strokeWidth={1.75} />,
    titleKey: "how.step3.title",
    descKey: "how.step3.desc",
    cmdKey: "how.step3.cmd",
  },
] as const;

export function HowItWorks() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 border-y border-border bg-card/30 py-20 sm:py-28"
      aria-labelledby="how-title"
    >
      <div className="container-edge">
        <SectionHeading
          kicker={t("how.kicker")}
          title={t("how.title")}
          subtitle={t("how.subtitle")}
          titleId="how-title"
        />

        <ol className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {/* connector line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[2.25rem] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border) 15%, var(--gold-soft) 50%, var(--border) 85%, transparent)",
            }}
          />

          {STEPS.map((step, i) => (
            <motion.li
              key={step.titleKey}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative flex flex-col"
            >
              {/* node */}
              <div className="relative z-10 mb-5 flex items-center gap-3">
                <span className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-gold/30 bg-background text-gold shadow-[0_0_0_6px_var(--background)]">
                  {step.icon}
                </span>
                <span className="font-mono text-5xl font-bold leading-none text-border">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3
                className="text-xl font-semibold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t(step.titleKey)}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {t(step.descKey)}
              </p>

              <div className="mt-5">
                <code className="inline-block rounded-lg border border-border bg-background/80 px-3 py-2 font-mono text-xs text-foreground/90">
                  {t(step.cmdKey)}
                </code>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
