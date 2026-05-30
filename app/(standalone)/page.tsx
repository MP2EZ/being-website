/**
 * Coming Soon Page - Being
 * Single-focus email capture interstitial
 * Shown at / when NEXT_PUBLIC_SHOW_FULL_SITE !== 'true' (see layout)
 */

import BrainIcon from '@/components/shared/BrainIcon';
import { WaitlistSignupForm } from '@/components/shared/WaitlistSignupForm';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        {/* Brand Icon */}
        <div className="flex justify-center">
          <BrainIcon size={140} className="text-brand-midnight" />
        </div>

        {/* Headline */}
        <div className="space-y-6">
          <h1 className="leading-tight tracking-tight">
            <span className="block text-5xl sm:text-6xl font-bold text-brand-midnight mb-2">
              Being.
            </span>
            <span className="block text-3xl sm:text-4xl font-light text-gray-500">
              is launching soon
            </span>
          </h1>

          <div className="space-y-4">
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Ancient Stoic wisdom meets modern mental health practice.
            </p>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
              Be the first to know when we launch.
            </p>
          </div>
        </div>

        {/* Email Capture Form */}
        <WaitlistSignupForm source="splash" />

        {/* Trust Signals */}
        <div className="pt-4 space-y-3">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              1 month free trial
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Privacy-first
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 pt-8">
          Join thousands practicing Stoic Mindfulness
        </p>
      </div>
    </div>
  );
}
