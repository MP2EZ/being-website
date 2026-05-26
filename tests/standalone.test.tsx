// @vitest-environment happy-dom

/**
 * Coming Soon splash form behavior.
 *
 * The splash page is what `main` ships to production today and the
 * pages.smoke.test.tsx renderToString suite explicitly excludes it
 * because of its 'use client' + stateful hooks. This file covers the
 * full happy + error paths via @testing-library/react.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ComingSoon from '@/app/(standalone)/page';

describe('Coming Soon splash form', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('submits the email and renders the success branch', async () => {
    render(<ComingSoon />);

    const input = screen.getByLabelText('Email address') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'a@b.com' } });

    const submitButton = screen.getByRole('button', { name: /get notified/i });
    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText("You're on the list")).toBeTruthy();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/waitlist',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'a@b.com' }),
      }),
    );
  });

  it('renders the error branch when the API fails', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'bad' }), { status: 400 }),
    );

    render(<ComingSoon />);

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'a@b.com' },
    });
    fireEvent.submit(
      screen.getByRole('button', { name: /get notified/i }).closest('form')!,
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeTruthy();
    });
  });
});
