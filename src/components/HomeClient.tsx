"use client";

import { useState } from "react";
import { RESOURCE_LINKS, type DomainLabel } from "@/content/config";
import { CreateMomentPrompt } from "@/components/CreateMomentPrompt";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { MomentsFeed } from "@/components/MomentsFeed";
import { StudioHero } from "@/components/StudioHero";
import type { Moment } from "@/lib/types";

export function HomeClient({ moments }: { moments: Moment[] }) {
  const [selectedDomain, setSelectedDomain] = useState<"All" | DomainLabel>("All");

  const handleSelectDomain = (domain: DomainLabel) => {
    setSelectedDomain(domain);
    document.getElementById("moments-feed")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-12">
      <StudioHero moments={moments} onSelectDomain={handleSelectDomain} />

      <MomentsFeed key={selectedDomain} moments={moments} initialDomain={selectedDomain} />

      <CreateMomentPrompt />

      <section className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Resources</h2>
          <p className="mt-3 text-foreground-secondary">
            Read the framework behind Moments and the broader Gyro Governance research program.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {RESOURCE_LINKS.map((resource) => (
            <a key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="block">
              <LiquidGlassCard className="glass-card glass-card-translucent rounded-[1.5rem] h-full shadow-2xl hover:-translate-y-1">
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">{resource.title}</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">{resource.description}</p>
                </div>
              </LiquidGlassCard>
            </a>
          ))}
        </div>
      </section>

      <LiquidGlassCard className="glass-card glass-card-emerald rounded-[2rem] shadow-2xl">
        <div className="p-6 text-center sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Moments is built on the Moments Economy.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground-secondary">
            The app is a public curation layer for the same four domains and four principles that run through the wider Gyro Governance framework.
          </p>
          <a
            href="https://github.com/gyrogovernance/superintelligence"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button mt-5 inline-flex rounded-full px-5 py-3 text-sm font-semibold"
          >
            Learn more
          </a>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
