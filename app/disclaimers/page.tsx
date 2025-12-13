import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/medical-disclaimer.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Medical Disclaimer | Being',
  description: 'Important medical and wellness disclaimers for the Being app.',
};

export default function DisclaimersPage() {
  return <LegalPage content={content} />;
}
