// @vitest-environment happy-dom

/**
 * Button component tests.
 *
 * The discriminated union (`href` ⊕ `disabled`) is enforced at the type
 * level — `<Button href="/x" disabled>` won't compile. These tests cover:
 *   1. anchor branch when href is present
 *   2. button branch when href is absent (disabled works normally)
 *   3. runtime safety net: if `disabled` ever leaks onto the anchor
 *      branch via `as any` or untyped JS, the anchor renders inert
 *      (aria-disabled, tabIndex=-1, click preventDefault).
 */

import { describe, it, expect } from 'vitest';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import Button, { type ButtonProps } from '@/components/shared/Button';

describe('Button', () => {
  it('renders as an anchor when href is provided', () => {
    render(<Button href="/x">Go</Button>);
    const el = screen.getByText('Go');
    expect(el.tagName).toBe('A');
    expect(el.getAttribute('href')).toBe('/x');
    expect(el.getAttribute('aria-disabled')).toBeNull();
  });

  it('renders as a button when href is absent', () => {
    render(<Button>Click</Button>);
    const el = screen.getByText('Click');
    expect(el.tagName).toBe('BUTTON');
  });

  it('forwards disabled on the button branch', () => {
    render(<Button disabled>Wait</Button>);
    const el = screen.getByText('Wait') as HTMLButtonElement;
    expect(el.tagName).toBe('BUTTON');
    expect(el.disabled).toBe(true);
  });

  it('renders an inert anchor when disabled is bypassed onto the anchor branch', () => {
    // TypeScript blocks this at the type level (disabled?: never on AsAnchor).
    // We bypass via cast to verify the runtime safety net.
    const props = {
      href: '/x',
      disabled: true,
      children: 'Inert',
    } as unknown as ButtonProps;

    render(<Button {...props} />);
    const el = screen.getByText('Inert');

    expect(el.tagName).toBe('A');
    expect(el.getAttribute('aria-disabled')).toBe('true');
    expect(el.getAttribute('tabindex')).toBe('-1');

    // dispatchEvent returns false when default is prevented during dispatch.
    const event = createEvent.click(el);
    fireEvent(el, event);
    expect(event.defaultPrevented).toBe(true);
  });
});
