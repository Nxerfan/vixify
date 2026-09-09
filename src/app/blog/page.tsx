"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

export default function BlogPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHeader
        kickerKey="blog.page.kicker"
        titleKey="blog.page.title"
        subtitleKey="blog.page.subtitle"
      />

      <section className="py-16 sm:py-24">
        <div className="container-edge max-w-3xl">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border bg-card/50 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold-soft">
                <FileText
                  className="h-6 w-6 text-gold"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <h2
                className="mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t("blog.empty.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("blog.empty.desc")}
              </p>
              <a
                href="/changelog"
                className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("blog.empty.cta")}
                <ArrowRight
                  className="h-4 w-4 rtl:rotate-180"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
