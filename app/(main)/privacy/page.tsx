import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/privacy-policy.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Privacy Policy | Being',
  description: 'Learn how Being protects your privacy and handles your personal information.',
};

export default function PrivacyPolicyPage() {
  return <LegalPage content={content} />;
}
