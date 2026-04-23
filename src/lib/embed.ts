import type { MediaEmbed } from "@/lib/types";

function tryParseUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

export function extractYouTubeId(url: string): string | null {
  const parsed = tryParseUrl(url);
  if (!parsed) return null;

  if (parsed.hostname.includes("youtu.be")) {
    return parsed.pathname.slice(1) || null;
  }

  if (parsed.hostname.includes("youtube.com")) {
    return parsed.searchParams.get("v");
  }

  return null;
}

export function extractVimeoId(url: string): string | null {
  const parsed = tryParseUrl(url);
  if (!parsed || !parsed.hostname.includes("vimeo.com")) return null;
  const parts = parsed.pathname.split("/").filter(Boolean);
  return parts.at(-1) ?? null;
}

export function detectEmbed(url: string): MediaEmbed {
  const youtubeId = extractYouTubeId(url);
  if (youtubeId) {
    return {
      type: "youtube",
      src: `https://www.youtube.com/embed/${youtubeId}`,
      href: url,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`,
    };
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return {
      type: "vimeo",
      src: `https://player.vimeo.com/video/${vimeoId}`,
      href: url,
    };
  }

  if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.split("?")[0] ?? "")) {
    return {
      type: "image",
      src: url,
      href: url,
    };
  }

  return {
    type: "link",
    href: url,
  };
}
