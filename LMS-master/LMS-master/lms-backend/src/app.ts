import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import subjectRoutes from './modules/subjects/subject.routes';
import videoRoutes from './modules/videos/video.routes';
import progressRoutes from './modules/progress/progress.routes';
import healthRoutes from './modules/health/health.routes';
import aiRoutes from './modules/ai/ai.routes';
import youtubeRoutes from './modules/youtube/youtube.routes';

const app = express();

// ── Core middleware ──────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3003',
    env.cors.origin,
    // Allow all Vercel deployments
    /\.vercel\.app$/,
    // Allow all Render deployments
    /\.onrender\.com$/,
    // Allow custom domains
    'https://ignite-lms.vercel.app',
    'https://www.ignite-lms.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// ── Root route ───────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ 
    message: 'LMS Backend running successfully',
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv
  });
});

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', aiRoutes); // Alias for simpler frontend calls
app.use('/api/youtube', youtubeRoutes);

// 404
app.use((_req, res) => res.status(404).json({ error: 'NotFound', message: 'Route not found' }));

// Error handler (must be last)
app.use(errorHandler);

export default app;
