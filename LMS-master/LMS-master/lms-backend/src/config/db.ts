import knex from 'knex';
import { env } from './env';

export const db = knex({
  client: 'mysql2',
  connection: {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    ssl: {
      rejectUnauthorized: false,  // Required for Aiven self-signed certificates
    },
  },
  pool: { min: 0, max: 10 },
});

// Helper for raw queries
export const query = (text: string, params?: any[]) => db.raw(text, params || []);
