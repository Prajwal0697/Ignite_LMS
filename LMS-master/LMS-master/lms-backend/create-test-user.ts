import { db } from './src/config/db';
import bcrypt from 'bcryptjs';

async function createTestUser() {
  console.log('🔧 Creating test user...\n');
  
  try {
    // Check if user already exists
    const existing = await db('users').where('email', 'test@lms.com').first();
    
    if (existing) {
      console.log('✅ Test user already exists:', existing.email);
      console.log('   Password: Test1234!\n');
      return;
    }
    
    const email = 'test@lms.com';
    const password = 'Test1234!';
    const name = 'Test Student';
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const [userId] = await db('users').insert({
      email,
      password_hash: passwordHash,
      name
    });
    
    console.log('✅ Test user created successfully!');
    console.log('   Email:', email);
    console.log('   Password:', password);
    console.log('   User ID:', userId);
    console.log('\nYou can now login with these credentials.\n');
    
  } catch (error: any) {
    console.error('❌ Error creating test user:', error.message);
  } finally {
    await db.destroy();
  }
}

createTestUser();
