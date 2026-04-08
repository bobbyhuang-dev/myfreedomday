# MyFreedomDay

Informational demo site: **Astro** + **TypeScript**, **Markdown** in `src/content/` (validated with content collections), static HTML output deployed with **Wrangler** as [**Workers Static Assets**](https://developers.cloudflare.com/workers/static-assets/) (recommended when Cloudflare’s CI cannot authenticate **`wrangler pages deploy`**).

## Commands

| Command | Action |
|--------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `http://localhost:4321` |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm pages:deploy` | `astro build` then **`wrangler deploy`** (Workers Static Assets; use `wrangler login` locally) |
| `pnpm pages:upload` | **`wrangler deploy`** only—uploads `./dist` per `wrangler.jsonc` |
| `pnpm pages:noop` | No-op (exit 0). Optional for **Version command** when the UI requires a value |
| `pnpm pages:dev` | `pnpm build` then **`wrangler dev`** (serves the Worker + assets from config) |

## Cloudflare (Workers Static Assets)

This repo uses [**Workers Static Assets**](https://developers.cloudflare.com/workers/static-assets/) (`wrangler deploy`), not **`wrangler pages deploy`**. The Pages API (`/pages/projects/...`) often returns **`Authentication error [code: 10000]`** for tokens that work fine with the **Workers** upload API—so CI deploy targets a **Worker** that serves files from `dist/`. See Cloudflare’s [migrate from Pages](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) guide.

### Build settings (Git / Workers Builds)

| Setting | Value |
|--------|--------|
| **Build command** | `pnpm build` |
| **Deploy command** | `pnpm pages:upload` |
| **Version command** (if required) | `pnpm pages:noop` |
| **Root directory** | `/` |
| **Build output directory** | `dist` (Astro output; Wrangler reads the same folder via `assets.directory`) |
| **Non-production branch deploy command** | Same as production — `pnpm pages:upload` — or `pnpm pages:noop` only if the UI breaks on empty and previews can wait |

**Node:** **`.nvmrc`** pins Node 22.

### API token (fixes error 10000 in CI)

1. [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token**.
2. Use template **Edit Cloudflare Workers** (or custom: **Account** → **Workers Scripts** → **Edit**, plus **Account** → **Account Settings** → **Read** if needed).
3. **Account resources:** include the account that owns the project.
4. In the Cloudflare project → **Settings** → **Environment variables** (Production and Preview), set:
   - **`CLOUDFLARE_API_TOKEN`** — the new token  
   - **`CLOUDFLARE_ACCOUNT_ID`** — from Workers overview URL (`.../accounts/<id>/...`)  
5. **Remove** any old **Pages-only** token you added for `wrangler pages deploy`; Workers deploy does not use the Pages REST API the same way.

Local deploy: `pnpm exec wrangler login` then `pnpm pages:deploy`.

### Canonical URL (`site`)

After the first successful deploy, Wrangler prints a **`*.workers.dev`** URL (unless you use a custom domain). Set `site` in `astro.config.mjs` to that URL (or your domain). If you still use a **`*.pages.dev`** hostname via a separate Pages project or redirect, keep `site` aligned with the URL users actually open.

### pnpm build scripts

`package.json` includes `pnpm.onlyBuiltDependencies` so **esbuild**, **sharp**, and **workerd** install scripts run in CI (Wrangler needs them).

## Content

- **Guides:** `src/content/guides/*.md`
- **Updates:** `src/content/updates/*.md` (frontmatter includes `pubDate`; omit or set `draft: true` to hide from lists when you extend the schema)

Edit Markdown, commit, push—your Git-connected build runs again.
