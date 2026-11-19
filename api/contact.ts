import type { IncomingMessage, ServerResponse } from 'node:http';
import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HEADER_INJECTION_PATTERN = /[\r\n]/;
const MAX_BODY_BYTES = 32 * 1024;

// Limitation anti-spam en mémoire par adresse IP (5 requêtes / 15 minutes)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface ContactRequestBody {
  fullName?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown; // Champ honeypot anti-spam
  formStartedAt?: unknown;
  locale?: unknown;
}

export type ContactErrorCode =
  | 'RATE_LIMIT'
  | 'SPAM'
  | 'TOO_FAST'
  | 'INVALID_NAME'
  | 'INVALID_EMAIL'
  | 'INVALID_PROJECT_TYPE'
  | 'INVALID_MESSAGE'
  | 'SERVICE_UNAVAILABLE'
  | 'RESEND_ERROR'
  | 'SERVER_ERROR'
  | 'INVALID_JSON'
  | 'METHOD_NOT_ALLOWED';

const SERVER_MESSAGES: Record<'fr' | 'en', Record<ContactErrorCode, string>> = {
  fr: {
    RATE_LIMIT:
      'Trop de messages envoyés récemment. Veuillez patienter quelques minutes avant de réessayer.',
    SPAM: 'Requête refusée par la protection anti-spam.',
    TOO_FAST: 'Soumission trop rapide détectée. Veuillez réessayer.',
    INVALID_NAME: 'Le nom complet doit contenir entre 2 et 120 caractères.',
    INVALID_EMAIL: 'Veuillez fournir une adresse e-mail valide.',
    INVALID_PROJECT_TYPE: 'Veuillez sélectionner un type de projet valide.',
    INVALID_MESSAGE: 'Le message doit contenir entre 15 et 5000 caractères.',
    SERVICE_UNAVAILABLE:
      "Le service d'envoi de messages est momentanément indisponible. Veuillez réessayer ultérieurement.",
    RESEND_ERROR:
      "L'envoi du message a échoué pour le moment. Veuillez réessayer dans quelques instants.",
    SERVER_ERROR: 'Une erreur est survenue. Veuillez réessayer.',
    INVALID_JSON: 'Format de requête invalide.',
    METHOD_NOT_ALLOWED: 'Méthode HTTP non autorisée.',
  },
  en: {
    RATE_LIMIT:
      'Too many messages sent recently. Please wait a few minutes before trying again.',
    SPAM: 'Request rejected by anti-spam protection.',
    TOO_FAST: 'Submission detected as too fast. Please try again.',
    INVALID_NAME: 'Full name must be between 2 and 120 characters.',
    INVALID_EMAIL: 'Please provide a valid email address.',
    INVALID_PROJECT_TYPE: 'Please select a valid project type.',
    INVALID_MESSAGE: 'Message must be between 15 and 5000 characters.',
    SERVICE_UNAVAILABLE:
      'The message delivery service is temporarily unavailable. Please try again later.',
    RESEND_ERROR:
      'Unable to deliver your message right now. Please try again in a moment.',
    SERVER_ERROR: 'An error occurred. Please try again.',
    INVALID_JSON: 'Invalid request format.',
    METHOD_NOT_ALLOWED: 'HTTP method not allowed.',
  },
};

export function extractServerErrorDetail(err: unknown): string {
  if (typeof err === 'string') {
    const trimmed = err.trim();
    return trimmed && !trimmed.includes('[object Object]')
      ? trimmed
      : 'Erreur inconnue';
  }
  if (err instanceof Error) {
    return err.message && !err.message.includes('[object Object]')
      ? err.message
      : err.name || 'Erreur interne';
  }
  if (typeof err === 'object' && err !== null) {
    const record = err as Record<string, unknown>;
    for (const key of ['message', 'error', 'name', 'code']) {
      if (key in record && record[key] !== undefined) {
        const extracted = extractServerErrorDetail(record[key]);
        if (extracted !== 'Erreur inconnue') {
          return extracted;
        }
      }
    }
  }
  return 'Erreur inconnue';
}

function writeJson(
  res: ServerResponse,
  status: number,
  payload: Record<string, unknown>,
): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

