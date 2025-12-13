import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/notice-of-privacy-practices.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Notice of Privacy Practices | Being',
  description: 'How Being handles your mental health and wellness information.',
};

export default function PrivacyPracticesPage() {
  return <LegalPage content={content} />;
}
