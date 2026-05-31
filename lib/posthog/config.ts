/**
 * PostHog configuration — single source of truth for analytics setup.
 *
 * EU data residency is required per privacy-policy.md §5.1/§5.2.
 *
 * If the key is missing (e.g., local dev), `isPosthogConfigured()` returns
 * false and the AnalyticsGate renders nothing → graceful degradation,
 * never a hard failure.
 *
 * @see INFRA-website-posthog-disclosure (being repo PR #106)
 */

export const POSTHOG_HOST = 'https://eu.i.posthog.com';

export const POSTHOG_KEY: string | undefined = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function isPosthogConfigured(): boolean {
  return typeof POSTHOG_KEY === 'string' && POSTHOG_KEY.length > 0;
}
