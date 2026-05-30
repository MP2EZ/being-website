/**
 * Cookie Policy Page
 * First-party functional cookies only; no third-party trackers.
 */

import { GpcNotice } from '@/components/legal/GpcNotice';

export const metadata = {
  title: 'Cookie Policy | Being',
  description: 'How Being uses first-party functional cookies and honors Global Privacy Control signals.',
};

export default function CookiesPage() {
  return (
    <div className="bg-gray-50">
      <GpcNotice />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-700">
            <strong>Last Updated:</strong> May 30, 2026
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Summary */}
          <section className="bg-green-50 p-8 rounded-large border-2 border-green-400 mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              Two Functional Cookies + Privacy-Respecting Analytics
            </h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              Being&rsquo;s website (<strong>www.being.fyi</strong>) uses two small first-party
              cookies for site functionality, plus PostHog product analytics (EU cloud) scoped
              tightly to pageviews and waitlist signup events. No advertising trackers, no
              session replay, no autocapture, no cross-site profiling.
            </p>
            <p className="text-gray-800 leading-relaxed">
              We honor the <strong>Global Privacy Control (Sec-GPC)</strong> signal automatically — when
              your browser sends it, PostHog does not load, no analytics cookie is set, and no
              event is transmitted. No banner, no preference center.
            </p>
          </section>

          {/* The Two Cookies */}
          <section className="bg-white p-8 rounded-large border border-gray-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies We Use
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
              <code className="bg-gray-100 px-2 py-1 rounded text-base">being_ab_variant</code>
            </h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li><strong>Purpose:</strong> Assigns you to an A or B variant so we can measure which version of the site converts better.</li>
              <li><strong>Type:</strong> First-party functional.</li>
              <li><strong>Value:</strong> Either <code>A</code> or <code>B</code> — no identifier, no behavioral data.</li>
              <li><strong>Lifetime:</strong> 30 days.</li>
              <li><strong>Shared with third parties:</strong> No. The variant label is stored alongside waitlist signups in our internal Notion database for conversion analysis; we don&rsquo;t share it with advertising or analytics vendors.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
              <code className="bg-gray-100 px-2 py-1 rounded text-base">being_gpc</code>
            </h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li><strong>Purpose:</strong> Caches the Global Privacy Control signal so the page can display an acknowledgement.</li>
              <li><strong>Type:</strong> First-party functional.</li>
              <li><strong>Value:</strong> <code>1</code> when your browser sends <code>Sec-GPC: 1</code>; otherwise the cookie is cleared.</li>
              <li><strong>Lifetime:</strong> 24 hours; automatically cleared on any subsequent request that doesn&rsquo;t carry the header.</li>
              <li><strong>Shared with third parties:</strong> No.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
              <code className="bg-gray-100 px-2 py-1 rounded text-base">ph_*</code> (PostHog)
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Purpose:</strong> Anonymous product analytics — pageviews and waitlist signup events only. Helps us understand which marketing pages drive waitlist signups.</li>
              <li><strong>Type:</strong> Third-party analytics (PostHog Inc., EU data residency — Frankfurt).</li>
              <li><strong>Value:</strong> A random distinct identifier (no email, no name, no PII).</li>
              <li><strong>Lifetime:</strong> 365 days (PostHog default).</li>
              <li><strong>Shared with third parties:</strong> Yes, with PostHog. No further onward sharing or sale.</li>
              <li><strong>Not set when GPC is detected.</strong> If your browser sends <code>Sec-GPC: 1</code> or exposes <code>navigator.globalPrivacyControl === true</code>, PostHog does not load and no <code>ph_*</code> cookie is set. See <em>Global Privacy Control</em> section below.</li>
              <li><strong>What we do NOT capture:</strong> No autocapture (no recording of all clicks/forms), no session replay, no heatmaps, no raw email or other PII. See our <a href="/privacy" className="text-accent-600 hover:underline font-medium">Privacy Policy §5.2</a> for the full web-analytics scope.</li>
            </ul>
          </section>

          {/* What We Don't Use */}
          <section className="bg-white p-8 rounded-large border border-gray-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What We Don&rsquo;t Use
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>No Advertising Cookies:</strong> We don&rsquo;t serve ads or use ad networks.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>No Google Analytics, Mixpanel, Amplitude, or Segment.</strong> We use PostHog (disclosed above) for pageviews + waitlist conversion events only — no other analytics vendors.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>No Social Media Cookies:</strong> No social media widgets or share buttons with tracking.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>No Cross-Site Tracking Cookies:</strong> No advertising network cookies that follow you across the web.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>No Fingerprinting or Session Replay:</strong> No FullStory, LogRocket, Hotjar, or similar. PostHog session replay is explicitly disabled in our configuration.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>No Autocapture:</strong> PostHog supports auto-recording all clicks, form fields, and DOM interactions — we have this turned off. Only the named events (pageviews + waitlist signup success/failure) are sent.</span>
              </li>
            </ul>
          </section>

          {/* Global Privacy Control */}
          <section className="bg-white p-8 rounded-large border border-gray-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Global Privacy Control
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If your browser sends the <code>Sec-GPC: 1</code> request header (Brave, DuckDuckGo,
              Firefox with an extension, etc.), we treat it as an opt-out of any sale or sharing of
              personal information under CCPA, TDPSA, CPA, and CTDPA.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When the signal is present, PostHog does not load — no script is fetched, no
              <code> ph_*</code> cookie is set, and no event is sent. The detection is structurally
              enforced by our <code>AnalyticsGate</code> component, which checks both the
              <code> being_gpc</code> cookie (set by middleware when <code>Sec-GPC: 1</code> is
              received) and the browser&rsquo;s <code>navigator.globalPrivacyControl</code> JS API.
              An <code>X-GPC-Honored: 1</code> response header confirms detection to anyone
              inspecting the request.
            </p>
            <p className="text-gray-700 leading-relaxed">
              See the{' '}
              <a href="/privacy/multi-state" className="text-accent-600 hover:underline font-medium">
                Multi-State Privacy Rights
              </a>{' '}
              page for the underlying state law obligations.
            </p>
          </section>

          {/* Mobile App */}
          <section className="bg-white p-8 rounded-large border border-gray-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Mobile App Data Storage
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Being mobile app stores data locally on your device using secure, encrypted
              storage (not cookies):
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-accent-600 mr-2">•</span>
                <span><strong>Local Storage:</strong> Your check-ins, assessments, and journal entries (AES-256 encrypted)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-600 mr-2">•</span>
                <span><strong>User Preferences:</strong> App settings, theme preferences, notification settings</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-600 mr-2">•</span>
                <span><strong>Authentication Tokens:</strong> If you enable cloud backup (securely stored)</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              This data is stored locally on your device and never sent to third parties. See our{' '}
              <a href="/privacy" className="text-accent-600 hover:underline font-medium">
                Privacy Policy
              </a>{' '}
              for details.
            </p>
          </section>

          {/* Server Logs */}
          <section className="bg-white p-8 rounded-large border border-gray-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Server Logs (Minimal Data Collection)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our web server collects minimal technical information for security and performance:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-accent-600 mr-2">•</span>
                <span><strong>IP Address:</strong> To prevent abuse and ensure security</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-600 mr-2">•</span>
                <span><strong>Request URL:</strong> Which page you visited (no tracking across sessions)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-600 mr-2">•</span>
                <span><strong>User Agent:</strong> Browser type (to ensure compatibility)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-600 mr-2">•</span>
                <span><strong>Timestamp:</strong> When the request occurred</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              This data is not used for tracking, profiling, or advertising. It&rsquo;s retained
              for a limited period for security purposes only.
            </p>
          </section>

          {/* Your Choices */}
          <section className="bg-white p-8 rounded-large border border-gray-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Choices
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can clear any of the cookies at any time via your browser&rsquo;s site-data settings.
              Clearing <code>being_ab_variant</code> just reassigns a variant on your next visit;
              clearing <code>being_gpc</code> is harmless because the cookie reflects the header,
              not a stored preference; clearing <code>ph_*</code> opts you out of any PostHog
              session continuity (you&rsquo;ll appear as a new anonymous visitor next time).
              Enabling Global Privacy Control in your browser is the simplest way to suppress
              PostHog entirely.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For questions about server logs, mobile app data storage, or anything else, see our{' '}
              <a href="/privacy" className="text-accent-600 hover:underline font-medium">
                Privacy Policy
              </a>{' '}
              or contact{' '}
              <a href="mailto:privacy@being.fyi" className="text-accent-600 hover:underline">
                privacy@being.fyi
              </a>.
            </p>
          </section>

          {/* Changes */}
          <section className="bg-white p-8 rounded-large border border-gray-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If we add or change cookies in the future, we&rsquo;ll update this page and bump the
              Last Updated date above. We&rsquo;re committed to transparency and to honoring your
              privacy choices by default.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 p-6 rounded-large">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Questions?
            </h3>
            <p className="text-gray-700">
              Contact us at{' '}
              <a href="mailto:privacy@being.fyi" className="text-accent-600 hover:underline font-medium">
                privacy@being.fyi
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
