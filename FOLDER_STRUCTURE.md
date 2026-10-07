# Folder Structure

This project is a React portfolio site built with Create React App, React Router, Tailwind CSS, Framer Motion, Lucide icons, and React Helmet.

## UI View Map

The app has one main scroll-based portfolio page and separate direct routes for each major section.

| UI view | Route | Main file | Rendered section/component |
| --- | --- | --- | --- |
| Portfolio home | `/` | `src/routes/PortfolioPage.js` | `HomeSection`, `ServicesSection`, `SkillsSection`, `ProjectsSection`, `ContactSection`, `ChatbaseWidget` |
| Services page | `/services` | `src/routes/ServicesPage.js` | `ServicesSection` inside `PageShell` |
| Skills page | `/skills` | `src/routes/SkillsPage.js` | `SkillsSection` inside `PageShell` |
| Projects page | `/projects` | `src/routes/ProjectsPage.js` | `ProjectsSection` inside `PageShell` |
| Contact page | `/contact` | `src/routes/ContactPage.js` | `ContactSection` inside `PageShell` |
| Not found page | `*` | `src/routes/NotFoundPage.js` | Custom 404 experience inside `PageShell` |

Shared UI used across views:

- `Header` appears at the top of the site and shows the logo/name plus current date/time.
- `NavBar` provides mobile bottom navigation and desktop side navigation.
- `Footer` appears below the page content.
- `PageShell` wraps standalone pages with the shared header, nav, chat widget, and footer.
- `ScrollToTop` resets scroll position when route changes.

## Root Structure

```text
new/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── kd.png
│   ├── kd-new.png
│   ├── Kiran Dhakal .pdf
│   └── points_data.json
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   └── sections/
│   ├── hooks/
│   ├── routes/
│   ├── utils/
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── README.md
├── how touse.md
└── FOLDER_STRUCTURE.md
```

## Source Folder Details

### `src/App.js`

Top-level app component. It creates the `BrowserRouter` and renders `AppRoutes`.

### `src/routes/`

Route-level components and page shells live here.

```text
src/routes/
├── AppRoutes.js
├── PortfolioPage.js
├── PageShell.js
├── ServicesPage.js
├── SkillsPage.js
├── ProjectsPage.js
├── ContactPage.js
├── NotFoundPage.js
└── ScrollToTop.js
```

- `AppRoutes.js` defines all app routes with lazy-loaded route components.
- `PortfolioPage.js` is the main one-page portfolio view. It lazy-loads each section when near the viewport and tracks the active section for navigation.
- `PageShell.js` is the shared wrapper for single-section route pages.
- `ServicesPage.js`, `SkillsPage.js`, `ProjectsPage.js`, and `ContactPage.js` render individual sections as standalone pages.
- `NotFoundPage.js` renders the custom 404 page. It also contains local helper components like `WebGraph`, `Packet`, `GlitchText`, and `TerminalLine`.
- `ScrollToTop.js` handles scroll reset during route changes.

### `src/components/`

Shared layout and reusable UI components.

```text
src/components/
├── Footer.js
├── Header.js
├── NavBar.js
├── SEOComponents.js
└── sections/
```

- `Header.js` renders the fixed top header and uses `useCurrentTime`.
- `NavBar.js` renders section navigation for mobile and desktop.
- `Footer.js` renders social links and footer animation.
- `SEOComponents.js` contains reusable SEO helpers: `StructuredData`, `PageMeta`, and `useSEO`.

Note: `SEOComponents.js` is available in the codebase but is not currently imported by the route files. The routes currently use `Helmet` directly.

### `src/components/sections/`

Main UI sections shown in the portfolio.

```text
src/components/sections/
├── HomeSection.js
├── ServicesSection.js
├── SkillsSection.js
├── ProjectsSection.js
├── ContactSection.js
└── ChatbaseWidget.js
```

- `HomeSection.js` renders the hero/profile view, role rotation, stats, CV download, contact CTA, and tech stack preview.
- `ServicesSection.js` renders service cards for web, app, UI/UX, backend, cloud/DevOps, and clean code.
- `SkillsSection.js` renders interactive skill cards using icons from `src/assets/images/`.
- `ProjectsSection.js` renders categorized project cards with filters for GovTech, SaaS, Commerce/Hospitality, and Creative work.
- `ContactSection.js` renders contact information, social links, and the contact form.
- `ChatbaseWidget.js` mounts the chat widget used in the main portfolio and shared page shell.

### `src/assets/images/`

Image and SVG assets imported by React components.

```text
src/assets/images/
├── docker.svg
├── figma.svg
├── git.svg
├── github.svg
├── kiran1.jpg
├── kirandhakal.webp
└── node.svg
```

- `kiran1.jpg` is used by `HomeSection`.
- `docker.svg`, `figma.svg`, `git.svg`, `github.svg`, and `node.svg` are used by `SkillsSection`.
- `kirandhakal.webp` is present as an additional profile image asset. It is currently not imported by the UI.

### `src/hooks/`

```text
src/hooks/
└── useCurrentTime.js
```

- `useCurrentTime.js` provides the live clock and formatted date used by `Header`.

### `src/utils/`

```text
src/utils/
└── seoUtils.js
```

- `pageMetaTags` is used by the route files for page titles, descriptions, keywords, and canonical URLs.
- `organizationSchema` is used on the home portfolio page.
- `getBreadcrumbSchema` and `getProjectSchema` are available helpers but are not currently imported anywhere.

### Entry, Styles, and Tests

- `src/index.js` mounts the React app.
- `src/index.css` contains Tailwind directives and global CSS, including the project card entrance animation.
- `src/App.css` is present from the app structure, but global styling is mainly handled through Tailwind and `index.css`.
- `src/App.test.js` is the default app test file.
- `src/setupTests.js` configures the React testing environment.
- `src/reportWebVitals.js` is available for performance reporting but is not actively used unless wired from `index.js`.
- `src/logo.svg` is present but not currently used in the visible UI.

## Public Folder Details

```text
public/
├── index.html
├── favicon.ico
├── logo192.png
├── logo512.png
├── kd.png
├── kd-new.png
├── Kiran Dhakal .pdf
├── manifest.json
├── robots.txt
├── sitemap.xml
└── points_data.json
```

- `index.html` is the browser HTML shell.
- `kd.png` is used by the header logo.
- `Kiran Dhakal .pdf` is the downloadable CV used by `HomeSection`.
- `kd-new.png` is used as the favicon from `public/index.html`.
- `manifest.json`, `robots.txt`, and `sitemap.xml` support PWA/SEO behavior.
- `points_data.json` is present but is not currently referenced by the React source.

## Project Configuration

- `package.json` defines scripts and dependencies.
- `tailwind.config.js` configures Tailwind CSS.
- `postcss.config.js` wires PostCSS/Tailwind processing.
- `vercel.json` configures deployment behavior for Vercel.
- `package-lock.json` locks dependency versions.

## Current Unused Or Support Files

These files exist in the project but are not currently used by the visible UI or route imports:

- `src/components/SEOComponents.js`
- `src/utils/seoUtils.js`: `getBreadcrumbSchema` and `getProjectSchema` only
- `src/assets/images/kirandhakal.webp`
- `src/logo.svg`
- `public/points_data.json`
- `src/App.css`
- `src/reportWebVitals.js`, unless performance reporting is connected from `src/index.js`
