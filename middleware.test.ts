/**
 * Middleware unit tests.
 *
 * Two surfaces under test:
 * 1. A/B variant cookie attributes (INFRA-93) — mocked lib/ab-testing
 * 2. GPC detection (INFRA-151) — exercises lib/gpc directly via Sec-GPC
 *    request header. Tests the contract: Vary always set; X-GPC-Honored +
 *    being_gpc cookie when header is '1'; cookie cleared otherwise.
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

function buildRequest(headers: Record<string, string> = {}): NextRequest {
  const h = new Headers();
  for (const [k, v] of Object.entries(headers)) h.set(k, v);
  return new NextRequest('http://localhost/', { headers: h });
}

describe('middleware — A/B variant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets a Set-Cookie with the full attribute set when no existing variant', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (ab.assignVariant as ReturnType<typeof vi.fn>).mockReturnValue('A');

    const response = middleware(buildRequest());

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

    const response = middleware(buildRequest());

    expect(response.cookies.get('being_ab_variant')?.value).toBe('B');
  });

  it('does not emit a Set-Cookie when an existing variant cookie is present', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('B');

    const response = middleware(buildRequest());

    expect(ab.assignVariant).not.toHaveBeenCalled();
    expect(response.cookies.get('being_ab_variant')).toBeUndefined();
  });
});

describe('middleware — GPC detection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Vary: Sec-GPC is set in next.config.ts headers() rather than middleware
  // because the RSC layer overwrites Vary headers set in middleware. See the
  // next.config.ts securityHeaders block.

  it('sets X-GPC-Honored and being_gpc cookie when Sec-GPC: 1', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('A');

    const response = middleware(buildRequest({ 'sec-gpc': '1' }));

    expect(response.headers.get('X-GPC-Honored')).toBe('1');
    const cookie = response.cookies.get('being_gpc');
    expect(cookie?.value).toBe('1');
    expect(cookie?.maxAge).toBe(24 * 60 * 60);
    expect(cookie?.path).toBe('/');
    expect(cookie?.sameSite).toBe('lax');
    expect(cookie?.secure).toBe(true);
    expect(cookie?.httpOnly).toBe(false);
  });

  it('does not set X-GPC-Honored when the header is absent', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('A');

    const response = middleware(buildRequest());

    expect(response.headers.get('X-GPC-Honored')).toBeNull();
  });

  it('treats Sec-GPC: 0 as no signal (per spec, only "1" is affirmative)', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('A');

    const response = middleware(buildRequest({ 'sec-gpc': '0' }));

    expect(response.headers.get('X-GPC-Honored')).toBeNull();
  });

  it('treats a malformed value as no signal', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('A');

    const response = middleware(buildRequest({ 'sec-gpc': 'true' }));

    expect(response.headers.get('X-GPC-Honored')).toBeNull();
  });

  it('clears the being_gpc cookie when the header is absent but the cookie is present', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('A');

    // Request carries a stale being_gpc cookie but no Sec-GPC header.
    const response = middleware(buildRequest({ cookie: 'being_gpc=1' }));

    // NextResponse.cookies.delete() emits a Set-Cookie with empty value and
    // an expired date — we assert only the deletion signal (empty value).
    const cookie = response.cookies.get('being_gpc');
    expect(cookie?.value).toBe('');
  });

  it('does NOT emit a being_gpc Set-Cookie when neither header nor cookie is present', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue('A');

    // Common path: no Sec-GPC header, no existing cookie → no Set-Cookie at all.
    const response = middleware(buildRequest());

    expect(response.cookies.get('being_gpc')).toBeUndefined();
  });

  it('coexists with A/B variant assignment (both signals set on same response)', async () => {
    const { middleware, ab } = await importFresh();
    (ab.getVariantFromRequest as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (ab.assignVariant as ReturnType<typeof vi.fn>).mockReturnValue('A');

    const response = middleware(buildRequest({ 'sec-gpc': '1' }));

    expect(response.cookies.get('being_ab_variant')?.value).toBe('A');
    expect(response.cookies.get('being_gpc')?.value).toBe('1');
    expect(response.headers.get('X-GPC-Honored')).toBe('1');
  });
});
