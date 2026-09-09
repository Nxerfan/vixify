"use client";

import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

interface LegalSection {
  titleKey: string;
  descKey: string;
}

const SECTIONS: LegalSection[] = [
  {
    titleKey: "terms.section.acceptance.title",
    descKey: "terms.section.acceptance.desc",
  },
  {
    titleKey: "terms.section.service.title",
    descKey: "terms.section.service.desc",
  },
  {
    titleKey: "terms.section.accounts.title",
    descKey: "terms.section.accounts.desc",
  },
  {
    titleKey: "terms.section.billing.title",
    descKey: "terms.section.billing.desc",
  },
  {
    titleKey: "terms.section.use.title",
    descKey: "terms.section.use.desc",
  },
  {
    titleKey: "terms.section.liability.title",
    descKey: "terms.section.liability.desc",
  },
  {
    titleKey: "terms.section.termination.title",
    descKey: "terms.section.termination.desc",
  },
  {
    titleKey: "terms.section.changes.title",
    descKey: "terms.section.changes.desc",
  },
  {
    titleKey: "terms.section.contact.title",
    descKey: "terms.section.contact.desc",
  },
];

export default function TermsPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHeader
        kickerKey="terms.page.kicker"
        titleKey="terms.page.title"
        subtitleKey="terms.page.subtitle"
      />

      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <p className="mb-10 font-mono text-xs text-muted-foreground">
            {t("terms.lastUpdated")}
          </p>
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.titleKey}>
                <h2
                  className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {t(section.titleKey)}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {t(section.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
