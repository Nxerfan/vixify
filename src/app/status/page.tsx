"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, AlertCircle, Activity } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

const SERVICES = ["api", "gateway", "dashboard", "webhooks"] as const;
const UPTIME_DAYS = 90;

export default function StatusPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHeader
        kickerKey="status.page.kicker"
        titleKey="status.page.title"
        subtitleKey="status.page.subtitle"
      />

      {/* Overall banner */}
      <section className="py-12">
        <div className="container-edge">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border bg-card/40 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold"
                aria-hidden
              />
              <h2
                className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t("status.overall")}
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("status.note")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 90-day uptime bars (PLACEHOLDER) for each service */}
      <section className="border-t border-border bg-card/20 py-16">
        <div className="container-edge">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {/* Section heading */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t("status.uptime.title")}
              </h2>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                <Activity
                  className="h-3 w-3"
                  strokeWidth={2}
                  aria-hidden
                />
                PLACEHOLDER — live data coming
              </span>
            </div>

            {/* Placeholder callout */}
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("status.uptime.placeholder")}
            </p>

            {/* Per-service rows */}
            <div className="mt-8 space-y-6">
              {SERVICES.map((svc) => (
                <div
                  key={svc}
                  className="rounded-xl border border-dashed border-border bg-background/40 p-4 sm:p-5"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className="text-sm font-medium text-foreground sm:text-base"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {t(`status.services.${svc}.name`)}
                    </span>
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      coming soon
                    </span>
                  </div>

                  {/* 90 bars — placeholder, all "operational", reduced opacity */}
                  <div
                    className="flex flex-row gap-[2px] opacity-50"
                    role="img"
                    aria-label={`${t(`status.services.${svc}.name`)} — 90-day uptime placeholder, operational`}
                  >
                    {Array.from({ length: UPTIME_DAYS }).map((_, i) => (
                      <span
                        key={i}
                        className="h-8 flex-1 min-w-0 rounded-sm bg-gold/60"
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm bg-gold/60"
                  aria-hidden
                />
                {t("status.uptime.legend").split("·")[0]?.trim()}
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm bg-amber-500/80"
                  aria-hidden
                />
                {t("status.uptime.legend").split("·")[1]?.trim()}
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm bg-red-500/80"
                  aria-hidden
                />
                {t("status.uptime.legend").split("·")[2]?.trim()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Incidents + template */}
      <section className="py-16">
        <div className="container-edge space-y-10">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("status.incidents.title")}
            </h2>
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-card/40 p-5">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                strokeWidth={2.5}
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("status.incidents.none")}
              </p>
            </div>
          </motion.div>

          {/* Incident template */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-xl border border-dashed border-border bg-card/20 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle
                className="h-4 w-4 shrink-0 text-muted-foreground"
                strokeWidth={2}
                aria-hidden
              />
              <h3
                className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t("status.incidents.template.title")}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("status.incidents.template.desc")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["investigating", "identified", "monitoring", "resolved"].map(
                (stage, idx, arr) => (
                  <Fragment key={stage}>
                    <span
                      className="inline-flex items-center rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {stage}
                    </span>
                    {idx < arr.length - 1 && (
                      <span
                        className="self-center text-xs text-muted-foreground/60"
                        aria-hidden
                      >
                        →
                      </span>
                    )}
                  </Fragment>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
