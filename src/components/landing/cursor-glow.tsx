"use client";

import { useEffect, type CSSProperties } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

/**
 * A fixed, pointer-events-none radial gold glow that trails the cursor.
 * Adds atmosphere without distracting. Hidden on touch / reduced-motion.
 */
export function CursorGlow() {
  const { x, y, active } = useMousePosition();

  useEffect(() => {
    // hide entirely on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
  }, []);

  const style: CSSProperties = {
    left: x,
    top: y,
    opacity: active ? 1 : 0,
    transform: "translate(-50%, -50%)",
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-30 hidden h-[420px] w-[420px] rounded-full md:block"
      style={{
        ...style,
        background:
          "radial-gradient(circle, color-mix(in oklch, var(--gold) 16%, transparent) 0%, transparent 62%)",
        mixBlendMode: "screen",
        transition: "opacity 400ms ease",
      }}
    />
  );
}
