# NEXT Website — Folder Structure Guide

This document explains how the Next.js App Router project is organized: pages, components, features, data, context, SEO, and supporting folders.

Path alias: `@/*` maps to the project root (see `tsconfig.json`).

---

## High-level tree

```
NEXT-website-nextjs-frontend/
├── app/                 # Routes & page entry points (Next.js App Router)
├── features/            # Page-section UI (domain / screen-level components)
├── components/          # Shared UI used across pages
├── data/                # Static JSON content
├── types/               # TypeScript types for data & props
├── lib/                 # Utilities, site config, fetchers, schema helpers
├── seo/                 # SEO helpers (legacy / alternate; prefer lib + components)
├── context/             # React context providers
├── public/              # Static assets (images, robots, etc.)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Architecture flow

```
app/*/page.tsx          →  composes route, metadata, JSON-LD
        ↓
features/*/             →  section UI for that page
        ↓
data/*/*.json           →  copy, lists, CMS-like content
types/*.ts              →  shapes for that JSON
components/*            →  shared Navbar, Footer, Button, typography
lib/*                   →  constants, fetchers, schema builders, helpers
public/images/*         →  images referenced as /images/...
```

**Rule of thumb**

| Layer | Responsibility |
|--------|----------------|
| `app/` | Routing, `metadata`, compose sections, inject SEO schema |
| `features/` | Page-specific sections (hero, lists, detail blocks) |
| `components/` | Reusable chrome & primitives (nav, footer, buttons) |
| `data/` | Content only (JSON) — no React |
| `types/` | Interfaces matching JSON / API shapes |
| `lib/` | Shared logic (URLs, fetchers, schema.org builders) |
| `public/` | Files served as-is at `/...` |

---

## 1. `app/` — Pages & routing

Next.js **App Router**. Each folder under `app/` is a URL segment. `page.tsx` is the route; `layout.tsx` wraps all pages.

```
app/
├── layout.tsx              # Root layout: fonts, Navbar, Footer, WhatsApp, global schema
├── page.tsx                # Home → /
├── globals.css
├── favicon.ico
├── robots.ts               # /robots.txt
├── sitemap.ts              # /sitemap.xml
├── about/page.tsx          # /about
├── services/page.tsx       # /services
├── career/page.tsx         # /career
├── contact/page.tsx        # /contact
├── blogs/
│   ├── page.tsx            # /blogs
│   └── view-details/[slug]/page.tsx   # /blogs/view-details/:slug
├── case-studies/
│   ├── page.tsx            # /case-studies
│   └── view-details/[slug]/page.tsx   # /case-studies/view-details/:slug
└── tools/
    └── [slug]/page.tsx     # /tools/:slug
```

### What a page does

1. Export **`metadata`** (or `generateMetadata` for dynamic routes).
2. Optionally render **`<SchemaOrg />`** with JSON-LD from `lib/schema`.
3. Import and stack **feature** sections — pages stay thin.

Example (`app/career/page.tsx`):

```tsx
// metadata + SchemaOrg + feature sections
<CareersHero />
<WhyWorkWithUs />
<YourPath />
<Internships />
<HiringProcess />
<CareersCta />
```

### Dynamic routes

- `[slug]` folders use `params` (Promise in this Next version).
- Use `generateStaticParams()` when slugs come from JSON (blogs, case studies).
- Call `notFound()` when a slug is missing.

### Root layout (`app/layout.tsx`)

- Global fonts (Montserrat, Geist Mono)
- Site-wide metadata base from `lib/constants`
- Organization + WebSite JSON-LD
- Shared shell: `Navbar` → `<main>{children}</main>` → `Footer` → WhatsApp button

---

## 2. `features/` — Page sections

Feature folders mirror marketing areas. **Pages compose features; features own section UI.**

```
features/
├── LandingPage/       # Home sections (Hero, About, Services, Projects, FAQ)
├── AboutUs/           # About page sections
├── Services/          # Services page
├── Career/            # Career page (hero, why us, path, internships, hiring, CTA)
├── ContactUs/         # Contact form / page
├── Blogs/
│   ├── blog-section.tsx
│   ├── blog-pagination.tsx
│   └── ViewDetail/    # Single-post UI
├── CaseStudies/
│   ├── hero.tsx
│   └── ViewDetail/    # challenge, impact, whatWeDid, testimonial, etc.
├── FreeTools/
│   ├── FreeToolsSection.tsx
│   ├── ToolPreview.tsx
│   └── Tools/         # Individual tools (QR, Password, SpinTheWheel, TicTacToe)
├── CTA/               # Shared CTA block reused on many pages
└── Testimonials/      # Testimonials block
```

### Conventions

- One file ≈ one section (e. of `Career/hero.tsx`, `Career/internships.tsx`).
- Detail UIs live under `ViewDetail/` when the route is `view-details/[slug]`.
- Features often import JSON from `@/data/...` and types from `@/types/...`.
- Use `"use client"` only when the section needs browser APIs, state, or event handlers.
- Prefer shared primitives from `@/components/ui` and `@/components/typography`.

### Mapping routes → features

| Route | Primary features |
|--------|------------------|
| `/` | `LandingPage/*`, `FreeTools`, `CTA` |
| `/about` | `AboutUs/*` |
| `/services` | `Services/*` |
| `/career` | `Career/*` |
| `/contact` | `ContactUs/*` |
| `/blogs` | `Blogs/*` |
| `/blogs/view-details/[slug]` | `Blogs/ViewDetail/*`, `CTA` |
| `/case-studies` | `CaseStudies/*` |
| `/case-studies/view-details/[slug]` | `CaseStudies/ViewDetail/*` |
| `/tools/[slug]` | `FreeTools/Tools/*` |

---

## 3. `components/` — Shared UI

Used site-wide; not tied to a single page.

```
components/
├── Navbar.tsx
├── Header.tsx
├── Footer.tsx
├── Breadcrumbs.tsx
├── SchemaOrg.tsx          # Renders <script type="application/ld+json">
├── typography/            # H1–H4, P, B1 (+ index barrel)
└── ui/                    # Design-system primitives (often shadcn-style)
    ├── button.tsx
    ├── input.tsx
    ├── textarea.tsx
    ├── select.tsx
    ├── form.tsx
    ├── card.tsx
    ├── badge.tsx
    ├── accordion.tsx
    ├── carousel.tsx
    └── whatsapp-button.tsx
```

- **Chrome**: Navbar, Footer, WhatsApp — wired in `app/layout.tsx`.
- **Typography**: consistent text styles for features.
- **`ui/`**: low-level interactive pieces; features compose them.

---

## 4. `data/` — Static content (JSON)

Content is separated from UI so copy can change without rewriting React.

```
data/
├── landing-page/
│   ├── home-hero.json
│   ├── home-about-us.json
│   ├── home-service.json
│   ├── home-project.json
│   ├── faq.json
│   └── free-tools.json
├── about-us/
│   ├── journey.json
│   └── team.json
├── career/
│   └── career.json          # hero, whyWorkWithUs, paths, internships, etc.
├── blogs/
│   ├── blog-posts.json      # list / cards
│   └── blog-detail.json     # full posts by slug
├── case-studies/
│   ├── case-studies.json
│   └── case-study-detail.json
├── services/
│   └── services.json
├── testimonials/
│   └── testimonials.json
├── contact-form/
│   └── contact.json
├── cta/
│   └── cta.json
└── footer/
    └── footer.json
```

### How data is consumed

1. **Direct import in a feature** (simple sections):

   ```tsx
   import careersData from "@/data/career/career.json";
   const hero = careersData.hero;
   ```

2. **Via `lib/fetchers`** (lists / by-slug helpers for blogs, case studies, services):

   ```ts
   // lib/fetchers/blog.ts
   getAllBlogPosts(), getBlogDetailBySlug(slug), getRelatedPosts(...)
   ```

3. **In pages** for metadata, sitemap, and `generateStaticParams`.

`resolveJsonModule` is enabled, so JSON imports are typed loosely; pair them with `types/` for safety.

---

## 5. `types/` — TypeScript models

```
types/
├── blog.ts
├── career.ts
├── case-study.ts
├── contact.ts
└── team.ts
```

- Mirror JSON structure (e.g. `CareersHeroData` for `career.json` → `hero`).
- Used by features, fetchers, and detail pages.
- Keep types next to domains; avoid dumping unrelated interfaces into one file.

---

## 6. `lib/` — Shared logic

```
lib/
├── constants.ts       # siteConfig, sitePages, buildMetadataBase()
├── canonical.ts       # canonicalUrl("/path")
├── utils.ts           # cn() and small helpers
├── fetchers/
│   ├── blog.ts
│   ├── case-studies.ts
│   └── services.ts
└── schema/
    ├── schema-builders.ts   # Organization, WebPage, FAQ, BlogPosting, Breadcrumbs, …
    ├── contact-form.ts
    └── index.ts
```

| Module | Role |
|--------|------|
| `constants.ts` | Brand name, URL, OG defaults, keywords |
| `canonical.ts` | Absolute canonical URLs for metadata |
| `fetchers/` | Read JSON and expose query helpers |
| `schema/` | Build Schema.org objects; `ld()` stringifies for `<SchemaOrg />` |

---

## 7. SEO

SEO is split across a few places (prefer these over empty stubs under `seo/`):

| Piece | Location | Purpose |
|--------|----------|---------|
| Default metadata | `app/layout.tsx` + `lib/constants` | Title template, OG, robots, canonical |
| Per-page metadata | Each `app/**/page.tsx` | Title, description, Open Graph |
| Dynamic metadata | `generateMetadata` on `[slug]` pages | From blog / case-study JSON |
| JSON-LD | `components/SchemaOrg.tsx` + `lib/schema/schema-builders.ts` | Structured data |
| Sitemap | `app/sitemap.ts` | Static + dynamic URLs from data |
| Robots | `app/robots.ts` | Crawl rules; points to sitemap |
| Public robots | `public/robots.txt` | Static fallback if needed |
| `seo/` | `seo/SchemaOrg.tsx`, `seo/schema-builders.ts` | Prefer `components/` + `lib/schema` (active imports use those) |

Typical page SEO pattern:

```tsx
export const metadata: Metadata = {
  title: "Career",
  description: "...",
  alternates: { canonical: canonicalUrl("/career") },
  openGraph: { title: "...", url: canonicalUrl("/career") },
};

