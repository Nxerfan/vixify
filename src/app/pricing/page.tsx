"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Wallet, Calculator, FileQuestion } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  { id: "free", nameKey: "pricing.free.name", priceKey: "pricing.free.price", periodKey: "pricing.free.period", ctaKey: "pricing.tier.free.cta", fKeys: ["pricing.tier.free.f1","pricing.tier.free.f2","pricing.tier.free.f3"] },
  { id: "go", nameKey: "pricing.go.name", priceKey: "pricing.go.price", periodKey: "pricing.go.period", ctaKey: "pricing.tier.go.cta", fKeys: ["pricing.tier.go.f1","pricing.tier.go.f2","pricing.tier.go.f3"] },
  { id: "pro", nameKey: "pricing.pro.name", priceKey: "pricing.pro.price", periodKey: "pricing.pro.period", ctaKey: "pricing.tier.pro.cta", fKeys: ["pricing.tier.pro.f1","pricing.tier.pro.f2","pricing.tier.pro.f3"], popular: true },
  { id: "max", nameKey: "pricing.max.name", priceKey: "pricing.max.price", periodKey: "pricing.max.period", ctaKey: "pricing.tier.max.cta", fKeys: ["pricing.tier.max.f1","pricing.tier.max.f2","pricing.tier.max.f3"] },
  { id: "payg", nameKey: "pricing.payg.name", priceKey: "pricing.payg.price", periodKey: "pricing.payg.period", ctaKey: "pricing.tier.payg.cta", fKeys: ["pricing.tier.payg.f1","pricing.tier.payg.f2","pricing.tier.payg.f3"] },
];

const COMPARE_ROWS: { labelKey: string; values: string[] }[] = [
  { labelKey: "pricing.compare.row.otps", values: ["100", "5,000", "20,000", "100,000", "—"] },
  { labelKey: "pricing.compare.row.trial", values: ["1 mo", "—", "—", "—", "—"] },
  { labelKey: "pricing.compare.row.branding", values: ["no", "yes", "yes", "yes", "yes"] },
  { labelKey: "pricing.compare.row.signature", values: ["no", "no", "yes", "yes", "yes"] },
  { labelKey: "pricing.compare.row.webhooks", values: ["yes","yes","yes","yes","yes"] },
  { labelKey: "pricing.compare.row.ratelimit", values: ["standard","standard","standard","priority","standard"] },
  { labelKey: "pricing.compare.row.dashboard", values: ["yes","yes","yes","yes","yes"] },
  { labelKey: "pricing.compare.row.support", values: ["standard","standard","standard","priority","standard"] },
  { labelKey: "pricing.compare.row.billing", values: ["—","subscription","subscription","subscription","wallet"] },
];

const COMPARE_COLS = ["free","go","pro","max","payg"] as const;

const PRICING_FAQ = [
  { q: "pricing.faq.1.q", a: "pricing.faq.1.a" },
  { q: "pricing.faq.2.q", a: "pricing.faq.2.a" },
  { q: "pricing.faq.3.q", a: "pricing.faq.3.a" },
];

const OTPCOUNT_BULLETS = ["pricing.otpcount.b1","pricing.otpcount.b2","pricing.otpcount.b3","pricing.otpcount.b4"];
const DONTDO = ["about.dontdo.1","about.dontdo.2","about.dontdo.3","about.dontdo.4"];

const PER_OTP = 500; // Toman
const fmt = (n: number) => n.toLocaleString("en-US");

interface CalcResult { tierId: string; nameKey: string; monthly: number; perOtp: number; noteKey: string; applicable: boolean }

