import { SITE_CONFIG } from "@/content/config";
import { parseMomentBody } from "@/lib/parser";
import { domainFromLabels, principlesFromLabels } from "@/lib/taxonomy";
import type { Moment, ReactionCounts } from "@/lib/types";

interface GraphQLDiscussion {
  id: string;
  number: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  author: { login: string; avatarUrl: string } | null;
  comments: { totalCount: number };
  category: { slug: string; name: string } | null;
  labels: { nodes: Array<{ name: string }> };
  reactions: { nodes: Array<{ content: string }> };
}

export const GET_MOMENTS_QUERY = `
  query GetMoments($owner: String!, $name: String!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $name) {
      discussions(first: $first, after: $after, orderBy: { field: UPDATED_AT, direction: DESC }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          number
          title
          body
          createdAt
          updatedAt
          url
          author {
            login
            avatarUrl
          }
          comments {
            totalCount
          }
          category {
            slug
            name
          }
          labels(first: 30) {
            nodes {
              name
            }
          }
          reactions(first: 100) {
            nodes {
              content
            }
          }
        }
      }
    }
  }
`;

export function countReactions(reactions: Array<{ content: string }>): ReactionCounts {
  const counts: ReactionCounts = {
    heart: 0,
    thumbsUp: 0,
    thumbsDown: 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    eyes: 0,
    rocket: 0,
  };

  for (const reaction of reactions) {
    switch (reaction.content) {
      case "HEART":
        counts.heart += 1;
        break;
      case "THUMBS_UP":
        counts.thumbsUp += 1;
        break;
      case "THUMBS_DOWN":
        counts.thumbsDown += 1;
        break;
      case "LAUGH":
        counts.laugh += 1;
        break;
      case "HOORAY":
        counts.hooray += 1;
        break;
      case "CONFUSED":
        counts.confused += 1;
        break;
      case "EYES":
        counts.eyes += 1;
        break;
      case "ROCKET":
        counts.rocket += 1;
        break;
      default:
        break;
    }
  }

  return counts;
}

export function mapDiscussionToMoment(discussion: GraphQLDiscussion): Moment | null {
  if (discussion.category?.slug !== SITE_CONFIG.discussionCategorySlug) {
    return null;
  }

  const labels = discussion.labels.nodes.map((node) => node.name);
  const domain = domainFromLabels(labels);
  if (!domain) return null;

  return {
    id: discussion.id,
    number: discussion.number,
    title: discussion.title,
    body: discussion.body,
    parsedBody: parseMomentBody(discussion.body),
    domain,
    principles: principlesFromLabels(labels),
    author: discussion.author?.login ?? "unknown",
    authorAvatarUrl: discussion.author?.avatarUrl ?? "",
    createdAt: discussion.createdAt,
    updatedAt: discussion.updatedAt,
    url: discussion.url,
    reactionCounts: countReactions(discussion.reactions.nodes),
    commentCount: discussion.comments.totalCount,
    labels,
  };
}

export async function fetchAllMoments(token: string) {
  const moments: Moment[] = [];
  const skipped: Array<{ number: number; reason: string }> = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response: Response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: GET_MOMENTS_QUERY,
        variables: {
          owner: SITE_CONFIG.repoOwner,
          name: SITE_CONFIG.repoName,
          first: 50,
          after,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const json: {
      data?: {
        repository?: {
          discussions?: {
            pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
            nodes?: GraphQLDiscussion[];
          };
        };
      };
    } = await response.json();
    const root = json?.data?.repository?.discussions;
    const nodes = (root?.nodes ?? []) as GraphQLDiscussion[];

    for (const node of nodes) {
      const mapped = mapDiscussionToMoment(node);
      if (mapped) {
        moments.push(mapped);
      } else {
        skipped.push({
          number: node.number,
          reason:
            node.category?.slug !== SITE_CONFIG.discussionCategorySlug
              ? `Wrong category (${node.category?.slug ?? "none"})`
              : "Missing exactly one canonical domain label",
        });
      }
    }

    hasNextPage = Boolean(root?.pageInfo?.hasNextPage);
    after = root?.pageInfo?.endCursor ?? null;
  }

  moments.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return { moments, skipped };
}
