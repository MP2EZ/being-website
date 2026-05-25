import { marked } from 'marked';
import type { ReactNode } from 'react';

interface LegalPageProps {
  content: string;
  banner?: ReactNode;
}

/**
 * Renders a legal document from markdown with consistent styling.
 * Uses design system tokens for colors and spacing.
 * Server component using marked for edge runtime compatibility.
 *
 * `banner` slot renders above the article — used for cross-cutting
 * notices like GpcNotice that need the page's background container.
 */
export function LegalPage({ content, banner }: LegalPageProps) {
  const html = marked(content);

  return (
    <div className="bg-brand-off-white min-h-screen">
      {banner}
      <article
        className="legal-content max-w-4xl mx-auto px-6 py-16"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
