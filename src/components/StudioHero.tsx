"use client";

import { SITE_CONFIG, type DomainLabel } from "@/content/config";
import { DomainGateway } from "@/components/DomainGateway";
import type { Moment } from "@/lib/types";

export function StudioHero({
  moments,
  onSelectDomain,
}: {
  moments: Moment[];
  onSelectDomain: (domain: DomainLabel) => void;
}) {
  return (
    <section className="animate-fade-in-up space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-classic-blue via-classic-purple to-classic-pink bg-clip-text text-transparent">
            What would life look like without poverty, unemployment, misinformation, and ecological degradation?
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
          Share a link, a video, or a thought. A Moment at a time.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SITE_CONFIG.domains.map((domain) => (
          <DomainGateway
            key={domain.id}
            domain={domain}
            count={moments.filter((moment) => moment.domain === domain.id).length}
            onSelect={onSelectDomain}
          />
        ))}
      </div>

      <div className="glass-card-inner rounded-xl p-4 text-center sm:p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground-tertiary">Guided by The Human Mark</p>
        <p className="mt-2 text-sm text-foreground-secondary">
          Every Moment is checked against four principles from The Human Mark:
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {SITE_CONFIG.principles.map((principle) => (
            <span
              key={principle.id}
              className="inline-flex items-center rounded-full border border-border/50 bg-surface-elevated/60 px-3 py-1 text-xs font-semibold text-foreground-secondary"
              title={principle.description}
            >
              {principle.shortName}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
