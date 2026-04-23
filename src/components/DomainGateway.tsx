"use client";

import { SITE_CONFIG, type DomainLabel, type PrincipleLabel } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

export interface DomainGatewayProps {
  domain: {
    id: DomainLabel;
    slug: string;
    emoji: string;
    colorClass: string;
    invitation: string;
    primaryPrinciple: PrincipleLabel;
  };
  count: number;
  onSelect: (domain: DomainLabel) => void;
}

export function DomainGateway({ domain, count, onSelect }: DomainGatewayProps) {
  const principle = SITE_CONFIG.principles.find((item) => item.id === domain.primaryPrinciple);

  return (
    <button className="h-full text-left" onClick={() => onSelect(domain.id)} aria-label={`Show ${domain.id} moments`}>
      <LiquidGlassCard
        className={`glass-card ${domain.colorClass} h-full rounded-[2rem] shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02]`}
      >
        <div className="p-5 sm:p-6">
          <div className="mb-3 text-4xl">{domain.emoji}</div>
          <h3 className="text-xl font-bold text-foreground">{domain.id}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{domain.invitation}</p>
          {principle ? (
            <p className="mt-3 text-xs text-foreground-tertiary">Primary principle: {principle.shortName}</p>
          ) : null}
          {count > 0 ? (
            <p className="mt-1 text-xs text-foreground-tertiary">
              {count} {count === 1 ? "Moment" : "Moments"}
            </p>
          ) : null}
        </div>
      </LiquidGlassCard>
    </button>
  );
}
