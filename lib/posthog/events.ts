/**
 * PostHog event helpers — type-safe wrappers for the PR #1 event set.
 *
 * Design notes:
 * - No `posthog-js` import at module scope — these helpers reach the
 *   PostHog instance via `window.__posthog`, which is only set after
 *   PosthogProvider has dynamic-imported the library AND init'd it.
 * - If PostHog never loaded (GPC kill, missing key, SSR), every helper
 *   is a silent no-op. No throws, no console noise.
 * - PR #1 event set: $pageview (PostHog default — fires automatically
 *   on init via capture_pageview: true), trackWaitlistSubmitted,
 *   trackWaitlistFailed.
 * - Future helpers (cta_clicked, crisis_resource_clicked, ab_variant_assigned,
 *   identifyByEmailHash) ship in PR #2+.
 */

declare global {
  interface Window {
    __posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void;
    };
  }
}

export type WaitlistSource = 'home' | 'features' | 'download' | 'splash';

export interface WaitlistSubmittedProps {
  source: WaitlistSource;
}

export interface WaitlistFailedProps {
  source: WaitlistSource;
  reason: string;
}

function capture(event: string, props?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const ph = window.__posthog;
  if (!ph) return;
  ph.capture(event, props);
}

export function trackWaitlistSubmitted(props: WaitlistSubmittedProps): void {
  capture('waitlist_signup_submitted', { source: props.source });
}

export function trackWaitlistFailed(props: WaitlistFailedProps): void {
  capture('waitlist_signup_failed', { source: props.source, reason: props.reason });
}
