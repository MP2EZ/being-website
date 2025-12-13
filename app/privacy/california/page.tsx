import { getLegalDoc } from '@/lib/legal';
import { LegalPage } from '@/components/legal/LegalPage';

export const dynamic = 'force-static';

export const metadata = {
  title: 'California Privacy Rights | Being',
  description: 'Your privacy rights under CCPA and CPRA as a California resident.',
};

export default function CaliforniaPrivacyPage() {
  const content = getLegalDoc('california-privacy');

  return <LegalPage content={content} />;
}
