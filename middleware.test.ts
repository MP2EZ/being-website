/**
 * Middleware unit tests.
 *
 * Tests the composition: "on no existing variant, assign + set cookie with
 * the right attributes; on existing variant, do nothing." Underlying
 * lib/ab-testing.ts functions are mocked — they have their own tests in
 * lib/ab-testing.test.ts.
 *
 * The cookie attributes (secure, sameSite, httpOnly, path, maxAge) are
 * the regression surface: middleware.ts's only meaningful logic is the
 * cookies.set() call.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/ab-testing', () => ({
  AB_COOKIE_NAME: 'being_ab_variant',
  AB_COOKIE_MAX_AGE: 30 * 24 * 60 * 60,
  assignVariant: vi.fn(),
  getVariantFromRequest: vi.fn(),
}));

type MiddlewareModule = typeof import('./middleware');
type AbModule = typeof import('@/lib/ab-testing');

async function importFresh(): Promise<{
  middleware: MiddlewareModule['middleware'];
  ab: AbModule;
}> {
  vi.resetModules();
  const ab = (await import('@/lib/ab-testing')) as AbModule;
  const mod = (await import('./middleware')) as MiddlewareModule;
  return { middleware: mod.middleware, ab };
}

describe('middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets a Set-Cookie with the full attribute set when no existing variant', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (ab.assignVariant as ReturnType<typeof vi.fn>).mockReturnValue('A');

    const request = new NextRequest('http://localhost/');
    const response = middleware(request);

    const cookie = response.cookies.get('being_ab_variant');
    expect(cookie?.value).toBe('A');
    expect(cookie?.maxAge).toBe(30 * 24 * 60 * 60);
    expect(cookie?.path).toBe('/');
    expect(cookie?.sameSite).toBe('lax');
    expect(cookie?.secure).toBe(true);
    expect(cookie?.httpOnly).toBe(false);
  });

  it('assigns the variant returned by assignVariant', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (ab.assignVariant as ReturnType<typeof vi.fn>).mockReturnValue('B');

    const request = new NextRequest('http://localhost/');
    const response = middleware(request);

    expect(response.cookies.get('being_ab_variant')?.value).toBe('B');
  });

  it('does not emit a Set-Cookie when an existing variant cookie is present', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('B');

    const request = new NextRequest('http://localhost/');
    const response = middleware(request);

    expect(ab.assignVariant).not.toHaveBeenCalled();
    expect(response.cookies.get('being_ab_variant')).toBeUndefined();
  });
});
