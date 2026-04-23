export const DOMAIN_ORDER = ["Economy", "Employment", "Education", "Ecology"] as const;
export const PRINCIPLE_ORDER = ["GMT", "ICV", "IIA", "ICI"] as const;

export type DomainLabel = (typeof DOMAIN_ORDER)[number];
export type PrincipleLabel = (typeof PRINCIPLE_ORDER)[number];

export const SITE_CONFIG = {
  repoOwner: "gyrogovernance",
  repoName: "moments",
  discussionCategorySlug: "moments",
  discussionCategoryName: "moments",
  repoId: "R_kgDOSKa-Mg",
  discussionCategoryId: "DIC_kwDOSKa-Ms4C7gT9",
  siteName: "Moments",
  siteDescription:
    "GitHub-native civil governance sandbox for sharing visions beyond poverty, unemployment, misinformation, and ecological degradation.",
  siteUrl: "https://gyrogovernance.github.io/moments/",
  githubUrl: "https://github.com/gyrogovernance/moments",
  discussionsUrl: "https://github.com/gyrogovernance/moments/discussions",
  createMomentUrl: "https://github.com/gyrogovernance/moments/discussions/new?category=moments",
  primaryGradient: "from-classic-blue via-classic-purple to-classic-pink",
  domains: [
    {
      id: "Economy" as DomainLabel,
      slug: "economy",
      emoji: "💰",
      colorClass: "glass-card-amber",
      invitation: "Imagine abundance, not scarcity",
      prompt: "What would abundance look like in your community?",
      lens:
        "The Moments Economy grounds coordination capacity in a physical constant, not institutional discretion. Scarcity stops governing the meaning of economic activity.",
    },
    {
      id: "Employment" as DomainLabel,
      slug: "employment",
      emoji: "🤝",
      colorClass: "glass-card-blue",
      invitation: "Imagine purpose, not precarity",
      prompt: "What would meaningful work mean for everyone?",
      lens:
        "Work becomes an expression of alignment rather than a condition for survival. AIR routes human capacity into paid work with replayable provenance.",
    },
    {
      id: "Education" as DomainLabel,
      slug: "education",
      emoji: "📚",
      colorClass: "glass-card-purple",
      invitation: "Imagine clarity, not confusion",
      prompt: "What would clarity look like if it were universal?",
      lens:
        "The Human Mark provides a culturally agnostic method for distinguishing Direct from Indirect sources. It makes misalignment legible without ideology.",
    },
    {
      id: "Ecology" as DomainLabel,
      slug: "ecology",
      emoji: "🌿",
      colorClass: "glass-card-emerald",
      invitation: "Imagine balance, not depletion",
      prompt: "What would balance feel like if it were everywhere?",
      lens:
        "Ecology is the integrative domain. It emerges from the combined state of Economy, Employment, and Education.",
    },
  ],
  principles: [
    {
      id: "GMT" as PrincipleLabel,
      name: "Governance Management Traceability",
      displacement: "GTD",
      emoji: "🧭",
    },
    {
      id: "ICV" as PrincipleLabel,
      name: "Information Curation Variety",
      displacement: "IVD",
      emoji: "📚",
    },
    {
      id: "IIA" as PrincipleLabel,
      name: "Inference Interaction Accountability",
      displacement: "IAD",
      emoji: "🧩",
    },
    {
      id: "ICI" as PrincipleLabel,
      name: "Intelligence Cooperation Integrity",
      displacement: "IID",
      emoji: "🤝",
    },
  ],
} as const;

export const RESOURCE_LINKS = [
  {
    title: "Moments Economy Whitepaper",
    description: "Civil governance framework for an attentiveness-based collective superintelligence.",
    href: "https://github.com/gyrogovernance/superintelligence/blob/main/docs/AIR_Moments_Economy_Whitepaper.md",
  },
  {
    title: "Moments Economy Specification",
    description: "Moment-Units, Grants, Shells, Archives, and the Common Source Moment.",
    href: "https://github.com/gyrogovernance/superintelligence/blob/main/docs/AIR_Moments_Economy_Specs.md",
  },
  {
    title: "AIR Brief",
    description: "How workforce capacity, safety work, and funding are routed into verifiable outputs.",
    href: "https://github.com/gyrogovernance/superintelligence/blob/main/docs/AIR_Brief.md",
  },
  {
    title: "AIR Logistics",
    description: "Governance logistics, genealogies, and replayable verification.",
    href: "https://github.com/gyrogovernance/superintelligence/blob/main/docs/AIR_Logistics.md",
  },
  {
    title: "Moments Genealogies Specification",
    description: "How genealogies, shared moments, and verification ground the transition path.",
    href: "https://github.com/gyrogovernance/superintelligence/blob/main/docs/AIR_Moments_Genealogies_Specs.md",
  },
];
