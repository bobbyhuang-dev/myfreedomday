# MyFreedomDay

Informational demo site: **Astro** + **TypeScript**, **Markdown** in `src/content/` (validated with content collections), static HTML output suitable for **Cloudflare Pages**.

## Commands

| Command | Action |
|--------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `http://localhost:4321` |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm pages:deploy` | Build and upload to Cloudflare Pages (requires `wrangler login`) |
| `pnpm pages:dev` | Build and serve `dist/` with the Pages dev proxy |

## Cloudflare Pages

**Git (recommended):** In the [Cloudflare dashboard](https://dash.cloudflare.com/) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, pick this repo, then confirm build settings:

| Setting | Value |
|--------|--------|
| **Framework preset** | Astro (or None) |
| **Build command** | `pnpm build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |
| **Deploy command** | *Leave empty* (do not set a Wrangler/Workers deploy step) |

Pages reads **`.nvmrc`** (Node 22) for the build environment. After `pnpm build`, Cloudflare publishes **`dist/`** for you—no `wrangler` step is required in CI.

`wrangler.jsonc` is for **local** `pnpm pages:deploy` and naming consistency; it is not a signal for `wrangler deploy` on Pages.

**If the build succeeds but deployment fails** with “Missing entry-point to Worker script” or a warning that `wrangler pages deploy` should be used instead: your project has **Workers-style** `npx wrangler deploy` configured. Open **Workers & Pages** → your project → **Settings** → **Build** (or **Builds & deployments**) and **clear** the deploy / Wrangler command, or replace it with nothing. Using `npx wrangler deploy` is for **Workers**, not static Pages sites.

After the first deploy, set `site` in `astro.config.mjs` to your real `*.pages.dev` URL or custom domain so canonical URLs behave correctly.

**CLI deploy** (creates the project on first run if it does not exist):

```bash
pnpm exec wrangler login
pnpm pages:deploy
```

## Content

- **Guides:** `src/content/guides/*.md`
- **Updates:** `src/content/updates/*.md` (frontmatter includes `pubDate`; omit or set `draft: true` to hide from lists when you extend the schema)

Edit Markdown, commit, push—Pages rebuilds from Git.
