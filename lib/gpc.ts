/**
 * Global Privacy Control (GPC) detection.
 *
 * Only the literal string `'1'` is the affirmative signal per the GPC spec
 * (https://globalprivacycontrol.org/); everything else is no signal.
 *
 * @see INFRA-151
 */

import { NextRequest } from 'next/server';

export const GPC_COOKIE_NAME = 'being_gpc';
export const GPC_COOKIE_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds
export const GPC_REQUEST_HEADER = 'sec-gpc';
export const GPC_RESPONSE_HEADER = 'X-GPC-Honored';

export function isGpcSignal(headerValue: string | null | undefined): boolean {
  return headerValue === '1';
}

/** Reads the GPC signal from a NextRequest (for middleware). */
export function getGpcFromRequest(request: NextRequest): boolean {
  return isGpcSignal(request.headers.get(GPC_REQUEST_HEADER));
}
