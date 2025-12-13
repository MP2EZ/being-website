import { getLegalDoc } from '@/lib/legal';
import { LegalPage } from '@/components/legal/LegalPage';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Privacy Policy | Being',
  description: 'Learn how Being protects your privacy and handles your personal information.',
};

export default function PrivacyPolicyPage() {
  const content = getLegalDoc('privacy-policy');

  return <LegalPage content={content} />;
}
