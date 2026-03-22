import { Router } from 'express';
import * as controller from './youtube.controller';

const router = Router();

router.get('/', controller.getVideos);

export default router;
