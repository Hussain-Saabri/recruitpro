import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import { Table, Plus } from "lucide-react";
import { roleService } from "../../../services/roleService";
import SearchBar from "../../../components/shared/SearchBar";
import DeleteModal from "../../../components/shared/DeleteModal";
import { Button } from "../../../components/ui";
import DataTable from "../../../components/shared/DataTable";
import { useRoleColumns } from "../../../components/masters/role/RoleColumns";
import RoleModal from "../../../components/masters/role/RoleModal";

export default function RoleMaster() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await roleService.getRoles();
      setRoles(data);
    } catch (error) {
      toast.error("Failed to load roles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleEdit = (role) => {
    setRoleToEdit(role);
    setIsModalOpen(true);
  };

  const handleDelete = (role) => {
    if (role.is_system) {
      toast.error("System roles cannot be deleted.");
      return;
    }
    setRoleToDelete(role);
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;
    setIsDeleting(true);
    try {
      await roleService.deleteRole(roleToDelete.id || roleToDelete.roleId);
      toast.success(`Role deleted!`);
      fetchRoles();
      setRoleToDelete(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredRoles = roles.filter((r) => {
    const query = searchQuery.toLowerCase();
    const roleName = r.name || r.Name || "";
    const roleCode = r.code || r.Code || "";
    return roleName.toLowerCase().includes(query) || roleCode.toLowerCase().includes(query);
  });

  const columns = useRoleColumns({ handleEdit, handleDelete });

  return (
    <div className="flex flex-col space-y-4 w-full font-sans text-left">
      <PageHeader 
        title="Manage Roles" 
        subtitle="Manage access roles for the system."  
      />         
      
      <div className="flex items-center justify-end sm:hidden w-full">
        <SearchBar 
          placeholder="Search by Role Name or Code..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="w-full"
        />
      </div>

      <div className="w-full bg-white rounded-xl border border-gray-300 overflow-hidden mt-0.5 relative flex flex-col">
        <DataTable 
          loading={loading}
          title="Roles"
          icon={<Table size={16} />}
          data={filteredRoles} 
          columns={columns}
          rightActions={
            <>
              <div className="hidden sm:block">
                <SearchBar 
                  placeholder="Search by Role Name or Code..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>
              <Button 
                variant="primary" 
                className="bg-brand-500 hover:bg-brand-600 border-none text-white cursor-pointer h-[26px] sm:h-[30px] px-2.5 sm:px-3 flex items-center gap-1 sm:gap-1.5 rounded-[4px] sm:rounded-[5px] transition-colors w-full sm:w-auto shadow-sm" 
                onClick={() => {
                  setRoleToEdit(null);
                  setIsModalOpen(true);
                }} 
              >
                <Plus size={13} strokeWidth={2.5} />
                <span className="font-semibold text-[11px] sm:text-[12.5px]">Add Role</span>
              </Button>
            </>
          }
        />
      </div>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchRoles}
        roleToEdit={roleToEdit}
      />

      <DeleteModal 
        isOpen={!!roleToDelete}
        onClose={() => setRoleToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Role"
        itemType="role"
        itemName={roleToDelete?.name || roleToDelete?.Name}
      />
    </div>
  );
}
