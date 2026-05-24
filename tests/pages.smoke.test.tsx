/**
 * Page render smoke tests.
 *
 * Renders every server-component page via renderToString and asserts:
 *   1. Non-trivial markup is emitted (length > 100, contains '<')
 *   2. For regulated / safety-critical pages, specific content tokens are
 *      present in the output. A regression that wipes the 988 string from
 *      /crisis or the HIPAA non-applicability statement from /hipaa would
 *      pass step 1 but fail step 2.
 *
 * The (standalone) splash is covered separately in tests/standalone.test.tsx
 * because its 'use client' + stateful hooks don't survive renderToString.
 */

import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';

type Page = {
  name: string;
  load: () => Promise<{ default: () => React.ReactElement }>;
  requires: readonly string[];
};

const pages: readonly Page[] = [
  { name: 'home',               load: () => import('@/app/(main)/home/page'),              requires: ['Mindfulness'] },
  { name: 'philosophy',         load: () => import('@/app/(main)/philosophy/page'),        requires: ['Stoic'] },
  { name: 'features',           load: () => import('@/app/(main)/features/page'),          requires: [] },
  { name: 'download',           load: () => import('@/app/(main)/download/page'),          requires: [] },
  { name: 'main-privacy',       load: () => import('@/app/(main)/privacy/page'),           requires: ['Privacy'] },
  { name: 'terms',              load: () => import('@/app/(main)/terms/page'),             requires: ['Terms'] },
  { name: 'cookies',            load: () => import('@/app/(main)/cookies/page'),           requires: ['Cookie'] },
  { name: 'crisis',             load: () => import('@/app/crisis/page'),                   requires: ['988', 'Crisis Lifeline'] },
  { name: 'hipaa',              load: () => import('@/app/hipaa/page'),                    requires: ['NOT a HIPAA Covered Entity'] },
  { name: 'california-privacy', load: () => import('@/app/privacy/california/page'),       requires: ['CCPA'] },
  { name: 'accessibility',      load: () => import('@/app/accessibility/page'),            requires: ['WCAG'] },
  { name: 'disclaimers',        load: () => import('@/app/disclaimers/page'),              requires: ['medical'] },
  { name: 'do-not-sell',        load: () => import('@/app/do-not-sell/page'),              requires: ['Do Not Sell'] },
  { name: 'support',            load: () => import('@/app/support/page'),                  requires: [] },
];

describe('page render smoke tests', () => {
  for (const { name, load, requires } of pages) {
    it(`${name} renders without throwing`, async () => {
      const mod = await load();
      const Page = mod.default;
      const html = renderToString(<Page />);
      expect(html).toContain('<');
      expect(html.length).toBeGreaterThan(100);
      for (const token of requires) {
        expect(html, `${name} should contain "${token}"`).toContain(token);
      }
    });
  }
});
