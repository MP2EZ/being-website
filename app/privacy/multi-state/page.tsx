import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/multi-state-privacy.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Multi-State Privacy Rights | Being',
  description:
    'Your privacy rights under Texas, Colorado, Connecticut, and Virginia state privacy laws, with a California summary.',
};

export default function MultiStatePrivacyPage() {
  return <LegalPage content={content} />;
}
