// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkRejectRawHtml from './src/utils/remark-reject-raw-html.mjs';

const site = process.env.SITE_URL ?? 'https://myfreedomday.pages.dev';

// https://astro.build/config
export default defineConfig({
	site,
	output: 'static',
	markdown: {
		remarkPlugins: [remarkRejectRawHtml],
	},
	integrations: [
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
	],
});
