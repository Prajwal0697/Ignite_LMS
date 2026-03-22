import { Router } from 'express';
import { requireAuth, optionalAuth } from '../../middleware/authMiddleware';
import * as controller from './subject.controller';
import * as videoController from '../videos/video.controller';

const router = Router();

router.get('/', optionalAuth, controller.listSubjects);
router.get('/:subjectId', optionalAuth, controller.getSubject);
router.get('/:subjectId/videos', requireAuth, controller.getSubjectVideos);
router.get('/:subjectId/tree', requireAuth, controller.getSubjectTree);
router.get('/:subjectId/first-video', requireAuth, videoController.getFirstVideo);

export default router;
