import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
});

const updates = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().optional(),
	}),
});

export const collections = { guides, updates };
