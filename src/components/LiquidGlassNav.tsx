"use client";

import type { ReactNode } from "react";
import { GlassContainer } from "@/components/GlassContainer";

export function LiquidGlassNav({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <GlassContainer
      className={`glass-nav rounded-[2rem] ${className}`}
      blur={22}
      saturation={130}
      luminosity={105}
      cornerRadius={32}
      borderWidth={0}
      borderOpacity={0}
      shadowIntensity={0.06}
      style={{
        background: "var(--glass-nav-bg)",
        border: "1.5px solid var(--glass-nav-border)",
        boxShadow: "var(--glass-nav-shadow), 0 0 0 0.3px rgba(0, 0, 0, 0.3)",
      }}
    >
      {children}
    </GlassContainer>
  );
}
