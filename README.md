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
| `pnpm pages:upload` | Upload `dist/` with **`wrangler pages deploy`** (needs a **Cloudflare Pages → Edit** API token in CI—see README) |
| `pnpm pages:noop` | No-op (exit 0). Only for optional fields like **Version command**—**do not** rely on it for **Deploy** or the live site can stay on “Hello World” |
| `pnpm pages:dev` | Build and serve `dist/` with the Pages dev proxy |

## Cloudflare Pages

**Git (recommended):** In the [Cloudflare dashboard](https://dash.cloudflare.com/) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, pick this repo, then confirm build settings:

| Setting | Value |
|--------|--------|
| **Framework preset** | Astro (or None) |
| **Build command** | `pnpm build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |
| **Deploy command** | **`pnpm pages:upload`** after you add a **Pages-capable API token** (see below). Use **`pnpm pages:noop`** only as a temporary placeholder—**not** as the final setting if the live site shows “Hello World” or a blank page. |

Pages reads **`.nvmrc`** (Node 22) for the build environment. `wrangler.jsonc` keeps the project name and output dir for Wrangler.

### Blank page or “Hello World” on the live URL

If **`pnpm build` succeeds** but the site only shows **Hello World**, a **blank** screen, or a generic stub, the **Deploy** step is probably **not publishing `dist/`**. A no-op (`pnpm pages:noop`) exits successfully but **uploads nothing**, so the edge may still run a **default Worker** or empty deployment.

**Fix:** use a real upload:

1. In [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → **Custom token**.
2. **Permissions:** **Account** → **Cloudflare Pages** → **Edit** (add **Account** → **Account Settings** → **Read** if Wrangler asks for it).
3. **Account Resources:** include your account.
4. Open your **Pages** project → **Settings** → **Environment variables** (Production and Preview) and set **`CLOUDFLARE_API_TOKEN`** to that token’s value. (This overrides the restricted token the build injected before and fixes **`Authentication error [code: 10000]`** when using `pnpm pages:upload`.)
5. Set **Deploy command** to **`pnpm pages:upload`** and **Version command** (if present) to **`pnpm pages:noop`** or match production per Cloudflare’s UI.
6. **Redeploy** the latest commit.

View **page source** on your `*.pages.dev` URL: you should see `<title>MyFreedomDay</title>` and the real layout—not a one-line Hello World.

### Why `pnpm pages:upload` failed before (error 10000)

Wrangler uses **`CLOUDFLARE_API_TOKEN`**. The default token in the build environment often **cannot** call the Pages “direct upload” API. A **custom** token with **Cloudflare Pages → Edit** (above) fixes that.

### Deploy / version commands (summary)

| Situation | Deploy command |
|-----------|----------------|
| Field optional and saves | Try **empty** first; if the site is correct, leave it. |
| Field required | **`pnpm pages:upload`** (with the API token above). |
| Must fill “Version command” with something harmless | **`pnpm pages:noop`** |

Do **not** use `npx wrangler deploy` for this **Pages** repo unless you intentionally move to **Workers Static Assets** and follow Workers docs (different defaults than Pages).

**Non-production branch deploy command:** Prefer **`pnpm pages:upload`** (with the same token) so previews deploy real files; if blank causes “Invalid request body”, **`pnpm pages:noop`** is acceptable only for that field if previews are not critical.

**External CI:** same token variables as in [Direct Upload from CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/).

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
