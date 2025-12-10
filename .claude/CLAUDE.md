# Being Website [requires: ~/.claude/CLAUDE.md]

## Config
Next.js 16|Cloudflare Workers|@opennextjs/cloudflare|Tailwind

## Design System [!]

Package: `@mp2ez/being-design-system` | CSS: `app/globals.css`

### Colors
| Use | Prohibit |
|-----|----------|
| `text-brand-midnight` | `text-blue-950`\|`#1B2951` |
| `text-brand-sage`\|`bg-accent-*` | hardcoded hex |
| `text-gray-*`\|`text-crisis-*` | (OK) |

### Tokens
Radius: `small/medium/large` NOT `sm/md/lg` → `--radius-small`\|`--radius-medium`\|`--radius-large`
Spacing: pixel-based keys (`--spacing-4`=4px, `--spacing-16`=16px, etc.)
Inline styles: `var(--color-*)` NOT hex

Reference: `globals.css` @theme block for available tokens

## Branches
main→production(Coming Soon) | preview→full-site
CI/CD: GitHub Actions→Cloudflare Workers | GH_PACKAGES_TOKEN required for npm ci

## Operations
Deploy: push to branch→auto-deploy
Update design system: `npm update @mp2ez/being-design-system`→commit→push
