'use client';

/**
 * Waitlist signup form.
 *
 * Used on:
 *   - / (splash) when NEXT_PUBLIC_SHOW_FULL_SITE !== 'true'  (source='splash')
 *   - /download (pre-launch state until the app is in the stores) (source='download')
 *
 * POSTs to the existing /api/waitlist endpoint (Notion-backed).
 * Self-contained: idle / submitting / success / error states are
 * managed internally.
 *
 * Fires PostHog events on success/failure (no-op when PostHog isn't loaded
 * — e.g., GPC kill, missing key). See lib/posthog/events.ts.
 */

import { useState, FormEvent } from 'react';
import {
  trackWaitlistSubmitted,
  trackWaitlistFailed,
  type WaitlistSource,
} from '@/lib/posthog/events';

interface WaitlistSignupFormProps {
  /** Where on the site this form instance lives — flows through to PostHog events. */
  source: WaitlistSource;
}

export function WaitlistSignupForm({ source }: WaitlistSignupFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        trackWaitlistFailed({ source, reason: `http_${response.status}` });
        throw new Error('Failed to join waitlist');
      }

      trackWaitlistSubmitted({ source });
      setStatus('success');
      setEmail('');
    } catch {
      trackWaitlistFailed({ source, reason: 'network_error' });
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-large border-2 border-accent-500 bg-accent-50 px-6 py-8 space-y-2 text-center">
        <p className="text-lg font-semibold text-accent-700">
          You're on the list
        </p>
        <p className="text-base text-accent-600">
          We'll notify you as soon as Being launches on the App Store and Google Play.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'submitting'}
          className="flex-1 px-4 py-3 rounded-large border-2 border-gray-300 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 min-h-[48px]"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-6 py-3 bg-accent-600 text-white font-medium rounded-large min-h-[48px] hover:bg-accent-700 active:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 whitespace-nowrap"
        >
          {status === 'submitting' ? 'Joining...' : 'Get Notified'}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-sm text-error" role="alert">
          {errorMessage}
        </p>
      )}

      <p className="text-sm text-gray-500 text-center">
        We'll send you one email when Being launches.
        No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  );
}