<SchemaOrg
  schema={ld(
    WebPageSchema("/career", "...", "..."),
    BreadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Career", path: "/career" }]),
  )}
/>
```

---

## 8. `context/` — React context

```
context/
└── ThemeContext.tsx
```

Reserved for app-wide providers (theme, locale, etc.). Wire providers in `app/layout.tsx` when used. Keep page-local state inside feature components instead of new contexts.

---

## 9. `public/` — Static assets

```
public/
├── images/
│   ├── logo.svg, hero-bg.png, …
│   ├── blogs/
│   ├── team/
│   ├── journey/
│   ├── client-logos/
│   └── projects/          # per-project image folders
├── robots.txt
├── llms.txt
└── *.svg
```

Reference as root paths: `/images/logo.svg`, `/images/projects/ai/chatbot.png`.

---

## 10. Adding a new page (checklist)

1. **Route** — `app/<name>/page.tsx` with `metadata` + optional `SchemaOrg`.
2. **Features** — `features/<Name>/` section components.
3. **Data** — `data/<name>/*.json` for copy/lists.
4. **Types** — `types/<name>.ts` matching the JSON.
5. **Fetcher** (optional) — `lib/fetchers/<name>.ts` if you need list/by-slug helpers.
6. **Assets** — images under `public/images/...`.
7. **SEO** — update `app/sitemap.ts` (and robots if the path should be blocked).
8. **Nav/footer** — links in `components/Navbar.tsx` / footer data if the page is public.

---

## 11. Naming & import conventions

- **Folders**: `kebab-case` for URL segments (`case-studies`); `PascalCase` or domain names for features (`CaseStudies`, `LandingPage`).
- **Components**: PascalCase files/exports (`HiringProcess.tsx`).
- **Imports**: always use `@/` (e.g. `@/features/Career/hero`, `@/data/career/career.json`).
- **Client vs server**: default Server Components in `app/`; add `"use client"` only in features/components that need it.

---

## Quick reference — “where does X go?”

| I need to… | Put it in… |
|------------|------------|
| Add a URL / route | `app/.../page.tsx` |
| Build a page section | `features/<Area>/` |
| Reuse a button / input | `components/ui/` |
| Change homepage FAQ copy | `data/landing-page/faq.json` |
| Type a career hero | `types/career.ts` |
| Look up a blog by slug | `lib/fetchers/blog.ts` |
| Set site name / base URL | `lib/constants.ts` |
| Add JSON-LD type | `lib/schema/schema-builders.ts` |
| Add an image | `public/images/...` |
| Change global chrome | `app/layout.tsx` + `components/Navbar` / `Footer` |