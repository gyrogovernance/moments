"use client";

import { useMemo, useState } from "react";
import { SITE_CONFIG, type DomainLabel, type PrincipleLabel } from "@/content/config";
import { MomentCard } from "@/components/MomentCard";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import type { Moment } from "@/lib/types";

type SortMode = "Newest" | "Most commented" | "Most reacted";

function sortMoments(moments: Moment[], sortMode: SortMode) {
  return [...moments].sort((a, b) => {
    if (sortMode === "Most commented") return b.commentCount - a.commentCount;
    if (sortMode === "Most reacted") {
      const reactionsA = Object.values(a.reactionCounts).reduce((sum, value) => sum + value, 0);
      const reactionsB = Object.values(b.reactionCounts).reduce((sum, value) => sum + value, 0);
      return reactionsB - reactionsA;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function MomentsFeed({
  moments,
  initialDomain = "All",
}: {
  moments: Moment[];
  initialDomain?: "All" | DomainLabel;
}) {
  const [selectedDomain, setSelectedDomain] = useState<"All" | DomainLabel>(initialDomain);
  const [selectedPrinciple, setSelectedPrinciple] = useState<PrincipleLabel | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("Newest");

  const filteredMoments = useMemo(() => {
    const byDomain =
      selectedDomain === "All" ? moments : moments.filter((moment) => moment.domain === selectedDomain);
    const byPrinciple = selectedPrinciple
      ? byDomain.filter((moment) => moment.principles.includes(selectedPrinciple))
      : byDomain;
    return sortMoments(byPrinciple, sortMode);
  }, [moments, selectedDomain, selectedPrinciple, sortMode]);

  return (
    <section id="moments-feed" className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...SITE_CONFIG.domains.map((domain) => domain.id)] as const).map((domain) => (
          <button
            key={domain}
            onClick={() => setSelectedDomain(domain)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-md transition-all duration-200 ${
              selectedDomain === domain
                ? "border-classic-blue/50 bg-classic-blue/15 text-foreground"
                : "border-border/50 bg-white/12 text-foreground-secondary hover:bg-white/20 dark:bg-white/5"
            }`}
          >
            {domain === "All"
              ? "All"
              : `${SITE_CONFIG.domains.find((item) => item.id === domain)?.emoji} ${domain}`}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {SITE_CONFIG.principles.map((principle) => (
          <button
            key={principle.id}
            onClick={() => setSelectedPrinciple((current) => (current === principle.id ? null : principle.id))}
            title={principle.description}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              selectedPrinciple === principle.id
                ? "border-classic-purple/50 bg-classic-purple/15 text-foreground"
                : "border-border/50 bg-surface-elevated/70 text-foreground-secondary hover:bg-surface-elevated"
            }`}
          >
            {principle.shortName}
          </button>
        ))}

        <select
          className="ml-auto rounded-full border border-border/50 bg-surface-elevated/70 px-4 py-2 text-sm text-foreground"
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as SortMode)}
          aria-label="Sort moments"
        >
          <option>Newest</option>
          <option>Most commented</option>
          <option>Most reacted</option>
        </select>
      </div>

      {filteredMoments.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredMoments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} />
          ))}
        </div>
      ) : (
        <LiquidGlassCard className="glass-card glass-card-translucent rounded-[2rem] shadow-2xl">
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-foreground">No Moments yet in this view.</h3>
            <p className="mt-3 text-foreground-secondary">Be the first to share one.</p>
            <a
              href={SITE_CONFIG.createMomentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button mt-5 inline-flex rounded-full px-5 py-3 text-sm font-semibold"
            >
              Create a Moment on GitHub
            </a>
          </div>
        </LiquidGlassCard>
      )}
    </section>
  );
}
