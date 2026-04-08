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
| `pnpm pages:upload` | Upload `dist/` with Wrangler (**local** or external CI with a Pages-capable API token—not Cloudflare’s own Pages build) |
| `pnpm pages:noop` | No-op (exit 0). Use as **Deploy command** in the dashboard when the field is required but you build on **Cloudflare Pages** (see below) |
| `pnpm pages:dev` | Build and serve `dist/` with the Pages dev proxy |

## Cloudflare Pages

**Git (recommended):** In the [Cloudflare dashboard](https://dash.cloudflare.com/) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, pick this repo, then confirm build settings:

| Setting | Value |
|--------|--------|
| **Framework preset** | Astro (or None) |
| **Build command** | `pnpm build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |
| **Deploy command** | **`pnpm pages:noop`** if the field is required (see below). Otherwise leave empty. |

Pages reads **`.nvmrc`** (Node 22) for the build environment. `wrangler.jsonc` is for **local** Wrangler (`pnpm pages:deploy`) and naming; **Git builds on Cloudflare do not use Wrangler to publish**.

### Why `pnpm pages:upload` fails in Cloudflare’s build (error 10000)

If **Deploy command** is `pnpm pages:upload`, Wrangler runs **`wrangler pages deploy dist`** inside the build and uses **`CLOUDFLARE_API_TOKEN`**. That token is not intended for the Pages “direct upload” API, so you often get **`Authentication error [code: 10000]`** on `/pages/projects/...`.

**Correct approach for Connect-to-Git:** Cloudflare already deploys the **Build output directory** (`dist`) after **`pnpm build`**. No Wrangler step is required in that environment.

| Situation | Deploy command |
|-----------|----------------|
| Field optional | Leave **empty** |
| Field required, or save fails when empty | **`pnpm pages:noop`** |
| Publishing from **your machine** or **external CI** with your own API token | Use **`pnpm pages:deploy`** / **`pnpm pages:upload`** there—not inside Cloudflare’s Pages build |

Do **not** use `npx wrangler deploy` for this repo (that targets **Workers**, not static Pages).

**Non-production branch deploy command:** If blank causes “Invalid request body”, use **`pnpm pages:noop`** here too. Avoid `npx wrangler versions upload` unless you intentionally use Workers gradual rollouts.

**If you must run Wrangler in CI:** use a token with **Account → Cloudflare Pages → Edit** in your external CI secrets, or follow [Direct Upload from CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/).

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
