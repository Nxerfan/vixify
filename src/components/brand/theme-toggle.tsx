"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);
  // One-time mount flag to avoid SSR/CSR theme hydration mismatch.
  useEffect(
    // eslint-disable-next-line react-hooks/set-state-in-effect
    () => setMounted(true),
    []
  );

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={t("theme.toggle")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {mounted ? (
        isDark ? (
          <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        ) : (
          <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
