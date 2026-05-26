/**
 * Features Page - Being app capabilities
 * Professional SaaS Design
 * Showcases daily check-ins, mood/wellbeing reflection tools, crisis-resource
 * access, and privacy-first design.
 *
 * Copy is intentionally consumer-wellness register (not clinical). The
 * page uses PHQ-9 and GAD-7 self-reflection tools but does NOT make
 * detection or diagnostic claims — Being is not a SaMD.
 */

import BrainIcon from '@/components/shared/BrainIcon';
import Button from '@/components/shared/Button';

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-6 py-16 sm:py-24 bg-white flex items-center justify-center min-h-[500px] sm:min-h-[600px]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <BrainIcon size={140} className="text-brand-midnight" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold text-brand-midnight leading-tight tracking-tight">
            App Features
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Being combines ancient Stoic wisdom with modern wellbeing research. Daily check-ins,
            mood and anxiety reflection tools, and crisis-resource access, with privacy-first
            design and AES-256 encryption.
          </p>
        </div>
      </section>

      {/* Daily Check-Ins */}
      <section className="px-6 py-20 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
              Daily Check-Ins
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Three mindful moments each day, grounded in Stoic philosophy. Build a consistent
              practice that fits your natural rhythm.
            </p>
          </div>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {/* Morning */}
            <div className="bg-white p-12 rounded-large shadow-sm">
              <div className="text-3xl opacity-60 mb-6">🌅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Morning</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Start your day with intention. Body scan, emotion recognition, and setting
                your values-aligned goals.
              </p>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Body awareness check-in</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Emotional state recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Dream journaling (optional)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Set daily intention aligned with virtues</span>
                </li>
              </ul>
            </div>

            {/* Midday */}
            <div className="bg-white p-12 rounded-large shadow-sm">
              <div className="text-3xl opacity-60 mb-6">☀️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Midday</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pause and recalibrate. Check progress on your intention, practice gratitude,
                and maintain mindful awareness.
              </p>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Awareness of present moment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Gratitude practice</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Intention progress check</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Brief breathing exercise (60s)</span>
                </li>
              </ul>
            </div>

            {/* Evening */}
            <div className="bg-white p-12 rounded-large shadow-sm">
              <div className="text-3xl opacity-60 mb-6">🌙</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Evening</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Reflect on your day. Review virtue practice, identify thought patterns,
                and prepare for tomorrow.
              </p>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Day review and reflection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Virtue instances (where did you succeed?)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Thought pattern observation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">•</span>
                  <span>Prepare tomorrow's intention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mood & Wellbeing Tracking */}
      <section className="px-6 py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
              Mood &amp; Wellbeing Tracking
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Research-based reflection tools help you track your mood and wellbeing patterns
              over time. All data encrypted and stored locally on your device.
            </p>
          </div>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* PHQ-9 */}
            <div className="bg-gray-50 p-12 rounded-large shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">PHQ-9 Mood Self-Assessment</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Patient Health Questionnaire-9 is a widely-used self-reflection tool for
                tracking mood patterns over time. Being uses the standard PHQ-9 wording so your
                self-reported scores stay consistent, letting you track your own patterns.
              </p>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>9 questions, 2-minute completion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Track scores over time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Flags elevated scores (PHQ-9 ≥20) and surfaces crisis resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Always one tap from 988 and Crisis Text Line</span>
                </li>
              </ul>
            </div>

            {/* GAD-7 */}
            <div className="bg-gray-50 p-12 rounded-large shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">GAD-7 Anxiety Self-Assessment</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Generalized Anxiety Disorder-7 scale is a widely-used self-reflection tool
                for tracking anxious thought and feeling patterns over time.
              </p>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>7 questions, 90-second completion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Track anxious feelings over time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Flags elevated scores (GAD-7 ≥15) and surfaces crisis resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-2">✓</span>
                  <span>Always one tap from 988 and Crisis Text Line</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Support */}
      <section className="px-6 py-20 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
              24/7 Crisis Resource Access
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your safety is our top priority. Immediate access to crisis resources from every screen.
            </p>
          </div>

          <div className="mt-12 bg-crisis-bg text-crisis-text border border-crisis-border p-10 rounded-large">
            <h3 className="text-2xl font-semibold mb-4">988 Suicide &amp; Crisis Lifeline</h3>
            <p className="text-lg leading-relaxed mb-6">
              Call <strong>988</strong> or text <strong>HOME</strong> to <strong>741741</strong> to
              connect with trained crisis counselors. Available 24/7/365. Completely confidential.
            </p>
            <div className="space-y-3">
              <p className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Less than 3 seconds from any screen to 988</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Surfaced immediately when self-assessment scores are elevated</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Crisis button always visible in app</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="px-6 py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
              Privacy &amp; Security
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your wellbeing data is yours. We protect it with AES-256 encryption
              and local-first storage.
            </p>
          </div>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Local-First Storage</h3>
              <p className="text-gray-600 leading-relaxed">
                All your data is encrypted and stored on your device. You own it.
                No cloud storage required (though optional cloud backup is available).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">AES-256 Encryption</h3>
              <p className="text-gray-600 leading-relaxed">
                AES-256 encryption protects your check-ins, self-assessments, and journal entries.
                Even if your device is compromised, your data remains secure.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">No Data Selling</h3>
              <p className="text-gray-600 leading-relaxed">
                We don't sell, share, or monetize your wellbeing data. Ever.
                Your privacy is not for sale.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Works Offline</h3>
              <p className="text-gray-600 leading-relaxed">
                100% functional without internet after initial download. Your practice
                continues even when you're disconnected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-10 sm:py-16 bg-white border-t-2 border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Ready to begin?
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Experience Stoic Mindfulness with research-based self-reflection tools.
            Start your 1 month free trial today.
          </p>
          <div className="mt-8">
            <Button href="/download" size="large">
              Download Being
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
