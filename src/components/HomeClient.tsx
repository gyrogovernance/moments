"use client";

import { useState } from "react";
import { type DomainLabel } from "@/content/config";
import { CreateMomentPrompt } from "@/components/CreateMomentPrompt";
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
    <div className="space-y-10">
      <StudioHero moments={moments} onSelectDomain={handleSelectDomain} />
      <MomentsFeed key={selectedDomain} moments={moments} initialDomain={selectedDomain} />
      <CreateMomentPrompt />
    </div>
  );
}
