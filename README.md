# Nuxt Cactus Theme

[Live Demo](https://nuxt-cactus-theme.vercel.app/)

A simple, opinionated blog theme built as a [Nuxt Layer](https://nuxt.com/docs/guide/going-further/layers). Install it in your own Nuxt project or clone the repo and use the playground as a starter.

## Table Of Contents

1. [Key Features](#key-features)
2. [Installation](#installation)
   - [As a Nuxt Layer (recommended)](#as-a-nuxt-layer-recommended)
   - [As a Starter Template](#as-a-starter-template)
3. [Configuration](#configuration)
4. [Projects List](#projects-list)
5. [Adding Posts, Notes, and Tags](#adding-posts-notes-and-tags)
   - [Post Frontmatter](#post-frontmatter)
   - [Note Frontmatter](#note-frontmatter)
   - [Tag Frontmatter](#tag-frontmatter)
6. [Content Schema](#content-schema)
7. [Pagefind Search](#pagefind-search)
8. [RSS Feed](#rss-feed)
9. [Deploy](#deploy)
10. [Development](#development)
11. [Acknowledgment](#acknowledgment)

## Key Features

- Nuxt 3 with full static generation
- Installable as a Nuxt Layer
- Tailwind CSS v4
- Accessible, semantic HTML markup
- Responsive & SEO-friendly
- Dark & Light mode
- Markdown posts & notes with Admonitions
- Automatic RSS feed (`/rss.xml`)
- [Webmentions](https://webmention.io/) support
- [Pagefind](https://pagefind.app/) static search
- Reading time estimation
- Table of contents generation
- Pinned posts support

## Installation

### As a Nuxt Layer (recommended)

1. Install the theme in your Nuxt project:

```bash
# From GitHub
npm install github:vuejs-pt/nuxt-cactus-theme

# Or with pnpm
pnpm add github:vuejs-pt/nuxt-cactus-theme
```

2. Extend it in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: ["nuxt-cactus-theme"],
});
```

3. Create a `content.config.ts` in your project root to re-export the theme's content schemas:

```typescript
export { default } from "nuxt-cactus-theme/content.config";
```

4. Create an `app.config.ts` to override the default site configuration:

```typescript
export default defineAppConfig({
  siteConfig: {
    author: "Your Name",
    title: "Your Blog",
    description: "Your blog description",
    url: "https://yourdomain.com",
    lang: "en-US",
    ogLocale: "en_US",
  },
  menuLinks: [
    { path: "/", title: "Home" },
    { path: "/about/", title: "About" },
    { path: "/posts/", title: "Blog" },
    { path: "/projects/", title: "Projects" },
    { path: "/notes/", title: "Notes" },
  ],
});
```

5. Add your content in `content/posts/`, `content/notes/`, and `content/tags/`.

### As a Starter Template

Clone the repo and work directly with the playground:

```bash
git clone https://github.com/vuejs-pt/nuxt-cactus-theme.git
cd nuxt-cactus-theme
pnpm install
pnpm dev
```

The playground in `playground/` contains example content and extends the theme layer. You can modify it directly or use it as a reference for your own project.

## Configuration

All site configuration lives in `app.config.ts` and is fully overridable by the consumer project. Available options:

| Key | Description |
| :--- | :--- |
| `siteConfig.author` | Author name (used in footer, RSS, meta tags) |
| `siteConfig.title` | Site title (used in header, meta tags, RSS) |
| `siteConfig.description` | Site description (meta tags, RSS) |
| `siteConfig.url` | Production URL (canonical links, RSS, OG images) |
| `siteConfig.lang` | HTML lang attribute (e.g. `en-GB`) |
| `siteConfig.ogLocale` | Open Graph locale (e.g. `en_GB`) |
| `siteConfig.date.locale` | Date formatting locale |
| `siteConfig.date.options` | `Intl.DateTimeFormat` options |
| `menuLinks` | Array of `{ path, title }` for header/footer navigation |
| `projects` | Array of `{ name, url, desc }` for the projects list |

## Projects List

Add a `projects` array to your `app.config.ts` to show a list of projects on the home page and the `/projects/` page.

```typescript
export default defineAppConfig({
  projects: [
    {
      name: "My Project",
      url: "https://github.com/you/my-project",
      desc: "A short description of the project",
    },
  ],
});
```

Each project has three fields:

| Field | Description |
| :---- | :---------- |
| `name` | Project name (rendered as a link) |
| `url` | URL to the project (e.g., GitHub repo) |
| `desc` | Short description shown after the name |

The theme defaults to an empty array. When no projects are configured, the projects section on the home page is hidden.

## Adding Posts, Notes, and Tags

Add `.md` files to `content/posts/`, `content/notes/`, or `content/tags/`. The filename is used as the slug/URL.

The Tag collection lets you override content for generated tag pages. For example, `content/tags/test.md` customises the page at `/tags/test`.

> **Note**: For a tag page to work, the file name must also appear in a post's `tags` frontmatter.

### Post Frontmatter

| Property (\* required) | Description |
| ---------------------- | --- |
| title \* | Post title. Max 60 characters. |
| description \* | SEO description. |
| publishDate \* | Publish date (e.g. `"22 Feb 2023"`). |
| updatedDate | Optional. Date the post was last updated. |
| tags | Optional. Array of tag strings. |
| coverImage | Optional. Object with `src` and `alt` for a hero image. |
| ogImage | Optional. Custom OG image path. Falls back to `/social-card.png`. |
| draft | Optional. Defaults to `false`. Excludes post from production builds. |
| pinned | Optional. Defaults to `false`. Shows post in the "Pinned Posts" section. |

### Note Frontmatter

| Property (\* required) | Description |
| ---------------------- | --- |
| title \* | Note title. Max 60 characters. |
| description | Optional. Meta description. |
| publishDate \* | Publish date. |

### Tag Frontmatter

| Property | Description |
| -------- | --- |
| title | Optional. H1 and page title. Max 60 characters. |
| description | Optional. Meta description and intro text. |

## Content Schema

The content collections are defined in `content.config.ts` using Zod schemas. When using the theme as a layer, re-export it in your project:

```typescript
// your-project/content.config.ts
export { default } from "nuxt-cactus-theme/content.config";
```

You can also extend the schemas by importing the collections and adding your own.

## Pagefind Search

[Pagefind](https://pagefind.app/) provides static search across blog posts. It runs as a post-build step after `nuxt generate`. Search results include pages with the `data-pagefind-body` attribute (post detail pages by default).

To remove search: delete `components/Search.vue`, uninstall `@pagefind/default-ui` and `pagefind`, and remove the `postbuild` script.

## RSS Feed

An RSS feed is automatically generated at `/rss.xml` via a Nitro server route. It's pre-rendered during `nuxt generate` and includes all published (non-draft) posts with their titles, descriptions, dates, and tags.

## Deploy

This theme uses `nuxt generate` for full static generation. The output is in `.output/public/` (or `playground/.output/public/` when developing the theme) and can be deployed to any static hosting provider:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## Development

Commands for developing the theme itself (runs the playground):

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start playground dev server at `localhost:3000` |
| `pnpm build` | Build the playground to `playground/.output/public/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Lint with ESLint |
| `pnpm format` | Format with Prettier |

### Project Structure

```
nuxt-cactus-theme/
├── app/                    # App root (app.vue, error.vue)
├── app.config.ts           # Default site configuration
├── assets/css/             # Tailwind CSS and theme styles
├── components/             # Vue components
├── composables/            # Vue composables (SEO, theme, search)
├── content.config.ts       # Content collection schemas
├── data/                   # Data files and helpers (posts, projects)
├── layouts/                # Default layout
├── nuxt.config.ts          # Layer Nuxt config
├── pages/                  # File-based routes
├── playground/             # Dev playground (extends the theme)
│   ├── content/            # Example content (posts, notes, tags)
│   ├── app.config.ts       # Playground config overrides
│   ├── content.config.ts   # Re-exports theme schemas
│   └── nuxt.config.ts      # Extends ".."
├── server/routes/          # Server routes (RSS feed)
├── tailwind.config.ts      # Tailwind configuration
├── types.ts                # TypeScript definitions
└── utils/                  # Utilities (date, reading time, TOC)
```

## Acknowledgment

This theme is a Nuxt port of [Astro Theme Cactus](https://github.com/chrismwilliams/astro-theme-cactus) by Chris Williams, which was inspired by [Hexo Theme Cactus](https://github.com/probberechts/hexo-theme-cactus).

## License

MIT