export default function PricingPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [volume, setVolume] = useState(2000);

  const results = useMemo<CalcResult[]>(() => {
    const v = volume;
    return [
      { tierId: "free", nameKey: "pricing.free.name", monthly: v <= 100 ? 0 : -1, perOtp: v <= 100 ? 0 : -1, noteKey: v <= 100 ? "pricing.calc.recommend.free" : "pricing.compare.val.no", applicable: v <= 100 },
      { tierId: "go", nameKey: "pricing.go.name", monthly: 150000 + Math.max(0, v - 5000) * PER_OTP, perOtp: v > 0 ? Math.round((150000 + Math.max(0, v - 5000) * PER_OTP) / v) : 0, noteKey: "pricing.calc.recommend.go", applicable: true },
      { tierId: "pro", nameKey: "pricing.pro.name", monthly: 700000 + Math.max(0, v - 20000) * PER_OTP, perOtp: v > 0 ? Math.round((700000 + Math.max(0, v - 20000) * PER_OTP) / v) : 0, noteKey: "pricing.calc.recommend.pro", applicable: true },
      { tierId: "max", nameKey: "pricing.max.name", monthly: 3000000 + Math.max(0, v - 100000) * PER_OTP, perOtp: v > 0 ? Math.round((3000000 + Math.max(0, v - 100000) * PER_OTP) / v) : 0, noteKey: "pricing.calc.recommend.max", applicable: true },
      { tierId: "payg", nameKey: "pricing.payg.name", monthly: v * PER_OTP, perOtp: PER_OTP, noteKey: "pricing.calc.recommend.payg", applicable: true },
    ];
  }, [volume]);

  const cheapestKey = useMemo(() => {
    const applicable = results.filter((r) => r.applicable && r.monthly >= 0);
    if (applicable.length === 0) return null;
    return applicable.reduce((min, r) => (r.monthly < min.monthly ? r : min)).tierId;
  }, [results]);

  return (
    <>
      <PageHeader kickerKey="pricing.page.kicker" titleKey="pricing.page.title" subtitleKey="pricing.page.subtitle">
        <div className="mt-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-4 py-1.5 text-xs font-medium text-gold">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            {t("pricing.managed")}
          </span>
        </div>
      </PageHeader>

      {/* Tier cards */}
      <section className="py-16 sm:py-20" aria-labelledby="pricing-tiers-title">
        <div className="container-edge">
          <h2 id="pricing-tiers-title" className="sr-only">{t("pricing.page.title")}</h2>
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
                  tier.popular ? "border-gold/50 shadow-[0_0_0_1px_var(--gold-soft),0_20px_50px_-20px_color-mix(in_oklch,var(--gold)_40%,transparent)]" : "border-border"
                )}
              >
                {tier.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-gold-foreground">
                    {t("pricing.popular")}
                  </span>
                )}
                <h3 className="text-sm font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-inter-tight)" }}>{t(tier.nameKey)}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{t(tier.priceKey)}</span>
                  <span className="text-xs text-muted-foreground">{t(tier.periodKey)}</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
                  {tier.fKeys.map((fk) => (
                    <li key={fk} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2.5} />
                      <span>{t(fk)}</span>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={cn("mt-6 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", tier.popular ? "bg-gold text-gold-foreground hover:brightness-105" : "border border-border text-foreground hover:border-gold/40 hover:text-gold")}>
                  {t(tier.ctaKey)}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" strokeWidth={2} />
                </a>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">{t("pricing.yearly.note")}</p>
        </div>
      </section>

      {/* Interactive cost calculator */}
      <section className="border-t border-border bg-card/30 py-16 sm:py-20" aria-labelledby="calc-title">
        <div className="container-edge max-w-4xl">
          <div className="flex items-center gap-2.5">
            <Calculator className="h-5 w-5 text-gold" strokeWidth={1.75} />
            <h2 id="calc-title" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("pricing.calc.title")}</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{t("pricing.calc.label")}</p>

          <div className="mt-6 rounded-2xl border border-border bg-background/70 p-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="range"
                  min={100}
                  max={150000}
                  step={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label={t("pricing.calc.label")}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <div className="mt-1 flex justify-between font-mono text-[0.65rem] text-muted-foreground">
                  <span>100</span><span>150,000</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <input
                  type="number"
                  min={0}
                  value={volume}
                  onChange={(e) => setVolume(Math.max(0, Number(e.target.value) || 0))}
                  aria-label={t("pricing.calc.otps")}
                  className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-right font-mono text-lg font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                />
                <span className="text-sm text-muted-foreground">{t("pricing.calc.otps")}</span>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto vixify-scroll">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-start">
                    <th scope="col" className="py-2 pe-3 text-start font-medium text-muted-foreground">{t("pricing.calc.col.tier")}</th>
                    <th scope="col" className="py-2 px-3 text-end font-medium text-muted-foreground">{t("pricing.calc.col.monthly")}</th>
                    <th scope="col" className="py-2 px-3 text-end font-medium text-muted-foreground">{t("pricing.calc.col.perOtp")}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.tierId} className={cn("border-b border-border/60 transition-colors", cheapestKey === r.tierId && "bg-gold-soft")}>
                      <td className="py-3 pe-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{t(r.nameKey)}</span>
                          {cheapestKey === r.tierId && (
                            <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-gold-foreground">{t("pricing.calc.cheapest")}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-end font-mono tabular-nums text-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                        {r.applicable && r.monthly >= 0 ? `${fmt(r.monthly)} T` : "—"}
                      </td>
                      <td className="py-3 px-3 text-end font-mono tabular-nums text-muted-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                        {r.applicable && r.perOtp >= 0 ? `${fmt(r.perOtp)} T` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {cheapestKey && (
              <p className="mt-3 text-sm text-gold">{t(results.find((r) => r.tierId === cheapestKey)!.noteKey)}</p>
            )}
          </div>
        </div>
      </section>

      {/* Full comparison table */}
      <section className="py-16 sm:py-20" aria-labelledby="compare-title">
        <div className="container-edge">
          <h2 id="compare-title" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("pricing.compare.table.title")}</h2>
          <div className="mt-6 overflow-x-auto vixify-scroll">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pe-3 text-start font-medium text-muted-foreground">{t("pricing.compare.col.feature")}</th>
                  {COMPARE_COLS.map((c) => (
                    <th key={c} scope="col" className="py-3 px-3 text-center font-semibold text-foreground">{t(`pricing.${c}.name`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, idx) => (
                  <tr key={row.labelKey} className={cn("border-b border-border/60", idx % 2 === 1 && "bg-card/20")}>
                    <td className="py-3 pe-3 text-muted-foreground">{t(row.labelKey)}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-center font-mono text-xs text-foreground/90" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                        {v === "yes" ? <Check className="mx-auto h-4 w-4 text-gold" strokeWidth={2.5} /> : v === "no" ? <span className="text-muted-foreground/50">—</span> : t(`pricing.compare.val.${v}`) !== `pricing.compare.val.${v}` ? t(`pricing.compare.val.${v}`) : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Wallet explainer + What counts as one OTP */}
      <section className="border-t border-border bg-card/30 py-16 sm:py-20">
        <div className="container-edge grid gap-10 lg:grid-cols-2">
          {/* Wallet */}
          <div className="rounded-2xl border border-border bg-background/70 p-6">
            <div className="flex items-center gap-2.5">
              <Wallet className="h-5 w-5 text-gold" strokeWidth={1.75} />
              <h2 className="text-xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("pricing.wallet.title")}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("pricing.wallet.desc")}</p>
            <dl className="mt-6 space-y-3">
              <WalletMeter label={t("pricing.wallet.activation")} value={2000000} display="2,000,000 T" />
              <WalletMeter label={t("pricing.wallet.floor")} value={0} display="0 T" />
              <WalletMeter label={t("pricing.wallet.refund")} value={80} display="80%" percent />
            </dl>
          </div>
          {/* What counts as one OTP */}
          <div className="rounded-2xl border border-border bg-background/70 p-6">
            <div className="flex items-center gap-2.5">
              <FileQuestion className="h-5 w-5 text-gold" strokeWidth={1.75} />
              <h2 className="text-xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("pricing.otpcount.title")}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("pricing.otpcount.desc")}</p>
            <ul className="mt-5 space-y-2.5">
              {OTPCOUNT_BULLETS.map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Annual savings */}
      <section className="py-16 sm:py-20" aria-labelledby="savings-title">
        <div className="container-edge max-w-3xl">
          <h2 id="savings-title" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("pricing.savings.title")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/70 p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{t("pricing.savings.monthly")}</span>
              <p className="mt-2 font-mono text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>12 × monthly</p>
            </div>
            <div className="relative rounded-2xl border border-gold/50 bg-gold-soft p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-gold">{t("pricing.savings.yearly")}</span>
              <p className="mt-2 font-mono text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>11 × monthly</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground">{t("pricing.savings.save")}</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t("pricing.savings.note")}</p>
        </div>
      </section>

      {/* All plans include */}
      <section className="border-t border-border bg-card/30 py-16 sm:py-20" aria-labelledby="include-title">
        <div className="container-edge">
          <h2 id="include-title" className="text-2xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("pricing.compare.title")}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["pricing.compare.f1","pricing.compare.f2","pricing.compare.f3","pricing.compare.f4","pricing.compare.f5"].map((k) => (
              <div key={k} className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4">
                <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                <span className="text-sm text-foreground/90">{t(k)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-16 sm:py-20" aria-labelledby="pricing-faq-title">
        <div className="container-edge max-w-3xl">
          <h2 id="pricing-faq-title" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("pricing.faq.title")}</h2>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {PRICING_FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`pfq-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-start text-base font-medium text-foreground hover:no-underline hover:text-gold [&[data-state=open]]:text-gold">{t(item.q)}</AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">{t(item.a)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

function WalletMeter({ label, value, display, percent }: { label: string; value: number; display: string; percent?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="font-mono text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{display}</dd>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-gold transition-all"
          style={{ width: percent ? `${value}%` : value > 0 ? "100%" : "0%" }}
        />
      </div>
    </div>
  );
}
