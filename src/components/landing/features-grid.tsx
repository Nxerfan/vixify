"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Zap, KeyRound, Webhook, Globe } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

interface Feature {
  icon: ReactNode;
  titleKey: string;
  descKey: string;
  detailKey: string;
  index: number;
}

const FEATURES: Feature[] = [
  {
    icon: <Zap className="h-5 w-5" strokeWidth={1.75} />,
    titleKey: "features.1.title",
    descKey: "features.1.desc",
    detailKey: "features.1.detail",
    index: 1,
  },
  {
    icon: <KeyRound className="h-5 w-5" strokeWidth={1.75} />,
    titleKey: "features.2.title",
    descKey: "features.2.desc",
    detailKey: "features.2.detail",
    index: 2,
  },
  {
    icon: <Webhook className="h-5 w-5" strokeWidth={1.75} />,
    titleKey: "features.3.title",
    descKey: "features.3.desc",
    detailKey: "features.3.detail",
    index: 3,
  },
  {
    icon: <Globe className="h-5 w-5" strokeWidth={1.75} />,
    titleKey: "features.4.title",
    descKey: "features.4.desc",
    detailKey: "features.4.detail",
    index: 4,
  },
];

export function FeaturesGrid() {
  const { t } = useLocale();

  return (
    <section
      id="features"
      className="relative scroll-mt-20 py-20 sm:py-28"
      aria-labelledby="features-title"
    >
      <div className="container-edge">
        <SectionHeading
          kicker={t("features.kicker")}
          title={t("features.title")}
          subtitle={t("features.subtitle")}
          titleId="features-title"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.titleKey} feature={f} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduceMotion ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition-colors",
        "hover:border-gold/40"
      )}
    >
      {/* gold sheen on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, color-mix(in oklch, var(--gold) 10%, transparent) 0%, transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold-soft text-gold">
          {feature.icon}
        </div>
        <span className="font-mono text-xs text-muted-foreground/70">
          0{feature.index}
        </span>
      </div>

      <h3
        className="relative mt-5 text-lg font-semibold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        {t(feature.titleKey)}
      </h3>
      <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {t(feature.descKey)}
      </p>

      <div className="relative mt-5 border-t border-border pt-3.5">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-gold/80">
          {t(feature.detailKey)}
        </span>
      </div>
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  titleId,
  align = "left",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  titleId?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className="kicker">{kicker}</span>
      <h2
        id={titleId}
        className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
