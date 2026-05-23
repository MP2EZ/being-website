# Being Website

## What This Is

Marketing website for Being. — the Stoic Mindfulness mental wellness app. Next.js 16 app deployed to Cloudflare Workers via `@opennextjs/cloudflare`. Pre-launch: `main` branch deploys a "Coming Soon" splash; `preview` branch deploys the full site.

## Tech Stack

- Next.js `16.x` (App Router), React `19.x`, TypeScript
- Tailwind `4` (via `@tailwindcss/postcss`)
- `@mp2ez/being-design-system` (shared component package — published to GitHub npm registry)
- Cloudflare Workers (deployed via `@opennextjs/cloudflare` + `wrangler.toml`)

## Setup & Run

```bash
npm install            # requires GH_PACKAGES_TOKEN env var for the design-system package
npm run dev            # Next dev server
npm run build          # production build
npm run start          # serve built output
npm run lint           # eslint
```

## Page Validation Guide

Pages with sensitive content invoke a specialist agent during edits. The agents (`crisis`, `compliance`, `philosopher`) live in `.claude/agents/` and self-trigger from frontmatter when content signals match.

| Page route | File | Agent | Validates |
|---|---|---|---|
| `/philosophy` | `app/(main)/philosophy/page.tsx` | `philosopher` | Stoic citations (Marcus Aurelius, Epictetus, Seneca), framework coherence, no pop-philosophy |
| `/crisis` | `app/crisis/page.tsx` | `crisis` | 988 references present + accessible, supportive (not clinical) tone, no medical-advice claims |
| `/hipaa` | `app/hipaa/page.tsx` | `compliance` | Being is NOT a HIPAA-covered entity — page must explain non-applicability correctly |
| `/privacy`, `/privacy/california`, `/privacy-practices` | `app/privacy/...`, `app/privacy-practices/page.tsx` | `compliance` | CCPA/TDPSA/GDPR notices, accurate rights language |
| `/accessibility` | `app/accessibility/page.tsx` | `compliance` | WCAG claims, ADA framing |
| `/do-not-sell`, `/disclaimers`, `/support` | `app/{do-not-sell,disclaimers,support}/page.tsx` | `compliance` | Regulatory accuracy, medical-disclaimer correctness |
| `content/legal/*.md` | `content/legal/` | `compliance` | Source-of-truth markdown — same regulatory rules apply |

**Regulatory framing (CRITICAL):** Being is a consumer wellness app, not a healthcare provider or HIPAA-covered entity. Applicable laws: FTC Act, CCPA/CPRA, TDPSA, VCDPA, CPA, GDPR, App Store privacy requirements. Source of truth: `content/legal/regulatory-applicability.md`.

## Design System

Package: `@mp2ez/being-design-system` | CSS theme tokens: `app/globals.css` (`@theme` block)

### Colors
| Use | Prohibit |
|---|---|
| `text-brand-midnight`, `text-brand-sage`, `bg-accent-*` | `text-blue-950`, `#1B2951`, hardcoded hex |
| `text-gray-*`, `text-crisis-*` (OK) | — |

### Tokens
- **Radius**: `small`/`medium`/`large` (NOT `sm`/`md`/`lg`) → `--radius-small`, `--radius-medium`, `--radius-large`
- **Spacing**: pixel-based keys (`--spacing-4`=4px, `--spacing-16`=16px, etc.)
- **Inline styles**: `var(--color-*)` NOT hex

Reference: the `@theme` block in `app/globals.css` for the available tokens.

## Branches & Deploy

- `main` → production, currently the Coming Soon splash
- `preview` → preview environment, full site (will become production at launch)
- `feat/*` → feature branches, merged to `preview`
- CI/CD: GitHub Actions → Cloudflare Workers on push to tracked branches
- `npm ci` in CI requires `GH_PACKAGES_TOKEN` to pull the design-system package

To update the design system: `npm update @mp2ez/being-design-system` → commit → push.

## Docs Map

- `content/legal/` — source markdown for all legal pages (privacy policy, terms, medical disclaimer, regulatory applicability)
- `content/legal/regulatory-applicability.md` — **what regulations apply to Being, and why** (single source of truth)
- `docs/design-system.md` — design system reference
- `README.md` (project root) — general project setup

## Known Gotchas

- `GH_PACKAGES_TOKEN` env var is required for `npm install` / `npm ci` — the `@mp2ez/being-design-system` package is published to GitHub Packages, not the public npm registry.
- Tailwind v4 uses the new `@theme` block in CSS instead of `tailwind.config.js`. All design tokens are CSS variables in `app/globals.css`.
- Cloudflare Workers has bundle size limits (1MB compressed). Watch for large dependencies in client bundles.
- Design system tokens use `small`/`medium`/`large` naming, NOT Tailwind's default `sm`/`md`/`lg`. Easy to typo.
- `/hipaa` is a NON-applicability page — its job is to explain Being is not a HIPAA entity, not to claim HIPAA compliance.

## Convention Reminders

- Branches: `feat/*`, `fix/*`, `chore/*` | conventional commits | <400 LOC per change.
- When editing pages with `compliance`/`crisis`/`philosopher` triggers, invoke the agent for a content review pass before pushing.
- Push back with reasoning when something looks wrong; no performative agreement.
