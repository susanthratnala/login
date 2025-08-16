// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://13.233.44.42/api/v1',
  ENDPOINTS: {
    // Authentication
    LOGIN: '/auth/login',
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    REFRESH_TOKEN: '/auth/refresh',
    
    // Doctors
    DOCTORS: '/doctors',
    DOCTOR_PROFILE: (id) => `/doctors/${id}`,
    
    // Patients
    PATIENTS: '/patients',
    PATIENT_PROFILE: (id) => `/patients/${id}`,
    
    // Appointments
    APPOINTMENTS: '/appointments',
    APPOINTMENT_DETAIL: (id) => `/appointments/${id}`,
    
    // File Upload
    UPLOAD: '/upload',
    
    // Medical Records
    MEDICAL_RECORDS: '/medical-records',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export default API_CONFIG;