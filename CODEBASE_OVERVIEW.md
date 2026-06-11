### Main tools

- Next.js: builds pages and routes (URL paths).
- React: builds UI from components (reusable UI pieces).
- TypeScript: JavaScript with types to catch mistakes earlier.
- Tailwind CSS: styles the UI using utility class names.

### Where things live

The most important folder is `app/`.
Next.js uses `app/` to build the site’s pages and routes.

- `app/page.tsx`: home page (what you see at `/`).
- `app/layout.tsx`: wrapper around all pages (fonts, nav, footer, metadata).
- `app/components/`: reusable UI pieces (nav, footer, blog bits, etc).
- `app/blog/`: blog pages.
  - `app/blog/page.tsx`: blog list page.
  - `app/blog/[slug]/page.tsx`: one blog post page (`slug` is the part of the URL).
- `app/sitemap.ts`, `app/robots.ts`: help search engines crawl site.
- `app/rss/route.ts`: RSS feed (machine-readable blog updates).
- `app/og/route.tsx`: share image (Open Graph) for link previews.
- `app/lib/`: helper code (for example, calling the GitHub API).

### Root files

- `package.json`: list dependencies + scripts to run (`dev`, `build`, `start`).
- `bun.lock`: exact dependency versions (so installs stay same).
- `next.config.js`: Next.js settings.
- `tsconfig.json`: TypeScript settings.
- `postcss.config.js`: CSS build settings.

### How to run it locally

```bash
bun dev
```

or

```bash
npm run dev
```

