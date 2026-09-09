"use client";

import { Globe } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import type { Locale } from "@/i18n/messages";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  const toggle = () => setLocale((locale === "en" ? "fa" : "en") as Locale);

  return (
    <button
      type="button"
      aria-label={t("lang.label")}
      onClick={toggle}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-2.5 text-xs font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Globe className="h-[15px] w-[15px]" strokeWidth={1.75} />
      <span className="font-mono uppercase tracking-wide">
        {locale === "en" ? "EN" : "FA"}
      </span>
    </button>
  );
}
