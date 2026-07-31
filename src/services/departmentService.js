import api from "./api";

export const departmentService = {
  async getDepartments() {
    try {
      const response = await api.get('/v1/Department');
      return response.data;
    } catch (error) {
      console.error("API Error in getDepartments:", error);
      throw error;
    }
  },

  async getDepartmentById(id) {
    try {
      const response = await api.get(`/v1/Department/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API Error in getDepartmentById for id ${id}:`, error);
      throw error;
    }
  },

  async createDepartment(payload) {
    try {
      const response = await api.post('/v1/Department', payload);
      return response.data;
    } catch (error) {
      console.error("API Error in createDepartment:", error);
      throw error;
    }
  },

  async updateDepartment(id, payload) {
    try {
      const response = await api.put(`/v1/Department/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`API Error in updateDepartment for id ${id}:`, error);
      throw error;
    }
  },

  async deleteDepartment(id) {
    try {
      const response = await api.delete(`/v1/Department/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API Error in deleteDepartment for id ${id}:`, error);
      throw error;
    }
  }

};
