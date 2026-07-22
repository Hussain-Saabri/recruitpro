const STORAGE_KEY = "recruitpro_recruiters";

const INITIAL_RECRUITERS = [
  {
    id: "1",
    name: "Tech Hunters Agency",
    type: "agency",
    email: "contact@techhunters.com",
    phone: "+91 9876543210",
    mobile: "+91 9876543211",
    website: "https://techhunters.com",
    address: "123 Tech Street",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    postal_code: "560001",
    primary_contact_name: "Sarah Recruiter",
    primary_contact_email: "sarah@techhunters.com",
    primary_contact_mobile: "+91 9876543212",
    primary_contact_phone: "",
    specialization: "IT, Engineering",
    commission_rate: 8.33,
    contract_start_date: "2025-01-01",
    contract_end_date: "2026-01-01",
    notes: "Top vendor for IT roles.",
    organization_id: "1",
    is_active: true,
    created_at: "2025-06-15T10:30:00.000Z"
  }
];

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const recruiterService = {
  async getRecruiters() {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RECRUITERS));
      return INITIAL_RECRUITERS;
    }
    return JSON.parse(stored);
  },

  async createRecruiter(payload) {
    await delay();
    const list = await this.getRecruiters();
    const newRecruiter = { id: String(Date.now()), ...payload, created_at: new Date().toISOString() };
    list.unshift(newRecruiter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newRecruiter;
  },

  async updateRecruiter(id, payload) {
    await delay();
    const list = await this.getRecruiters();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Recruiter not found.`);
    list[index] = { ...list[index], ...payload, updated_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[index];
  },

  async deleteRecruiter(id) {
    await delay();
    const list = await this.getRecruiters();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.filter(item => item.id !== id)));
    return true;
  }
};
