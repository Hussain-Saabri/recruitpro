import api from "./api";

export const recruiterService = {
  async getRecruiters() {
    try {
      const response = await api.get("/v1/Recruiter");
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    } catch (error) {
      console.error("API Error in getRecruiters:", error);
      throw error;
    }
  },

  async getRecruiterById(id) {
    try {
      const response = await api.get(`/v1/Recruiter/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API Error in getRecruiterById for id ${id}:`, error);
      throw error;
    }
  },

  async createRecruiter(payload) {
    try {
      const response = await api.post("/v1/Recruiter", payload);
      return response.data;
    } catch (error) {
      console.error("API Error in createRecruiter:", error);
      throw error;
    }
  },

  async updateRecruiter(id, payload) {
    try {
      const response = await api.put(`/v1/Recruiter/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`API Error in updateRecruiter for id ${id}:`, error);
      throw error;
    }
  },

  async deleteRecruiter(id) {
    try {
      const response = await api.delete(`/v1/Recruiter/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API Error in deleteRecruiter for id ${id}:`, error);
      throw error;
    }
  },
};
