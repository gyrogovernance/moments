import { SITE_CONFIG } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import GitHubIcon from "@/components/GitHubIcon";

export function CreateMomentPrompt() {
  return (
    <LiquidGlassCard className="glass-card glass-card-emerald rounded-[2rem] shadow-2xl">
      <div className="p-6 sm:p-8">
        <div className="mb-6 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">Have a link, a video, or a thought?</h2>
          <p className="mx-auto max-w-xl text-foreground-secondary">
            Share it as a Moment. Pick a domain, paste your link, write a sentence about why it matters.
          </p>
        </div>

        <div className="glass-card-inner mb-6 rounded-xl p-4 sm:p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-foreground-tertiary">
            Before you post, check your Moment against these four principles:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SITE_CONFIG.principles.map((principle) => (
              <div key={principle.id} className="flex items-start gap-2">
                <span className="mt-0.5 text-foreground-tertiary">✓</span>
                <p className="text-sm text-foreground-secondary">
                  <strong className="text-foreground">{principle.shortName}</strong> - {principle.guidance}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href={SITE_CONFIG.createMomentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-classic-blue via-classic-purple to-classic-pink px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <GitHubIcon className="mr-2 h-4 w-4" />
            Create a Moment on GitHub
          </a>
          <p className="mt-3 text-xs text-foreground-tertiary">
            You will need a GitHub account. Your Moment appears here within 10 minutes.
          </p>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