export function sendContactError(
  res: ServerResponse,
  status: number,
  lang: 'fr' | 'en',
  code: ContactErrorCode,
): void {
  writeJson(res, status, {
    success: false,
    code,
    error: SERVER_MESSAGES[lang][code],
  });
}

function resolveAcceptLanguage(req: IncomingMessage): 'fr' | 'en' {
  const header = req.headers['accept-language'];
  const raw = Array.isArray(header) ? header[0] : header;
  return typeof raw === 'string' && raw.toLowerCase().startsWith('en')
    ? 'en'
    : 'fr';
}

function resolveClientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (typeof forwardedValue === 'string' && forwardedValue.trim()) {
    return forwardedValue.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  const realIpValue = Array.isArray(realIp) ? realIp[0] : realIp;
  if (typeof realIpValue === 'string' && realIpValue.trim()) {
    return realIpValue.trim();
  }

  return req.socket?.remoteAddress || 'unknown';
}

interface ServerlessIncomingMessage extends IncomingMessage {
  body?: unknown;
}

async function parseJsonBody(req: ServerlessIncomingMessage): Promise<unknown> {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      return req.body.trim() ? (JSON.parse(req.body) as unknown) : {};
    }
    if (Buffer.isBuffer(req.body)) {
      const text = req.body.toString('utf8').trim();
      return text ? (JSON.parse(text) as unknown) : {};
    }
    return req.body;
  }

  const chunks: Buffer[] = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    const bufferChunk = Buffer.isBuffer(chunk)
      ? chunk
      : Buffer.from(String(chunk));
    totalBytes += bufferChunk.length;
    if (totalBytes > MAX_BODY_BYTES) {
      throw new RangeError('Payload too large');
    }
    chunks.push(bufferChunk);
  }

  const rawText = Buffer.concat(chunks).toString('utf8').trim();
  if (!rawText) {
    return {};
  }

  return JSON.parse(rawText) as unknown;
}

