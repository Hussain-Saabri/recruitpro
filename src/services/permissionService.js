const PERM_STORAGE_KEY = "recruitpro_permissions";
const ROLE_PERM_STORAGE_KEY = "recruitpro_role_permissions";

const INITIAL_PERMISSIONS = [
  { id: "1", resource: "user", action: "create", description: "Create users", is_active: true, created_at: "2025-06-15T10:30:00.000Z" },
  { id: "2", resource: "user", action: "read", description: "Read users", is_active: true, created_at: "2025-06-15T10:30:00.000Z" },
  { id: "3", resource: "user", action: "update", description: "Update users", is_active: true, created_at: "2025-06-15T10:30:00.000Z" },
  { id: "4", resource: "user", action: "delete", description: "Delete users", is_active: true, created_at: "2025-06-15T10:30:00.000Z" },
  { id: "5", resource: "jd", action: "create", description: "Create JDs", is_active: true, created_at: "2025-06-15T10:30:00.000Z" }
];

const INITIAL_ROLE_PERMISSIONS = [
  { id: "1", role_id: "1", permission_id: "1", is_active: true, created_at: "2025-06-15T10:30:00.000Z" },
  { id: "2", role_id: "1", permission_id: "2", is_active: true, created_at: "2025-06-15T10:30:00.000Z" }
];

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const permissionService = {
  // --- rp.permission ---
  async getPermissions() {
    await delay();
    const stored = localStorage.getItem(PERM_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(PERM_STORAGE_KEY, JSON.stringify(INITIAL_PERMISSIONS));
      return INITIAL_PERMISSIONS;
    }
    return JSON.parse(stored);
  },

  async createPermission(payload) {
    await delay();
    const list = await this.getPermissions();
    const newPerm = { id: String(Date.now()), ...payload, created_at: new Date().toISOString() };
    list.unshift(newPerm);
    localStorage.setItem(PERM_STORAGE_KEY, JSON.stringify(list));
    return newPerm;
  },

  async updatePermission(id, payload) {
    await delay();
    const list = await this.getPermissions();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Permission not found.`);
    list[index] = { ...list[index], ...payload, updated_at: new Date().toISOString() };
    localStorage.setItem(PERM_STORAGE_KEY, JSON.stringify(list));
    return list[index];
  },

  async deletePermission(id) {
    await delay();
    const list = await this.getPermissions();
    localStorage.setItem(PERM_STORAGE_KEY, JSON.stringify(list.filter(item => item.id !== id)));
    // Also cleanup role_permissions
    const mappings = await this.getRolePermissions();
    localStorage.setItem(ROLE_PERM_STORAGE_KEY, JSON.stringify(mappings.filter(m => m.permission_id !== id)));
    return true;
  },

  // --- rp.role_permission ---
  async getRolePermissions() {
    await delay();
    const stored = localStorage.getItem(ROLE_PERM_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(ROLE_PERM_STORAGE_KEY, JSON.stringify(INITIAL_ROLE_PERMISSIONS));
      return INITIAL_ROLE_PERMISSIONS;
    }
    return JSON.parse(stored);
  },

  async setRolePermissions(role_id, permission_ids) {
    await delay();
    let mappings = await this.getRolePermissions();
    // Remove old mappings for this role
    mappings = mappings.filter(m => m.role_id !== role_id);
    // Add new mappings
    const newMappings = permission_ids.map(pid => ({
        id: String(Date.now() + Math.random()),
        role_id,
        permission_id: pid,
        is_active: true,
        created_at: new Date().toISOString()
    }));
    mappings.push(...newMappings);
    localStorage.setItem(ROLE_PERM_STORAGE_KEY, JSON.stringify(mappings));
    return newMappings;
  }
};
