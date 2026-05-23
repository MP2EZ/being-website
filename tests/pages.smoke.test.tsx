/**
 * Page render smoke tests.
 *
 * Renders every server-component page via renderToString and asserts the
 * output is non-trivial markup. Catches build-time-only failures (broken
 * imports, missing exports, runtime exceptions in JSX) that `next build`
 * is the only safety net for today.
 *
 * The (standalone) splash is excluded: it's 'use client' with stateful
 * hooks that don't survive renderToString cleanly. Worth a separate
 * @testing-library/react render in a follow-up.
 */

import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';

const pages = [
  { name: 'home',               load: () => import('@/app/(main)/home/page') },
  { name: 'philosophy',         load: () => import('@/app/(main)/philosophy/page') },
  { name: 'features',           load: () => import('@/app/(main)/features/page') },
  { name: 'download',           load: () => import('@/app/(main)/download/page') },
  { name: 'main-privacy',       load: () => import('@/app/(main)/privacy/page') },
  { name: 'terms',              load: () => import('@/app/(main)/terms/page') },
  { name: 'cookies',            load: () => import('@/app/(main)/cookies/page') },
  { name: 'crisis',             load: () => import('@/app/crisis/page') },
  { name: 'hipaa',              load: () => import('@/app/hipaa/page') },
  { name: 'california-privacy', load: () => import('@/app/privacy/california/page') },
  { name: 'privacy-practices',  load: () => import('@/app/privacy-practices/page') },
  { name: 'accessibility',      load: () => import('@/app/accessibility/page') },
  { name: 'disclaimers',        load: () => import('@/app/disclaimers/page') },
  { name: 'do-not-sell',        load: () => import('@/app/do-not-sell/page') },
  { name: 'support',            load: () => import('@/app/support/page') },
] as const;

describe('page render smoke tests', () => {
  for (const { name, load } of pages) {
    it(`${name} renders without throwing`, async () => {
      const mod = await load();
      const Page = mod.default;
      const html = renderToString(<Page />);
      expect(html).toContain('<');
      expect(html.length).toBeGreaterThan(100);
    });
  }
});
