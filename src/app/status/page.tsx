"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

const SERVICES = ["api", "gateway", "dashboard", "webhooks"] as const;

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

      <section className="py-16 sm:py-20">
        <div className="container-edge space-y-10">
          {/* Overall banner */}
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

          {/* Services list */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="divide-y divide-border rounded-xl border border-border bg-card/30"
          >
            {SERVICES.map((svc) => (
              <div
                key={svc}
                className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5"
              >
                <span
                  className="text-sm font-medium text-foreground sm:text-base"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t(`status.services.${svc}.name`)}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    className="h-2 w-2 rounded-full bg-gold"
                    aria-hidden
                  />
                  {t(`status.services.${svc}.status`)}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Incidents */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("status.incidents.title")}
            </h2>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-card/40 p-5">
              <Check
                className="h-4 w-4 shrink-0 text-gold"
                strokeWidth={2.5}
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("status.incidents.none")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
