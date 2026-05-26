# Visual audit — 2026-05-25 (post #31–#34 wave)

## Summary

- **13 findings total**: 0 critical · 1 display bug · 8 UX-judgment · 4 nits
- **Pages audited**: 12 (`/home`, `/features`, `/philosophy`, `/download`, `/privacy`, `/terms`, `/cookies`, `/accessibility`, `/crisis`, `/support`, `/privacy/california`, `/privacy/multi-state`)
- **Viewports**: 375 (mobile) + 1440×900 (desktop), 24 full-page screenshots in `./2026-05-25-screenshots/`
- **Live URL**: `being-website-preview.palouselabs.workers.dev` (commit `c742e16`)
- **Health baseline**: zero console errors, zero broken images, zero horizontal overflow, zero failed network requests across any page audited. Tailwind v4 token generation working everywhere post-#34. Mobile bottom nav present and functional on `(main)` group pages.
- **Reviewed by:** primary author (Claude) + `ux` agent second-opinion pass. UX revisions are inline; the 4 NEW findings below the original list (4-card sweep) came from the UX pass.

## Critical (🔴)

None.

## Display bugs (🟠)

### 🟠 Five standalone routes have no header, no nav, no footer

**Pages:** `/accessibility`, `/crisis`, `/support`, `/privacy/california`, `/privacy/multi-state`
**Where:** entire page chrome
**What:** These pages live in `app/<route>/page.tsx` (top-level), not in `app/(main)/`, so they inherit only the root layout — which has no `DesktopNav` or `Footer`. A user landing on any of these from a direct link (footer, email, search, the new `/privacy/multi-state` link the footer now exposes) cannot navigate elsewhere except by browser back button or typing a URL.

**Compare:**
- `(main)` group pages (`/home`, `/features`, `/philosophy`, `/download`, `/privacy`, `/terms`, `/cookies`): full header + nav + footer.
- Standalone pages: just the body content floating on the page.

**Repro:** load any of the five URLs above directly in a fresh tab; observe missing navigation chrome.

**Screenshots:**
- `accessibility-desktop.png` — starts with "Accessibility Statement" heading, no nav above
- `crisis-desktop.png` — starts with "You're not alone", no nav
- `support-desktop.png` — starts with "Support & Contact", no nav
- `privacy-california-desktop.png` — starts with "California Privacy Rights", no nav
- `privacy-multistate-desktop.png` — starts with "Multi-State Privacy Rights", no nav

