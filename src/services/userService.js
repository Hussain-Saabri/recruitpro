import api from './api';

export const userService = {
  async getUsers() {
    try {
      const response = await api.get('/api/v1/User');
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async createUser(payload) {
    try {
      console.log("payload which is getting send",payload);
      
      const response = await api.post('/v1/User', payload);
     
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUser(id, payload) {
    try {
      const response = await api.put(`/api/v1/User/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const response = await api.delete(`/api/v1/User/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
};
