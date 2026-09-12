"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check, Terminal, FlaskConical, Play } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";

const TOC_SECTIONS = [
  { id: "overview", titleKey: "docs.intro.title" },
  { id: "quickstart", titleKey: "docs.quickstart.title" },
  { id: "auth", titleKey: "docs.auth.title" },
  { id: "request", titleKey: "docs.request.title" },
  { id: "verify", titleKey: "docs.verify.title" },
  { id: "errors", titleKey: "docs.errors.title" },
  { id: "ratelimits", titleKey: "docs.ratelimits.title" },
  { id: "webhooks", titleKey: "docs.webhooks.title" },
  { id: "sandbox", titleKey: "docs.sandbox.title" },
  { id: "tryit", titleKey: "docs.tryit.title" },
];

const ERROR_CODES = [
  "INVALID_PHONE", "RATE_LIMITED_COOLDOWN", "RATE_LIMITED_DAILY",
  "NO_ACTIVE_OTP", "OTP_EXPIRED", "OTP_ALREADY_USED", "OTP_BLOCKED", "INVALID_OTP",
  "UNAUTHORIZED", "PAYMENT_REQUIRED", "FORBIDDEN", "INTERNAL_ERROR",
] as const;

const RATE_ROWS = [
  { scopeKey: "docs.ratelimits.row.phone", valKey: "docs.ratelimits.row.phone.val" },
  { scopeKey: "docs.ratelimits.row.key", valKey: "docs.ratelimits.row.key.val" },
  { scopeKey: "docs.ratelimits.row.burst", valKey: "docs.ratelimits.row.burst.val" },
];

