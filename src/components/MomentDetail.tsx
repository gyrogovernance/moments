import { ArrowTopRightOnSquareIcon, ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { marked } from "marked";
import { SITE_CONFIG } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { MediaEmbed } from "@/components/MediaEmbed";
import type { Moment } from "@/lib/types";

marked.setOptions({ gfm: true, breaks: true });

export async function MomentDetail({ moment }: { moment: Moment }) {
  const domainConfig = SITE_CONFIG.domains.find((domain) => domain.id === moment.domain);
  const totalReactions = Object.values(moment.reactionCounts).reduce((sum, value) => sum + value, 0);
  const html = await marked.parse(moment.parsedBody.insight);

  return (
    <LiquidGlassCard className={`glass-card ${domainConfig?.colorClass ?? "glass-card-translucent"} rounded-[2rem] shadow-2xl`}>
      <article className="space-y-6 p-5 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/12 px-3 py-1 text-sm font-semibold text-foreground-secondary dark:bg-white/5">
            {domainConfig?.emoji} {moment.domain}
          </span>
          {moment.principles.map((principleId) => {
            const principle = SITE_CONFIG.principles.find((item) => item.id === principleId);
            return principle ? (
              <span
                key={principleId}
                className="inline-flex items-center rounded-full border border-border/50 bg-surface-elevated/60 px-3 py-1 text-sm font-semibold text-foreground-secondary"
                title={principle.displacementWarning}
              >
                {principle.shortName}
              </span>
            ) : null;
          })}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{moment.title}</h1>
          <p className="mt-3 text-base text-foreground-secondary">
            Shared by <span className="font-semibold text-foreground">{moment.parsedBody.displayName || moment.author}</span> on{" "}
            {new Date(moment.createdAt).toLocaleDateString()}
          </p>
        </div>

        {moment.parsedBody.mediaEmbed ? <MediaEmbed embed={moment.parsedBody.mediaEmbed} /> : null}

        <div className="prose max-w-none text-foreground-secondary" dangerouslySetInnerHTML={{ __html: html }} />

        {moment.principles.length > 0 ? (
          <div className="glass-card-inner space-y-2 rounded-xl p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground-tertiary">Principle Checks (The Human Mark)</p>
            {moment.principles.map((principleId) => {
              const principle = SITE_CONFIG.principles.find((item) => item.id === principleId);
              return principle ? (
                <div key={principleId} className="flex items-start gap-2 text-sm text-foreground-secondary">
                  <span className="mt-0.5 text-foreground-tertiary">✓</span>
                  <div>
                    <p>
                      <strong className="text-foreground">{principle.fullName}</strong> - {principle.description}
                    </p>
                    <p className="mt-1 text-xs text-foreground-tertiary">{principle.displacementWarning}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        ) : null}

        <div className="glass-card-inner rounded-xl p-4 text-sm text-foreground-secondary">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <HeartIcon className="h-4 w-4" />
              {totalReactions} reactions
            </span>
            <span className="inline-flex items-center gap-1">
              <ChatBubbleLeftIcon className="h-4 w-4" />
              {moment.commentCount} comments
            </span>
            <a
              href={moment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-classic-blue"
            >
              Open on GitHub
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </LiquidGlassCard>
  );
}
