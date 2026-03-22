import { db } from '../../config/db';

export const checkDbConnection = async (): Promise<boolean> => {
  try {
    await db.raw('SELECT 1');
    return true;
  } catch (err) {
    console.error('MySQL Connection Check Failed:', err);
    return false;
  }
};
