"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Rss, Mail, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/locale-context";

const CATEGORIES = ["all", "engineering", "product", "gateway"] as const;
const COMING = [1, 2, 3] as const;

export default function BlogPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [active, setActive] =
    useState<(typeof CATEGORIES)[number]>("all");

  return (
    <>
      <PageHeader
        kickerKey="blog.page.kicker"
        titleKey="blog.page.title"
        subtitleKey="blog.page.subtitle"
      />

      <section className="py-12 sm:py-16">
        <div className="container-edge max-w-4xl space-y-12">
          {/* Category chips */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {t("blog.categories.title")}
            </h2>
            <div
              className="mt-3 flex flex-wrap gap-2"
              role="group"
              aria-label={t("blog.categories.title")}
            >
              {CATEGORIES.map((cat) => {
                const isActive = active === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-pressed={isActive}
                    className={
                      "inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                      (isActive
                        ? "border-gold bg-gold text-gold-foreground"
                        : "border-border bg-card/40 text-muted-foreground hover:border-gold/40 hover:text-foreground")
                    }
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {t(`blog.cat.${cat}`)}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Featured placeholder */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h2
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {t("blog.featured.title")}
            </h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-dashed border-border bg-card/30 p-8 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold-soft">
                  <Rss
                    className="h-7 w-7 text-gold"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    coming soon
                  </span>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {t("blog.empty.desc")}
                  </p>
                  <a
                    href="/changelog"
                    className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t("blog.empty.cta")}
                    <ArrowRight
                      className="h-4 w-4 rtl:rotate-180"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coming-soon list (3 cards) */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {t("blog.coming.title")}
            </h2>
            <ul className="mt-3 grid gap-4 sm:grid-cols-3">
              {COMING.map((n) => (
                <li
                  key={n}
                  className="flex min-h-[120px] flex-col justify-between rounded-xl border border-border bg-card/40 p-5"
                >
                  <div className="flex items-start gap-3">
                    <FileText
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`blog.coming.${n}`)}
                    </p>
                  </div>
                  <span
                    className="mt-4 text-xs text-muted-foreground/70"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    draft · planned
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter signup (disabled) */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold-soft">
                <Mail
                  className="h-5 w-5 text-gold"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <h2
                className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t("blog.newsletter.title")}
              </h2>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t("blog.newsletter.desc")}
            </p>

            <form
              className="mt-5 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
              aria-label={t("blog.newsletter.title")}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {t("blog.newsletter.placeholder")}
              </label>
              <Input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t("blog.newsletter.placeholder")}
                disabled
                aria-disabled="true"
                className="sm:flex-1"
              />
              <Button
                type="submit"
                disabled
                aria-disabled="true"
                className="min-h-[44px] gap-1.5 bg-gold text-gold-foreground opacity-50 cursor-not-allowed"
              >
                {t("blog.newsletter.button")}
              </Button>
            </form>

            <p
              className="mt-3 text-xs leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {t("blog.newsletter.note")}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
