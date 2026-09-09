"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from "@/i18n/locale-context";
import { SectionHeading } from "./features-grid";

const QA = [
  { q: "faq.1.q", a: "faq.1.a" },
  { q: "faq.2.q", a: "faq.2.a" },
  { q: "faq.3.q", a: "faq.3.a" },
  { q: "faq.4.q", a: "faq.4.a" },
  { q: "faq.5.q", a: "faq.5.a" },
  { q: "faq.6.q", a: "faq.6.a" },
  { q: "faq.7.q", a: "faq.7.a" },
  { q: "faq.8.q", a: "faq.8.a" },
] as const;

export function Faq() {
  const { t } = useLocale();

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 py-20 sm:py-28"
      aria-labelledby="faq-title"
    >
      <div className="container-edge">
        <SectionHeading
          kicker={t("faq.kicker")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          titleId="faq-title"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="faq-0"
          >
            {QA.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline hover:text-gold [&[data-state=open]]:text-gold">
                  {t(item.q)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {t(item.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
