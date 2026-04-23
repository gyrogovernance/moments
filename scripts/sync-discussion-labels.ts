import { extractSelectedLabelsFromBody, getCanonicalDomainLabels, getCanonicalPrincipleLabels } from "@/lib/taxonomy";

const endpoint = "https://api.github.com/graphql";

const GET_DISCUSSION_QUERY = `
  query GetDiscussion($repoOwner: String!, $repoName: String!, $discussionNumber: Int!) {
    repository(owner: $repoOwner, name: $repoName) {
      discussion(number: $discussionNumber) {
        id
        body
        labels(first: 50) {
          nodes {
            id
            name
          }
        }
      }
      labels(first: 100) {
        nodes {
          id
          name
        }
      }
    }
  }
`;

const ADD_LABELS_MUTATION = `
  mutation AddLabels($labelableId: ID!, $labelIds: [ID!]!) {
    addLabelsToLabelable(input: { labelableId: $labelableId, labelIds: $labelIds }) {
      clientMutationId
    }
  }
`;

const REMOVE_LABELS_MUTATION = `
  mutation RemoveLabels($labelableId: ID!, $labelIds: [ID!]!) {
    removeLabelsFromLabelable(input: { labelableId: $labelableId, labelIds: $labelIds }) {
      clientMutationId
    }
  }
`;

async function graphql(token: string, query: string, variables: Record<string, unknown>) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.REPO_OWNER ?? "gyrogovernance";
  const repoName = process.env.REPO_NAME ?? "moments";
  const discussionNumber = Number(process.env.DISCUSSION_NUMBER);

  if (!token) throw new Error("GITHUB_TOKEN is required");
  if (!discussionNumber) throw new Error("DISCUSSION_NUMBER is required");

  const data = await graphql(token, GET_DISCUSSION_QUERY, { repoOwner, repoName, discussionNumber });
  const discussion = data.repository.discussion;
  const allRepoLabels: Array<{ id: string; name: string }> = data.repository.labels.nodes;
  const currentLabels: Array<{ id: string; name: string }> = discussion.labels.nodes;
  const parsed = extractSelectedLabelsFromBody(discussion.body);

  const canonicalTaxonomy = new Set<string>([
    ...getCanonicalDomainLabels(),
    ...getCanonicalPrincipleLabels(),
  ]);
  const labelsToRemove = currentLabels.filter((label) => canonicalTaxonomy.has(label.name)).map((label) => label.id);

  if (labelsToRemove.length) {
    await graphql(token, REMOVE_LABELS_MUTATION, {
      labelableId: discussion.id,
      labelIds: labelsToRemove,
    });
  }

  const targetNames: string[] = [...(parsed.domain ? [parsed.domain] : []), ...parsed.principles];
  const labelIds = allRepoLabels
    .filter((label) => targetNames.includes(label.name))
    .map((label) => label.id);

  if (labelIds.length) {
    await graphql(token, ADD_LABELS_MUTATION, {
      labelableId: discussion.id,
      labelIds,
    });
  }

  console.log(`Synced labels for discussion #${discussionNumber}: ${targetNames.join(", ") || "none"}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