export async function processContactSubmission(
  rawBody: unknown,
  clientIp: string,
  res: ServerResponse,
): Promise<void> {
  const body = (
    typeof rawBody === 'object' && rawBody !== null ? rawBody : {}
  ) as ContactRequestBody;
  const lang = body.locale === 'en' ? 'en' : 'fr';

  if (isRateLimited(clientIp)) {
    sendContactError(res, 429, lang, 'RATE_LIMIT');
    return;
  }

  // 1. Contrôle anti-spam (champ piège honeypot + délai minimal humain)
  const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
  if (honeypot.length > 0) {
    sendContactError(res, 400, lang, 'SPAM');
    return;
  }

  if (
    typeof body.formStartedAt === 'number' &&
    Number.isFinite(body.formStartedAt)
  ) {
    const elapsedMs = Date.now() - body.formStartedAt;
    if (elapsedMs >= 0 && elapsedMs < 1200) {
      sendContactError(res, 400, lang, 'TOO_FAST');
      return;
    }
  }

  // 2. Validation stricte côté serveur
  const fullName =
    typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const projectType =
    typeof body.projectType === 'string' ? body.projectType.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (fullName.length < 2 || fullName.length > 120) {
    sendContactError(res, 400, lang, 'INVALID_NAME');
    return;
  }

  if (
    !email ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    HEADER_INJECTION_PATTERN.test(email)
  ) {
    sendContactError(res, 400, lang, 'INVALID_EMAIL');
    return;
  }

  if (projectType.length < 2 || projectType.length > 120) {
    sendContactError(res, 400, lang, 'INVALID_PROJECT_TYPE');
    return;
  }

  if (message.length < 15 || message.length > 5000) {
    sendContactError(res, 400, lang, 'INVALID_MESSAGE');
    return;
  }

  // 3. Vérification de la configuration Resend côté serveur uniquement
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (!resendApiKey || resendApiKey.startsWith('MY_')) {
    console.error('[VENARY Contact] RESEND_API_KEY manquante ou non configurée.');
    sendContactError(res, 503, lang, 'SERVICE_UNAVAILABLE');
    return;
  }

  const contactEmail =
    process.env.CONTACT_EMAIL?.trim() || 'leonardovenary@gmail.com';
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || 'VENARY <onboarding@resend.dev>';

  const receivedAt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Europe/Paris',
  }).format(new Date());

  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeProjectType = escapeHtml(projectType);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const safeReceivedAt = escapeHtml(receivedAt);
  const visitorLanguage = lang === 'en' ? 'Anglais (EN)' : 'Français (FR)';

  const textContent = [
    'Nouvelle demande de contact – VENARY',
    '====================================',
    `Nom du visiteur : ${fullName}`,
    `Adresse e-mail : ${email}`,
    `Type de projet : ${projectType}`,
    `Langue du site : ${visitorLanguage}`,
    `Date et heure de réception : ${receivedAt}`,
    '',
    'Message complet :',
    '----------------',
    message,
  ].join('\n');

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
  <body style="margin:0;padding:24px;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111113;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #e4e4e7;">
      <tr>
        <td style="background-color:#D91E2A;padding:24px 28px;">
          <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#fecaca;font-weight:600;">VENARY · Formulaire de contact</p>
          <h1 style="margin:6px 0 0;font-size:20px;line-height:1.3;color:#ffffff;font-weight:700;">Nouvelle demande de contact – VENARY</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:13px;color:#71717a;width:180px;">Nom du visiteur</td>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:14px;color:#111113;font-weight:600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:13px;color:#71717a;">Adresse e-mail</td>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:14px;color:#D91E2A;font-weight:600;">
                <a href="mailto:${safeEmail}" style="color:#D91E2A;text-decoration:none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:13px;color:#71717a;">Type de projet</td>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:14px;color:#111113;font-weight:600;">${safeProjectType}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:13px;color:#71717a;">Date de réception</td>
              <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:14px;color:#3f3f46;">${safeReceivedAt}</td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <p style="margin:0 0 8px;font-size:13px;color:#71717a;font-weight:600;">Message complet</p>
            <div style="padding:16px;background-color:#fafafa;border:1px solid #e4e4e7;font-size:14px;line-height:1.65;color:#18181b;">
              ${safeMessage}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background-color:#111113;color:#a1a1aa;font-size:12px;">
          Répondez directement à cet e-mail pour contacter ${safeName} (${safeEmail}).
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: email,
      subject: 'Nouvelle demande de contact – VENARY',
      text: textContent,
      html: htmlContent,
    });

    if (error || !data?.id) {
      const internalMsg = error ? extractServerErrorDetail(error) : 'Réponse vide';
      console.error('[VENARY Contact] Erreur Resend :', internalMsg);
      sendContactError(res, 502, lang, 'RESEND_ERROR');
      return;
    }

    let deliveryStatus = 'queued';
    try {
      const statusLookup = await resend.emails.get(data.id);
      if (statusLookup.data?.last_event) {
        deliveryStatus = statusLookup.data.last_event;
      }
    } catch {
      // La vérification immédiate du statut peut être indisponible juste après la mise en file
    }

    if (deliveryStatus === 'bounced' || deliveryStatus === 'canceled') {
      console.error(
        `[VENARY Contact] Échec de livraison Resend (${deliveryStatus}) pour ID ${data.id}`,
      );
      sendContactError(res, 502, lang, 'RESEND_ERROR');
      return;
    }

    console.info(
      `[VENARY Contact] E-mail transmis à ${contactEmail} (ID: ${data.id}, statut: ${deliveryStatus})`,
    );

    writeJson(res, 200, {
      success: true,
      messageId: data.id,
      deliveryStatus,
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error(
      '[VENARY Contact] Exception serveur :',
      extractServerErrorDetail(err),
    );
    sendContactError(res, 500, lang, 'SERVER_ERROR');
  }
}

export default async function handler(
  req: ServerlessIncomingMessage,
  res: ServerResponse,
): Promise<void> {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');

  const fallbackLang = resolveAcceptLanguage(req);

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    sendContactError(res, 405, fallbackLang, 'METHOD_NOT_ALLOWED');
    return;
  }

  let parsedBody: unknown;
  try {
    parsedBody = await parseJsonBody(req);
  } catch (err) {
    if (err instanceof RangeError) {
      sendContactError(res, 413, fallbackLang, 'INVALID_JSON');
      return;
    }
    sendContactError(res, 400, fallbackLang, 'INVALID_JSON');
    return;
  }

  const clientIp = resolveClientIp(req);
  await processContactSubmission(parsedBody, clientIp, res);
}
