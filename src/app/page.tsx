"use client";

import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { MetricsStrip } from "@/components/landing/metrics-strip";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CodeExamples } from "@/components/landing/code-examples";
import { PricingPreview } from "@/components/landing/pricing-preview";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { CursorGlow } from "@/components/landing/cursor-glow";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { useLocale } from "@/i18n/locale-context";

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gold-foreground"
      >
        {t("nav.skipToContent")}
      </a>

      <div className="relative flex min-h-screen flex-col bg-background grain">
        <Header />

        <main className="flex-1">
          <Hero />
          <MetricsStrip />
          <FeaturesGrid />
          <HowItWorks />
          <CodeExamples />
          <PricingPreview />
          <Faq />
          <FinalCta />
        </main>

        <Footer />
      </div>
    </>
  );
}
