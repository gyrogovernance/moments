"use client";

import clsx from "clsx";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface GlassContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  blur?: number;
  saturation?: number;
  luminosity?: number;
  cornerRadius?: number;
  borderWidth?: number;
  borderOpacity?: number;
  shadowIntensity?: number;
  disableBackground?: boolean;
  disableBorder?: boolean;
}

export function GlassContainer({
  children,
  className,
  style,
  blur = 20,
  saturation = 165,
  luminosity = 100,
  cornerRadius = 24,
  borderWidth = 1,
  borderOpacity = 0.2,
  shadowIntensity = 0.12,
  disableBackground = false,
  disableBorder = false,
  ...props
}: GlassContainerProps) {
  const glassStyle: CSSProperties = {
    borderRadius: `${cornerRadius}px`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${luminosity}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${luminosity}%)`,
    boxShadow: `0 14px 42px rgba(0, 0, 0, ${shadowIntensity}), 0 6px 16px rgba(0, 0, 0, ${shadowIntensity * 0.7})`,
    ...(disableBackground ? { background: "transparent" } : {}),
    ...(disableBorder ? { border: "none" } : { border: `${borderWidth}px solid rgba(255, 255, 255, ${borderOpacity})` }),
    ...style,
  };

  return (
    <div className={clsx("glass-container", className)} style={glassStyle} {...props}>
      {children}
    </div>
  );
}
