import { marked } from 'marked';

interface LegalPageProps {
  content: string;
}

/**
 * Renders a legal document from markdown with consistent styling.
 * Uses design system tokens for colors and spacing.
 * Server component using marked for edge runtime compatibility.
 */
export function LegalPage({ content }: LegalPageProps) {
  const html = marked(content);

  return (
    <div className="bg-brand-off-white min-h-screen">
      <article
        className="legal-content max-w-4xl mx-auto px-6 py-16"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
