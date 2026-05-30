'use client';

/**
 * PostHog initializer — dynamic-imports posthog-js and runs init() once.
 *
 * This component is rendered ONLY by AnalyticsGate, which has already
 * verified that GPC is not set and the PostHog key is configured.
 * Mounting this component is what kicks off the dynamic import + init.
 *
 * Init options chosen to match privacy-policy.md §5.2 web-side commitments:
 * - api_host: EU cloud only (no US fallback)
 * - autocapture: false       (we capture only the named events)
 * - disable_session_recording: true  (categorically off per /cookies)
 * - capture_pageview: true   (the one default we DO want)
 * - persistence: cookie      (per /cookies disclosure)
 * - opt_out_capturing_by_default: false  (opt-out posture per product agent
 *   + scoped to non-GPC visitors per §5.2)
 *
 * @see lib/posthog/events.ts for the event-emit helpers
 */

import { useEffect } from 'react';
import { POSTHOG_KEY, POSTHOG_HOST } from '@/lib/posthog/config';

export function PosthogProvider() {
  useEffect(() => {
    const key = POSTHOG_KEY;
    if (!key) return;
    if (window.__posthog) return; // already initialized in this isolate

    void import('posthog-js').then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: POSTHOG_HOST,
        autocapture: false,
        disable_session_recording: true,
        capture_pageview: true,
        persistence: 'cookie',
        opt_out_capturing_by_default: false,
        loaded: (ph) => {
          window.__posthog = ph as unknown as NonNullable<Window['__posthog']>;
        },
      });
    });
  }, []);

  return null;
}
