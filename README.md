# HeWhoCodes Website

Personal website for [HeWhoCodes](https://hewhocodes.com) — a portfolio and storefront for indie apps built by Navneet Raikwar.

The site is designed around a dark, glass-forward UI: a first-visit loader, clear-glass navigation, legal pages, and room to grow into a full app catalog and store.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Motion** (nav pill animation)
- **pnpm**

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
pnpm lint
pnpm build
pnpm start
```

## Project structure

```
src/
├── app/                    # Routing and page composition
│   ├── layout.tsx          # Root layout, fonts, global styles
│   ├── globals.css         # Design tokens and theme variables
│   └── (site)/             # Public site routes
│       ├── layout.tsx      # Shared SiteShell wrapper
│       ├── page.tsx        # Home
│       ├── privacy/
│       └── terms/
├── components/
│   ├── brand/              # Loader and first-visit experience
│   ├── layout/             # Header, footer, SiteShell
│   └── ui/                 # Reusable UI (glass nav, panels, scramble text)
├── features/
│   └── legal/              # Privacy and terms page content + layout
├── data/                   # Static site copy (nav, legal, metadata inputs)
├── hooks/                  # Client hooks (pill indicator, scramble text)
├── lib/                    # Framework-agnostic helpers and motion constants
└── types/                  # Shared TypeScript declarations

public/                     # Static assets
```

### How folders are used

| Folder | Responsibility |
|--------|----------------|
| `app/` | Routes, layouts, and page entry points |
| `components/` | Reusable UI and layout primitives |
| `features/` | Domain-specific sections (legal today; apps/store later) |
| `data/` | Static content until CMS/Supabase is connected |
| `lib/` | Helpers, metadata, motion tokens, session utilities |
| `hooks/` | Client-side interaction logic |

Local-only files (not in git): `docs/`, `references/`, `AGENTS.md`.

## Site sections

- **About** — intro and background
- **Apps** — indie projects and work
- **Store** — purchase/download flow for HeWhoCodes apps
- **Contact** — reach out
- **Legal** — `/privacy`, `/terms`

Home content and store flows are still being built; navigation and shell are in place.

## License

Private project. All rights reserved.