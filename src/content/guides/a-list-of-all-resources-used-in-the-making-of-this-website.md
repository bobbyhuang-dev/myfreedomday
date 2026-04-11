---
title: A list of all resources used in the making of this website
description: Read if you are curious about the technical side of this website
tldr: I use Astro as the main web framework, TypeScript as the language, pnpm as the package manager, and Cloudflare Pages for hosting. I also use Cloudflare Registrar to purchase the domain.
---

This page lists every major tool, service, and resource that was used to build and run this website. If you are a student or developer curious about how a site like this comes together, this is for you.

![](https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
*Source: [Unsplash](https://unsplash.com/photos/lines-of-html-codes-4hbJ-eymZ1o)*

## Web framework — Astro

[Astro](https://astro.build/) is the web framework that powers this entire site. Astro is designed for content-driven websites — blogs, documentation sites, informational pages — and it ships zero JavaScript to the browser by default. That means every page on this site is plain HTML and CSS, which makes it extremely fast to load.

This project uses **Astro v6**, which introduced a redesigned development server, significant rendering performance improvements, and new built-in APIs. Astro's content collections feature is used to manage all the Markdown articles on this site, with schemas validated at build time so broken content never makes it to production.

Key Astro features this site relies on:

- **Static output** — the entire site is pre-built into plain HTML files at build time
- **Content collections** — articles are written as Markdown files and validated against a schema using [Zod](https://zod.dev/)
- **File-based routing** — every `.astro` file in `src/pages/` automatically becomes a page on the site
- **Component-based layouts** — shared headers, footers, and page structure are defined once and reused everywhere

## Language — TypeScript

[TypeScript](https://www.typescriptlang.org/) is used throughout the project. TypeScript adds static types on top of JavaScript, which means the code editor can catch mistakes before the site is even built. This project uses **TypeScript 5.9** in strict mode, which is the most rigorous type-checking setting available.

Even the content schemas (the rules that define what frontmatter each article must have) are written in TypeScript using Zod, so if an article is missing a title or description, the build will fail with a clear error message instead of silently producing a broken page.

## Package manager — pnpm

[pnpm](https://pnpm.io/) is the package manager used to install and manage all dependencies. Unlike npm, pnpm uses a content-addressable store that saves disk space by sharing packages across projects. It is also stricter about dependency resolution, which helps prevent bugs caused by accidentally importing packages that are not listed in `package.json`.

This project uses **pnpm v10**, which requires Node.js 22 or later and includes supply-chain protections enabled by default — newly published packages are not resolved for 24 hours, reducing the risk of malicious package attacks.

## Runtime — Node.js

[Node.js](https://nodejs.org/) is the JavaScript runtime that runs Astro's build process and development server. This project requires **Node.js 22** (the current LTS release, codenamed "Jod"), which is pinned in a `.node-version` file at the root of the repository so that any contributor or CI environment uses the correct version automatically.

## Hosting — Cloudflare Pages

[Cloudflare Pages](https://pages.cloudflare.com/) hosts the live website. It is a static site hosting platform built on Cloudflare's global network of data centres, which means pages are served from the location closest to each visitor for the fastest possible load times.

Cloudflare Pages offers a generous free tier with **unlimited bandwidth**, up to **500 builds per month**, and support for custom domains. Deployment is handled through [Wrangler](https://developers.cloudflare.com/workers/wrangler/), Cloudflare's official CLI tool, using a small upload script (`scripts/pages-upload.mjs`) that runs `wrangler pages deploy` to push the built `dist/` directory.

The site also has a `wrangler.jsonc` configuration file at the project root that tells Wrangler the project name and which directory to deploy.

## Domain — Cloudflare Registrar

The domain name for this site was purchased through [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/). Cloudflare Registrar is notable because it charges **at-cost pricing** with no markup on registration or renewal fees — you pay only the wholesale price set by the domain registry. It also includes free WHOIS privacy protection and DNSSEC support out of the box.

## SEO — @astrojs/sitemap

The [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) integration automatically generates an XML sitemap every time the site is built. A sitemap tells search engines like Google which pages exist on the site and how often they change, which helps the site get indexed and appear in search results.

## Schema validation — Zod

[Zod](https://zod.dev/) is a TypeScript-first schema validation library that comes bundled with Astro. It is used in the content collection configuration (`src/content.config.ts`) to define the shape of each article's frontmatter. For example, every guide must have a `title` (required) and a `description` (required), and can optionally include a `tldr` summary. If any of these rules are broken, the build fails immediately with a helpful error.

## Source code — GitHub

The source code for this website is hosted on [GitHub](https://github.com/bobbyhuang-dev). GitHub provides version control through Git, which means every change to the site is tracked and can be reversed if something goes wrong.

## License — Creative Commons CC BY 4.0

All content on this site is shared under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license. This means anyone can copy, modify, distribute, and use the content for any purpose — including commercial use — as long as they give appropriate credit. The goal is to make information about modern slavery as accessible and shareable as possible while ensuring attribution.

## Summary table

Here is a quick reference of everything listed above:

| Resource | What it does | Website |
| --- | --- | --- |
| Astro v6 | Web framework | [astro.build](https://astro.build/) |
| TypeScript 5.9 | Programming language | [typescriptlang.org](https://www.typescriptlang.org/) |
| pnpm v10 | Package manager | [pnpm.io](https://pnpm.io/) |
| Node.js 22 | JavaScript runtime | [nodejs.org](https://nodejs.org/) |
| Cloudflare Pages | Static site hosting | [pages.cloudflare.com](https://pages.cloudflare.com/) |
| Cloudflare Registrar | Domain registration | [cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/) |
| Wrangler | Cloudflare deployment CLI | [developers.cloudflare.com](https://developers.cloudflare.com/workers/wrangler/) |
| @astrojs/sitemap | XML sitemap generation | [docs.astro.build](https://docs.astro.build/en/guides/integrations-guide/sitemap/) |
| Zod | Schema validation | [zod.dev](https://zod.dev/) |
| GitHub | Source code hosting | [github.com](https://github.com/) |
| Creative Commons CC BY 4.0 | Content license | [creativecommons.org](https://creativecommons.org/licenses/by/4.0/) |