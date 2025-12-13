import { getLegalDoc } from '@/lib/legal';
import { LegalPage } from '@/components/legal/LegalPage';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Notice of Privacy Practices | Being',
  description: 'How Being handles your mental health and wellness information.',
};

export default function PrivacyPracticesPage() {
  const content = getLegalDoc('notice-of-privacy-practices');

  return <LegalPage content={content} />;
}
