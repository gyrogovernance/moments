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
    <section className="mb-14 animate-fade-in-up text-center">
      <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        <span className={`bg-gradient-to-r ${SITE_CONFIG.primaryGradient} bg-clip-text text-transparent`}>
          What would life look like if poverty, unemployment, misinformation, and ecological degradation were solved?
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary">
        Share a link. Share a vision. A Moment at a time.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SITE_CONFIG.domains.map((domain) => (
          <DomainGateway
            key={domain.id}
            domain={domain}
            count={moments.filter((moment) => moment.domain === domain.id).length}
            onSelect={onSelectDomain}
          />
        ))}
      </div>
    </section>
  );
}
