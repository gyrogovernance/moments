# Moments App Working Memory

This file captures the agreed direction for `F:\Development\moments` so future implementation stays consistent.

## Product
- Build a standalone static web app called `Moments`.
- The app is a GitHub-native civil governance sandbox and content aggregator.
- People contribute "Moments" through GitHub Discussions, not through an in-app backend form.
- The app reads Discussions at build time and renders them as a polished public site.

## Core architecture
- Framework: Next.js App Router with TypeScript.
- Deployment: static export and GitHub Pages.
- Data store: GitHub Discussions only.
- Comments and reactions on detail pages: Giscus.
- No backend server.
- No database.
- No client-side runtime fetches to GitHub for primary content.
- Build-time JSON generation from GitHub GraphQL into a local `moments.json` file.

## Visual direction
- Use the Gyro Governance liquid glass visual language.
- Reuse material from `F:\Development\gyrogovernance.com` where helpful, especially:
  - liquid glass card/nav implementation
  - glass CSS
  - dark/light theme token approach
  - font setup
- Keep the `moments` repo self-contained after copying. No cross-repo runtime dependency.
- Dark and light mode must both feel refined.
- Motion should be restrained. Favor fade-in-up and subtle hover transitions only.

## GitHub Discussions model
- Use one dedicated discussion category: `moments`.
- Discussion forms should guide authors, but labels are the only source of truth for published classification.
- The app should not trust freeform body text for taxonomy.
- A workflow should parse the form body and sync canonical labels onto the discussion.

## Canonical taxonomy

### Domains
- `Economy`
- `Employment`
- `Education`
- `Ecology`

Exactly one valid domain label is required for a Moment to be publishable.

### Principles
- `GMT`
- `ICV`
- `IIA`
- `ICI`

These are the canonical principle labels and must remain canonical in code, docs, templates, and UI.

### Principle meanings
- `GMT`: Governance Management Traceability
- `ICV`: Information Curation Variety
- `IIA`: Inference Interaction Accountability
- `ICI`: Intelligence Cooperation Integrity

### Displacement references
The app may explain the related displacement concepts in copy, but they are not separate labels:
- `GTD`
- `IVD`
- `IAD`
- `IID`

## Publishability rules
- Labels are authoritative.
- A discussion without exactly one canonical domain label is excluded from the public feed.
- Principle labels are optional.
- Non-canonical or stale taxonomy labels should be replaced by the label-sync workflow.
- Unrelated labels should be preserved.

## UI shape

### Homepage
- Hero with the core question.
- Four domain gateways.
- Filterable feed of Moments.
- GitHub contribution CTA.

### Detail page
- Route pattern: `/moment/[number]`
- Show full Moment content, media, attribution, taxonomy badges, reactions, and Giscus.

### About page
- Explain the app, the contribution model, the labels, and how to fork/customize it.

## Feed behavior
- Domain filters:
  - `All`
  - `Economy`
  - `Employment`
  - `Education`
  - `Ecology`
- Principle filters:
  - `GMT`
  - `ICV`
  - `IIA`
  - `ICI`
- Sort options:
  - `Newest`
  - `Most commented`
  - `Most reacted`

## Media support
- Support YouTube.
- Support Vimeo.
- Support direct image URLs.
- Support generic links.
- Use plain `<img>` for external images, not `next/image`.

## Build pipeline
- Fetch Discussions through GitHub GraphQL at build time.
- Parse body content into:
  - insight
  - link URL
  - embed metadata
- Classification comes from labels only.
- Generate a local JSON artifact used by the static site.
- Stable default ordering: `updatedAt desc`.

## Tests expected
- Parser tests:
  - complete structured form output
  - missing link
  - malformed markdown
  - multiple principles
- Taxonomy tests:
  - valid canonical domain required
  - principles restricted to canonical set
  - stale taxonomy labels replaced correctly
- Embed tests:
  - YouTube
  - Vimeo
  - direct image
  - plain link
- Build pipeline tests:
  - pagination
  - missing author fields
  - unlabeled or invalidly labeled discussions skipped with clear logging
- App checks:
  - homepage renders from generated JSON
  - filters behave correctly
  - detail pages generate
  - Giscus only mounts on detail pages
  - dark/light mode works cleanly
  - mobile layout is touch-safe

## Content and tone
- Warm, not clinical.
- Direct, not hedging.
- Short sentences.
- No em dashes in UI copy or docs unless quoting existing source text.
- Use canonical names exactly where taxonomy matters.

## Safety constraints for implementation
- Do not modify `F:\Development\gyrogovernance.com` again unless explicitly asked.
- If copying from that repo, copy into `moments` only.
- Do not add a backend.
- Do not replace GitHub Discussions with another data store.
- Do not add heavy runtime dependencies unless clearly necessary.
- Do not hardcode branding in a way that prevents future forking.

## Current status
- `gyrogovernance.com` was restored to a clean tracked state after an earlier mistake.
- `moments` is still effectively a blank repo plus this memory file.
- Next implementation step should start by scaffolding the app inside `F:\Development\moments`, not in any other repo.
