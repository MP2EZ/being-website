import { getLegalDoc } from '@/lib/legal';
import { LegalPage } from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Terms of Service | Being',
  description: 'Terms and conditions for using the Being wellness app.',
};

export default function TermsOfServicePage() {
  const content = getLegalDoc('terms-of-service');

  return <LegalPage content={content} />;
}
