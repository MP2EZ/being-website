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

The site is automatically deployed to Cloudflare Pages when pushing to `main` branch.

Manual deployment:
```bash
npx wrangler pages deploy .vercel/output/static --project-name=websitev2
```

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
  /disclaimers            # Legal disclaimers
  /hipaa                  # HIPAA compliance info

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
