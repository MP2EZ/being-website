/**
 * Next.js Middleware - A/B Testing Variant Assignment
 *
 * Assigns visitors to A/B test variants on first visit.
 * Cookie persisted for 30 days for consistent experience.
 *
 * @see INFRA-93
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  AB_COOKIE_NAME,
  AB_COOKIE_MAX_AGE,
  assignVariant,
  getVariantFromRequest,
} from '@/lib/ab-testing';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if variant already assigned
  const existingVariant = getVariantFromRequest(request);

  if (!existingVariant) {
    // Assign new variant
    const variant = assignVariant();

    // Set cookie with 30-day expiry
    response.cookies.set({
      name: AB_COOKIE_NAME,
      value: variant,
      maxAge: AB_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false, // Accessible to client JS for tracking
    });

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[A/B] New visitor assigned variant: ${variant}`);
    }
  }

  return response;
}

// Only run on pages that might have A/B variants
// Excludes API routes, static files, and internal Next.js routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg (icons)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)',
  ],
};
