import Link from "next/link";
import { SITE_CONFIG } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { getMoments } from "@/lib/moments";

export default function ExplorePage() {
  const moments = getMoments();

  return (
    <div className="animate-fade-in-up space-y-6 pt-4">
      <h2 className="text-center text-xl font-bold text-foreground">Explore by Domain</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {SITE_CONFIG.domains.map((domain) => {
          const count = moments.filter((moment) => moment.domain === domain.id).length;

          return (
            <Link key={domain.id} href={`/?domain=${domain.id}`} className="block">
              <LiquidGlassCard
                className={`glass-card ${domain.colorClass} rounded-[2rem] shadow-2xl transition-all hover:scale-[1.02]`}
              >
                <div className="p-6 text-center">
                  <div className="mb-3 text-5xl">{domain.emoji}</div>
                  <h3 className="text-xl font-bold text-foreground">{domain.id}</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">{domain.invitation}</p>
                  <p className="mt-4 text-xs text-foreground-tertiary">{count} Moments</p>
                </div>
              </LiquidGlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
