"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Send, MessageCircle, Github, Linkedin } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { useLocale } from "@/i18n/locale-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

export default function ContactPage() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Vixify contact from ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:erfansadeghi230@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PageHeader
        kickerKey="contact.page.kicker"
        titleKey="contact.page.title"
        subtitleKey="contact.page.subtitle"
      />

      <section className="py-16 sm:py-20">
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
                  className="w-full bg-gold text-gold-foreground hover:brightness-105 sm:w-auto"
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
                {/* Email row — tap-to-mail */}
                <a
                  href="mailto:erfansadeghi230@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-gold/40 hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      erfansadeghi230@gmail.com
                    </span>
                  </span>
                </a>

                {/* Phone row — tap-to-call */}
                <a
                  href="tel:+982193931234"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-gold/40 hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

                {/* Social row — icon-only buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
