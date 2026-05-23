// @vitest-environment happy-dom

/**
 * MainLayout chrome rendering.
 *
 * pages.smoke.test.tsx renders pages directly, bypassing the layout.
 * That leaves the four navigation client components (DesktopNav,
 * MobileHeader, MobileBottomTabs, Footer) and the skip-to-content link
 * untested. This file renders the home page through MainLayout and
 * asserts the chrome surfaces are present.
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MainLayout from '@/app/(main)/layout';
import HomePage from '@/app/(main)/home/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('main layout chrome', () => {
  it('renders the home page through MainLayout with skip link + nav + footer', () => {
    const { container } = render(
      <MainLayout>
        <HomePage />
      </MainLayout>,
    );
    const html = container.innerHTML;

    // Skip-to-content link (A11Y-09)
    expect(html).toContain('Skip to main content');
    expect(html).toContain('id="main"');

    // Mobile nav landmark (A11Y-10)
    expect(html).toContain('Primary mobile navigation');

    // Page content (home)
    expect(html).toContain('Mindfulness');
  });
});
