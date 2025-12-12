import { readFileSync } from 'fs';
import { join } from 'path';

export type LegalDocSlug =
  | 'privacy-policy'
  | 'terms-of-service'
  | 'medical-disclaimer'
  | 'notice-of-privacy-practices'
  | 'california-privacy'
  | 'do-not-sell'
  | 'support';

export interface LegalDocMeta {
  title: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
}

/**
 * Read a legal document from the content/legal directory.
 * Returns the raw markdown content.
 */
export function getLegalDoc(slug: LegalDocSlug): string {
  const filePath = join(process.cwd(), 'content', 'legal', `${slug}.md`);
  return readFileSync(filePath, 'utf-8');
}

/**
 * Parse frontmatter-style metadata from markdown.
 * Extracts title from first h1, and metadata from bold lines at top.
 */
export function parseLegalDocMeta(content: string): LegalDocMeta {
  const lines = content.split('\n');

  // Extract title from first h1
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch?.[1] || 'Legal Document';

  // Extract metadata from **Key:** Value patterns
  const versionMatch = content.match(/\*\*Version:\*\* (.+)/);
  const effectiveDateMatch = content.match(/\*\*Effective Date:\*\* (.+)/);
  const lastUpdatedMatch = content.match(/\*\*Last Updated:\*\* (.+)/);

  return {
    title,
    version: versionMatch?.[1] || '1.0',
    effectiveDate: effectiveDateMatch?.[1] || '',
    lastUpdated: lastUpdatedMatch?.[1] || '',
  };
}

/**
 * Get legal document with parsed metadata.
 */
export function getLegalDocWithMeta(slug: LegalDocSlug) {
  const content = getLegalDoc(slug);
  const meta = parseLegalDocMeta(content);
  return { content, meta };
}
