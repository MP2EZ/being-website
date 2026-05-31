/**
 * Standalone Layout - No navigation
 * For pages like coming-soon that should not have header/footer
 *
 * Redirect gating lives here (server component) so the navigation happens
 * before the client splash bundle ships. NEXT_PUBLIC_SHOW_FULL_SITE is
 * still inlined at build time; switching to a runtime env var is a
 * follow-up if needed.
 */

import { redirect } from 'next/navigation';
import { AnalyticsGate } from '@/components/analytics/AnalyticsGate';

export const metadata = {
  title: 'Being - Launching Soon',
  description: 'Ancient Stoic wisdom meets modern mental health practice. Join the waitlist.',
};

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NEXT_PUBLIC_SHOW_FULL_SITE === 'true') {
    redirect('/home');
  }
  return (
    <>
      {children}
      {/* PostHog analytics — gated by GPC / config / SSR-safe-default */}
      <AnalyticsGate />
    </>
  );
}
