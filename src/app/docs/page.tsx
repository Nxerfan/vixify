"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";
import type { ReactNode } from "react";

const ERROR_KEYS = [
  "docs.errors.401",
  "docs.errors.402",
  "docs.errors.429",
  "docs.errors.422",
  "docs.errors.403",
  "docs.errors.500",
];

export default function DocsPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHeader
        kickerKey="docs.page.kicker"
        titleKey="docs.page.title"
        subtitleKey="docs.page.subtitle"
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
            <Block title={t("docs.intro.title")}>
              <p>{t("docs.intro.desc")}</p>
            </Block>

            <Block title={t("docs.auth.title")}>
              <p>{t("docs.auth.desc")}</p>
              <CodeBlock>{t("docs.auth.example")}</CodeBlock>
            </Block>

            <EndpointBlock
              title={t("docs.request.title")}
              endpoint={t("docs.request.endpoint")}
              desc={t("docs.request.desc")}
              params={[t("docs.request.param.phone"), t("docs.request.param.brand")]}
              response={t("docs.request.response")}
            />

            <EndpointBlock
              title={t("docs.verify.title")}
              endpoint={t("docs.verify.endpoint")}
              desc={t("docs.verify.desc")}
              params={[t("docs.verify.param.id"), t("docs.verify.param.code")]}
              response={t("docs.verify.response")}
            />

            <Block title={t("docs.errors.title")}>
              <ul className="space-y-2.5">
                {ERROR_KEYS.map((k) => (
                  <li
                    key={k}
                    className="rounded-lg border border-border bg-card/40 px-3 py-2 font-mono text-sm text-foreground"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {t(k)}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={t("docs.sdk.title")}>
              <p>{t("docs.sdk.desc")}</p>
            </Block>

            <Block title={t("docs.webhooks.title")}>
              <p>{t("docs.webhooks.desc")}</p>
            </Block>

            <Block title={t("docs.ratelimits.title")}>
              <p>{t("docs.ratelimits.desc")}</p>
            </Block>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre
      dir="ltr"
      className="mt-3 overflow-x-auto rounded-xl border border-border bg-card/60 p-4 font-mono text-sm text-foreground vixify-scroll"
      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
    >
      <code>{children}</code>
    </pre>
  );
}

function EndpointBlock({
  title,
  endpoint,
  desc,
  params,
  response,
}: {
  title: string;
  endpoint: string;
  desc: string;
  params: string[];
  response: string;
}) {
  return (
    <div>
      <h2
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {desc}
        </p>
        <div
          dir="ltr"
          className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold-soft px-3 py-1.5 font-mono text-sm text-gold"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {endpoint}
        </div>
        <ul className="space-y-1.5">
          {params.map((p, i) => (
            <li
              key={i}
              className="font-mono text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              <span className="text-foreground">{p}</span>
            </li>
          ))}
        </ul>
        <div
          dir="ltr"
          className="font-mono text-sm text-muted-foreground"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          <span className="text-foreground">{response}</span>
        </div>
      </div>
    </div>
  );
}