**Suggested fix / note for UX:** Moving these pages into the `(main)` route group restores nav + footer with no other code change. The original split was likely deliberate (legal docs felt cleaner without chrome), but the new footer links to `/privacy/california` and `/privacy/multi-state` (added in PR #31) make the orphaning more visible — clicking those footer links lands you on a page that no longer has the footer you came from. Either move them into `(main)`, or add a minimal "Back to Being" header to the standalone layout.

**UX agent review:** "Keep as 🟠. Move all five into `(main)`. The 'doc-like reading without chrome' argument doesn't hold — `/privacy` and `/terms` are denser than these and have chrome. `/crisis` is the worst case: a user in distress lands cold, scans the page, has no way back except browser back (which on iOS Safari isn't always visible without scroll). Nielsen #3 violation at the worst possible moment. A `(legal)` sub-layout would be over-engineering — just move them."

## UX-judgment (🟡)

### 🟡 988 crisis callout has three different visual treatments across the site

**Pages:** `/features` (bright blue box), all `(main)` page footers (translucent overlay), `/crisis` (light blue with sage button accents)
**Where:** "988 Suicide & Crisis Lifeline" mentions
**What:** The same safety resource gets three different visual weights:
- `/features` body: large solid `bg-crisis-bg` blue box with white text — visually the brightest element on the page, more attention-grabbing than the actual feature copy
- All `(main)` footer crisis banner: `bg-crisis-bg/10` 10% translucent on dark midnight — appropriately calm, informational
- `/crisis` 988 card: light blue background with sage "Call 988" and dark "Text 988" buttons — clinical-card feel

**Why it might matter:** Being's stated voice (per CLAUDE.md and other agents) is "calm, informative, not alarming." A bright blue safety callout on a marketing page about features inverts that — it visually dominates "Mental Health Self-Monitoring" content that's actually the point of the page.

**Suggested fix / note for UX:** Pick one treatment and apply consistently. The footer's translucent-on-dark feels most aligned with Being's voice. The `/features` solid-blue box could either move to translucent or shrink to the same footer-style banner.

**Screenshots:** `features-desktop.png` (bright blue box mid-page), `home-desktop.png` (translucent footer banner), `crisis-desktop.png` (clinical card)

**UX agent review:** "Unify on footer's translucent style site-wide. `/features` solid blue is the clearest violation — brightest element on a page about PHQ-9 tracking, inverts visual hierarchy. `/crisis` page can keep more visual weight on the 988 card (that IS the page's job) — but **switch the button colors**. Sage 'Call 988' reads as a generic CTA; the call button on a crisis page should be the most obvious thing on screen. Make Call high-contrast primary, Text secondary."

---

### 🟡 No visual feedback that you're on a sub-page when on standalone routes

**Pages:** all 5 standalone routes (same as 🟠 above)
**Where:** N/A — the missing thing IS the feedback
**What:** No breadcrumb, no "← Back to Being," no site logo even. The pages start cold with their own H1. A user clicking through from `/privacy` § 5.3 to `/privacy/multi-state` loses all sense of being inside a site rather than reading a legal PDF.

**Suggested fix / note for UX:** Even a single line "Being · Privacy" with a link back to `/home` at the top would restore context. Could be added to the standalone layout (`app/layout.tsx` or a new shared `(legal)` group layout) without affecting (main) pages.

---

### 🟡 /privacy and /privacy/california have inline TOCs; /privacy/multi-state does not

**Pages:** `/privacy/multi-state`
**Where:** top of doc
**What:** Both `/privacy` and `/privacy/california` open with a Table of Contents listing all sections. `/privacy/multi-state` does not — it goes straight from "Not legal advice" blockquote → "Overview" without giving the reader a map of the 11 sections that follow.

**Suggested fix / note for UX:** Either add a TOC to multi-state, or remove the others' TOCs if the team thinks inline TOCs are clutter. Consistency either way.

**Screenshot:** `privacy-multistate-desktop.png` (no TOC above Overview)

**UX agent review:** "Keep 🟡. ADD TOC to multi-state — 11 sections is exactly where TOC earns its keep (Miller's law). Don't remove the others'; legal docs benefit from in-page navigation as a baseline."

---

### 🟡 /home hero CTAs duplicate the /home bottom CTA

**Page:** `/home`
**Where:** hero buttons ("Begin Your Practice", "Explore Stoic Mindfulness") + bottom "Ready to begin? Download Being"
**What:** "Begin Your Practice" hero button presumably routes to `/download` — the same destination as the bottom "Download Being" button. The hero and bottom CTAs are semantically the same, with the hero being more aspirational and the bottom being more direct.

**Why it might matter:** Marketing pages often duplicate CTAs intentionally (top of fold + below fold), but the two have different wording. A user who sees "Begin Your Practice" and clicks it might be surprised it just goes to a download page rather than starting an onboarding flow.

**Suggested fix / note for UX:** Either align the wording (both say "Download" or both say "Begin") or differentiate the destinations (hero = sign up, bottom = download). Subjective — flagging for UX review.

**Screenshot:** `home-desktop.png`

**UX agent review:** "Demote to 🔵, leave it. Different copy for the same destination is marketing convention, not a bug — 'Begin Your Practice' sets aspiration above the fold, 'Download Being' sets action below. The download page itself is the onboarding for a pre-install app." → **Demoted to 🔵 below.**

---

### 🟡 /home Hero subtitle text length wraps awkwardly at desktop

**Page:** `/home`
**Where:** hero subtitle "Ancient Stoic wisdom meets modern mental health practice..."
**What:** At 1440×900 desktop, the subtitle wraps to 2 lines mid-sentence with awkward line lengths (one short, one long). At mobile it wraps to 3 lines more naturally. The desktop wrap looks like a forced break rather than intentional.

**Suggested fix / note for UX:** Either constrain the subtitle's max-width (e.g., `max-w-xl`) for a cleaner 2-line break, or shorten the copy. Minor.

**Screenshot:** `home-desktop.png`

**UX agent review:** "Keep 🟡. Fix with `max-w-xl` or `max-w-2xl`. The two lines are roughly balanced, but the break lands mid-phrase ('Daily / mindfulness grounded...'). Constrain max-width so it wraps at a natural phrase boundary. 5-minute fix."

---

### 🟡 /features has no bottom CTA — page ends on a 988 callout

**Page:** `/features`
**Where:** end of page, between final feature section and footer
**What:** Every other primary page drives toward `/download`. `/features` is the page most likely to convert a curious browser (they're reading about specific app capabilities), and it currently ends with the bright-blue 988 box rather than a "Download Being" or "Begin Your Practice" CTA.

**Suggested fix / note for UX:** Add a bottom CTA matching `/home`'s "Ready to begin? — Download Being" pattern after the feature sections, before the 988 callout (which can move or shrink to footer-style if also unified per the callout finding above).

**Screenshot:** `features-desktop.png` (page ends with the blue box, no conversion ask)

**Source:** UX agent second-opinion pass.

---

### 🟡 /philosophy bottom CTA undersized, gets lost between accordions and footer

**Page:** `/philosophy`
**Where:** "Practice Stoic Mindfulness Daily" section near the bottom
**What:** The end-of-page CTA is visually undersized compared to `/home`'s "Download Being" button. It sits between the "Deepen Your Practice" accordions and the footer with too little visual weight, easy to scroll past.

**Suggested fix / note for UX:** Bump the CTA size + visual weight to match `/home`'s primary "Download Being" button. End-of-page CTAs need to assert themselves to compete with the footer pulling attention.

**Screenshot:** `philosophy-desktop.png`

**Source:** UX agent second-opinion pass.

---

### 🟡 /download pricing: free trial visually equal-weighted with paid subscription

**Page:** `/download`
**Where:** "Simple, Transparent Pricing" section, two pricing cards
**What:** "Free Trial / 1 month" and "Subscription / $79.99/year" are rendered as visually equal flat cards. Standard SaaS pattern is to visually elevate the free option (it's what you want users to pick first — friction-free entry).

**Suggested fix / note for UX:** Make the free trial card visually primary (border accent, slightly larger, or labeled "Start here"). Demote the paid subscription card to a secondary visual treatment.

**Screenshot:** `download-desktop.png`

**Source:** UX agent second-opinion pass.

## Nits (🔵)

### 🔵 /home Hero CTA wording vs bottom CTA (demoted from 🟡 per UX review)

Hero "Begin Your Practice" vs bottom "Download Being" — different copy for same destination. UX agent: "Marketing convention, not a bug — leave it." See original entry under UX-judgment for context.

### 🔵 /home "Learn more →" link contrast may be borderline

**Page:** `/home`
**Where:** "Why Being is different" three cards, "Learn about Stoic Mindfulness →" / "Explore app features →" / "Read privacy policy →" links
**What:** Sage green (`text-brand-sage` = `#4A9B8E`) on light gray card background. UX agent flagged this as possibly borderline against WCAG AA 4.5:1 — worth a manual contrast check or axe pass.

**Suggested fix / note:** Run a contrast check on `text-brand-sage` against the card background. If under 4.5:1, switch to `text-accent-700` (the darker green) for these links specifically.

**Source:** UX agent second-opinion pass.

### 🔵 /support last-updated date is stale (December 12, 2025)

**Page:** `/support`
**Where:** "Version: 1.0  Last Updated: December 12, 2025" header
**What:** The cookies page was just updated to "Last Updated: May 25, 2026" with new GPC content. Support.md hasn't been bumped despite the page now hosting the GpcNotice and being one of the "privacy and support pages" the privacy policy promises GPC honoring on.

**Suggested fix / note for UX:** This is an upstream source-of-truth bump in the being repo (`docs/legal/support.md`), not a website-side change. File as a follow-up to bump Last Updated when the support doc next gets touched, or now if anyone wants to make a small change.

### 🔵 /download uses placeholder app store badges

**Page:** `/download`
**Where:** "Available on iOS and Android" section
**What:** Both badges are colored geometric placeholders, not real Apple/Google official badges. Known + deferred (A11Y-13 in prior audit, deferred until app is in stores).

**Suggested fix / note for UX:** Replace with official Apple App Store + Google Play badges at launch. No action this audit.

### 🔵 Mobile viewport in DevTools MCP resizes to ~500px floor, not exact 375px

**Methodology nit:** the headless Chrome instance has a minimum viewport width around 500px; my "mobile" screenshots are actually ~500-wide, not the iPhone-spec 375×812 I asked for. Findings about mobile rendering are still useful (the layouts collapse well at this width), but a true 375 verification should happen via a different tool or device emulation that doesn't have this floor.

## Pages with no findings

- `/terms` — renders cleanly, dense legal content with proper TOC + footer
- `/cookies` — recently rewritten in #32, all sections render, GpcNotice slot present (correctly hidden without GPC)
- `/philosophy` — accordions present and styled, 5-card grid renders properly
- `/download` — beyond the known placeholder badges, structure is solid

Five pages had no actionable findings on this audit pass.

## Cross-cutting things this audit canNOT see

- **GpcNotice rendering** — only fires when `Sec-GPC: 1` or `navigator.globalPrivacyControl === true`. Chrome DevTools MCP doesn't expose either out of the box. Visual verification would require either a synthetic header injection or testing in a GPC-enabled browser (Brave, DuckDuckGo).
- **A/B variant differences** — pages might render slightly differently based on `being_ab_variant`; this audit hit the default-assigned variant only.
- **Splash page** (`NEXT_PUBLIC_SHOW_FULL_SITE !== 'true'`) — explicitly out of scope.
- **Authenticated states** — none exist on the site today.
- **Interactive states** (hover, focus, active, error) — only initial render captured.

## Recommended next steps

Both reviewers (primary + UX agent) converge on the same priority ordering:

1. **🟠 Move the 5 standalone routes into `(main)`** (one route-group move per page, no other code change). UX agent's reasoning sealed it: `/crisis` lacking a back-to-Being path is a real-user-in-distress problem, not a design preference. Bundle as `fix(layout): move legal+crisis+support pages into (main) for nav+footer`.
2. **🟡 Unify the 988 callout** on the footer's translucent treatment site-wide. Special case: `/crisis` page's 988 card should swap button colors so "Call 988" is the high-contrast primary action.
3. **🟡 Add a `/features` bottom CTA** matching `/home`'s "Download Being" pattern (UX agent flag — page ends on safety callout with no conversion ask).
4. **🟡 Add TOC to `/privacy/multi-state`** (matches `/privacy` and `/privacy/california` pattern, 11 sections past Miller's law).
5. **🟡 Add `max-w-xl` to `/home` hero subtitle** (5-min fix for awkward line break).
6. **🟡 Bump `/philosophy` end-of-page CTA visual weight** to match `/home`'s.
7. **🟡 Visually elevate `/download` free trial card** above the paid subscription.
8. **🔵 Spot-check `text-brand-sage` contrast** on `/home` cards — UX agent suspects borderline WCAG AA.
9. **🔵 Bump `/support` Last Updated** date when next touching the support markdown upstream.

**Out of scope (separate follow-ups):**
- **Playwright visual regression CI** to catch the next "silent display bug" class without manual audits
- **True 375px mobile testing** (DevTools MCP appears to floor at ~500px)
- **Synthetic GPC injection** to visually verify the GpcNotice's rendered state
- **Cross-browser** testing beyond DevTools' headless Chrome
