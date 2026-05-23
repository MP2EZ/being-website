import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/ab-testing', () => ({
  getVariant: vi.fn(),
  trackConversion: vi.fn(),
}));

function buildRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/waitlist', {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

type RouteModule = typeof import('./route');
type AbModule = typeof import('@/lib/ab-testing');

async function importRouteFresh(): Promise<{ route: RouteModule; ab: AbModule }> {
  vi.resetModules();
  const ab = (await import('@/lib/ab-testing')) as AbModule;
  const route = (await import('./route')) as RouteModule;
  return { route, ab };
}

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('NOTION_TOKEN', 'test-token');
    vi.stubEnv('NOTION_WAITLIST_DB_ID', 'test-db');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns 400 when email is missing', async () => {
    const { route, ab } = await importRouteFresh();
    (ab.getVariant as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await route.POST(buildRequest({}));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Valid email required' });
  });

  it('returns 400 when email lacks @', async () => {
    const { route, ab } = await importRouteFresh();
    (ab.getVariant as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await route.POST(buildRequest({ email: 'invalid' }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Valid email required' });
  });

  it('returns 500 when NOTION_TOKEN is missing', async () => {
    vi.stubEnv('NOTION_TOKEN', '');
    const { route } = await importRouteFresh();

    const res = await route.POST(buildRequest({ email: 'a@b.com' }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Server configuration error' });
  });

  it('returns 500 when NOTION_WAITLIST_DB_ID is missing', async () => {
    vi.stubEnv('NOTION_WAITLIST_DB_ID', '');
    const { route } = await importRouteFresh();

    const res = await route.POST(buildRequest({ email: 'a@b.com' }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Server configuration error' });
  });

  it('posts to Notion without Variant when no A/B variant assigned', async () => {
    const { route, ab } = await importRouteFresh();
    (ab.getVariant as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    const res = await route.POST(buildRequest({ email: 'a@b.com' }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(fetchSpy).toHaveBeenCalledOnce();

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe('https://api.notion.com/v1/pages');
    const sent = JSON.parse((init as RequestInit).body as string);
    expect(sent.properties.Email.title[0].text.content).toBe('a@b.com');
    expect(sent.properties.Variant).toBeUndefined();
    expect(sent.properties['Signed Up'].date.start).toMatch(
      /^\d{4}-\d{2}-\d{2}T/,
    );
    expect(ab.trackConversion).not.toHaveBeenCalled();
  });

  it('posts to Notion with Variant and tracks conversion when variant assigned', async () => {
    const { route, ab } = await importRouteFresh();
    (ab.getVariant as ReturnType<typeof vi.fn>).mockResolvedValue('A');
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    const res = await route.POST(buildRequest({ email: 'a@b.com' }));

    expect(res.status).toBe(200);
    const sent = JSON.parse(
      (fetchSpy.mock.calls[0]![1] as RequestInit).body as string,
    );
    expect(sent.properties.Variant).toEqual({ select: { name: 'A' } });
    expect(ab.trackConversion).toHaveBeenCalledWith('A', 'waitlist_signup');
  });

  it('returns 500 when Notion API responds non-ok', async () => {
    const { route, ab } = await importRouteFresh();
    (ab.getVariant as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'invalid' }), { status: 500 }),
    );

    const res = await route.POST(buildRequest({ email: 'a@b.com' }));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Failed to join waitlist' });
    expect(ab.trackConversion).not.toHaveBeenCalled();
  });

  it("returns 400 'Invalid JSON' when request body is malformed", async () => {
    const { route } = await importRouteFresh();
    const res = await route.POST(buildRequest('not-json'));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Invalid JSON' });
  });
});
