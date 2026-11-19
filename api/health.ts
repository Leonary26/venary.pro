import type { IncomingMessage, ServerResponse } from 'node:http';

export interface HealthPayload {
  status: 'ok';
  mailConfigured: boolean;
}

export function getHealthPayload(): HealthPayload {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  return {
    status: 'ok',
    mailConfigured: Boolean(apiKey && !apiKey.startsWith('MY_')),
  };
}

export default function handler(
  req: IncomingMessage,
  res: ServerResponse,
): void {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        success: false,
        code: 'METHOD_NOT_ALLOWED',
        error: 'Method not allowed.',
      }),
    );
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.end(JSON.stringify(getHealthPayload()));
}
