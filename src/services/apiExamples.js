// Example usage of API service in React Native components

import ApiService from '../services/api';

// Example 1: Login with credentials
const handleLogin = async (email, password) => {
  try {
    const response = await ApiService.login({ email, password });
    console.log('Login successful:', response);
    // Token is automatically set in ApiService
    return response;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};

// Example 2: Send OTP
const sendOTP = async (phoneNumber) => {
  try {
    const response = await ApiService.sendOTP(phoneNumber);
    console.log('OTP sent:', response);
    return response;
  } catch (error) {
    console.error('Failed to send OTP:', error.message);
    throw error;
  }
};

// Example 3: Verify OTP
const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await ApiService.verifyOTP(phoneNumber, otp);
    console.log('OTP verified:', response);
    return response;
  } catch (error) {
    console.error('OTP verification failed:', error.message);
    throw error;
  }
};

// Example 4: Register doctor
const registerDoctor = async (doctorData) => {
  try {
    const response = await ApiService.registerDoctor({
      name: doctorData.name,
      email: doctorData.email,
      phone: doctorData.phone,
      specialization: doctorData.specialization,
      license_number: doctorData.licenseNumber,
      experience_years: doctorData.experienceYears,
    });
    console.log('Doctor registered:', response);
    return response;
  } catch (error) {
    console.error('Doctor registration failed:', error.message);
    throw error;
  }
};

// Example 5: Upload document
const uploadDocument = async (file, documentType) => {
  try {
    const response = await ApiService.uploadDocument(file, documentType);
    console.log('Document uploaded:', response);
    return response;
  } catch (error) {
    console.error('Document upload failed:', error.message);
    throw error;
  }
};

// Example 6: Get doctor profile
const getDoctorProfile = async (doctorId) => {
  try {
    const response = await ApiService.getDoctorProfile(doctorId);
    console.log('Doctor profile:', response);
    return response;
  } catch (error) {
    console.error('Failed to get doctor profile:', error.message);
    throw error;
  }
};

// Example 7: Generic API calls
const makeGenericCall = async () => {
  try {
    // GET request
    const getData = await ApiService.get('/some-endpoint');
    
    // POST request
    const postData = await ApiService.post('/some-endpoint', { key: 'value' });
    
    // PUT request
    const putData = await ApiService.put('/some-endpoint/1', { key: 'updated_value' });
    
    // DELETE request
    const deleteData = await ApiService.delete('/some-endpoint/1');
    
    return { getData, postData, putData, deleteData };
  } catch (error) {
    console.error('API call failed:', error.message);
    throw error;
  }
};

// Example 8: Using in React component with state management
const ExampleComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await ApiService.get('/doctors');
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      {data && data.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

export {
  handleLogin,
  sendOTP,
  verifyOTP,
  registerDoctor,
  uploadDocument,
  getDoctorProfile,
  makeGenericCall,
  ExampleComponent,
};