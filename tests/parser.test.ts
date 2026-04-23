import assert from "node:assert/strict";
import test from "node:test";
import { detectEmbed, extractVimeoId, extractYouTubeId } from "@/lib/embed";
import { parseMomentBody } from "@/lib/parser";
import { domainFromLabels, extractSelectedLabelsFromBody, principlesFromLabels } from "@/lib/taxonomy";

test("parseMomentBody reads structured fields", () => {
  const parsed = parseMomentBody(`### Link
https://example.com/post

### Insight
This is the core insight.

### Display Name
Visitor`);

  assert.equal(parsed.linkUrl, "https://example.com/post");
  assert.equal(parsed.insight, "This is the core insight.");
  assert.equal(parsed.displayName, "Visitor");
});

test("parseMomentBody falls back to full body when headings are missing", () => {
  const parsed = parseMomentBody("Freeform reflection without headings");
  assert.equal(parsed.insight, "Freeform reflection without headings");
  assert.equal(parsed.linkUrl, undefined);
});

test("extractSelectedLabelsFromBody reads domain and multiple principles", () => {
  const parsed = extractSelectedLabelsFromBody(`### Domain
Economy

### Principles
- [x] GMT
- [x] IIA
- [ ] ICV
- INVALID`);

  assert.equal(parsed.domain, "Economy");
  assert.deepEqual(parsed.principles, ["GMT", "IIA"]);
});

test("domainFromLabels requires exactly one canonical domain", () => {
  assert.equal(domainFromLabels(["Economy"]), "Economy");
  assert.equal(domainFromLabels(["Economy", "Ecology"]), null);
  assert.equal(domainFromLabels(["Other"]), null);
});

test("principlesFromLabels keeps canonical order", () => {
  assert.deepEqual(principlesFromLabels(["ICI", "GMT", "other"]), ["GMT", "ICI"]);
});

test("embed detection handles youtube, vimeo, image, and link", () => {
  assert.equal(extractYouTubeId("https://www.youtube.com/watch?v=abc123"), "abc123");
  assert.equal(extractVimeoId("https://vimeo.com/12345"), "12345");
  assert.equal(detectEmbed("https://youtu.be/abc123").type, "youtube");
  assert.equal(detectEmbed("https://vimeo.com/12345").type, "vimeo");
  assert.equal(detectEmbed("https://example.com/image.png").type, "image");
  assert.equal(detectEmbed("https://example.com/article").type, "link");
});
