import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AccessTokenPayload {
  sub: number;
  email: string;
}

export const signAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiry as any,
  });
};

export const signRefreshToken = (payload: { sub: number }): string => {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiry as any,
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.jwt.accessSecret) as unknown as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): { sub: number } => {
  return jwt.verify(token, env.jwt.refreshSecret) as unknown as { sub: number };
};
