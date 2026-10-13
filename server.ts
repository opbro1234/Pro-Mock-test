import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { apiRouter } from './src/server/api.ts';
import { connectToMongoDB } from './src/server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints for Cloud Run container lifecycle probes
app.get(['/health', '/_health', '/api/health'], (_req, res) => {
  res.status(200).send('OK');
});

// Mount MongoDB Atlas API routes
app.use('/api', apiRouter);

// Fallback for unmatched API routes to ensure JSON 404 response
app.all('/api/*', (_req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Initialize MongoDB Atlas connection
connectToMongoDB().catch((err) => {
  console.warn('Initial MongoDB connection warning:', err?.message || err);
});

// Mount Vite middleware in development, or serve static dist in production
async function setupFrontend() {
  const distPath = path.join(__dirname, 'dist');
  const indexHtmlPath = path.join(distPath, 'index.html');
  const hasDist = fs.existsSync(indexHtmlPath);

  if (process.env.NODE_ENV === 'production' || hasDist) {
    app.use(express.static(distPath, { maxAge: '1h', etag: true }));
    app.get('*', (_req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn('Vite middleware initialization notice:', e);
      if (hasDist) {
        app.use(express.static(distPath));
        app.get('*', (_req, res) => {
          res.sendFile(indexHtmlPath);
        });
      }
    }
  }

  const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received: shutting down gracefully');
    server.close(() => {
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received: shutting down gracefully');
    server.close(() => {
      process.exit(0);
    });
  });
}

setupFrontend();
