import app from './app';
import { env } from './config/env';
import { db } from './config/db';

const start = async () => {
  try {
    // Check MySQL connection
    await db.raw('SELECT 1');
    console.log('✅ MySQL connected (Knex)');

    app.listen(env.port, () => {
      console.log(`🚀 LMS Backend running on port ${env.port} [${env.nodeEnv}]`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

start();
