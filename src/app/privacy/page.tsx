"use client";

import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

interface LegalSection {
  titleKey: string;
  descKey: string;
}

const SECTIONS: LegalSection[] = [
  {
    titleKey: "privacy.section.collection.title",
    descKey: "privacy.section.collection.desc",
  },
  {
    titleKey: "privacy.section.use.title",
    descKey: "privacy.section.use.desc",
  },
  {
    titleKey: "privacy.section.sharing.title",
    descKey: "privacy.section.sharing.desc",
  },
  {
    titleKey: "privacy.section.security.title",
    descKey: "privacy.section.security.desc",
  },
  {
    titleKey: "privacy.section.retention.title",
    descKey: "privacy.section.retention.desc",
  },
  {
    titleKey: "privacy.section.rights.title",
    descKey: "privacy.section.rights.desc",
  },
  {
    titleKey: "privacy.section.contact.title",
    descKey: "privacy.section.contact.desc",
  },
];

export default function PrivacyPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHeader
        kickerKey="privacy.page.kicker"
        titleKey="privacy.page.title"
        subtitleKey="privacy.page.subtitle"
      />

      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <p className="mb-10 font-mono text-xs text-muted-foreground">
            {t("privacy.lastUpdated")}
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
