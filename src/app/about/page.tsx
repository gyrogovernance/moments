import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { SITE_CONFIG } from "@/content/config";

export default function AboutPage() {
  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">About Moments</h1>
        <p className="mx-auto max-w-3xl text-lg text-foreground-secondary">
          A place to share visions of life beyond poverty, unemployment, misinformation, and ecological degradation. One link, one thought, one Moment at a time.
        </p>
      </div>

      <LiquidGlassCard className="glass-card glass-card-blue rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-5 sm:p-6">
          <h2 className="text-2xl font-bold text-foreground">What is a Moment?</h2>
          <p className="text-foreground-secondary">
            A Moment is a link, a video, an image, or a short reflection. It contributes one piece of context to one domain. You share it, you say why it matters, and it becomes part of the public record.
          </p>
          <p className="text-foreground-secondary">
            Example: a video about how communities change when everyone has a baseline income, with a sentence about why it resonated with you.
          </p>
        </div>
      </LiquidGlassCard>

      <LiquidGlassCard className="glass-card glass-card-purple rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-5 sm:p-6">
          <h2 className="text-2xl font-bold text-foreground">The Four Domains</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {SITE_CONFIG.domains.map((domain) => (
              <div key={domain.id} className="glass-card-inner rounded-xl p-4">
                <h3 className="font-bold text-foreground">
                  {domain.emoji} {domain.id}
                </h3>
                <p className="mt-2 text-sm text-foreground-secondary">{domain.lens}</p>
              </div>
            ))}
          </div>
        </div>
      </LiquidGlassCard>

      <LiquidGlassCard className="glass-card glass-card-amber rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-5 sm:p-6">
          <h2 className="text-2xl font-bold text-foreground">The Four Principles (The Human Mark)</h2>
          <p className="text-foreground-secondary">
            Every Moment is checked against four alignment principles from The Human Mark. The principles are not the same thing as the risks beneath them: each principle has a corresponding displacement risk that appears when Direct and Indirect Authority or Agency are confused.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {SITE_CONFIG.principles.map((principle) => (
              <div key={principle.id} className="glass-card-inner rounded-xl p-4">
                <h3 className="font-bold text-foreground">{principle.shortName}</h3>
                <p className="mt-1 text-sm text-foreground-secondary">{principle.description}</p>
                <p className="mt-2 text-xs text-foreground-tertiary">
                  Displacement risk: {principle.displacement} - {principle.displacementWarning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </LiquidGlassCard>

      <LiquidGlassCard className="glass-card glass-card-emerald rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-5 sm:p-6">
          <h2 className="text-2xl font-bold text-foreground">How to Share a Moment</h2>
          <ol className="list-decimal space-y-2 pl-5 text-foreground-secondary">
            <li>Click &quot;Create a Moment on GitHub.&quot;</li>
            <li>Pick a domain.</li>
            <li>Paste your link and write a short reflection.</li>
            <li>Tag the principle(s) your Moment respects.</li>
            <li>Submit. Your Moment appears here within 10 minutes.</li>
          </ol>
          <p className="text-sm text-foreground-tertiary">
            You will need a GitHub account. All data is stored publicly in GitHub Discussions.
          </p>
          <a
            href={SITE_CONFIG.createMomentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-gradient-to-r from-classic-blue via-classic-purple to-classic-pink px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            Create a Moment on GitHub
          </a>
        </div>
      </LiquidGlassCard>

      <LiquidGlassCard className="glass-card glass-card-translucent rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-5 sm:p-6">
          <h2 className="text-2xl font-bold text-foreground">Behind the Sandbox</h2>
          <p className="text-foreground-secondary">
            Moments is grounded in the Moments Economy framework and The Human Mark, an AI safety epistemological framework developed by Gyro Governance. The four domains correspond to the four governance capacities that coherent collective intelligence must maintain. The four principles guard against the four structural displacement risks.
          </p>
          <p className="text-foreground-secondary">
            Every Moment is a public record on GitHub. Nothing is hidden, nothing is sold. The app is open source and can be forked by any community.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/gyrogovernance/moments"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button inline-flex rounded-full px-5 py-3 text-sm font-semibold"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/gyrogovernance/superintelligence/blob/main/docs/AIR_Moments_Economy_Whitepaper.md"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button inline-flex rounded-full px-5 py-3 text-sm font-semibold"
            >
              Read the Whitepaper
            </a>
            <a
              href="https://github.com/gyrogovernance/superintelligence/blob/main/docs/AIR_Moments_Economy_Specs.md"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button inline-flex rounded-full px-5 py-3 text-sm font-semibold"
            >
              Read the Specification
            </a>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
