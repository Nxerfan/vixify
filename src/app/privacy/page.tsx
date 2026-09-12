"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

interface LegalSection {
  id: string;
  titleKey: string;
  descKey: string;
}

const SECTIONS: LegalSection[] = [
  { id: "collection", titleKey: "privacy.section.collection.title", descKey: "privacy.section.collection.desc" },
  { id: "use", titleKey: "privacy.section.use.title", descKey: "privacy.section.use.desc" },
  { id: "sharing", titleKey: "privacy.section.sharing.title", descKey: "privacy.section.sharing.desc" },
  { id: "security", titleKey: "privacy.section.security.title", descKey: "privacy.section.security.desc" },
  { id: "retention", titleKey: "privacy.section.retention.title", descKey: "privacy.section.retention.desc" },
  { id: "rights", titleKey: "privacy.section.rights.title", descKey: "privacy.section.rights.desc" },
  { id: "contact", titleKey: "privacy.section.contact.title", descKey: "privacy.section.contact.desc" },
];

export default function PrivacyPage() {
  const { t } = useLocale();
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  // Scroll-spy via IntersectionObserver: pick the most-visible section.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const ob = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) visible.set(s.id, e.intersectionRatio);
            else visible.delete(s.id);
          });
          let best = SECTIONS[0].id;
          let bestRatio = 0;
          visible.forEach((r, id) => {
            if (r > bestRatio) {
              best = id;
              bestRatio = r;
            }
          });
          setActive(best);
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
      );
      ob.observe(el);
      observers.push(ob);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    // Re-sync history without jumping, so anchor links are keyboard/copy-friendly.
    if (typeof history !== "undefined" && history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <PageHeader
        kickerKey="privacy.page.kicker"
        titleKey="privacy.page.title"
        subtitleKey="privacy.page.subtitle"
      />

      <section className="py-12 sm:py-16">
        <div className="container-edge max-w-5xl">
          <p className="mb-8 font-mono text-xs text-muted-foreground">{t("privacy.lastUpdated")}</p>

          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            {/* Sticky table of contents — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h2
                  className="mb-3 font-mono text-xs uppercase tracking-wider text-gold"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {t("legal.toc.title")}
                </h2>
                <nav aria-label={t("legal.toc.title")}>
                  <ul className="space-y-1.5">
                    {SECTIONS.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => handleClick(e, s.id)}
                          aria-current={active === s.id ? "true" : undefined}
                          className={`-ms-0.5 block border-s-2 ps-3 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                            active === s.id
                              ? "border-gold text-gold"
                              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                          }`}
                        >
                          {t(s.titleKey)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Section content */}
            <div className="space-y-10 max-w-3xl">
              {SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2
                    className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {t(s.titleKey)}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t(s.descKey)}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
