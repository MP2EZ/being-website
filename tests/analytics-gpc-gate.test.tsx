// @vitest-environment happy-dom

/**
 * Analytics GPC gate — the compliance-critical test surface.
 *
 * Failure modes this file MUST catch:
 *
 * 1. AnalyticsGate forgets to suppress when GPC is set
 *    → PostHog loads on a user who explicitly opted out → CCPA "sharing"
 *      violation + FTC §5 deceptive practice (we publicly promise GPC
 *      kill on /cookies and in privacy-policy §5.2).
 *
 * 2. AnalyticsGate forgets to no-op when key is missing
 *    → posthog.init() called with undefined → noisy console errors or
 *      worse, accidentally captures with no project = data loss + bug.
 *
 * 3. Someone accidentally adds `import posthog from 'posthog-js'` to a
 *    component that always renders → posthog-js loads on every page even
 *    with GPC set. This is the regression vector that defeats the gate.
 *
 * 4. Event helpers throw when window.__posthog is undefined → breaks pages
 *    for users whose PostHog didn't load (GPC, missing key, SSR).
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { trackWaitlistSubmitted, trackWaitlistFailed } from '@/lib/posthog/events';

const ORIGINAL_ENV = process.env.NEXT_PUBLIC_POSTHOG_KEY;

describe('analytics GPC gate', () => {
  beforeEach(() => {
    document.cookie = '';
    delete (window as unknown as { __posthog?: unknown }).__posthog;
  });

  afterEach(() => {
    if (ORIGINAL_ENV === undefined) {
      delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
    } else {
      process.env.NEXT_PUBLIC_POSTHOG_KEY = ORIGINAL_ENV;
    }
    vi.restoreAllMocks();
  });

  it('renders null when being_gpc=1 cookie is set', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test_key';
    document.cookie = 'being_gpc=1';

    vi.resetModules();
    const { AnalyticsGate } = await import('@/components/analytics/AnalyticsGate');
    const { container } = render(<AnalyticsGate />);

    expect(container.firstChild).toBeNull();
  });

  it('renders null when PostHog key is missing', async () => {
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY;

    vi.resetModules();
    const { AnalyticsGate } = await import('@/components/analytics/AnalyticsGate');
    const { container } = render(<AnalyticsGate />);

    expect(container.firstChild).toBeNull();
  });

  it('renders null when navigator.globalPrivacyControl === true', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test_key';
    Object.defineProperty(navigator, 'globalPrivacyControl', {
      value: true,
      configurable: true,
    });

    vi.resetModules();
    const { AnalyticsGate } = await import('@/components/analytics/AnalyticsGate');
    const { container } = render(<AnalyticsGate />);

    expect(container.firstChild).toBeNull();

    Object.defineProperty(navigator, 'globalPrivacyControl', {
      value: undefined,
      configurable: true,
    });
  });

  it('event helpers are silent no-ops when window.__posthog is undefined', () => {
    // No throws, no console noise.
    expect(() => trackWaitlistSubmitted({ source: 'home' })).not.toThrow();
    expect(() => trackWaitlistFailed({ source: 'splash', reason: 'http_500' })).not.toThrow();
  });

  it('event helpers call window.__posthog.capture when PostHog is loaded', () => {
    const captureMock = vi.fn();
    (window as unknown as { __posthog: { capture: typeof captureMock } }).__posthog = {
      capture: captureMock,
    };

    trackWaitlistSubmitted({ source: 'download' });
    trackWaitlistFailed({ source: 'splash', reason: 'network_error' });

    expect(captureMock).toHaveBeenCalledTimes(2);
    expect(captureMock).toHaveBeenNthCalledWith(1, 'waitlist_signup_submitted', {
      source: 'download',
    });
    expect(captureMock).toHaveBeenNthCalledWith(2, 'waitlist_signup_failed', {
      source: 'splash',
      reason: 'network_error',
    });
  });

  /**
   * The structural regression gate: posthog-js must only be statically
   * imported from `components/analytics/PosthogProvider.tsx`, and even
   * there only inside a dynamic `import()` expression.
   *
   * If anyone adds `import posthog from 'posthog-js'` to an always-rendered
   * component, posthog-js ships in the page bundle and loads regardless of
   * the GPC gate. This test runs grep to enforce.
   */
  it('only PosthogProvider may import posthog-js, and only dynamically', () => {
    const matches = execSync(
      "grep -rln \"['\\\"]posthog-js['\\\"]\" app components lib --include='*.ts' --include='*.tsx' || true",
      { encoding: 'utf-8' },
    )
      .trim()
      .split('\n')
      .filter((line) => line.length > 0);

    const allowedFile = 'components/analytics/PosthogProvider.tsx';
    const unauthorized = matches.filter((file) => !file.endsWith(allowedFile));
    expect(
      unauthorized,
      `Only ${allowedFile} may reference posthog-js. Found in: ${unauthorized.join(', ')}`,
    ).toEqual([]);

    // And the one allowed reference must be inside a dynamic import().
    const providerSource = readFileSync(allowedFile, 'utf-8');
    expect(
      providerSource,
      "PosthogProvider.tsx must use dynamic import('posthog-js'), not a static import",
    ).toMatch(/import\(['"]posthog-js['"]\)/);
    expect(
      providerSource,
      "PosthogProvider.tsx must NOT use a static `import ... from 'posthog-js'`",
    ).not.toMatch(/^import .* from ['"]posthog-js['"]/m);
  });
});
