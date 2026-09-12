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
  { id: "acceptance", titleKey: "terms.section.acceptance.title", descKey: "terms.section.acceptance.desc" },
  { id: "service", titleKey: "terms.section.service.title", descKey: "terms.section.service.desc" },
  { id: "accounts", titleKey: "terms.section.accounts.title", descKey: "terms.section.accounts.desc" },
  { id: "billing", titleKey: "terms.section.billing.title", descKey: "terms.section.billing.desc" },
  { id: "use", titleKey: "terms.section.use.title", descKey: "terms.section.use.desc" },
  { id: "liability", titleKey: "terms.section.liability.title", descKey: "terms.section.liability.desc" },
  { id: "termination", titleKey: "terms.section.termination.title", descKey: "terms.section.termination.desc" },
  { id: "changes", titleKey: "terms.section.changes.title", descKey: "terms.section.changes.desc" },
  { id: "contact", titleKey: "terms.section.contact.title", descKey: "terms.section.contact.desc" },
];

export default function TermsPage() {
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
    if (typeof history !== "undefined" && history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <PageHeader
        kickerKey="terms.page.kicker"
        titleKey="terms.page.title"
        subtitleKey="terms.page.subtitle"
      />

      <section className="py-12 sm:py-16">
        <div className="container-edge max-w-5xl">
          <p className="mb-8 font-mono text-xs text-muted-foreground">{t("terms.lastUpdated")}</p>

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
