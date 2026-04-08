# MyFreedomDay

Informational demo site: **Astro** + **TypeScript**, **Markdown** in `src/content/` (validated with content collections), static HTML output suitable for **Cloudflare Pages**.

## Commands

| Command | Action |
|--------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `http://localhost:4321` |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview the production build locally |

## Cloudflare Pages

1. Connect this repository to Cloudflare Pages.
2. **Install command:** `pnpm install` (or leave default; Pages detects `pnpm-lock.yaml`).
3. **Build command:** `pnpm build`
4. **Build output directory:** `dist`
5. **Environment:** Node 22.x matches `package.json` engines.

After the first deploy, set `site` in `astro.config.mjs` to your real Pages URL (or custom domain) so canonical URLs and RSS feeds behave correctly if you add them later.

Optional CLI deploy after a local build:

```bash
pnpm dlx wrangler pages deploy dist --project-name=myfreedomday
```

## Content

- **Guides:** `src/content/guides/*.md`
- **Updates:** `src/content/updates/*.md` (frontmatter includes `pubDate`; omit or set `draft: true` to hide from lists when you extend the schema)

Edit Markdown, commit, push—Pages rebuilds from Git.
