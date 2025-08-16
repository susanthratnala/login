import ApiService from '../services/api';

export const testApiConnection = async () => {
  try {
    // Test basic connectivity
    const response = await fetch('http://13.233.44.42/api/v1/health');
    console.log('API Health Check:', response.status);
    return true;
  } catch (error) {
    console.error('API Connection Failed:', error);
    return false;
  }
};

export const testSendOTP = async (phoneNumber) => {
  try {
    const response = await ApiService.sendOTP(phoneNumber);
    console.log('OTP Response:', response);
    return response;
  } catch (error) {
    console.error('OTP Error:', error);
    throw error;
  }
};