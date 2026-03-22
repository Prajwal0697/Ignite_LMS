import dotenv from 'dotenv';
dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: required('DB_HOST'),
    port: parseInt(process.env.DB_PORT || '25503', 10),
    name: required('DB_NAME'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    ssl: process.env.DB_SSL === 'true',
  },
  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
    refreshSecret: required('JWT_REFRESH_SECRET'),
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '30d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN || 'localhost',
  },
  huggingface: {
    apiKey: process.env.HF_API_KEY || '',
  },
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || '',
  },
};
