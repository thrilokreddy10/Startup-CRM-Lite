import api from './api';

export const authService = {
  /**
   * Register a new user
   * @param {string} name 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} response.data
   */
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },

  /**
   * Log in an existing user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} response.data
   */
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  /**
   * Log out the current user (stateless)
   */
  logout: () => {
    localStorage.removeItem('crm-token');
  },

  /**
   * Get the current user's profile
   * @returns {Promise<Object>} response.data
   */
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  /**
   * Update the current user's profile
   * @param {Object} data 
   * @returns {Promise<Object>} response.data
   */
  updateProfile: async (data) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  }
};
