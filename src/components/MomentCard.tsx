import Link from "next/link";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { SITE_CONFIG } from "@/content/config";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { MediaEmbed } from "@/components/MediaEmbed";
import type { Moment } from "@/lib/types";

/* eslint-disable @next/next/no-img-element */

function previewText(text: string) {
  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}

export function MomentCard({ moment }: { moment: Moment }) {
  const domainConfig = SITE_CONFIG.domains.find((domain) => domain.id === moment.domain);
  const totalReactions = Object.values(moment.reactionCounts).reduce((sum, value) => sum + value, 0);

  return (
    <Link href={`/moment/${moment.number}`} className="block">
      <LiquidGlassCard
        className={`glass-card ${domainConfig?.colorClass ?? "glass-card-translucent"} h-full rounded-[1.5rem] shadow-2xl transition-all duration-200 hover:-translate-y-1`}
      >
        <article className="flex h-full flex-col gap-4 p-4">
          {moment.parsedBody.mediaEmbed ? <MediaEmbed embed={moment.parsedBody.mediaEmbed} preview={true} /> : null}

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold text-foreground-secondary dark:bg-white/5">
              {domainConfig?.emoji} {moment.domain}
            </span>
            {moment.principles.map((principleId) => {
              const principle = SITE_CONFIG.principles.find((item) => item.id === principleId);
              return principle ? (
                <span
                  key={principleId}
                  className="inline-flex items-center rounded-full border border-border/50 bg-surface-elevated/60 px-3 py-1 text-xs font-semibold text-foreground-secondary"
                  title={principle.description}
                >
                  {principle.shortName}
                </span>
              ) : null;
            })}
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground">{moment.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{previewText(moment.parsedBody.insight)}</p>
          </div>

          <div className="mt-auto flex items-center gap-3 border-t border-border/30 pt-4 text-xs text-foreground-tertiary">
            {moment.authorAvatarUrl ? (
              <img src={moment.authorAvatarUrl} alt="" className="h-8 w-8 rounded-full border border-border/40" />
            ) : (
              <div className="h-8 w-8 rounded-full border border-border/40 bg-surface-elevated/60" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold text-foreground-secondary">{moment.parsedBody.displayName || moment.author}</div>
              <div>{new Date(moment.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-1">
              <HeartIcon className="h-4 w-4" />
              {totalReactions}
            </div>
            <div className="flex items-center gap-1">
              <ChatBubbleLeftIcon className="h-4 w-4" />
              {moment.commentCount}
            </div>
          </div>
        </article>
      </LiquidGlassCard>
    </Link>
  );
}
