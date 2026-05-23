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
import { verifyTurnstile } from '@/lib/turnstile';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_WAITLIST_DB_ID;

const BodySchema = z.object({
  email: z.string().email(),
  turnstileToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = BodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }
    const { email, turnstileToken } = parsed.data;

    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
      console.error('Missing Notion credentials');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const ip = request.headers.get('cf-connecting-ip') ?? undefined;
    const verified = await verifyTurnstile(turnstileToken, ip);
    if (!verified) {
      return NextResponse.json(
        { error: 'Verification failed' },
        { status: 400 }
      );
    }

    const variant = await getVariant();

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

    if (variant) {
      properties['Variant'] = {
        select: {
          name: variant,
        },
      };
    }

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
