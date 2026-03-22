import { CookieOptions } from 'express';
import { env } from './env';

export const REFRESH_COOKIE_NAME = 'lms_refresh';

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'strict',
  domain: env.cookie.domain,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  path: '/api/auth',
};

export const clearCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'strict',
  domain: env.cookie.domain,
  path: '/api/auth',
};
