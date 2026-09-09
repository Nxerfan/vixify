"use client";

import { Hero } from "@/components/landing/hero";
import { MetricsStrip } from "@/components/landing/metrics-strip";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CodeExamples } from "@/components/landing/code-examples";
import { PricingPreview } from "@/components/landing/pricing-preview";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <FeaturesGrid />
      <HowItWorks />
      <CodeExamples />
      <PricingPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
