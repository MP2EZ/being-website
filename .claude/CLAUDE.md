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
PM, planning, backlog: Notion (MCP) — `NOTION_WORK_DB = 277a1108c20880bda80dce2ec7d8a12e`
  ↳ Commands reference this as `${NOTION_WORK_DB}`. Rotate here; do not duplicate elsewhere.

## Custom commands
- `/b-work [ID]` — run a Notion work item end-to-end (worktree → classify → execute)
- `/b-create` — create a new Notion work item from conversation with dimensional scoring
- `/b-close [ID]` — close a work item (merge branch, update Notion, prune worktree)
- `/b-cleanup` — repo cleanup audit with domain-agent validation passes

## Custom agents (claim validation for marketing pages)
- `philosopher` — Stoic Mindfulness citations on `/philosophy` (validates classical sources)
- `crisis` — copy on `/crisis` (988 references, threshold language)
- `compliance` — legal pages `/hipaa`, `/privacy`, `/accessibility` (regulatory claims)
