const STORAGE_KEY = "recruitpro_clients";

const INITIAL_CLIENTS = [
  {
    id: "1",
    name: "TechCorp Solutions",
    code: "TC-001",
    type: "enterprise",
    industry: "Information Technology",
    company_size: "1001-5000",
    hq_country: "United States",
    email: "contact@techcorp.com",
    phone: "+1 555-0123",
    website: "https://techcorp.com",
    logo_url: "",
    account_tier: "strategic",
    contract_start_date: "2025-01-01",
    contract_end_date: "2026-01-01",
    notes: "Top enterprise client.",
    organization_id: "1",
    is_active: true,
    created_at: "2025-06-15T10:30:00.000Z"
  }
];

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
  async getClients() {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLIENTS));
      return INITIAL_CLIENTS;
    }
    return JSON.parse(stored);
  },

  async createClient(payload) {
    await delay();
    const list = await this.getClients();
    const newClient = { id: String(Date.now()), ...payload, created_at: new Date().toISOString() };
    list.unshift(newClient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newClient;
  },

  async updateClient(id, payload) {
    await delay();
    const list = await this.getClients();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Client not found.`);
    list[index] = { ...list[index], ...payload, updated_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[index];
  },

  async deleteClient(id) {
    await delay();
    const list = await this.getClients();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.filter(item => item.id !== id)));
    return true;
  }
};
