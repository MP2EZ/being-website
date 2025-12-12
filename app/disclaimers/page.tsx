import { getLegalDoc } from '@/lib/legal';
import { LegalPage } from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Medical Disclaimer | Being',
  description: 'Important medical and wellness disclaimers for the Being app.',
};

export default function DisclaimersPage() {
  const content = getLegalDoc('medical-disclaimer');

  return <LegalPage content={content} />;
}
