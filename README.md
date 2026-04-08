# MyFreedomDay

MyFreedomDay is a static informational demo site built with **Astro** and **TypeScript**. Content lives in `src/content/` as Markdown, is validated with Astro content collections, and is published as a static site on **Netlify**.

## Stack

- **Framework**: Astro
- **Language**: TypeScript
- **Content**: Markdown content collections in `src/content/`
- **Hosting**: Netlify

## Commands

| Command        | Action                                      |
| -------------- | ------------------------------------------- |
| `pnpm install` | Install dependencies                        |
| `pnpm dev`     | Start dev server at `http://localhost:4321` |
| `pnpm build`   | Build the production site to `dist/`        |
| `pnpm preview` | Preview the production build locally        |

## Deployment

This repo is configured for Netlify.

- **Build command**: `pnpm build`
- **Publish directory**: `dist`
- **Node version**: `22`
- **Netlify config**: `netlify.toml`
- **Canonical site URL**: `https://myfreedomday-astro-2026.netlify.app`

For a manual production deploy from a machine that is already logged in to Netlify:

```bash
netlify deploy --build --prod
```

If you connect the repository to Netlify, pushes can trigger deployments automatically.

## Content

- **Guides**: `src/content/guides/*.md`
- **Updates**: `src/content/updates/*.md`
- **Layouts**: `src/layouts/*.astro`
- **Pages**: `src/pages/**/*.astro`

Edit Markdown, commit your changes, and deploy when you're ready.
