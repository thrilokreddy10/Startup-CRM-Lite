import api from './api';

export const leadService = {
  /**
   * Fetch all leads with optional filtering and pagination
   * @param {Object} params - { status, search, page, limit, sortBy, sortOrder }
   * @returns {Promise<Object>} response.data
   */
  getLeads: async (params = {}) => {
    const response = await api.get('/api/leads', { params });
    return response.data;
  },

  /**
   * Create a new lead
   * @param {Object} leadData 
   * @returns {Promise<Object>} response.data
   */
  createLead: async (leadData) => {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  },

  /**
   * Update a lead fully
   * @param {string} id 
   * @param {Object} leadData 
   * @returns {Promise<Object>} response.data
   */
  updateLead: async (id, leadData) => {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Update only a lead's status
   * @param {string} id 
   * @param {string} status 
   * @returns {Promise<Object>} response.data
   */
  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a lead by ID
   * @param {string} id 
   * @returns {Promise<Object>} response.data
   */
  deleteLead: async (id) => {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },

  /**
   * Get aggregated lead statistics
   * @returns {Promise<Object>} response.data
   */
  getLeadStats: async () => {
    const response = await api.get('/api/leads/stats/summary');
    return response.data;
  },

  /**
   * Get monthly lead statistics for charts
   * @returns {Promise<Object>} response.data
   */
  getMonthlyStats: async () => {
    const response = await api.get('/api/leads/stats/monthly');
    return response.data;
  }
};
