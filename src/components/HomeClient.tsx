"use client";

import { useSearchParams } from "next/navigation";
import { DOMAIN_ORDER, type DomainLabel } from "@/content/config";
import { MomentsFeed } from "@/components/MomentsFeed";
import type { Moment } from "@/lib/types";

export function HomeClient({
  moments,
  initialDomain = "All",
}: {
  moments: Moment[];
  initialDomain?: "All" | DomainLabel;
}) {
  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Moments</h1>
        <p className="text-xl font-bold sm:text-2xl">
        <span className="bg-gradient-to-r from-classic-blue via-classic-purple to-classic-pink bg-clip-text text-transparent">
          What would life look like without poverty, unemployment, misinformation, and ecological degradation?
        </span>
        </p>
      </div>

      <MomentsFeed key={initialDomain} moments={moments} initialDomain={initialDomain} />
    </div>
  );
}

export function HomeClientWithSearch({ moments }: { moments: Moment[] }) {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") as DomainLabel | null;
  const initialDomain: "All" | DomainLabel =
    domainParam && DOMAIN_ORDER.includes(domainParam) ? domainParam : "All";

  return <HomeClient moments={moments} initialDomain={initialDomain} />;
}
