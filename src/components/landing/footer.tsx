"use client";

import { Mail, Phone, Github, Linkedin, MessageCircle, Send } from "lucide-react";
import { VixifyLogo } from "@/components/brand/vixify-logo";
import { useLocale } from "@/i18n/locale-context";

const CONTACT = {
  email: "erfansadeghi230@gmail.com",
  phone: "02193931234",
  phoneHref: "tel:+982193931234",
  telegram: "@nxerfan",
  telegramHref: "https://t.me/nxerfan",
  github: "Nxerfan",
  githubHref: "https://github.com/Nxerfan/",
  linkedin: "in/nxerfan",
  linkedinHref: "https://www.linkedin.com/in/nxerfan/",
  whatsapp: "@nxerfan",
  whatsappHref: "https://wa.me/nxerfan",
};

const COLUMNS = [
  {
    titleKey: "footer.product",
    links: [
      { labelKey: "footer.product.pricing", href: "/pricing" },
      { labelKey: "footer.product.changelog", href: "/changelog" },
      { labelKey: "footer.product.status", href: "/status" },
    ],
  },
  {
    titleKey: "footer.developers",
    links: [
      { labelKey: "footer.developers.docs", href: "/docs" },
      { labelKey: "footer.developers.sdk", href: "/docs" },
      { labelKey: "footer.developers.api", href: "/docs" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.company.about", href: "/about" },
      { labelKey: "footer.company.contact", href: "/contact" },
      { labelKey: "footer.company.blog", href: "/blog" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { labelKey: "footer.legal.privacy", href: "/privacy" },
      { labelKey: "footer.legal.terms", href: "/terms" },
    ],
  },
] as const;

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border bg-card/40">
      <div className="container-edge py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <a href="/" aria-label={t("a11y.logo")}>
              <VixifyLogo size={36} />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>

            <div className="mt-6 grid gap-2.5">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" strokeWidth={1.75} />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.75} />
                <span dir="ltr">{CONTACT.phone}</span>
                <span className="text-xs text-muted-foreground/70">
                  ({t("footer.contact.phone")})
                </span>
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <SocialLink href={CONTACT.telegramHref} label="Telegram">
                <Send className="h-4 w-4" strokeWidth={1.75} />
              </SocialLink>
              <SocialLink href={CONTACT.whatsappHref} label="WhatsApp">
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              </SocialLink>
              <SocialLink href={CONTACT.githubHref} label="GitHub">
                <Github className="h-4 w-4" strokeWidth={1.75} />
              </SocialLink>
              <SocialLink href={CONTACT.linkedinHref} label="LinkedIn">
                <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              </SocialLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.titleKey}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-gold">
                  {t(col.titleKey)}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.labelKey}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t(link.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} Vixify. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t("footer.family")}
            </span>
            <span className="hidden sm:inline">·</span>
            <span>{t("footer.madeWith")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/60 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </a>
  );
}
