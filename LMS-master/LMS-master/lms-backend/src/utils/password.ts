import bcrypt from 'bcryptjs';

export const hashPassword = async (plain: string): Promise<string> => {
  return bcrypt.hash(plain, 10);
};

export const verifyPassword = async (hash: string, plain: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
