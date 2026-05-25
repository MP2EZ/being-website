/**
 * Next.js Middleware
 *
 * Two responsibilities:
 * 1. A/B testing variant assignment — INFRA-93
 * 2. Global Privacy Control detection — INFRA-151
 *    (https://globalprivacycontrol.org/)
 *
 * GPC is treated as authoritative per-request: the `Sec-GPC: 1` header sets
 * the cookie + `X-GPC-Honored` response header; its absence clears the cookie.
 * `Vary: Sec-GPC` is set in next.config.ts headers() — the RSC layer
 * overwrites Vary headers set here, so the cache-key directive lives there.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  AB_COOKIE_NAME,
  AB_COOKIE_MAX_AGE,
  assignVariant,
  getVariantFromRequest,
} from '@/lib/ab-testing';
import {
  GPC_COOKIE_NAME,
  GPC_COOKIE_MAX_AGE,
  GPC_RESPONSE_HEADER,
  getGpcFromRequest,
} from '@/lib/gpc';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // A/B variant assignment (first visit only)
  const existingVariant = getVariantFromRequest(request);
  if (!existingVariant) {
    const variant = assignVariant();
    response.cookies.set({
      name: AB_COOKIE_NAME,
      value: variant,
      maxAge: AB_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: true,
      httpOnly: false, // Accessible to client JS for tracking
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(`[A/B] New visitor assigned variant: ${variant}`);
    }
  }

  // GPC detection (every request — header is authoritative)
  if (getGpcFromRequest(request)) {
    response.cookies.set({
      name: GPC_COOKIE_NAME,
      value: '1',
      maxAge: GPC_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: true,
      httpOnly: false, // Client reads it to render the GpcNotice
    });
    response.headers.set(GPC_RESPONSE_HEADER, '1');
  } else {
    response.cookies.delete(GPC_COOKIE_NAME);
  }

  return response;
}

// Only run on pages that might have A/B variants or need GPC detection.
// Excludes API routes, static files, and internal Next.js routes.
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
