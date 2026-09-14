# Being Website

Marketing website for [Being](https://being.fyi) - Stoic Mindfulness mobile app.

## 🚀 Tech Stack

- **Framework:** Next.js 15.5.2
- **React:** 19.2.0
- **TypeScript:** 5
- **Styling:** Tailwind CSS 4
- **Deployment:** Cloudflare Pages
- **Runtime:** Edge Runtime

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Deployment

`.github/workflows/deploy.yml` builds with OpenNext and deploys to Cloudflare Workers on push to `main` (https://being.fyi) or `preview`. Run it by hand with `gh workflow run deploy.yml --ref main`.

### Legal content

`content/legal` is a **gitignored, local-dev-only symlink** to being's `development` worktree (`../../being/development/docs/legal`), so local preview diverges from production by construction. Deploys never use it: `.github/actions/checkout-legal` copies `docs/legal` from `mp2ez/being` at build time, from `main` for production and `development` for preview. mp2ez/being redeploys the site when `docs/legal` changes.

## 🏗️ Project Structure

```
/app                      # Next.js App Router
  /(main)                 # Main website layout
    /home                 # Homepage
    /features             # Features page
    /philosophy           # Philosophy page
    /download             # Download/App stores page
    /privacy              # Privacy policy
    /terms                # Terms of service
  /(standalone)           # Landing page layout
  /api                    # API routes
    /waitlist             # Waitlist signup endpoint
  /accessibility          # Accessibility statement
  /crisis                 # Crisis resources

/components               # Reusable React components
  /navigation             # Navigation components
  /shared                 # Shared UI components
  /features               # Feature-specific components

/lib                      # Utility functions and helpers
/public                   # Static assets
/docs                     # Website documentation
```

## 🌍 Environment Variables

Required variables (create `.env.local`):

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_WAITLIST_DB_ID=your_notion_database_id
```

## 🔗 Related Repositories

- **Mobile App:** [MP2EZ/fullmind](https://github.com/MP2EZ/fullmind) - React Native app for iOS and Android

## 📝 License

Proprietary - All rights reserved
