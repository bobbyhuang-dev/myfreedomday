---
title: Frequently asked questions
description: Dummy answers to imaginary questions—swap in your real FAQs later.
---

### Is this production-ready?

This repository is a **demo**. The copy is nonsense on purpose. The plumbing—Astro, Markdown collections, static output—is suitable for a real launch after you replace text, branding, and metadata.

### Where do I change the navigation?

Look at `src/layouts/BaseLayout.astro`. That layout wraps the home page, guide pages, updates, and contact.

### Can I use MDX?

Yes. Add the MDX integration with `pnpm astro add mdx`, widen the glob in `src/content.config.ts`, and author `.mdx` files when you need components inside content.
