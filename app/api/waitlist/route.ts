/**
 * Waitlist API - Notion Database Integration
 * Stores email signups in Notion database for pre-launch
 * Includes A/B variant tracking for conversion analysis
 *
 * @see INFRA-93
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getVariant, trackConversion } from '@/lib/ab-testing';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_WAITLIST_DB_ID;

const BodySchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = BodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }
    const { email } = parsed.data;

    // Validate environment variables
    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
      console.error('Missing Notion credentials');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Get A/B variant for conversion tracking
    const variant = await getVariant();

    // Build Notion properties with variant if available
    const properties: Record<string, unknown> = {
      Email: {
        title: [
          {
            text: {
              content: email,
            },
          },
        ],
      },
      'Signed Up': {
        date: {
          start: new Date().toISOString(),
        },
      },
    };

    // Add variant to Notion if assigned (for conversion analysis)
    if (variant) {
      properties['Variant'] = {
        select: {
          name: variant,
        },
      };
    }

    // Add to Notion database
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notion API error:', errorData);
      throw new Error('Failed to add to Notion');
    }

    // Track conversion for A/B analysis
    if (variant) {
      trackConversion(variant, 'waitlist_signup');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
