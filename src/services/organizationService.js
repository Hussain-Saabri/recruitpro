export const organizationService = {
// Get Organisations 
  async getOrganizations() {
    try{
        const response = await fetch("/api/v1/Organization");
        const data = response.json();
        console.log("response from organsation",data);
        return data;
    }catch(error){
        console.error("API Error:", error);
        throw error;
    }
   
  },

  

  

  
 
};
