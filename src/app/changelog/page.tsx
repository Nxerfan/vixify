"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PageHeader } from "@/components/site/page-header";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/i18n/locale-context";

const ENTRIES = [1, 2, 3] as const;

const TAG_CLASS: Record<string, string> = {
  feat: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
  fix: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  improvement:
    "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
};

export default function ChangelogPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHeader
        kickerKey="changelog.page.kicker"
        titleKey="changelog.page.title"
        subtitleKey="changelog.page.subtitle"
      />

      <section className="py-16 sm:py-20">
        <div className="container-edge max-w-3xl">
          <ol className="relative border-l border-border">
            {ENTRIES.map((n, i) => {
              const tag = t(`changelog.entry.${n}.tag`) as string;
              return (
                <motion.li
                  key={n}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative ml-6 pb-10 last:pb-0"
                >
                  {/* Timeline dot */}
                  <span
                    className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full border-2 border-background bg-gold"
                    aria-hidden
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                    {/* Left column: version + date */}
                    <div className="sm:w-40 sm:shrink-0">
                      <div
                        className="text-sm font-semibold text-gold"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {t(`changelog.entry.${n}.version`)}
                      </div>
                      <div
                        className="mt-1 text-xs text-muted-foreground"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {t(`changelog.entry.${n}.date`)}
                      </div>
                    </div>

                    {/* Right column: tags row + title + desc */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {i === 0 && (
                          <Badge className="border-transparent bg-gold text-gold-foreground">
                            {t("changelog.tag.latest")}
                          </Badge>
                        )}
                        {tag && TAG_CLASS[tag] && (
                          <Badge
                            variant="outline"
                            className={TAG_CLASS[tag]}
                          >
                            {t(`changelog.tag.${tag}`)}
                          </Badge>
                        )}
                      </div>

                      <h3
                        className="mt-3 text-base font-semibold tracking-tight text-foreground sm:text-lg"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                      >
                        {t(`changelog.entry.${n}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {t(`changelog.entry.${n}.desc`)}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
