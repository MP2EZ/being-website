import { getLegalDoc } from '@/lib/legal';
import { LegalPage } from '@/components/legal/LegalPage';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Support | Being',
  description: 'Get help with Being - contact our support team for assistance.',
};

export default function SupportPage() {
  const content = getLegalDoc('support');

  return <LegalPage content={content} />;
}
