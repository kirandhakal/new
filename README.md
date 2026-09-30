# Kiran Dhakal Portfolio

A Next.js App Router portfolio written in TypeScript and styled with Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks and production

```bash
npm run typecheck
npm run build
npm start
```

## Project structure

- `app/` contains routes, metadata, robots, and sitemap entries.
- `features/` contains page and section-level UI.
- `components/` contains reusable layout and SEO components.
- `lib/` contains shared metadata and hook logic.
- `types/` contains shared TypeScript declarations.
- `public/` contains static assets.

See `newfloder_stuture.md` for the full architecture guide.

## Contact form configuration

Copy `.env.example` to `.env.local` and set the public contact-form values:

```env
NEXT_PUBLIC_CONTACT_API_URL=https://contact.kirandhakal.me
NEXT_PUBLIC_CONTACT_FORM_KEY=your-public-form-key
```

The form submits `name`, `email`, `phone`, and `message`. Keep administrator API keys private; only the public form key belongs in the frontend environment.
