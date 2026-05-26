import { marked } from 'marked';
import type { ReactNode } from 'react';

interface LegalPageProps {
  content: string;
  banner?: ReactNode;
}

// Per-isolate cache for parsed markdown. Content strings are module-level
// imports — identity-stable across all requests — so a Map keyed on the
// string instance is a safe cache. First request on a fresh Worker isolate
// pays the parse cost (~50ms for the larger docs); subsequent requests on
// the same isolate hit the cache (<1ms).
//
// Why this exists: OpenNext on Cloudflare Workers re-executes server
// components per request even for `force-static` pages, so without this
// cache `marked()` runs on every request. That pushed CPU P99 to ~500ms
// and caused intermittent Worker 1102 (exceededResources) errors.
const htmlCache = new Map<string, string>();

function renderMarkdown(content: string): string {
  let html = htmlCache.get(content);
  if (html === undefined) {
    html = marked(content) as string;
    htmlCache.set(content, html);
  }
  return html;
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
  const html = renderMarkdown(content);

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
