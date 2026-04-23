import { detectEmbed } from "@/lib/embed";
import type { ParsedMomentBody } from "@/lib/types";

function extractSection(body: string, heading: string): string | undefined {
  const marker = `### ${heading}`;
  const start = body.indexOf(marker);
  if (start === -1) return undefined;

  const sectionStart = start + marker.length;
  const rest = body.slice(sectionStart).replace(/^\s+/, "");
  const nextHeading = rest.search(/\n###\s+/);
  const value = nextHeading === -1 ? rest : rest.slice(0, nextHeading);
  return value.trim() || undefined;
}

export function parseMomentBody(body: string): ParsedMomentBody {
  const insight = extractSection(body, "Insight") ?? body.trim();
  const linkUrl = extractSection(body, "Link");
  const displayName = extractSection(body, "Display Name");

  return {
    insight,
    linkUrl,
    displayName,
    mediaEmbed: linkUrl ? detectEmbed(linkUrl) : undefined,
  };
}
