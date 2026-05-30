'use client';

/**
 * AnalyticsGate — the structural GPC kill for PostHog.
 *
 * Returns null (no PosthogProvider mounted, no posthog-js dynamic import
 * triggered, no script loaded, no cookie set, no beacon sent) when ANY
 * of these is true:
 *   - `being_gpc=1` cookie present (set by middleware when Sec-GPC: 1)
 *   - `navigator.globalPrivacyControl === true` (JS API; some browsers
 *     expose this without sending the HTTP header, e.g. older Brave)
 *   - PostHog key is not configured (local dev, env unset)
 *   - Component hasn't mounted yet (SSR default = safe = null)
 *
 * Why client-side, not server-side:
 * - A server-component gate would force its parent layout into dynamic
 *   rendering (via `cookies()` from `next/headers`), which would undo
 *   the `force-static` rendering for legal pages and re-introduce the
 *   per-request marked() parsing that PR #33 fixed.
 * - Client-side gate keeps pages prerendered AND preserves the
 *   "PostHog doesn't load on GPC" guarantee: the dynamic import inside
 *   PosthogProvider only fires when this gate renders the provider.
 *   If the gate returns null, posthog-js is never fetched, init never
 *   runs, no cookie is set, no beacon is sent.
 *
 * Compliance: see being repo PR #106 (§5.2 update) — this gate is the
 * implementation of the "Global Privacy Control (GPC) hard kill"
 * commitment in the web-side analytics disclosure.
 */

import { useSyncExternalStore } from 'react';
import { PosthogProvider } from './PosthogProvider';
import { isPosthogConfigured } from '@/lib/posthog/config';

function subscribe(): () => void {
  return () => {};
}

function getClientSnapshot(): boolean {
  // Returns TRUE when analytics should be suppressed.
  if (typeof document !== 'undefined') {
    if (document.cookie.split(';').some((c) => c.trim() === 'being_gpc=1')) {
      return true;
    }
  }
  if (typeof navigator !== 'undefined') {
    const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
    if (gpc === true) return true;
  }
  return false;
}

function getServerSnapshot(): boolean {
  return true; // SSR default = suppress = safe
}

export function AnalyticsGate() {
  const suppressed = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (suppressed) return null;
  if (!isPosthogConfigured()) return null;

  return <PosthogProvider />;
}
