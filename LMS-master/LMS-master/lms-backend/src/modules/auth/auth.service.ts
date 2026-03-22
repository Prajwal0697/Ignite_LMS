import { db } from '../../config/db';
import { hashPassword, verifyPassword } from '../../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AppError } from '../../middleware/errorHandler';

interface RegisterInput { email: string; password: string; name: string; }
interface LoginInput { email: string; password: string; }

const issueTokens = async (userId: number, email: string) => {
  const accessToken = signAccessToken({ sub: userId, email });
  const refreshToken = signRefreshToken({ sub: userId });

  const tokenHash = Buffer.from(refreshToken).toString('base64');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  await db('refresh_tokens').insert({
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  return { accessToken, refreshToken };
};

export const register = async (input: RegisterInput) => {
  const existing = await db('users').where('email', input.email).first();
  if (existing) throw new AppError(409, 'Email already registered', 'DuplicateEmail');

  const passwordHash = await hashPassword(input.password);
  const [userId] = await db('users').insert({
    email: input.email,
    password_hash: passwordHash,
    name: input.name,
  });

  return issueTokens(userId, input.email);
};

export const login = async (input: LoginInput) => {
  const user = await db('users').where('email', input.email).first();
  if (!user) throw new AppError(401, 'Invalid credentials', 'InvalidCredentials');

  const valid = await verifyPassword(user.password_hash, input.password);
  if (!valid) throw new AppError(401, 'Invalid credentials', 'InvalidCredentials');

  return issueTokens(user.id, user.email);
};

export const refresh = async (rawToken: string) => {
  let payload: { sub: number };
  try {
    payload = verifyRefreshToken(rawToken);
  } catch {
    throw new AppError(401, 'Invalid refresh token', 'InvalidRefreshToken');
  }

  const tokenHash = Buffer.from(rawToken).toString('base64');
  const row = await db('refresh_tokens')
    .where({ user_id: payload.sub, token_hash: tokenHash })
    .whereNull('revoked_at')
    .where('expires_at', '>', new Date())
    .first();

  if (!row) throw new AppError(401, 'Refresh token revoked or expired', 'TokenRevoked');

  const user = await db('users').where('id', payload.sub).first();
  if (!user) throw new AppError(401, 'User not found', 'UserNotFound');

  await db('refresh_tokens').where('id', row.id).update({ revoked_at: new Date() });
  return issueTokens(user.id, user.email);
};

export const logout = async (rawToken: string) => {
  try {
    const tokenHash = Buffer.from(rawToken).toString('base64');
    await db('refresh_tokens').where('token_hash', tokenHash).update({ revoked_at: new Date() });
  } catch {
    // silently ignore
  }
};
