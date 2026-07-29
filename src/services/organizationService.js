
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

  //Create Organisations
  async createOrganisation(payload) {
    try {
      console.log("Organisation Data", payload)
      const response = await api.post('/v1/Organization', payload);
      console.log("response", response);
      const data = response.data;
      console.log("response from organsation", data);
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }









};
