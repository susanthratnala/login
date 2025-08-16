import ApiService from '../services/api';

// Test endpoint connectivity
export const testEndpoints = async () => {
  const endpoints = [
    '/health',
    '/auth/login',
    '/auth/send-otp',
    '/auth/verify-otp',
    '/doctors',
    '/patients',
    '/upload'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`http://13.233.44.42/api/v1${endpoint}`);
      console.log(`${endpoint}: ${response.status}`);
    } catch (error) {
      console.log(`${endpoint}: ERROR - ${error.message}`);
    }
  }
};

// Get Swagger documentation
export const getSwaggerDocs = async () => {
  try {
    const response = await fetch('http://13.233.44.42/apidocs/swagger.json');
    const docs = await response.json();
    console.log('Available endpoints:', Object.keys(docs.paths));
    return docs;
  } catch (error) {
    console.error('Failed to get Swagger docs:', error);
  }
};