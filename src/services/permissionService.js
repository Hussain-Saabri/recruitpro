import api from "./api";

export const permissionService = {
  async getPermissions() {
    try {
      const response = await api.get('/v1/Permission');
      return response.data;
    } catch (error) {
      console.error("API Error fetching permissions:", error);
      throw error;
    }
  },

  async createPermission(payload) {
    try {
      const response = await api.post('/v1/Permission', payload);
      return response.data;
    } catch (error) {
      console.error("API Error creating permission:", error);
      throw error;
    }
  },

  async updatePermission(id, payload) {
    try {
      const response = await api.put(`/v1/Permission/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("API Error updating permission:", error);
      throw error;
    }
  },

  async deletePermission(id) {
    try {
      const response = await api.delete(`/v1/Permission/${id}`);
      return response.data;
    } catch (error) {
      console.error("API Error deleting permission:", error);
      throw error;
    }
  }
};
