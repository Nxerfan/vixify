"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  MessageCircle,
  Github,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const EMAIL = "erfansadeghi230@gmail.com";

const SOCIALS = [
  { label: "Telegram", href: "https://t.me/nxerfan", Icon: Send },
  { label: "WhatsApp", href: "https://wa.me/nxerfan", Icon: MessageCircle },
  { label: "GitHub", href: "https://github.com/Nxerfan/", Icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nxerfan/",
    Icon: Linkedin,
  },
] as const;

const FAQ_ITEMS = [
  { qKey: "contact.faq.1.q", aKey: "contact.faq.1.a" },
  { qKey: "contact.faq.2.q", aKey: "contact.faq.2.a" },
  { qKey: "contact.faq.3.q", aKey: "contact.faq.3.a" },
] as const;

export default function ContactPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Vixify contact from ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API can fail in non-secure contexts; silently ignore.
    }
  };

  return (
    <>
      <PageHeader
        kickerKey="contact.page.kicker"
        titleKey="contact.page.title"
        subtitleKey="contact.page.subtitle"
      />

      {/* NEW: before-you-contact FAQ */}
      <section className="py-12">
        <div className="container-edge max-w-3xl">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {t("contact.faq.title")}
            </h2>
            <Accordion type="single" collapsible className="mt-4 w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={item.qKey} value={`faq-${i + 1}`}>
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline hover:text-gold [&[data-state=open]]:text-gold">
                    {t(item.qKey)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {t(item.aKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Existing: form + contact info (with NEW copy-email button) */}
      <section className="pb-16 sm:pb-20">
        <div className="container-edge">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 lg:grid-cols-2"
          >
            {/* LEFT: contact form */}
            <div>
              <h2
                className="text-xl font-semibold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t("contact.form.title")}
              </h2>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("contact.form.name")}</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">
                    {t("contact.form.email")}
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">
                    {t("contact.form.message")}
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="min-h-11 w-full bg-gold text-gold-foreground hover:brightness-105 sm:w-auto"
                >
                  {t("contact.form.submit")}
                  <Send className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </form>

              <p className="mt-3 text-xs text-muted-foreground">
                {t("contact.form.note")}
              </p>
            </div>

            {/* RIGHT: contact info */}
            <div>
              <h2
                className="text-xl font-semibold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {t("contact.info.title")}
              </h2>

              <div className="mt-5 space-y-3">
                {/* Email row — tap-to-mail + copy button */}
                <div className="flex items-stretch gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-gold/40 hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-gold">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        {t("contact.info.email")}
                      </span>
                      <span
                        dir="ltr"
                        className="block break-all text-sm font-medium text-foreground"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {EMAIL}
                      </span>
                    </span>
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={copyEmail}
                    aria-label={t("contact.copy.button")}
                    aria-pressed={copied}
                    className="min-h-11 min-w-11 shrink-0 border-border bg-card/40 px-3 text-muted-foreground hover:border-gold/40 hover:text-gold"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-gold" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span
                      className="sr-only sm:not-sr-only sm:ml-2 sm:text-xs"
                      aria-live="polite"
                    >
                      {copied
                        ? t("contact.copy.copied")
                        : t("contact.copy.button")}
                    </span>
                  </Button>
                </div>

                {/* Phone row — tap-to-call */}
                <a
                  href="tel:+982193931234"
                  className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-gold/40 hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-gold">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      {t("contact.info.phone")}
                    </span>
                    <span
                      dir="ltr"
                      className="block text-sm font-medium text-foreground"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      02193931234
                    </span>
                  </span>
                </a>

                {/* Social row — icon-only buttons (≥44px tap targets) */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-xs text-muted-foreground">
                {t("contact.info.response")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
