import { Router } from 'express';
import * as controller from './auth.controller';
import { registerValidator, loginValidator } from './auth.validator';

const router = Router();

router.post('/register', registerValidator, controller.register);
router.post('/login', loginValidator, controller.login);
router.post('/refresh', controller.refreshToken);
router.post('/logout', controller.logout);

export default router;
