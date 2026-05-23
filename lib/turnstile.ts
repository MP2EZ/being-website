/**
 * Cloudflare Turnstile - Server-side token verification
 *
 * Verifies a Turnstile token from the client against Cloudflare's
 * siteverify endpoint. Returns true only on a successful verification.
 *
 * Env var required: TURNSTILE_SECRET_KEY (Worker secret, NOT NEXT_PUBLIC).
 */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(
  token: string,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY not set');
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.append('remoteip', ip);

  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error('Turnstile verification request failed:', err);
    return false;
  }
}
