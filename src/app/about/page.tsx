"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

const BLOCKS = [
  { titleKey: "about.what.title", descKey: "about.what.desc" },
  { titleKey: "about.gateway.title", descKey: "about.gateway.desc" },
  { titleKey: "about.honest.title", descKey: "about.honest.desc" },
  { titleKey: "about.family.title", descKey: "about.family.desc" },
] as const;

export default function AboutPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHeader
        kickerKey="about.page.kicker"
        titleKey="about.page.title"
        subtitleKey="about.page.subtitle"
      />

      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {BLOCKS.map((block) => (
              <div key={block.titleKey}>
                <h2
                  className="text-2xl font-semibold tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t(block.titleKey)}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {t(block.descKey)}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="mt-12 border-t border-border pt-8">
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {t("nav.contact")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
