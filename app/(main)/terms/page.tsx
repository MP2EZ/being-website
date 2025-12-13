import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/terms-of-service.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Terms of Service | Being',
  description: 'Terms and conditions for using the Being wellness app.',
};

export default function TermsOfServicePage() {
  return <LegalPage content={content} />;
}
