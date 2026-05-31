/**
 * A/B Testing Framework for Being Website
 *
 * Cloudflare-native implementation using cookies for variant assignment.
 * No external analytics vendors - conversions tracked via Notion.
 *
 * @see INFRA-93
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// Cookie configuration
export const AB_COOKIE_NAME = 'being_ab_variant';
export const AB_COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

// Experiment configuration
export type Variant = 'A' | 'B';

export interface VariantWeight {
  variant: Variant;
  weight: number;
}

export interface ExperimentConfig {
  name: string;
  // Coupled variant/weight pairs so the two can't drift in length.
  entries: VariantWeight[];
}

// Default experiment: 50/50 split
export const DEFAULT_EXPERIMENT: ExperimentConfig = {
  name: 'default',
  entries: [
    { variant: 'A', weight: 0.5 },
    { variant: 'B', weight: 0.5 },
  ],
};

/**
 * Assigns a variant based on configured weights
 * Uses crypto.getRandomValues for unbiased randomness
 */
export function assignVariant(config: ExperimentConfig = DEFAULT_EXPERIMENT): Variant {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const random = buf[0]! / (0xffffffff + 1);

  let cumulative = 0;
  for (const { variant, weight } of config.entries) {
    cumulative += weight;
    if (random < cumulative) {
      return variant;
    }
  }

  // Fallback to last variant (shouldn't happen with proper weights)
  return config.entries[config.entries.length - 1]!.variant;
}

/**
 * Gets the current variant from cookies (for use in Server Components/API routes)
 * Returns null if no variant is assigned
 */
export async function getVariant(): Promise<Variant | null> {
  const cookieStore = await cookies();
  const variant = cookieStore.get(AB_COOKIE_NAME)?.value;

  if (variant === 'A' || variant === 'B') {
    return variant;
  }

  return null;
}

/**
 * Gets variant from a NextRequest (for use in middleware)
 */
export function getVariantFromRequest(request: NextRequest): Variant | null {
  const variant = request.cookies.get(AB_COOKIE_NAME)?.value;

  if (variant === 'A' || variant === 'B') {
    return variant;
  }

  return null;
}
