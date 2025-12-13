import { getLegalDoc } from '@/lib/legal';
import { LegalPage } from '@/components/legal/LegalPage';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Do Not Sell My Personal Information | Being',
  description: 'Exercise your right to opt out of the sale or sharing of your personal information.',
};

export default function DoNotSellPage() {
  const content = getLegalDoc('do-not-sell');

  return <LegalPage content={content} />;
}
