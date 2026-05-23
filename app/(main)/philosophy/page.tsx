/**
 * Philosophy Page - Stoic Mindfulness explained
 * Professional SaaS Design
 * Updated structure: Five Core Principles as primary framework
 * NOTE: Content validated by philosopher agent
 *
 * Server component. Only the "Deepen Your Practice" accordion section is
 * a client subcomponent (PracticeAccordions) — everything else is static
 * content rendered on the server.
 */

import BrainIcon from '@/components/shared/BrainIcon';
import Button from '@/components/shared/Button';
import PracticeAccordions from '@/components/philosophy/PracticeAccordions';

export default function PhilosophyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-6 py-16 sm:py-24 bg-white flex items-center justify-center min-h-[500px] sm:min-h-[600px]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <BrainIcon size={140} className="text-brand-midnight" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold text-brand-midnight leading-tight tracking-tight">
            What is Stoic Mindfulness?
          </h1>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            <p>
              Stoic Mindfulness is not just Stoicism plus mindfulness—it&rsquo;s a unique integrated system
              that combines ancient philosophical wisdom with modern contemplative practice and neuroscience.
            </p>
            <p>
              It&rsquo;s the practice of <strong className="text-gray-900">aware wisdom</strong>: bringing full presence to each moment
              while guided by principles that help you discern what truly matters and respond with virtue.
            </p>
          </div>
        </div>
      </section>

      {/* Why These Traditions Need Each Other */}
      <section className="px-6 py-20 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 text-center">
            Why These Traditions Need Each Other
          </h2>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
            {/* Stoicism Alone */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Stoicism Alone
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Classical Stoicism offers profound wisdom, but it faces a challenge:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Intellectual understanding without embodied awareness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Retrospective analysis instead of real-time response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Knowing principles but struggling to apply them in the moment</span>
                </li>
              </ul>
            </div>

            {/* Mindfulness Alone */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Mindfulness Alone
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Traditional mindfulness cultivates presence, but it can lack:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Ethical framework to guide what deserves attention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Guidance on when to accept vs. when to act</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Direction for wise discernment and moral action</span>
                </li>
              </ul>
            </div>
          </div>

          {/* The Synthesis */}
          <div className="mt-20 sm:mt-24 bg-gray-900 text-white p-12 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">The Synthesis</h3>
            <p className="text-lg leading-relaxed mb-4 text-gray-100">
              <strong>Aware Wisdom = Metacognitive Awareness × Philosophical Discernment</strong>
            </p>
            <p className="leading-relaxed text-gray-300">
              Mindfulness provides the perceptual training to catch impressions before they become reactions.
              Stoicism provides the ethical framework to discern wise responses. Together, they create a path
              to human flourishing through transformation of consciousness—not just calm, but wisdom in action.
            </p>
          </div>
        </div>
      </section>

      {/* The Five Core Principles */}
      <section className="px-6 py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
              The Five Core Principles
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              These principles are the foundation of Stoic Mindfulness. They guide every check-in,
              practice, and moment of reflection in Being.
            </p>
          </div>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
            {/* Principle 1: Aware Presence */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div aria-hidden="true" className="text-3xl opacity-60 flex-shrink-0">🧘</div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">1. Aware Presence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Be fully here, now. Notice your breath, body, thoughts, and emotions without getting
                    swept away by them.
                  </p>
                  <p className="text-sm text-accent-600 font-medium italic">
                    &ldquo;Am I present and aware right now?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Principle 2: Radical Acceptance */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div aria-hidden="true" className="text-3xl opacity-60 flex-shrink-0">🌊</div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">2. Radical Acceptance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    This is what&rsquo;s happening. Acceptance doesn&rsquo;t mean approval—it means acknowledging
                    reality as the foundation for wise action.
                  </p>
                  <p className="text-sm text-accent-600 font-medium italic">
                    &ldquo;Can I accept this moment as it is?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Principle 3: Sphere Sovereignty */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div aria-hidden="true" className="text-3xl opacity-60 flex-shrink-0">🎯</div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">3. Sphere Sovereignty</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Focus only on what you control: your judgments, intentions, and character. Release
                    attachment to outcomes. Govern only your domain.
                  </p>
                  <p className="text-sm text-accent-600 font-medium italic">
                    &ldquo;What&rsquo;s actually within my control here?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Principle 4: Virtuous Response */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div aria-hidden="true" className="text-3xl opacity-60 flex-shrink-0">⚖️</div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">4. Virtuous Response</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Character over outcomes. In each moment, ask what wisdom, courage, justice,
                    or temperance requires. Choose the response that aligns with your values.
                  </p>
                  <p className="text-sm text-accent-600 font-medium italic">
                    &ldquo;What does virtue require of me now?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Principle 5: Interconnected Living */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div aria-hidden="true" className="text-3xl opacity-60 flex-shrink-0">🌍</div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">5. Interconnected Living</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You are part of a larger whole. Bring full presence to others. Recognize that humanity
                    shares a common nature and common good.
                  </p>
                  <p className="text-sm text-accent-600 font-medium italic">
                    &ldquo;How can I serve the common good?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 sm:mt-24 p-10 bg-gray-50 rounded-xl text-center max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed">
              These five principles work together. Aware Presence grounds you in the moment. Radical Acceptance
              meets reality honestly. Sphere Sovereignty focuses your energy. Virtuous Response guides your
              actions. Interconnected Living connects you to others and the world.
            </p>
          </div>
        </div>
      </section>

      {/* How It Differs */}
      <section className="px-6 py-20 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 text-center">
            How Stoic Mindfulness Differs
          </h2>

          <div className="mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* vs Traditional Mindfulness */}
            <div className="bg-white p-12 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
                vs. Traditional Mindfulness
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-500 mb-4 text-sm">Traditional</h4>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li>• Present awareness</li>
                    <li>• Non-judgment</li>
                    <li>• Stress reduction</li>
                    <li>• Often isolated practice</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-600 mb-4 text-sm">Stoic Mindfulness</h4>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li>✓ Awareness + philosophy</li>
                    <li>✓ Wise discernment</li>
                    <li>✓ Meaning &amp; flourishing</li>
                    <li>✓ Integrated with ethics</li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-gray-600 leading-relaxed italic text-sm text-center">
                Adds a <em>why</em> to the <em>how</em>. Not just calm—wisdom in action.
              </p>
            </div>

            {/* vs Classical Stoicism */}
            <div className="bg-white p-12 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
                vs. Classical Stoicism
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-500 mb-4 text-sm">Classical</h4>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li>• Philosophical study</li>
                    <li>• Intellectual reasoning</li>
                    <li>• Retrospective analysis</li>
                    <li>• Reading &amp; reflection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-600 mb-4 text-sm">Stoic Mindfulness</h4>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li>✓ Embodied practice</li>
                    <li>✓ Somatic awareness</li>
                    <li>✓ Real-time response</li>
                    <li>✓ Daily contemplation</li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-gray-600 leading-relaxed italic text-sm text-center">
                Philosophy + contemplative practice. Knowing becomes being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deepen Your Practice — interactive accordions (client subcomponent) */}
      <PracticeAccordions />

      {/* Download CTA */}
      <section className="px-6 py-10 sm:py-16 bg-white border-t-2 border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Practice Stoic Mindfulness daily
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Being guides you through the Five Core Principles with morning, midday, and evening check-ins.
            Build awareness, cultivate virtue, and find deeper meaning in mindfulness practice.
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
