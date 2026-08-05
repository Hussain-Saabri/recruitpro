import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import { Plus, Users as UsersIcon } from "lucide-react";
import { userService } from "../../services/userService";
import { Button } from "../../components/ui";
import DataTable from "../../components/shared/DataTable";
import UserModal from "../../components/masters/users/UserModal";
import { useUserColumns } from "../../components/masters/users/UserColumns";
import SearchBar from "../../components/shared/SearchBar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      // Map mock data if it comes in snake_case
      const mappedData = (data || []).map(user => ({
        ...user,
        userId: user.id || user.userId,
        firstName: user.first_name || user.firstName,
        lastName: user.last_name || user.lastName,
        roleId: user.role_id !== undefined ? user.role_id : user.roleId,
        departmentId: user.department_id !== undefined ? user.department_id : user.departmentId,
        organizationId: user.organization_id !== undefined ? user.organization_id : user.organizationId,
        isActive: user.is_active !== undefined ? user.is_active : user.isActive,
      }));
      setUsers(mappedData);
    } catch (error) {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Delete user "${user.firstName} ${user.lastName}"?`)) {
      try {
        await userService.deleteUser(user.userId || user.id);
        toast.success(`User deleted!`);
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user.");
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
    const email = (u.email || "").toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const columns = useUserColumns({ openModal, handleDelete });

  return (
    <div className="flex flex-col space-y-2 w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Manage Users" />        
      </div>
      <div className="flex items-center justify-end sm:hidden w-full">
        <SearchBar 
          placeholder="Search by name or email..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full bg-white rounded-xl mt-2 border border-gray-300 overflow-hidden mt-0.5 relative min-h-[200px] flex flex-col">
        <DataTable 
          loading={loading}
          title="Users"
          icon={<UsersIcon size={16} />}
          rightActions={
            <>
              <div className="hidden sm:block">
                <SearchBar 
                  placeholder="Search by name or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="primary" 
                className="bg-brand-500 hover:bg-brand-600 border-none text-white cursor-pointer h-[26px] sm:h-[35px] px-2.5 sm:px-3 flex items-center gap-1 sm:gap-1.5 rounded-[4px] sm:rounded-[5px] transition-colors w-full sm:w-auto shadow-sm" 
                size="sm" 
                onClick={() => openModal()} 
              >
                <Plus size={16} /> 
                <span className="font-semibold text-[11px] sm:text-[12.5px]">Add User</span>
              </Button>
            </>
          }
          data={filteredUsers} 
          columns={columns} 
        />
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        editingUser={editingUser} 
        onSuccess={fetchUsers} 
      />
    </div>
  );
}
