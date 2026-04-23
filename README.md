# Moments

Moments is a standalone static web app for collecting and publishing governance-oriented links, reflections, and visions through GitHub Discussions.

It is designed to be:
- GitHub-native
- static and low-cost
- forkable by other communities
- visually aligned with the Gyro Governance liquid glass design language

## How it works

1. Contributors create a Discussion in the `moments` category.
2. A workflow reads the form output and applies canonical taxonomy labels.
3. The build script fetches Discussions through GitHub GraphQL.
4. The app generates `src/data/moments.json` at build time.
5. Next.js statically renders the homepage, about page, and individual Moment pages.

## Canonical taxonomy

### Domains
- `Economy`
- `Employment`
- `Education`
- `Ecology`

### Principles
- `GMT`
- `ICV`
- `IIA`
- `ICI`

Labels are the source of truth for published classification.

## Local development

```bash
npm install
npm run dev
```

### Useful scripts

```bash
npm run prebuild
npm run build
npm run lint
npm test
```

## Environment

For real GitHub data during builds, provide:

```bash
GITHUB_TOKEN=your_token
```

If `GITHUB_TOKEN` is not set, the build writes a placeholder Moment so local static export still works.

## Giscus

To enable Giscus comments on detail pages, set the following values in `src/content/config.ts`:

- `repoId`
- `discussionCategoryId`

Until then, the detail page shows a configuration note instead of loading Giscus.

## GitHub setup

This repo expects:
- GitHub Discussions enabled
- a discussion category with slug `moments`
- canonical labels already created
- GitHub Pages enabled

The repo also includes:
- `.github/DISCUSSION_TEMPLATE/moments.yml`
- `.github/workflows/sync-labels.yml`
- `.github/workflows/build-and-deploy.yml`

## Notes

- The app uses GitHub labels as the only classification truth.
- It does not include a backend or database.
- External user media uses plain `<img>` rather than `next/image`, by design.
