/**
 * Mobile Bottom Tab Navigation
 * Visible on screens <640px
 * Thumb-friendly, crisis-accessible
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/philosophy', label: 'Philosophy', icon: '📖' },
    { href: '/features', label: 'Features', icon: '⚙️' },
    { href: '/crisis', label: 'Crisis', icon: '🆘' },
  ];

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 safe-area-inset-bottom"
    >
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-brand-sage'
                  : 'text-gray-600 hover:text-brand-midnight'
              }`}
            >
              <span aria-hidden="true" className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
