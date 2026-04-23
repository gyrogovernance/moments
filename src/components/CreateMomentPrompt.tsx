import { SITE_CONFIG } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import GitHubIcon from "@/components/GitHubIcon";

export function CreateMomentPrompt() {
  return (
    <LiquidGlassCard className="glass-card glass-card-translucent rounded-[2rem] shadow-2xl">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">Share a Moment</h2>
        <p className="mt-3 max-w-2xl text-foreground-secondary">
          A Moment is a link and a reflection. It takes two minutes. GitHub Discussions is the form, the archive, and the public record.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {SITE_CONFIG.domains.map((domain) => (
            <div key={domain.id} className="glass-card-inner rounded-xl p-4">
              <div className="text-sm font-semibold text-foreground">
                {domain.emoji} {domain.id}
              </div>
              <p className="mt-2 text-sm text-foreground-secondary">{domain.prompt}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start gap-3">
          <a
            href={SITE_CONFIG.createMomentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-classic-blue via-classic-purple to-classic-pink px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl"
          >
            <GitHubIcon className="mr-2 h-4 w-4" />
            Create a Moment on GitHub
          </a>
          <p className="text-sm text-foreground-tertiary">
            You will need a GitHub account. Your Moment appears here after the next rebuild.
          </p>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
