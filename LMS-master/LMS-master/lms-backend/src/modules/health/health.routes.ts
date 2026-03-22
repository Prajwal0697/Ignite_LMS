import { Router } from 'express';
import * as controller from './health.controller';

const router = Router();
router.get('/', controller.checkHealth);

export default router;
