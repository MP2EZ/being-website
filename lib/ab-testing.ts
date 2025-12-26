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

export interface ExperimentConfig {
  name: string;
  variants: Variant[];
  weights: number[]; // Must sum to 1.0
}

// Default experiment: 50/50 split
export const DEFAULT_EXPERIMENT: ExperimentConfig = {
  name: 'default',
  variants: ['A', 'B'],
  weights: [0.5, 0.5],
};

/**
 * Assigns a variant based on configured weights
 * Uses crypto.getRandomValues for unbiased randomness
 */
export function assignVariant(config: ExperimentConfig = DEFAULT_EXPERIMENT): Variant {
  const random = crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1);

  let cumulative = 0;
  for (let i = 0; i < config.variants.length; i++) {
    cumulative += config.weights[i];
    if (random < cumulative) {
      return config.variants[i];
    }
  }

  // Fallback to last variant (shouldn't happen with proper weights)
  return config.variants[config.variants.length - 1];
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

/**
 * Conversion event types we track
 */
export type ConversionEvent =
  | 'waitlist_signup'
  | 'download_click'
  | 'cta_click';

/**
 * Tracks a conversion event
 * Conversions are stored in Notion alongside the variant for analysis
 *
 * @param variant - The assigned variant
 * @param event - The conversion event type
 * @param metadata - Optional additional data
 */
export function trackConversion(
  variant: Variant,
  event: ConversionEvent,
  metadata?: Record<string, string>
): void {
  // For now, conversions are tracked by including the variant
  // in the Notion database entry (see waitlist API)
  //
  // Future enhancement: Send to Cloudflare Analytics Engine
  // await env.ANALYTICS.writeDataPoint({
  //   blobs: [variant, event],
  //   doubles: [1], // count
  //   indexes: [event],
  // });

  if (process.env.NODE_ENV === 'development') {
    console.log('[A/B] Conversion tracked:', { variant, event, metadata });
  }
}
