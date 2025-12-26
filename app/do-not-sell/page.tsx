import { LegalPage } from '@/components/legal/LegalPage';
import content from '@/content/legal/do-not-sell.md';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Do Not Sell My Personal Information | Being',
  description: 'Exercise your right to opt out of the sale or sharing of your personal information.',
};

export default function DoNotSellPage() {
  return <LegalPage content={content} />;
}
