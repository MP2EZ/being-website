/**
 * Preview deploy guards (INFRA-363).
 *
 * Preview builds its legal pages from being `development`, so a preview build
 * must send noindex and show the on-page notice — and no other build may.
 * noindex on production would drop being.fyi from search results.
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import nextConfig from '@/next.config';
import { LegalPage } from '@/components/legal/LegalPage';

async function robotsHeader() {
  const rules = await nextConfig.headers!();
  return rules.flatMap((rule) => rule.headers).find((h) => h.key === 'X-Robots-Tag');
}

describe('NEXT_PUBLIC_DEPLOY_TARGET', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('preview sends noindex and renders the legal-page notice', async () => {
    vi.stubEnv('NEXT_PUBLIC_DEPLOY_TARGET', 'preview');

    expect((await robotsHeader())?.value).toBe('noindex, nofollow');
    expect(renderToString(<LegalPage content="# Privacy Policy" />)).toContain(
      'Preview site — not the published version.',
    );
  });

  it.each(['production', 'Preview', '', undefined])(
    '%s sends no robots header and renders no notice',
    async (target) => {
      vi.stubEnv('NEXT_PUBLIC_DEPLOY_TARGET', target);

      expect(await robotsHeader()).toBeUndefined();
      expect(renderToString(<LegalPage content="# Privacy Policy" />)).not.toContain('Preview site');
    },
  );
});
