// @vitest-environment happy-dom

/**
 * PracticeAccordions toggle behavior.
 *
 * The "one open at a time" reducer is the entire reason this is a client
 * component. renderToString in pages.smoke.test.tsx only captures the
 * collapsed initial state — this test covers click → expand, click sibling
 * → previous collapses + sibling expands, click again → collapse.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PracticeAccordions from '@/components/philosophy/PracticeAccordions';

describe('PracticeAccordions toggle', () => {
  it('opens one section, switches to another, then collapses', () => {
    render(<PracticeAccordions />);

    const virtuesBtn = screen.getByRole('button', {
      name: /Cardinal Virtues/i,
    });
    const entryBtn = screen.getByRole('button', {
      name: /Foundational Practices/i,
    });

    expect(virtuesBtn.getAttribute('aria-expanded')).toBe('false');
    expect(entryBtn.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(virtuesBtn);
    expect(virtuesBtn.getAttribute('aria-expanded')).toBe('true');
    expect(entryBtn.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(entryBtn);
    expect(virtuesBtn.getAttribute('aria-expanded')).toBe('false');
    expect(entryBtn.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(entryBtn);
    expect(entryBtn.getAttribute('aria-expanded')).toBe('false');
  });
});
