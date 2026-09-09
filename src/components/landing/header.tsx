"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VixifyLogo } from "@/components/brand/vixify-logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { LanguageSwitcher } from "@/components/brand/language-switcher";
import { useLocale } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "nav.pricing", href: "/pricing" },
  { key: "nav.docs", href: "/docs" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.about", href: "/about" },
  { key: "nav.contact", href: "/contact" },
] as const;

export function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-edge flex h-16 items-center justify-between gap-4">
        <a
          href="/"
          aria-label={t("a11y.logo")}
          className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <VixifyLogo size={34} />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive(item.href)
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
          <a
            href="/pricing"
            className="group hidden items-center gap-1.5 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
          >
            {t("nav.getStarted")}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.25}
            />
          </a>

          <button
            type="button"
            aria-label={t("a11y.openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(82vw,360px)] flex-col border-l border-border bg-card p-5 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.menu")}
            >
              <div className="flex items-center justify-between">
                <VixifyLogo size={32} />
                <button
                  type="button"
                  aria-label={t("a11y.closeMenu")}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive(item.href)
                        ? "bg-secondary text-gold"
                        : "text-foreground/90 hover:bg-secondary hover:text-gold"
                    )}
                  >
                    {t(item.key)}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex items-center gap-2 pt-6">
                <LanguageSwitcher className="flex-1 justify-center" />
                <ThemeToggle />
              </div>

              <a
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("nav.getStarted")}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
