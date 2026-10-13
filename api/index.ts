import express from 'express';
import { apiRouter } from '../src/server/api.ts';
import { connectToMongoDB } from '../src/server/db.ts';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints
app.get(['/health', '/_health', '/api/health'], (_req, res) => {
  res.status(200).send('OK');
});

// Mount MongoDB Atlas API routes for both rewritten and direct paths
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Initialize MongoDB Atlas connection for serverless invocation
connectToMongoDB().catch((err) => {
  console.warn('Vercel Serverless MongoDB Atlas connection notice:', err?.message || err);
});

export default app;
