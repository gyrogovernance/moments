import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fetchAllMoments } from "@/lib/github";
import type { Moment } from "@/lib/types";

const fallbackMoments: Moment[] = [
  {
    id: "local-sample-1",
    number: 1,
    title: "A world where participation is visible",
    body: "### Insight\nThis sample imagines economic coordination as something legible in public rather than hidden inside institutions. The image frames circulation as a visible loop people can inspect, question, and improve.\n\n### Link\n/samples/economy-circulation.svg\n\n### Display Name\nGyro Governance Studio",
    parsedBody: {
      insight:
        "This sample imagines economic coordination as something legible in public rather than hidden inside institutions. The image frames circulation as a visible loop people can inspect, question, and improve.",
      linkUrl: "/samples/economy-circulation.svg",
      displayName: "Gyro Governance Studio",
      mediaEmbed: {
        type: "image",
        src: "/samples/economy-circulation.svg",
        href: "/samples/economy-circulation.svg",
      },
    },
    domain: "Economy",
    principles: ["GMT", "ICI"],
    author: "gyrogovernance",
    authorAvatarUrl: "",
    createdAt: "2026-04-23T00:00:00.000Z",
    updatedAt: "2026-04-23T00:00:00.000Z",
    url: "https://github.com/gyrogovernance/moments/discussions/1",
    reactionCounts: {
      heart: 3,
      thumbsUp: 2,
      thumbsDown: 0,
      laugh: 0,
      hooray: 1,
      confused: 0,
      eyes: 1,
      rocket: 0,
    },
    commentCount: 2,
    labels: ["Economy", "GMT", "ICI"],
  },
  {
    id: "local-sample-2",
    number: 2,
    title: "Employment as a studio of shared contribution",
    body: "### Insight\nInstead of organizing work around scarcity and competition, this sample imagines people moving between visible roles inside a shared contribution studio. The point is not just activity, but accountable coordination.\n\n### Link\n/samples/employment-studio.svg\n\n### Display Name\nGyro Governance Studio",
    parsedBody: {
      insight:
        "Instead of organizing work around scarcity and competition, this sample imagines people moving between visible roles inside a shared contribution studio. The point is not just activity, but accountable coordination.",
      linkUrl: "/samples/employment-studio.svg",
      displayName: "Gyro Governance Studio",
      mediaEmbed: {
        type: "image",
        src: "/samples/employment-studio.svg",
        href: "/samples/employment-studio.svg",
      },
    },
    domain: "Employment",
    principles: ["IIA", "GMT"],
    author: "gyrogovernance",
    authorAvatarUrl: "",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z",
    url: "https://github.com/gyrogovernance/moments/discussions/2",
    reactionCounts: {
      heart: 4,
      thumbsUp: 3,
      thumbsDown: 0,
      laugh: 0,
      hooray: 1,
      confused: 0,
      eyes: 2,
      rocket: 1,
    },
    commentCount: 3,
    labels: ["Employment", "IIA", "GMT"],
  },
  {
    id: "local-sample-3",
    number: 3,
    title: "A learning map that shows where knowledge comes from",
    body: "### Insight\nThis sample treats education as a map of sources rather than a stream of undifferentiated content. It asks whether people can tell the difference between direct experience, mediated reporting, and artificial synthesis.\n\n### Link\n/samples/education-map.svg\n\n### Display Name\nGyro Governance Studio",
    parsedBody: {
      insight:
        "This sample treats education as a map of sources rather than a stream of undifferentiated content. It asks whether people can tell the difference between direct experience, mediated reporting, and artificial synthesis.",
      linkUrl: "/samples/education-map.svg",
      displayName: "Gyro Governance Studio",
      mediaEmbed: {
        type: "image",
        src: "/samples/education-map.svg",
        href: "/samples/education-map.svg",
      },
    },
    domain: "Education",
    principles: ["ICV", "GMT"],
    author: "gyrogovernance",
    authorAvatarUrl: "",
    createdAt: "2026-04-21T00:00:00.000Z",
    updatedAt: "2026-04-21T00:00:00.000Z",
    url: "https://github.com/gyrogovernance/moments/discussions/3",
    reactionCounts: {
      heart: 5,
      thumbsUp: 2,
      thumbsDown: 0,
      laugh: 0,
      hooray: 2,
      confused: 0,
      eyes: 3,
      rocket: 0,
    },
    commentCount: 1,
    labels: ["Education", "ICV", "GMT"],
  },
  {
    id: "local-sample-4",
    number: 4,
    title: "Ecology as the weave between the other domains",
    body: "### Insight\nThis sample shows ecology as an emergent balance rather than an isolated topic. When the other domains move coherently, ecological life stops being an afterthought and becomes the visible shape of alignment.\n\n### Link\n/samples/ecology-weave.svg\n\n### Display Name\nGyro Governance Studio",
    parsedBody: {
      insight:
        "This sample shows ecology as an emergent balance rather than an isolated topic. When the other domains move coherently, ecological life stops being an afterthought and becomes the visible shape of alignment.",
      linkUrl: "/samples/ecology-weave.svg",
      displayName: "Gyro Governance Studio",
      mediaEmbed: {
        type: "image",
        src: "/samples/ecology-weave.svg",
        href: "/samples/ecology-weave.svg",
      },
    },
    domain: "Ecology",
    principles: ["ICI", "ICV"],
    author: "gyrogovernance",
    authorAvatarUrl: "",
    createdAt: "2026-04-20T00:00:00.000Z",
    updatedAt: "2026-04-20T00:00:00.000Z",
    url: "https://github.com/gyrogovernance/moments/discussions/4",
    reactionCounts: {
      heart: 6,
      thumbsUp: 2,
      thumbsDown: 0,
      laugh: 0,
      hooray: 2,
      confused: 0,
      eyes: 2,
      rocket: 1,
    },
    commentCount: 4,
    labels: ["Ecology", "ICI", "ICV"],
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
