const BASE_URL = 'http://13.233.44.42/api/v1';

class ApiService {
  constructor() {
    this.token = null;
  }

  setAuthToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (response.token || response.access_token) {
      this.setAuthToken(response.token || response.access_token);
    }
    return response;
  }

  async sendOTP(phoneNumber) {
    return this.request('/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: phoneNumber }),
    });
  }

  async verifyOTP(phoneNumber, otp) {
    return this.request('/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: phoneNumber, otp: otp }),
    });
  }

  async register(userData) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  async updateUser(userId, updateData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async getAllUsers() {
    return this.request('/users');
  }

  // File upload
  async uploadFile(file, fileType = 'document') {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type || 'application/pdf',
      name: file.name || 'document.pdf',
    });
    formData.append('type', fileType);

    return this.request('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }

  // Generic CRUD operations
  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();