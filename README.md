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
| `pnpm pages:upload` | Upload existing `dist/` only (used as **Deploy command** in Cloudflare when that field is required) |
| `pnpm pages:dev` | Build and serve `dist/` with the Pages dev proxy |

## Cloudflare Pages

**Git (recommended):** In the [Cloudflare dashboard](https://dash.cloudflare.com/) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, pick this repo, then confirm build settings:

| Setting | Value |
|--------|--------|
| **Framework preset** | Astro (or None) |
| **Build command** | `pnpm build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |
| **Deploy command** | See below—depends whether the UI marks it required |

Pages reads **`.nvmrc`** (Node 22) for the build environment. `wrangler.jsonc` sets the Pages project name (`myfreedomday`) and output dir so Wrangler knows where to upload.

**Deploy command (two cases):**

1. **Field is optional** — leave it blank. Cloudflare will publish **`dist/`** after `pnpm build`.
2. **Field is required** (your dashboard shows “Required”) — the build still runs **`pnpm build`** first; the deploy step must upload static assets with **Pages**, not Workers. Use:

   **`pnpm pages:upload`**

   which runs `wrangler pages deploy dist`. Do **not** use `npx wrangler deploy` (that targets **Workers** and needs a Worker entrypoint; it caused the “Missing entry-point” error).

**Non-production branch deploy command:** The dashboard sometimes **cannot save** when this field is blank (“Invalid request body” / internal error)—treating empty strings as invalid is a Cloudflare UI quirk.

Use one of these instead:

| Approach | Value | When to use |
|----------|--------|-------------|
| **Same as production (recommended)** | `pnpm pages:upload` | Preview/PR branches get a real Pages preview deployment. |
| **No-op placeholder** | `pnpm pages:noop` | Only if you must satisfy the form and accept odd preview behavior; exits immediately with success. |

Avoid unrelated commands such as `npx wrangler versions upload` (Workers gradual rollouts, not this static site).

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
