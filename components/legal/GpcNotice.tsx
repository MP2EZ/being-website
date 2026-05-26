'use client';

/**
 * Global Privacy Control acknowledgement notice.
 *
 * Renders when either signal is detected client-side:
 *   - `being_gpc=1` cookie set by middleware (set when Sec-GPC: 1 is received)
 *   - `navigator.globalPrivacyControl === true` (JS API exposed by some browsers)
 *
 * Either channel alone triggers display — different browsers/extensions expose
 * different combinations.
 *
 * Uses useSyncExternalStore so the SSR snapshot is `false` (no flash) and the
 * client snapshot is computed after hydration.
 *
 * @see INFRA-151
 */

import { useSyncExternalStore } from 'react';

function subscribe(): () => void {
  return () => {};
}

function getClientSnapshot(): boolean {
  if (typeof document !== 'undefined') {
    const hasCookie = document.cookie.split(';').some((c) => c.trim() === 'being_gpc=1');
    if (hasCookie) return true;
  }
  if (typeof navigator !== 'undefined') {
    return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  }
  return false;
}

function getServerSnapshot(): boolean {
  return false;
}

export function GpcNotice() {
  const show = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!show) return null;

  return (
    <aside
      role="status"
      aria-label="Global Privacy Control acknowledgement"
      className="max-w-4xl mx-auto px-6 pt-8"
    >
      <div className="border-l-4 border-brand-sage bg-white p-4 rounded-r-medium shadow-sm">
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong className="text-brand-midnight">
            We detected a Global Privacy Control signal from your browser.
          </strong>{' '}
          Being doesn&rsquo;t use third-party analytics, and we honor your
          opt-out preference per applicable state privacy laws.
        </p>
      </div>
    </aside>
  );
}
