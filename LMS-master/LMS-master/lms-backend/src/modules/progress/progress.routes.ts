import { Router } from 'express';
import { requireAuth } from '../../middleware/authMiddleware';
import * as controller from './progress.controller';

const router = Router();
router.get('/subjects/:subjectId', requireAuth, controller.getSubjectProgress);
router.get('/videos/:videoId', requireAuth, controller.getVideoProgress);
router.post('/videos/:videoId', requireAuth, controller.upsertVideoProgress);

export default router;
