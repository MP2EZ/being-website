'use client';

import ReactMarkdown from 'react-markdown';

interface LegalPageProps {
  content: string;
}

/**
 * Renders a legal document from markdown with consistent styling.
 * Uses design system tokens for colors and spacing.
 */
export function LegalPage({ content }: LegalPageProps) {
  return (
    <div className="bg-brand-off-white min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-16">
        <ReactMarkdown
          components={{
            // Main title
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-brand-midnight mb-4 text-center">
                {children}
              </h1>
            ),
            // Section headers
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-brand-midnight mt-12 mb-4">
                {children}
              </h2>
            ),
            // Subsection headers
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-brand-midnight mt-8 mb-3">
                {children}
              </h3>
            ),
            // Paragraphs
            p: ({ children }) => (
              <p className="text-gray-700 leading-relaxed mb-4">
                {children}
              </p>
            ),
            // Unordered lists
            ul: ({ children }) => (
              <ul className="space-y-2 text-gray-700 mb-4 ml-4">
                {children}
              </ul>
            ),
            // Ordered lists
            ol: ({ children }) => (
              <ol className="space-y-2 text-gray-700 mb-4 ml-4 list-decimal list-inside">
                {children}
              </ol>
            ),
            // List items
            li: ({ children }) => (
              <li className="flex items-start">
                <span className="text-brand-sage mr-2 flex-shrink-0">•</span>
                <span>{children}</span>
              </li>
            ),
            // Links
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-brand-sage hover:underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            // Blockquotes (used for important notices)
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-brand-sage bg-white p-4 my-6 rounded-r-lg">
                {children}
              </blockquote>
            ),
            // Strong text
            strong: ({ children }) => (
              <strong className="font-semibold text-brand-midnight">
                {children}
              </strong>
            ),
            // Horizontal rules
            hr: () => (
              <hr className="my-8 border-gray-300" />
            ),
            // Tables
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3 text-left text-sm font-semibold text-brand-midnight">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
