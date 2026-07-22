const STORAGE_KEY = "recruitpro_roles";

const INITIAL_ROLES = [
  {
    id: "0",
    name: "Super Admin",
    code: "superadmin",
    description: "System owner with access to manage organizations and everything",
    is_system: true,
    is_active: true,
    organization_id: null,
    created_at: "2025-06-15T10:30:00.000Z"
  },
  {
    id: "1",
    name: "Admin",
    code: "admin",
    description: "Full access to all modules and configurations",
    is_system: true,
    is_active: true,
    organization_id: "1",
    created_at: "2025-06-15T10:30:00.000Z"
  },
  {
    id: "2",
    name: "Recruiter",
    code: "recruiter",
    description: "Access to candidate sourcing and JD viewing",
    is_system: true,
    is_active: true,
    organization_id: "1",
    created_at: "2025-06-15T10:30:00.000Z"
  }
];

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const roleService = {
  async getRoles() {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ROLES));
      return INITIAL_ROLES;
    }
    return JSON.parse(stored);
  },

  async createRole(payload) {
    await delay();
    const list = await this.getRoles();
    const newRole = { id: String(Date.now()), ...payload, created_at: new Date().toISOString() };
    list.unshift(newRole);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newRole;
  },

  async updateRole(id, payload) {
    await delay();
    const list = await this.getRoles();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Role not found.`);
    list[index] = { ...list[index], ...payload, updated_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[index];
  },

  async deleteRole(id) {
    await delay();
    const list = await this.getRoles();
    const roleToDelete = list.find(r => r.id === id);
    if (roleToDelete?.is_system) {
        throw new Error("Cannot delete system roles.");
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.filter(item => item.id !== id)));
    return true;
  }
};