export default function DocsPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState("overview");
  const [copied, setCopied] = useState(false);

  // scroll-spy
  useEffect(() => {
    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];
    TOC_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const ob = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) visible.set(s.id, e.intersectionRatio);
            else visible.delete(s.id);
            let best = TOC_SECTIONS[0].id, bestR = 0;
            visible.forEach((r, id) => { if (r > bestR) { best = id; bestR = r; } });
            setActive(best);
          });
        },
        { rootMargin: "-80px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
      );
      ob.observe(el);
      observers.push(ob);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    }
  };

  const copyRecipe = async () => {
    try {
      await navigator.clipboard.writeText(t("docs.webhook.recipe.code"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  };

  return (
    <>
      <PageHeader kickerKey="docs.page.kicker" titleKey="docs.page.title" subtitleKey="docs.page.subtitle" />

      <section className="py-12 sm:py-16">
        <div className="container-edge max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">{t("docs.toc.title")}</h2>
                <nav aria-label={t("docs.toc.title")}>
                  <ul className="space-y-1.5">
                    {TOC_SECTIONS.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => handleNav(e, s.id)}
                          aria-current={active === s.id ? "true" : undefined}
                          className={`block border-s-2 ps-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${active === s.id ? "border-gold text-gold" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}
                        >
                          {t(s.titleKey)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl space-y-12"
            >
              {/* Overview */}
              <section id="overview" className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.intro.title")}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("docs.intro.desc")}</p>
              </section>

              {/* Quickstart */}
              <section id="quickstart" className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.quickstart.title")}</h2>
                <ol className="mt-4 space-y-3">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-gold-foreground">{n}</span>
                      <span className="text-sm text-foreground/90">{t(`docs.quickstart.step${n}`)}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 flex items-center gap-2 text-sm text-gold">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  {t("docs.quickstart.done")}
                </p>
              </section>

              {/* Auth */}
              <section id="auth" className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.auth.title")}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("docs.auth.desc")}</p>
                <CodeBlock>{t("docs.auth.example")}</CodeBlock>
              </section>

              {/* Request */}
              <section id="request" className="scroll-mt-24">
                <EndpointBlock title={t("docs.request.title")} endpoint={t("docs.request.endpoint")} desc={t("docs.request.desc")} params={[t("docs.request.param.phone"), t("docs.request.param.brand")]} response={t("docs.request.response")} />
              </section>

              {/* Verify */}
              <section id="verify" className="scroll-mt-24">
                <EndpointBlock title={t("docs.verify.title")} endpoint={t("docs.verify.endpoint")} desc={t("docs.verify.desc")} params={[t("docs.verify.param.id"), t("docs.verify.param.code")]} response={t("docs.verify.response")} />
              </section>

              {/* Errors table */}
              <section id="errors" className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.errors.title")}</h2>
                <div className="mt-4 overflow-x-auto vixify-scroll">
                  <table className="w-full min-w-[600px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th scope="col" className="py-2.5 pe-3 text-start font-medium text-muted-foreground">{t("docs.errors.table.code")}</th>
                        <th scope="col" className="py-2.5 px-3 text-start font-medium text-muted-foreground">{t("docs.errors.table.http")}</th>
                        <th scope="col" className="py-2.5 px-3 text-start font-medium text-muted-foreground">{t("docs.errors.table.meaning")}</th>
                        <th scope="col" className="py-2.5 ps-3 text-start font-medium text-muted-foreground">{t("docs.errors.table.action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ERROR_CODES.map((code) => (
                        <tr key={code} className="border-b border-border/60 align-top">
                          <td className="py-3 pe-3"><span className="rounded-md border border-gold/30 bg-gold-soft px-2 py-0.5 font-mono text-xs font-semibold text-gold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{code}</span></td>
                          <td className="py-3 px-3 font-mono text-xs text-muted-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{t(`docs.errors.row.${code}.http`)}</td>
                          <td className="py-3 px-3 text-muted-foreground">{t(`docs.errors.row.${code}.meaning`)}</td>
                          <td className="py-3 ps-3 text-foreground/90">{t(`docs.errors.row.${code}.action`)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Rate limits table */}
              <section id="ratelimits" className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.ratelimits.title")}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("docs.ratelimits.desc")}</p>
                <div className="mt-4 overflow-x-auto vixify-scroll">
                  <table className="w-full min-w-[400px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th scope="col" className="py-2.5 pe-3 text-start font-medium text-muted-foreground">{t("docs.ratelimits.table.scope")}</th>
                        <th scope="col" className="py-2.5 px-3 text-start font-medium text-muted-foreground">{t("docs.ratelimits.table.limit")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RATE_ROWS.map((r) => (
                        <tr key={r.scopeKey} className="border-b border-border/60">
                          <td className="py-3 pe-3 text-muted-foreground">{t(r.scopeKey)}</td>
                          <td className="py-3 px-3 font-mono text-xs text-foreground/90" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{t(r.valKey)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Webhook recipe */}
              <section id="webhooks" className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.webhook.recipe.title")}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("docs.webhook.recipe.desc")}</p>
                <p className="mt-3 font-mono text-xs text-gold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{t("docs.webhook.recipe.headers")}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("docs.webhook.recipe.steps")}</p>
                <div className="relative mt-4">
                  <button
                    type="button"
                    onClick={copyRecipe}
                    aria-label={t("a11y.copyCode")}
                    className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" strokeWidth={2} />}
                    {copied ? t("code.copied") : t("code.copy")}
                  </button>
                  <CodeBlock>{t("docs.webhook.recipe.code")}</CodeBlock>
                </div>
              </section>

              {/* Sandbox */}
              <section id="sandbox" className="scroll-mt-24">
                <div className="rounded-2xl border border-gold/30 bg-gold-soft p-6">
                  <div className="flex items-center gap-2.5">
                    <FlaskConical className="h-5 w-5 text-gold" strokeWidth={1.75} />
                    <h2 className="text-xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.sandbox.title")}</h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("docs.sandbox.desc")}</p>
                </div>
              </section>

              {/* Try it */}
              <section id="tryit" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-card/40 p-6">
                  <div className="flex items-center gap-2.5">
                    <Play className="h-5 w-5 text-gold" strokeWidth={1.75} />
                    <h2 className="text-xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-inter-tight)" }}>{t("docs.tryit.title")}</h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("docs.tryit.desc")}</p>
                  <a href="/contact" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Terminal className="h-4 w-4" strokeWidth={1.75} />
                    {t("docs.tryit.cta")}
                  </a>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre dir="ltr" className="mt-3 overflow-x-auto rounded-xl border border-border bg-card/60 p-4 font-mono text-sm leading-relaxed text-foreground vixify-scroll" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
      <code>{children}</code>
    </pre>
  );
}

function EndpointBlock({ title, endpoint, desc, params, response }: { title: string; endpoint: string; desc: string; params: string[]; response: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-inter-tight)" }}>{title}</h2>
      <div className="mt-3 space-y-3">
        <p className="text-base leading-relaxed text-muted-foreground">{desc}</p>
        <div dir="ltr" className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold-soft px-3 py-1.5 font-mono text-sm text-gold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{endpoint}</div>
        <ul className="space-y-1.5">
          {params.map((p, i) => (
            <li key={i} className="font-mono text-sm text-muted-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              <span className="text-foreground">{p}</span>
            </li>
          ))}
        </ul>
        <div dir="ltr" className="font-mono text-sm text-muted-foreground" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
          <span className="text-foreground">{response}</span>
        </div>
      </div>
    </div>
  );
}
