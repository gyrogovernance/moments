"use client";

import type { ReactNode } from "react";
import { GlassContainer, type GlassContainerProps } from "@/components/GlassContainer";

type LiquidGlassCardProps = Omit<GlassContainerProps, "children"> & {
  children: ReactNode;
};

export function LiquidGlassCard({ children, className = "", ...props }: LiquidGlassCardProps) {
  return (
    <GlassContainer
      className={className}
      disableBackground={true}
      disableBorder={true}
      style={{
        boxShadow: "var(--glass-card-shadow-lg), 0 0 0 0.3px rgba(0, 0, 0, 0.3)",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </GlassContainer>
  );
}
