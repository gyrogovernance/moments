import type { DomainLabel, PrincipleLabel } from "@/content/config";

export interface MediaEmbed {
  type: "youtube" | "vimeo" | "image" | "link";
  src?: string;
  href: string;
  thumbnail?: string;
  title?: string;
}

export interface ParsedMomentBody {
  insight: string;
  linkUrl?: string;
  displayName?: string;
  mediaEmbed?: MediaEmbed;
}

export interface ReactionCounts {
  heart: number;
  thumbsUp: number;
  thumbsDown: number;
  laugh: number;
  hooray: number;
  confused: number;
  eyes: number;
  rocket: number;
}

export interface Moment {
  id: string;
  number: number;
  title: string;
  body: string;
  parsedBody: ParsedMomentBody;
  domain: DomainLabel;
  principles: PrincipleLabel[];
  author: string;
  authorAvatarUrl: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  reactionCounts: ReactionCounts;
  commentCount: number;
  labels: string[];
}
