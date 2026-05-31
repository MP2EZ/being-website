/**
 * PostHog event helpers.
 *
 * No `posthog-js` import at module scope — helpers reach the instance via
 * `window.__posthog`, only set after PosthogProvider dynamic-imports + inits.
 * If PostHog never loaded (GPC kill, missing key, SSR), every helper is a
 * silent no-op.
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
