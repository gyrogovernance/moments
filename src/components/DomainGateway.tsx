"use client";

import type { DomainLabel } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

export interface DomainGatewayProps {
  domain: {
    id: DomainLabel;
    slug: string;
    emoji: string;
    invitation: string;
    colorClass: string;
  };
  count: number;
  onSelect: (domain: DomainLabel) => void;
}

export function DomainGateway({ domain, count, onSelect }: DomainGatewayProps) {
  return (
    <button className="text-left h-full" onClick={() => onSelect(domain.id)} aria-label={`Show ${domain.id} moments`}>
      <LiquidGlassCard
        className={`glass-card ${domain.colorClass} rounded-[2rem] h-full shadow-2xl hover:-translate-y-1 hover:scale-[1.02]`}
      >
        <div className="p-5 sm:p-6">
          <div className="mb-3 text-5xl">{domain.emoji}</div>
          <h3 className="text-xl font-bold text-foreground">{domain.id}</h3>
          <p className="mt-2 text-sm text-foreground-secondary">{domain.invitation}</p>
          <div className="mt-4 inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-foreground-secondary dark:bg-white/5">
            {count} {count === 1 ? "Moment" : "Moments"}
          </div>
        </div>
      </LiquidGlassCard>
    </button>
  );
}
