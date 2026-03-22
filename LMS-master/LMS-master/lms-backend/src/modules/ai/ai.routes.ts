import { Router } from 'express';
import * as controller from './ai.controller';
import { requireAuth } from '../../middleware/authMiddleware';

const router = Router();

// ── All AI features should be authenticated ───────────────────
router.use(requireAuth);

router.post('/chat', controller.chatWithAI);
router.post('/', controller.chatWithAI); // Alias for /api/chat
router.get('/history', controller.getChatHistory);
router.post('/summarize', controller.summarizeContent);
router.post('/generate-quiz', controller.generateQuiz);
router.get('/recommend', controller.recommendCourses);

export default router;
