import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import type { MediaEmbed as MediaEmbedType } from "@/lib/types";

/* eslint-disable @next/next/no-img-element */

function getHostLabel(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function MediaEmbed({ embed, preview = false }: { embed: MediaEmbedType; preview?: boolean }) {
  if (embed.type === "youtube" || embed.type === "vimeo") {
    if (preview && embed.thumbnail) {
      return (
        <div className="relative overflow-hidden rounded-xl border border-border/40">
          <img src={embed.thumbnail} alt="Moment preview" className="h-52 w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircleIcon className="h-14 w-14 text-white drop-shadow-lg" />
          </div>
        </div>
      );
    }

    return (
      <iframe
        src={embed.src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video rounded-xl border border-border/30"
        loading="lazy"
        title="Moment media"
      />
    );
  }

  if (embed.type === "image") {
    return (
      <img
        src={embed.src}
        alt="Moment media"
        className={`w-full rounded-xl object-cover border border-border/30 ${preview ? "h-52" : "max-h-[480px]"}`}
        loading="lazy"
      />
    );
  }

  return (
    <a
      href={embed.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-border/50 bg-surface-elevated/50 p-4 hover:bg-surface-elevated/80"
    >
      <span className="text-2xl">🔗</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-foreground">{getHostLabel(embed.href)}</div>
        <div className="truncate text-sm text-foreground-secondary">{embed.href}</div>
      </div>
      <ArrowTopRightOnSquareIcon className="h-4 w-4 text-foreground-tertiary" />
    </a>
  );
}
