import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/california-privacy.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'California Privacy Rights | Being',
  description: 'Your privacy rights under CCPA and CPRA as a California resident.',
};

export default function CaliforniaPrivacyPage() {
  return <LegalPage content={content} />;
}
