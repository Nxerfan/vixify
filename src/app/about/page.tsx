"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

const BLOCKS = [
  { titleKey: "about.what.title", descKey: "about.what.desc" },
  { titleKey: "about.gateway.title", descKey: "about.gateway.desc" },
  { titleKey: "about.honest.title", descKey: "about.honest.desc" },
  { titleKey: "about.family.title", descKey: "about.family.desc" },
] as const;

const DIAGRAM = [
  { labelKey: "about.diagram.yourapp", stepKey: "about.diagram.step1" },
  { labelKey: "about.diagram.api", stepKey: "about.diagram.step2" },
  { labelKey: "about.diagram.gateway", stepKey: "about.diagram.step3" },
  { labelKey: "about.diagram.user", stepKey: "about.diagram.step4" },
] as const;

const DONTDO = [
  "about.dontdo.1",
  "about.dontdo.2",
  "about.dontdo.3",
  "about.dontdo.4",
] as const;

const ROADMAP = ["about.roadmap.1", "about.roadmap.2", "about.roadmap.3"] as const;

export default function AboutPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHeader
        kickerKey="about.page.kicker"
        titleKey="about.page.title"
        subtitleKey="about.page.subtitle"
      />

      {/* Existing 4 editorial blocks */}
      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {BLOCKS.map((block) => (
              <div key={block.titleKey}>
                <h2
                  className="text-2xl font-semibold tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t(block.titleKey)}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {t(block.descKey)}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="mt-12 border-t border-border pt-8">
            <a
              href="/contact"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {t("nav.contact")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>

      {/* NEW: the flow diagram — honest end-to-end picture */}
      <section className="border-t border-border bg-card/30 py-16 sm:py-20">
        <div className="container-edge">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("about.diagram.title")}
            </h2>

            <ol className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-stretch">
              {DIAGRAM.map((node, i) => (
                <Fragment key={node.labelKey}>
                  <li className="relative flex-1 rounded-xl border border-border bg-card/60 p-5 transition-colors">
                    <span
                      aria-hidden
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 bg-gold-soft text-xs font-semibold tabular-nums text-gold"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {i + 1}
                    </span>
                    <h3
                      className="mt-3 text-lg font-semibold text-gold"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {t(node.labelKey)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(node.stepKey)}
                    </p>
                  </li>
                  {i < DIAGRAM.length - 1 && (
                    <li
                      aria-hidden
                      className="flex shrink-0 items-center justify-center text-gold/70"
                    >
                      <ArrowRight className="hidden h-5 w-5 rtl:rotate-180 lg:block" />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* NEW: what we don't do + roadmap */}
      <section className="py-16 sm:py-20">
        <div className="container-edge grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* What we don't do */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("about.dontdo.title")}
            </h2>
            <ul className="mt-6 space-y-3">
              {DONTDO.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card/40 p-4"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("about.roadmap.title")}
            </h2>
            <ol className="mt-6 space-y-3">
              {ROADMAP.map((key, i) => (
                <li
                  key={key}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card/40 p-4"
                >
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold-soft text-sm font-semibold tabular-nums text-gold"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs italic text-muted-foreground">
              {t("about.roadmap.note")}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
