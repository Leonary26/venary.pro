import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractServerErrorDetail,
  processContactSubmission,
  sendContactError,
} from './api/contact.ts';
import { getHealthPayload } from './api/health.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

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
  app.use(
    (
      err: unknown,
      req: Request,
      res: Response,
      next: (e?: unknown) => void,
    ) => {
      if (err instanceof SyntaxError && 'body' in err) {
        const acceptLang = req.get('accept-language')?.toLowerCase() ?? '';
        const fallbackLang = acceptLang.startsWith('en') ? 'en' : 'fr';
        sendContactError(res, 400, fallbackLang, 'INVALID_JSON');
        return;
      }
      next(err);
    },
  );

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
    res.json(getHealthPayload());
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    await processContactSubmission(req.body, clientIp, res);
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
        res.status(404).json({
          success: false,
          code: 'NOT_FOUND',
          error: 'Endpoint introuvable.',
        });
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

  app.use(
    (
      err: unknown,
      req: Request,
      res: Response,
      next: (e?: unknown) => void,
    ) => {
      if (res.headersSent) {
        next(err);
        return;
      }
      if (req.path.startsWith('/api/')) {
        console.error(
          '[VENARY API] Erreur non interceptée :',
          extractServerErrorDetail(err),
        );
        const acceptLang = req.get('accept-language')?.toLowerCase() ?? '';
        const fallbackLang = acceptLang.startsWith('en') ? 'en' : 'fr';
        sendContactError(res, 500, fallbackLang, 'SERVER_ERROR');
        return;
      }
      next(err);
    },
  );

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VENARY server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start VENARY server:', err);
  process.exit(1);
});
