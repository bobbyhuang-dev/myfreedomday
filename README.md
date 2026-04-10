# MyFreedomDay

MyFreedomDay is a static informational demo site built with **Astro** and **TypeScript**. Content lives in `src/content/` as Markdown, is validated with Astro content collections, and is published as a static site on **Cloudflare**.

## Stack

- **Framework**: Astro
- **Language**: TypeScript
- **Content**: Markdown content collections in `src/content/`
- **Hosting**: Cloudflare

## Commands

| Command        | Action                                      |
| -------------- | ------------------------------------------- |
| `pnpm install` | Install dependencies                        |
| `pnpm dev`     | Start dev server at `http://localhost:4321` |
| `pnpm build`   | Build the production site to `dist/`        |
| `pnpm preview` | Preview the production build locally        |
| `pnpm pages:upload` | Upload or deploy the built site to Cloudflare |

## Deployment

This repo now includes Cloudflare deployment wiring:

- **Build command**: `pnpm build`
- **Build output**: `dist`
- **Deploy command**: `pnpm pages:upload`
- **Wrangler config**: `wrangler.jsonc`
- **Pinned Node version**: `.node-version`

For Cloudflare Pages Git integration, the dashboard should only need:

- **Build command**: `pnpm build`
- **Build directory**: `dist`

If you are using a Cloudflare build that expects a custom deploy command, use:

```bash
pnpm pages:upload
```

You can override the default Cloudflare Pages project name by setting `CLOUDFLARE_PAGES_PROJECT_NAME`.

## Content

- **Guides**: `src/content/guides/*.md`
- **Updates**: `src/content/updates/*.md`
- **Layouts**: `src/layouts/*.astro`
- **Pages**: `src/pages/**/*.astro`

Edit Markdown, commit your changes, and deploy when you're ready.
