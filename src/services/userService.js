const STORAGE_KEY = "recruitpro_users";

const INITIAL_USERS = [
  {
    id: "0",
    first_name: "Super",
    last_name: "Admin",
    email: "superadmin@recruitpro.com",
    role_id: "0", // Ref to rp.role (Super Admin)
    organization_id: null,
    department_id: null,
    phone: "+91 0000000000",
    is_active: true,
    created_at: "2025-06-15T10:30:00.000Z"
  },
  {
    id: "1",
    first_name: "Mike",
    last_name: "Admin",
    email: "admin@company.com",
    role_id: "1", // Ref to rp.role
    organization_id: "1",
    department_id: "1",
    phone: "+91 9876543210",
    is_active: true,
    created_at: "2025-06-15T10:30:00.000Z"
  }
];

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getUsers() {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(stored);
  },

  async createUser(payload) {
    await delay();
    const list = await this.getUsers();
    const newUser = { id: String(Date.now()), ...payload, created_at: new Date().toISOString() };
    list.unshift(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newUser;
  },

  async updateUser(id, payload) {
    await delay();
    const list = await this.getUsers();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`User not found.`);
    list[index] = { ...list[index], ...payload, updated_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[index];
  },

  async deleteUser(id) {
    await delay();
    const list = await this.getUsers();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.filter(item => item.id !== id)));
    return true;
  }
};
