"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import { SectionHeading } from "./features-grid";
import { cn } from "@/lib/utils";

interface Tier {
  nameKey: string;
  priceKey: string;
  periodKey: string;
  featureKey: string;
  popular?: boolean;
}

const TIERS: Tier[] = [
  { nameKey: "pricing.free.name", priceKey: "pricing.free.price", periodKey: "pricing.free.period", featureKey: "pricing.free.feature" },
  { nameKey: "pricing.go.name", priceKey: "pricing.go.price", periodKey: "pricing.go.period", featureKey: "pricing.go.feature" },
  { nameKey: "pricing.pro.name", priceKey: "pricing.pro.price", periodKey: "pricing.pro.period", featureKey: "pricing.pro.feature", popular: true },
  { nameKey: "pricing.max.name", priceKey: "pricing.max.price", periodKey: "pricing.max.period", featureKey: "pricing.max.feature" },
  { nameKey: "pricing.payg.name", priceKey: "pricing.payg.price", periodKey: "pricing.payg.period", featureKey: "pricing.payg.feature" },
];

export function PricingPreview() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 border-t border-border bg-card/30 py-20 sm:py-28"
      aria-labelledby="pricing-title"
    >
      <div className="container-edge">
        <SectionHeading
          kicker={t("pricing.kicker")}
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
          titleId="pricing-title"
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.nameKey}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background/70 p-5 backdrop-blur",
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

              <div className="mt-4 flex flex-1 items-start gap-2 border-t border-border pt-4">
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                  strokeWidth={2.5}
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {t(tier.featureKey)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/pricing"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("pricing.viewAll")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
