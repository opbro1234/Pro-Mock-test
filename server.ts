import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

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
