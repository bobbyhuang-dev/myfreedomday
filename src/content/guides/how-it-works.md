---
title: How the stack fits together
description: Astro builds a static site; Markdown lives in the repo; Cloudflare serves the build output.
---

This page explains the moving parts using filler text so you can focus on structure rather than wording.

## Astro + TypeScript

Astro components and layouts are written with TypeScript for safer props and better editor hints. Content collections validate frontmatter at build time, so mistakes surface early instead of in production.

## Build and deploy

1. Authors commit Markdown under `src/content/`.
2. CI (or your machine) runs `pnpm build`.
3. Cloudflare publishes the `dist/` folder as a static site.

Donec eu nibh at nisi bibendum sagittis. Morbi tincidunt lacus nec elit vehicula, sit amet fermentum augue pulvinar. Aliquam erat volutpat.
