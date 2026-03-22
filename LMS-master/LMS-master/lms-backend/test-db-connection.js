require('dotenv').config();

const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('🔍 Testing MySQL connection...');

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    console.log('✅ Connection successful!');

    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Query result:', rows);

    await connection.end();
    console.log('Connection closed');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error code:', error.code);
  }
}

testConnection();
