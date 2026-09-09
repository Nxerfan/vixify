"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

interface Tier {
  id: string;
  nameKey: string;
  priceKey: string;
  periodKey: string;
  ctaKey: string;
  fKeys: [string, string, string];
  popular?: boolean;
}

const TIERS: Tier[] = [
  {
    id: "free",
    nameKey: "pricing.free.name",
    priceKey: "pricing.free.price",
    periodKey: "pricing.free.period",
    ctaKey: "pricing.tier.free.cta",
    fKeys: ["pricing.tier.free.f1", "pricing.tier.free.f2", "pricing.tier.free.f3"],
  },
  {
    id: "go",
    nameKey: "pricing.go.name",
    priceKey: "pricing.go.price",
    periodKey: "pricing.go.period",
    ctaKey: "pricing.tier.go.cta",
    fKeys: ["pricing.tier.go.f1", "pricing.tier.go.f2", "pricing.tier.go.f3"],
  },
  {
    id: "pro",
    nameKey: "pricing.pro.name",
    priceKey: "pricing.pro.price",
    periodKey: "pricing.pro.period",
    ctaKey: "pricing.tier.pro.cta",
    fKeys: ["pricing.tier.pro.f1", "pricing.tier.pro.f2", "pricing.tier.pro.f3"],
    popular: true,
  },
  {
    id: "max",
    nameKey: "pricing.max.name",
    priceKey: "pricing.max.price",
    periodKey: "pricing.max.period",
    ctaKey: "pricing.tier.max.cta",
    fKeys: ["pricing.tier.max.f1", "pricing.tier.max.f2", "pricing.tier.max.f3"],
  },
  {
    id: "payg",
    nameKey: "pricing.payg.name",
    priceKey: "pricing.payg.price",
    periodKey: "pricing.payg.period",
    ctaKey: "pricing.tier.payg.cta",
    fKeys: ["pricing.tier.payg.f1", "pricing.tier.payg.f2", "pricing.tier.payg.f3"],
  },
];

const COMPARE = [
  "pricing.compare.f1",
  "pricing.compare.f2",
  "pricing.compare.f3",
  "pricing.compare.f4",
  "pricing.compare.f5",
];

export default function PricingPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHeader
        kickerKey="pricing.page.kicker"
        titleKey="pricing.page.title"
        subtitleKey="pricing.page.subtitle"
      >
        <div className="mt-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-4 py-1.5 text-xs font-medium text-gold">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            {t("pricing.managed")}
          </span>
        </div>
      </PageHeader>

      <section className="py-16 sm:py-20" aria-labelledby="pricing-tiers-title">
        <div className="container-edge">
          <h2 id="pricing-tiers-title" className="sr-only">
            {t("pricing.page.title")}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-background/70 p-6 backdrop-blur",
                  tier.popular
                    ? "border-gold/50 shadow-[0_0_0_1px_var(--gold-soft),0_20px_50px_-20px_color-mix(in_oklch,var(--gold)_40%,transparent)]"
                    : "border-border"
                )}
              >
                {tier.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-gold-foreground">
                    {t("pricing.popular")}
                  </span>
                )}
                <h3
                  className="text-sm font-semibold tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t(tier.nameKey)}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className="text-2xl font-bold tracking-tight text-foreground"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {t(tier.priceKey)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t(tier.periodKey)}
                  </span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
                  {tier.fKeys.map((fk) => (
                    <li
                      key={fk}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                        strokeWidth={2.5}
                      />
                      <span>{t(fk)}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={cn(
                    "mt-6 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    tier.popular
                      ? "bg-gold text-gold-foreground hover:brightness-105"
                      : "border border-border text-foreground hover:border-gold/40 hover:text-gold"
                  )}
                >
                  {t(tier.ctaKey)}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" strokeWidth={2} />
                </a>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("pricing.yearly.note")}
          </p>
        </div>
      </section>

      <section
        className="border-t border-border bg-card/30 py-16 sm:py-20"
        aria-labelledby="pricing-compare-title"
      >
        <div className="container-edge">
          <h2
            id="pricing-compare-title"
            className="text-2xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {t("pricing.compare.title")}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMPARE.map((k) => (
              <div
                key={k}
                className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4"
              >
                <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                <span className="text-sm text-foreground/90">{t(k)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
