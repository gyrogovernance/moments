import { SITE_CONFIG } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">About Moments</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground-secondary">
          Moments is a GitHub-native civil governance sandbox. It turns Discussions into a public feed of links, reflections, and shared visions.
        </p>
      </div>

      <LiquidGlassCard className="glass-card glass-card-blue rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">How it works</h2>
          <p className="text-foreground-secondary">
            Contributors create a Discussion in the <span className="font-semibold text-foreground">moments</span> category. A workflow applies the canonical labels. The site reads Discussions at build time and publishes a static feed.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass-card-inner rounded-xl p-4">
              <h3 className="font-bold text-foreground">Canonical domains</h3>
              <p className="mt-2 text-sm text-foreground-secondary">Economy, Employment, Education, Ecology</p>
            </div>
            <div className="glass-card-inner rounded-xl p-4">
              <h3 className="font-bold text-foreground">Canonical principles</h3>
              <p className="mt-2 text-sm text-foreground-secondary">GMT, ICV, IIA, ICI</p>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      <LiquidGlassCard className="glass-card glass-card-purple rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">How to contribute</h2>
          <ol className="list-decimal space-y-2 pl-5 text-foreground-secondary">
            <li>Open GitHub Discussions for this repository.</li>
            <li>Create a new post in the <span className="font-semibold text-foreground">moments</span> category.</li>
            <li>Add your insight, a link if relevant, and the selected domain and principles.</li>
            <li>Wait for the next build. Your Moment will appear on the site.</li>
          </ol>
          <a
            href={SITE_CONFIG.createMomentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button inline-flex rounded-full px-5 py-3 text-sm font-semibold"
          >
            Open Discussions
          </a>
        </div>
      </LiquidGlassCard>

      <LiquidGlassCard className="glass-card glass-card-amber rounded-[2rem] shadow-2xl">
        <div className="space-y-4 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Forking and customization</h2>
          <p className="text-foreground-secondary">
            The branding, domains, labels, and prompts live in configuration. Fork the repo, adjust `src/content/config.ts`, enable Discussions and Pages, and deploy your own instance.
          </p>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
