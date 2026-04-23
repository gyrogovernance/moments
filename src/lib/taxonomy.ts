import { DOMAIN_ORDER, PRINCIPLE_ORDER, type DomainLabel, type PrincipleLabel } from "@/content/config";

export function getCanonicalDomainLabels() {
  return [...DOMAIN_ORDER];
}

export function getCanonicalPrincipleLabels() {
  return [...PRINCIPLE_ORDER];
}

export function domainFromLabels(labels: string[]): DomainLabel | null {
  const matches = DOMAIN_ORDER.filter((label) => labels.includes(label));
  return matches.length === 1 ? matches[0] : null;
}

export function principlesFromLabels(labels: string[]): PrincipleLabel[] {
  return PRINCIPLE_ORDER.filter((label) => labels.includes(label));
}

export function extractSelectedLabelsFromBody(body: string) {
  const domain = extractSingleChoice(body, "Domain");
  const principles = extractMultiChoice(body, "Principles");
  return {
    domain: domain && DOMAIN_ORDER.includes(domain as DomainLabel) ? (domain as DomainLabel) : null,
    principles: principles.filter((value): value is PrincipleLabel =>
      PRINCIPLE_ORDER.includes(value as PrincipleLabel),
    ),
  };
}

function extractSingleChoice(body: string, label: string): string | null {
  const match = body.match(new RegExp(`###\\s+${label}\\s*\\n+([^\\n#]+)`, "i"));
  return match?.[1]?.trim() ?? null;
}

function extractMultiChoice(body: string, label: string): string[] {
  const regex = new RegExp(`###\\s+${label}\\s*\\n+([\\s\\S]*?)(?=\\n###\\s+|$)`, "i");
  const match = body.match(regex)?.[1]?.trim();
  if (!match) return [];

  return match
    .split(/\r?\n/)
    .filter((line) => !/^\s*[-*]\s*\[\s\]/.test(line))
    .map((line) => line.replace(/^[-*]\s*(?:\[[xX]\]\s*)?/, "").trim())
    .filter(Boolean);
}
