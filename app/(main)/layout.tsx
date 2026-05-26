/**
 * Main Layout - With navigation
 * For all standard pages with header/footer navigation
 */

import DesktopNav from "@/components/navigation/DesktopNav";
import MobileHeader from "@/components/navigation/MobileHeader";
import MobileBottomTabs from "@/components/navigation/MobileBottomTabs";
import Footer from "@/components/navigation/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Skip to main content (WCAG 2.4.1 Bypass Blocks) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-midnight focus:text-white focus:rounded-medium focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-accessibility-focus-outline)]"
      >
        Skip to main content
      </a>

      {/* Desktop Navigation (hidden on mobile) */}
      <DesktopNav />

      {/* Mobile Header (hidden on desktop) */}
      <MobileHeader />

      {/* Main Content */}
      <main id="main" tabIndex={-1} className="min-h-screen">
        {children}
      </main>

      {/* Footer (with legal links + 988) */}
      <Footer />

      {/* Mobile Bottom Tabs (hidden on desktop) */}
      <MobileBottomTabs />
    </>
  );
}
