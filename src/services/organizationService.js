
import api from "./api";


export const organizationService = {
  // Get Organisations 
  async getOrganizations() {
    try {
      console.log("Inside the Org Service");
      const response = await api.get('/v1/Organization');
      console.log("response", response);
      const data = response.data;
      console.log("response from organsation", data);
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },







};
