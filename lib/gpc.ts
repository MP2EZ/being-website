/**
 * Global Privacy Control (GPC) detection.
 *
 * Reads the `Sec-GPC` request header per the GPC spec
 * (https://globalprivacycontrol.org/) and exposes helpers for middleware
 * (request-time) and server components (cookie-time).
 *
 * Only the literal string `'1'` is the affirmative signal; everything else
 * — `'0'`, `''`, malformed, absent — is treated as no signal.
 *
 * @see INFRA-151
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const GPC_COOKIE_NAME = 'being_gpc';
export const GPC_COOKIE_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds
export const GPC_REQUEST_HEADER = 'sec-gpc';
export const GPC_RESPONSE_HEADER = 'X-GPC-Honored';

/**
 * Returns true when the header value is the affirmative GPC signal.
 * Per spec, only the literal string `'1'` qualifies.
 */
export function isGpcSignal(headerValue: string | null | undefined): boolean {
  return headerValue === '1';
}

/**
 * Reads the GPC signal from a NextRequest (for use in middleware).
 */
export function getGpcFromRequest(request: NextRequest): boolean {
  return isGpcSignal(request.headers.get(GPC_REQUEST_HEADER));
}

/**
 * Reads the cached GPC signal from cookies (for use in Server Components).
 * The cookie is set/cleared by middleware on every request, so this reflects
 * the current request's signal as of the most recent middleware pass.
 */
export async function getGpcFromCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(GPC_COOKIE_NAME)?.value === '1';
}
