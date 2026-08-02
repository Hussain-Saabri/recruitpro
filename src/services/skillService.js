import api from "./api";

export const skillService = {
  getSkills: async () => {
    try {
      console.log("Inside the Skill Service");
      const response = await api.get('/v1/Skill');
      console.log("response", response);
      const data = response.data;
      console.log("response from skill", data);
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  addSkill: async (skillData) => {
    try {
      console.log("Skill Data", skillData);
   
      const response = await api.post('/v1/Skill', skillData);
      console.log("response from the api",response);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  updateSkill: async (skillId, skillData) => {
    try {
      const response = await api.put(`/v1/Skill/${skillId}`, skillData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  deleteSkill: async (skillId) => {
    try {
      const response = await api.delete(`/v1/Skill/${skillId}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};
