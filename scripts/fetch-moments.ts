import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fetchAllMoments } from "@/lib/github";
import type { Moment } from "@/lib/types";

const fallbackMoments: Moment[] = [
  {
    id: "local-placeholder",
    number: 1,
    title: "A world where participation is visible",
    body: "### Insight\nA placeholder Moment used for local builds when no GitHub token is configured.",
    parsedBody: {
      insight: "A placeholder Moment used for local builds when no GitHub token is configured.",
    },
    domain: "Economy",
    principles: ["GMT"],
    author: "gyrogovernance",
    authorAvatarUrl: "",
    createdAt: "2026-04-23T00:00:00.000Z",
    updatedAt: "2026-04-23T00:00:00.000Z",
    url: "https://github.com/gyrogovernance/moments/discussions",
    reactionCounts: {
      heart: 0,
      thumbsUp: 0,
      thumbsDown: 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      eyes: 0,
      rocket: 0,
    },
    commentCount: 0,
    labels: ["Economy", "GMT"],
  },
];

async function main() {
  const outputPath = resolve("src/data/moments.json");
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not set. Writing placeholder moments.json for local builds.");
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(fallbackMoments, null, 2)}\n`, "utf8");
    return;
  }

  const { moments, skipped } = await fetchAllMoments(token);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(moments, null, 2)}\n`, "utf8");

  if (skipped.length) {
    console.warn("Skipped discussions:");
    for (const entry of skipped) {
      console.warn(`- #${entry.number}: ${entry.reason}`);
    }
  }

  console.log(`Wrote ${moments.length} moments to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
