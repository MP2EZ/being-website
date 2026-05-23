/**
 * Philosophy "Deepen Your Practice" — interactive accordions.
 *
 * Extracted from app/(main)/philosophy/page.tsx so the rest of that page
 * can stay server-rendered. One-open-at-a-time behavior is preserved.
 */

'use client';

import { useState } from 'react';

type SectionId = 'virtues' | 'entry' | 'intermediate' | 'advanced';

export default function PracticeAccordions() {
  const [expandedSection, setExpandedSection] = useState<SectionId | null>(null);

  const toggleSection = (section: SectionId) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="px-6 py-20 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 text-center">
          Deepen Your Practice
        </h2>

        {/* The Four Cardinal Virtues */}
        <div className="mt-12">
          <button
            onClick={() => toggleSection('virtues')}
            aria-expanded={expandedSection === 'virtues'}
            aria-controls="practice-virtues"
            className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left border-2 border-gray-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <span aria-hidden="true">⚖️ </span>The Four Cardinal Virtues
              </h3>
              <p className="text-gray-600">
                The foundation of Virtuous Response: Wisdom, Courage, Justice, Temperance
              </p>
            </div>
            <span aria-hidden="true" className="text-2xl text-accent-600">
              {expandedSection === 'virtues' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'virtues' && (
            <div id="practice-virtues" className="mt-4 p-8 bg-white border-2 border-gray-200 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Wisdom */}
                <div>
                  <div aria-hidden="true" className="text-3xl mb-3">🦉</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Wisdom</h4>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    Discerning what is truly good, bad, or indifferent. Understanding what is
                    within your control and what is not.
                  </p>
                  <blockquote className="border-l-4 border-accent-500 pl-3 italic text-gray-600 text-sm">
                    &ldquo;You have power over your mind—not outside events.&rdquo;
                    <footer className="text-xs mt-1 not-italic">— Marcus Aurelius, Meditations 6.8</footer>
                  </blockquote>
                </div>

                {/* Courage */}
                <div>
                  <div aria-hidden="true" className="text-3xl mb-3">🦁</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Courage</h4>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    Not the absence of fear, but action in spite of it. Facing difficulties
                    with resilience and maintaining your principles.
                  </p>
                  <blockquote className="border-l-4 border-accent-500 pl-3 italic text-gray-600 text-sm">
                    &ldquo;It is because we do not dare that things are difficult.&rdquo;
                    <footer className="text-xs mt-1 not-italic">— Seneca, Letters to Lucilius 104.26</footer>
                  </blockquote>
                </div>

                {/* Justice */}
                <div>
                  <div aria-hidden="true" className="text-3xl mb-3">⚖️</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Justice</h4>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    Treating others with fairness, kindness, and respect. Recognizing our
                    responsibilities to the larger community.
                  </p>
                  <blockquote className="border-l-4 border-accent-500 pl-3 italic text-gray-600 text-sm">
                    &ldquo;What brings no benefit to the hive brings none to the bee.&rdquo;
                    <footer className="text-xs mt-1 not-italic">— Marcus Aurelius, Meditations 6.54</footer>
                  </blockquote>
                </div>

                {/* Temperance */}
                <div>
                  <div aria-hidden="true" className="text-3xl mb-3">🌊</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Temperance</h4>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    Self-control and moderation. Finding balance, avoiding excess, and
                    cultivating discipline in thought and action.
                  </p>
                  <blockquote className="border-l-4 border-accent-500 pl-3 italic text-gray-600 text-sm">
                    &ldquo;It is in our power not to want what we don&rsquo;t have.&rdquo;
                    <footer className="text-xs mt-1 not-italic">— Seneca, Letters to Lucilius 123.3 (adapted)</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Entry Level */}
        <div className="mt-12">
          <button
            onClick={() => toggleSection('entry')}
            aria-expanded={expandedSection === 'entry'}
            aria-controls="practice-entry"
            className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left border-2 border-gray-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <span aria-hidden="true">📘 </span>Foundational Practices (0-6 months)
              </h3>
              <p className="text-gray-600">
                Building the foundation: daily awareness and discernment
              </p>
            </div>
            <span aria-hidden="true" className="text-2xl text-accent-600">
              {expandedSection === 'entry' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'entry' && (
            <div id="practice-entry" className="mt-4 p-8 bg-white border-2 border-gray-200 rounded-xl space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Morning &amp; Evening Check-ins</h4>
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Morning:</strong> Set your intention. What principle will you practice today?<br />
                  <strong className="text-gray-900">Evening:</strong> Review your day. Where did awareness and virtue meet? Where can you grow?
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Aware Presence Practice</h4>
                <p className="text-gray-600 leading-relaxed">
                  Notice your breath. Observe sensations in your body. Watch thoughts arise and pass
                  without getting swept away. This is the foundation of all practice.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sphere Sovereignty Sorting</h4>
                <p className="text-gray-600 leading-relaxed">
                  When worry arises, ask: &ldquo;Is this within my control?&rdquo; If yes, plan action. If no,
                  practice acceptance. This is the cornerstone of Stoic practice.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Intermediate Level */}
        <div className="mt-12">
          <button
            onClick={() => toggleSection('intermediate')}
            aria-expanded={expandedSection === 'intermediate'}
            aria-controls="practice-intermediate"
            className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left border-2 border-gray-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <span aria-hidden="true">📙 </span>Effortful Integration (6-18 months)
              </h3>
              <p className="text-gray-600">
                Classical Stoic practices for building resilience and perspective
              </p>
            </div>
            <span aria-hidden="true" className="text-2xl text-accent-600">
              {expandedSection === 'intermediate' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'intermediate' && (
            <div id="practice-intermediate" className="mt-4 p-8 bg-white border-2 border-gray-200 rounded-xl space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Premeditatio Malorum (Negative Visualization)</h4>
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Rational contemplation, not catastrophizing:</strong> Briefly imagine losing
                  what you value to cultivate gratitude and prepare for uncertainty. Time-limited (2-3 minutes),
                  followed by appreciation for the present. This builds resilience without anxiety.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">The View from Above</h4>
                <p className="text-gray-600 leading-relaxed">
                  Zoom out: see yourself, your city, your country, the Earth from space. This cosmic
                  perspective helps you see daily worries in proper proportion.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Voluntary Discomfort</h4>
                <p className="text-gray-600 leading-relaxed">
                  Occasionally practice small discomforts: a cold shower, fasting, saying no to pleasures.
                  This builds resilience and reminds you that comfort is not required for well-being.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Level */}
        <div className="mt-12">
          <button
            onClick={() => toggleSection('advanced')}
            aria-expanded={expandedSection === 'advanced'}
            aria-controls="practice-advanced"
            className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left border-2 border-gray-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <span aria-hidden="true">📕 </span>Integrated Wisdom (2-5+ years)
              </h3>
              <p className="text-gray-600">
                Principles arising spontaneously, philosophy embodied in character
              </p>
            </div>
            <span aria-hidden="true" className="text-2xl text-accent-600">
              {expandedSection === 'advanced' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'advanced' && (
            <div id="practice-advanced" className="mt-4 p-8 bg-white border-2 border-gray-200 rounded-xl space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Amor Fati (Love of Fate)</h4>
                <p className="text-gray-600 leading-relaxed">
                  Beyond acceptance: loving what happens. Not passive resignation, but active embrace
                  of reality as the raw material for growth. Every obstacle becomes fuel for virtue.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Memento Mori (Remember Death)</h4>
                <p className="text-gray-600 leading-relaxed">
                  Your time is limited—this isn&rsquo;t morbid, it&rsquo;s liberating. When you remember mortality,
                  trivial concerns fade and what truly matters becomes clear. Every moment is precious.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sympatheia (Interconnection)</h4>
                <p className="text-gray-600 leading-relaxed">
                  Deep recognition that you are part of a larger whole. Your actions ripple outward.
                  Justice isn&rsquo;t optional—it&rsquo;s recognition that humanity shares a common nature and
                  common good. Bring presence to this truth.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
