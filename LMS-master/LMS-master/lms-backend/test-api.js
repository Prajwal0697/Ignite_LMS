#!/usr/bin/env node
/**
 * LMS Application Test Script
 * Tests all major endpoints and functionality
 */

const API_BASE = 'http://localhost:5000/api';

const tests = [
  {
    name: 'Health Check',
    endpoint: '/health',
    method: 'GET',
    validate: (res) => res.status === 200 && res.data.status === 'ok'
  },
  {
    name: 'Get All Subjects',
    endpoint: '/subjects',
    method: 'GET',
    validate: (res) => res.status === 200 && Array.isArray(res.data.subjects)
  },
  {
    name: 'Register User',
    endpoint: '/auth/register',
    method: 'POST',
    data: { email: `test_${Date.now()}@lms.com`, password: 'Test1234!', name: 'Test User' },
    validate: (res) => res.status === 201 && res.data.accessToken
  },
  {
    name: 'Login User',
    endpoint: '/auth/login',
    method: 'POST',
    data: { email: 'test@lms.com', password: 'Test1234!' },
    validate: (res) => res.status === 200 && res.data.accessToken
  }
];

async function runTests() {
  console.log('🧪 Starting LMS Functionality Tests...\n');
  
  for (const test of tests) {
    try {
      const response = await fetch(`${API_BASE}${test.endpoint}`, {
        method: test.method,
        headers: { 'Content-Type': 'application/json' },
        body: test.data ? JSON.stringify(test.data) : undefined
      });
      
      const data = await response.json();
      const passed = test.validate({ status: response.status, data });
      
      console.log(`${passed ? '✅' : '❌'} ${test.name}`);
      if (!passed) {
        console.log(`   Status: ${response.status}`);
        console.log(`   Response:`, JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.log(`❌ ${test.name} - ERROR: ${error.message}`);
    }
  }
  
  console.log('\n✨ Tests complete!');
}

runTests().catch(console.error);
