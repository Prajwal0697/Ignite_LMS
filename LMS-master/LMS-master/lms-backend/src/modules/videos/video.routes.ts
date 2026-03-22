import { Router } from 'express';
import { requireAuth } from '../../middleware/authMiddleware';
import * as videoController from './video.controller';

const router = Router();
router.get('/:videoId', requireAuth, videoController.getVideo);

export default router;
