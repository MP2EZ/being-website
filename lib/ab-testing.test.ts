import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

const RANDOM_DENOMINATOR = 0xffffffff + 1;

function stubRandom(quantile: number) {
  return vi
    .spyOn(crypto, 'getRandomValues')
    .mockImplementation((arr: ArrayBufferView | null) => {
      const u32 = arr as Uint32Array;
      u32[0] = Math.floor(quantile * RANDOM_DENOMINATOR);
      return u32 as unknown as ArrayBufferView;
    });
}

describe('lib/ab-testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  describe('assignVariant', () => {
    it("returns 'A' when random falls in the first 50% with default config", async () => {
      stubRandom(0.25);
      const { assignVariant } = await import('./ab-testing');
      expect(assignVariant()).toBe('A');
    });

    it("returns 'B' when random falls in the second 50% with default config", async () => {
      stubRandom(0.75);
      const { assignVariant } = await import('./ab-testing');
      expect(assignVariant()).toBe('B');
    });

    it("returns 'A' for a 0.9/0.1 weighted experiment when random is small", async () => {
      stubRandom(0.5);
      const { assignVariant } = await import('./ab-testing');
      expect(
        assignVariant({
          name: 'biased',
          variants: ['A', 'B'],
          weights: [0.9, 0.1],
        }),
      ).toBe('A');
    });

    it("returns 'B' for a 0.9/0.1 weighted experiment when random is large", async () => {
      stubRandom(0.95);
      const { assignVariant } = await import('./ab-testing');
      expect(
        assignVariant({
          name: 'biased',
          variants: ['A', 'B'],
          weights: [0.9, 0.1],
        }),
      ).toBe('B');
    });

    it("always returns 'A' when weights are [1, 0]", async () => {
      const { assignVariant } = await import('./ab-testing');
      for (const q of [0, 0.25, 0.5, 0.999]) {
        stubRandom(q);
        expect(
          assignVariant({
            name: 'all-a',
            variants: ['A', 'B'],
            weights: [1, 0],
          }),
        ).toBe('A');
      }
    });

    it("always returns 'B' when weights are [0, 1]", async () => {
      const { assignVariant } = await import('./ab-testing');
      for (const q of [0, 0.25, 0.5, 0.999]) {
        stubRandom(q);
        expect(
          assignVariant({
            name: 'all-b',
            variants: ['A', 'B'],
            weights: [0, 1],
          }),
        ).toBe('B');
      }
    });

    it('returns the last variant via fallback when weights sum below 1', async () => {
      stubRandom(0.99);
      const { assignVariant } = await import('./ab-testing');
      expect(
        assignVariant({
          name: 'underweight',
          variants: ['A', 'B'],
          weights: [0.1, 0.1],
        }),
      ).toBe('B');
    });

    it('produces a roughly correct distribution across many real-random draws', async () => {
      const { assignVariant } = await import('./ab-testing');
      const counts = { A: 0, B: 0 };
      const N = 2000;
      for (let i = 0; i < N; i++) counts[assignVariant()]++;
      expect(counts.A / N).toBeGreaterThan(0.4);
      expect(counts.A / N).toBeLessThan(0.6);
    });
  });

  describe('getVariant (from cookies())', () => {
    async function setCookieValue(value: string | undefined) {
      const { cookies } = await import('next/headers');
      (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
        get: vi.fn().mockReturnValue(value === undefined ? undefined : { value }),
      });
    }

    it("returns 'A' when cookie value is 'A'", async () => {
      await setCookieValue('A');
      const { getVariant } = await import('./ab-testing');
      expect(await getVariant()).toBe('A');
    });

    it("returns 'B' when cookie value is 'B'", async () => {
      await setCookieValue('B');
      const { getVariant } = await import('./ab-testing');
      expect(await getVariant()).toBe('B');
    });

    it('returns null when the cookie is absent', async () => {
      await setCookieValue(undefined);
      const { getVariant } = await import('./ab-testing');
      expect(await getVariant()).toBeNull();
    });

    it("returns null when the cookie value is not 'A' or 'B'", async () => {
      await setCookieValue('C');
      const { getVariant } = await import('./ab-testing');
      expect(await getVariant()).toBeNull();
    });
  });

  describe('getVariantFromRequest', () => {
    function buildRequest(cookie?: string): NextRequest {
      const headers = new Headers();
      if (cookie) headers.set('cookie', cookie);
      return new NextRequest('http://localhost/', { headers });
    }

    it("returns 'A' when request carries an A cookie", async () => {
      const { getVariantFromRequest } = await import('./ab-testing');
      expect(getVariantFromRequest(buildRequest('being_ab_variant=A'))).toBe('A');
    });

    it("returns 'B' when request carries a B cookie", async () => {
      const { getVariantFromRequest } = await import('./ab-testing');
      expect(getVariantFromRequest(buildRequest('being_ab_variant=B'))).toBe('B');
    });

    it('returns null when no cookie is set', async () => {
      const { getVariantFromRequest } = await import('./ab-testing');
      expect(getVariantFromRequest(buildRequest())).toBeNull();
    });

    it('returns null for an unexpected cookie value', async () => {
      const { getVariantFromRequest } = await import('./ab-testing');
      expect(getVariantFromRequest(buildRequest('being_ab_variant=C'))).toBeNull();
    });
  });

  describe('trackConversion', () => {
    it('logs in development mode', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const { trackConversion } = await import('./ab-testing');

      trackConversion('A', 'waitlist_signup', { source: 'homepage' });

      expect(logSpy).toHaveBeenCalledWith('[A/B] Conversion tracked:', {
        variant: 'A',
        event: 'waitlist_signup',
        metadata: { source: 'homepage' },
      });
    });

    it('does not log in production mode', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const { trackConversion } = await import('./ab-testing');

      trackConversion('B', 'download_click');

      expect(logSpy).not.toHaveBeenCalled();
    });
  });
});
