"use client";

import { useLocale } from "@/i18n/locale-context";
import styles from "./hero.module.scss";

interface Metric {
  labelKey: string;
  valueKey: string;
}

const METRICS: Metric[] = [
  { labelKey: "metrics.uptime", valueKey: "metrics.uptimeValue" },
  { labelKey: "metrics.delivery", valueKey: "metrics.deliveryValue" },
  { labelKey: "metrics.countries", valueKey: "metrics.countriesValue" },
  { labelKey: "metrics.sent", valueKey: "metrics.sentValue" },
];

export function MetricsStrip() {
  const { t } = useLocale();

  // duplicate for seamless marquee
  const items = [...METRICS, ...METRICS];

  return (
    <section
      aria-label={t("metrics.label")}
      className="relative border-y border-border bg-card/40 py-5"
    >
      <div className="container-edge">
        <div className="flex items-center gap-4">
          <span className="kicker shrink-0">{t("metrics.label")}</span>
          <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden">
        {/* edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32"
        />
        <div className={`${styles.gridBg} opacity-30`} style={{ maskImage: "none", WebkitMaskImage: "none" }} aria-hidden />

        <div className="vixify-marquee-track flex w-max items-center gap-10 px-5">
          {items.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="font-mono text-2xl font-semibold text-foreground sm:text-3xl"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {t(m.valueKey)}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {t(m.labelKey)}
              </span>
              <span className="ml-7 h-1.5 w-1.5 rounded-full bg-gold/50" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
