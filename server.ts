import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HEADER_INJECTION_PATTERN = /[\r\n]/;

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

interface ContactRequestBody {
  fullName?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown; // Champ honeypot anti-spam
  formStartedAt?: unknown;
  locale?: unknown;
}

const SERVER_MESSAGES = {
  fr: {
    rateLimit:
      'Trop de messages envoyés récemment. Veuillez patienter quelques minutes avant de réessayer.',
    spam: 'Requête refusée par la protection anti-spam.',
    tooFast: 'Soumission trop rapide détectée. Veuillez réessayer.',
    invalidName: 'Le nom complet doit contenir entre 2 et 120 caractères.',
    invalidEmail: 'Veuillez fournir une adresse e-mail valide.',
    invalidProjectType: 'Veuillez sélectionner un type de projet valide.',
    invalidMessage: 'Le message doit contenir entre 15 et 5000 caractères.',
    missingKey:
      "Le service d'envoi d'e-mails n'est pas encore configuré sur le serveur (RESEND_API_KEY manquante).",
    resendError:
      "L'envoi du message via Resend a échoué. Vérifiez la configuration de l'expéditeur.",
    serverError:
      "Une erreur technique est survenue lors de l'envoi de votre message. Veuillez réessayer.",
  },
  en: {
    rateLimit:
      'Too many messages sent recently. Please wait a few minutes before trying again.',
    spam: 'Request rejected by anti-spam protection.',
    tooFast: 'Submission detected as too fast. Please try again.',
    invalidName: 'Full name must be between 2 and 120 characters.',
    invalidEmail: 'Please provide a valid email address.',
    invalidProjectType: 'Please select a valid project type.',
    invalidMessage: 'Message must be between 15 and 5000 characters.',
    missingKey:
      'The email delivery service is not configured yet on the server (missing RESEND_API_KEY).',
    resendError:
      'Failed to send email via Resend. Please check sender configuration.',
    serverError:
      'A technical error occurred while sending your message. Please try again.',
  },
};

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // En-têtes de sécurité HTTP (sans bloquer l'iframe d'aperçu)
  app.use((_req: Request, res: Response, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()',
    );
    next();
  });

  app.use(express.json({ limit: '32kb' }));

  const resolveOrigin = (req: Request): string => {
    const envUrl = process.env.APP_URL?.trim();
    if (envUrl && /^https?:\/\//i.test(envUrl) && !envUrl.includes('MY_APP_URL')) {
      return envUrl.replace(/\/+$/, '');
    }
    const host = req.get('host');
    return host ? `${req.protocol}://${host}` : '';
  };

  app.get('/robots.txt', (req: Request, res: Response) => {
    const origin = resolveOrigin(req);
    const sitemapUrl = origin ? `${origin}/sitemap.xml` : '/sitemap.xml';
    res.type('text/plain; charset=utf-8');
    res.send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        '',
        `Sitemap: ${sitemapUrl}`,
      ].join('\n'),
    );
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const origin = resolveOrigin(req);
    const baseUrl = origin || '';
    const lastMod = new Date().toISOString().split('T')[0];
    res.type('application/xml; charset=utf-8');
    res.send(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
  </url>
</urlset>`,
    );
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      mailConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const body = (req.body ?? {}) as ContactRequestBody;
    const lang = body.locale === 'en' ? 'en' : 'fr';
    const msg = SERVER_MESSAGES[lang];

    if (isRateLimited(clientIp)) {
      res.status(429).json({
        error: msg.rateLimit,
      });
      return;
    }

    // 1. Contrôle anti-spam (champ piège honeypot + délai minimal humain)
    const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
    if (honeypot.length > 0) {
      res.status(400).json({
        error: msg.spam,
      });
      return;
    }

    if (typeof body.formStartedAt === 'number' && Number.isFinite(body.formStartedAt)) {
      const elapsedMs = Date.now() - body.formStartedAt;
      if (elapsedMs >= 0 && elapsedMs < 1200) {
        res.status(400).json({
          error: msg.tooFast,
        });
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
      res.status(400).json({
        error: msg.invalidName,
      });
      return;
    }

    if (
      !email ||
      email.length > 254 ||
      !EMAIL_PATTERN.test(email) ||
      HEADER_INJECTION_PATTERN.test(email)
    ) {
      res.status(400).json({
        error: msg.invalidEmail,
      });
      return;
    }

    if (projectType.length < 2 || projectType.length > 120) {
      res.status(400).json({
        error: msg.invalidProjectType,
      });
      return;
    }

    if (message.length < 15 || message.length > 5000) {
      res.status(400).json({
        error: msg.invalidMessage,
      });
      return;
    }

    // 3. Vérification de la configuration Resend côté serveur uniquement
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey || resendApiKey.startsWith('MY_')) {
      console.error('[VENARY Contact] RESEND_API_KEY manquante ou non configurée.');
      res.status(503).json({
        error: msg.missingKey,
      });
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
        console.error('[VENARY Contact] Erreur Resend :', error?.message || 'Réponse vide');
        res.status(502).json({
          error: error?.message || msg.resendError,
        });
        return;
      }

      res.status(200).json({
        success: true,
        messageId: data.id,
        submittedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[VENARY Contact] Exception serveur :', err);
      res.status(500).json({
        error: msg.serverError,
      });
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(
      express.static(distDir, {
        maxAge: '7d',
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      }),
    );
    app.get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'Endpoint introuvable.' });
        return;
      }
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        const isRoot = req.path === '/' || req.path === '/index.html';
        res.status(isRoot ? 200 : 404).sendFile(indexPath);
      } else {
        res.status(404).send('Application non compilée (dist/index.html manquant).');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VENARY server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start VENARY server:', err);
  process.exit(1);
});
