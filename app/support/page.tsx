import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/support.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Support | Being',
  description: 'Get help with Being - contact our support team for assistance.',
};

export default function SupportPage() {
  return <LegalPage content={content} />;
}
