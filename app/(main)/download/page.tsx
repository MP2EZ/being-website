/**
 * Download Page — pre-launch state
 *
 * The app isn't in the stores yet. Every existing CTA across the site
 * routes here, so this page serves as the waitlist signup until launch.
 * When real app-store badges and downloads are available, the hero +
 * waitlist form get replaced with badges + QR codes; the supporting
 * content (pricing, system requirements, FAQ) stays as-is.
 */

import BrainIcon from '@/components/shared/BrainIcon';
import { WaitlistSignupForm } from '@/components/shared/WaitlistSignupForm';

export const metadata = {
  title: 'Get Early Access | Being',
  description: 'Join the waitlist to be the first to know when Being launches on iOS and Android.',
};

export default function DownloadPage() {
  return (
    <div className="bg-white">
      {/* Hero + waitlist */}
      <section className="px-6 py-16 sm:py-24 bg-white">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <BrainIcon size={140} className="text-brand-midnight" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold text-brand-midnight leading-tight tracking-tight">
            Coming soon to iOS and Android
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Get early access + a free month trial when we launch. We&rsquo;ll email you the
            moment Being is in the App Store and Google Play.
          </p>
          <WaitlistSignupForm source="download" />
        </div>
      </section>

      {/* What to expect when we launch — Pricing */}
      <section className="px-6 py-20 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
              What to expect when we launch
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              No hidden fees. No data selling. Just mindfulness practice with deeper meaning.
            </p>
          </div>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Free Trial */}
            <div className="bg-white p-12 rounded-large border-2 border-accent-500">
              <div className="text-center mb-8">
                <div className="text-3xl opacity-60 mb-4">🎁</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Trial</h3>
                <div className="text-4xl font-semibold text-gray-900 mb-3">1 month</div>
                <p className="text-gray-600">Full access, no credit card</p>
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>All features unlocked</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Daily check-ins &amp; assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Full Learn tab access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>No automatic billing after trial</span>
                </li>
              </ul>
            </div>

            {/* Subscription Pricing */}
            <div className="bg-white p-12 rounded-large border-2 border-gray-200">
              <div className="text-center mb-8">
                <div className="text-3xl opacity-60 mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Subscription</h3>
                <div className="text-4xl font-semibold text-gray-900 mb-3">
                  $79.99/year
                </div>
                <p className="text-gray-600">$9.99/month available</p>
                <p className="text-sm text-accent-600 mt-2">
                  Save 33% with annual billing
                </p>
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Everything in free trial</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Unlimited cloud backup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Export data anytime</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Cancel anytime, keep your data</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 sm:mt-24 text-center">
            <p className="text-sm text-gray-500">
              All prices in USD. Tax may apply based on your location.
            </p>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="px-6 py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 text-center">
            System Requirements
          </h2>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
            {/* iOS Requirements */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="text-2xl opacity-60 mr-3">🍎</span>
                iOS &amp; iPadOS
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>iOS 15.0 or later</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>iPhone 8 or newer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>iPad (5th generation) or newer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>50 MB free storage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Internet connection for initial download only</span>
                </li>
              </ul>
            </div>

            {/* Android Requirements */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="text-2xl opacity-60 mr-3">🤖</span>
                Android
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Android 10 or later</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Most Android phones from 2019 onward</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Tablet support included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>50 MB free storage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Works 100% offline after download</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 text-center">
            Frequently asked questions
          </h2>

          <div className="mt-20 sm:mt-24 space-y-10">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                When will Being launch?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We&rsquo;re finalizing app-store review now. Join the waitlist above and we&rsquo;ll
                email you as soon as Being is available to download.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Do I need to create an account?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No account required to start. Being will work completely offline with local storage.
                You can optionally create an account later for cloud backup across devices.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                What happens after my free trial ends?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nothing automatically. We won&rsquo;t charge you unless you explicitly subscribe. You&rsquo;ll
                keep access to your data, but check-ins and assessments will be limited to view-only.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Can I use Being without internet?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes. After initial download, Being works 100% offline. All data is stored locally
                on your device. Internet is only needed for optional cloud backup.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Is my data private?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Completely. We use AES-256 encryption, store everything locally on your device,
                and never sell your data. See our{' '}
                <a href="/privacy" className="text-accent-600 hover:text-accent-700 font-medium transition-colors">
                  Privacy Policy
                </a>{' '}
                for full details.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, anytime. Cancel through your App Store or Google Play account settings. You&rsquo;ll
                keep access until the end of your billing period, and you can always export your data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
