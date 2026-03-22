import * as repo from './health.repository';

export const checkHealth = async () => {
  const dbConnected = await repo.checkDbConnection();
  if (dbConnected) {
    return { status: 'ok', db: 'connected', timestamp: new Date().toISOString() };
  } else {
    return { status: 'error', db: 'disconnected' };
  }
};
