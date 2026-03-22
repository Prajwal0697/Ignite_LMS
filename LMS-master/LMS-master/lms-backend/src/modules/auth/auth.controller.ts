import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as authService from './auth.service';
import { REFRESH_COOKIE_NAME, refreshCookieOptions, clearCookieOptions } from '../../config/security';
import { AppError } from '../../middleware/errorHandler';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'ValidationError', details: errors.array() });
    }
    const { email, password, name } = req.body;
    const { accessToken, refreshToken } = await authService.register({ email, password, name });
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
    res.status(201).json({ accessToken });
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'ValidationError', details: errors.array() });
    }
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login({ email, password });
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
    res.json({ accessToken });
  } catch (err) { next(err); }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawToken = req.cookies[REFRESH_COOKIE_NAME];
    if (!rawToken) throw new AppError(401, 'No refresh token', 'NoRefreshToken');
    const { accessToken, refreshToken } = await authService.refresh(rawToken);
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
    res.json({ accessToken });
  } catch (err) { next(err); }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawToken = req.cookies[REFRESH_COOKIE_NAME];
    if (rawToken) await authService.logout(rawToken);
    res.clearCookie(REFRESH_COOKIE_NAME, clearCookieOptions);
    res.json({ message: 'Logged out successfully' });
  } catch (err) { next(err); }
};
