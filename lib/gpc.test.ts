import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

describe('lib/gpc', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isGpcSignal', () => {
    it("returns true for the literal '1'", async () => {
      const { isGpcSignal } = await import('./gpc');
      expect(isGpcSignal('1')).toBe(true);
    });

    it.each([
      ['0', '0'],
      ['empty', ''],
      ['null', null],
      ['undefined', undefined],
      ['true', 'true'],
      ['on', 'on'],
      ['1, 1 (list form)', '1, 1'],
      ['leading space', ' 1'],
      ['trailing space', '1 '],
      ['2', '2'],
    ])('returns false for %s', async (_label, value) => {
      const { isGpcSignal } = await import('./gpc');
      expect(isGpcSignal(value as string | null | undefined)).toBe(false);
    });
  });

  describe('getGpcFromRequest', () => {
    function buildRequest(headerValue?: string): NextRequest {
      const headers = new Headers();
      if (headerValue !== undefined) headers.set('sec-gpc', headerValue);
      return new NextRequest('http://localhost/', { headers });
    }

    it("returns true when Sec-GPC: 1 is present", async () => {
      const { getGpcFromRequest } = await import('./gpc');
      expect(getGpcFromRequest(buildRequest('1'))).toBe(true);
    });

    it('returns false when the header is absent', async () => {
      const { getGpcFromRequest } = await import('./gpc');
      expect(getGpcFromRequest(buildRequest())).toBe(false);
    });

    it("returns false for Sec-GPC: 0", async () => {
      const { getGpcFromRequest } = await import('./gpc');
      expect(getGpcFromRequest(buildRequest('0'))).toBe(false);
    });

    it('returns false for a malformed value', async () => {
      const { getGpcFromRequest } = await import('./gpc');
      expect(getGpcFromRequest(buildRequest('true'))).toBe(false);
    });
  });

  describe('getGpcFromCookie', () => {
    async function setCookieValue(value: string | undefined) {
      const { cookies } = await import('next/headers');
      (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
        get: vi.fn().mockReturnValue(value === undefined ? undefined : { value }),
      });
    }

    it("returns true when cookie value is '1'", async () => {
      await setCookieValue('1');
      const { getGpcFromCookie } = await import('./gpc');
      expect(await getGpcFromCookie()).toBe(true);
    });

    it('returns false when the cookie is absent', async () => {
      await setCookieValue(undefined);
      const { getGpcFromCookie } = await import('./gpc');
      expect(await getGpcFromCookie()).toBe(false);
    });

    it("returns false when the cookie value is '0'", async () => {
      await setCookieValue('0');
      const { getGpcFromCookie } = await import('./gpc');
      expect(await getGpcFromCookie()).toBe(false);
    });

    it('returns false for an unexpected cookie value', async () => {
      await setCookieValue('true');
      const { getGpcFromCookie } = await import('./gpc');
      expect(await getGpcFromCookie()).toBe(false);
    });
  });
});
