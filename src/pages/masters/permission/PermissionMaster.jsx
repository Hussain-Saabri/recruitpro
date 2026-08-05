import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import { Table, Plus, Shield } from "lucide-react";
import { permissionService } from "../../../services/permissionService";
import SearchBar from "../../../components/shared/SearchBar";
import DeleteModal from "../../../components/shared/DeleteModal";
import { Button } from "../../../components/ui";
import DataTable from "../../../components/shared/DataTable";
import { usePermissionColumns } from "../../../components/masters/permission/PermissionColumns";
import AddEditPermission from "../../../components/masters/permission/AddEditPermission";

export default function PermissionMaster() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissionToDelete, setPermissionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const data = await permissionService.getPermissions();
      setPermissions(data);
    } catch (error) {
      toast.error("Failed to load permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleEdit = (permission) => {
    setPermissionToEdit(permission);
    setIsModalOpen(true);
  };

  const handleDelete = (permission) => {
    setPermissionToDelete(permission);
  };

  const confirmDelete = async () => {
    if (!permissionToDelete) return;
    setIsDeleting(true);
    try {
      await permissionService.deletePermission(permissionToDelete.permissionId || permissionToDelete.id);
      toast.success(`Permission deleted successfully!`);
      fetchPermissions();
      setPermissionToDelete(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPermissions = permissions.filter((p) => {
    const query = searchQuery.toLowerCase();
    const resource = p.resource || "";
    const action = p.action || "";
    const description = p.description || "";
    return (
      resource.toLowerCase().includes(query) || 
      action.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query)
    );
  });

  const columns = usePermissionColumns({ handleEdit, handleDelete });

  return (
    <div className="flex flex-col space-y-4 w-full font-sans text-left">
      <PageHeader 
        title="Manage Permissions" 
        subtitle="Manage system permissions and access levels."  
      />         
      
      <div className="flex items-center justify-end sm:hidden w-full">
        <SearchBar 
          placeholder="Search by Resource or Action..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="w-full"
        />
      </div>

      <div className="w-full bg-white rounded-[8px] border border-gray-300 overflow-hidden mt-0.5 relative flex flex-col">
        <DataTable 
          loading={loading}
          title="Permissions"
          icon={<Shield size={16} />}
          data={filteredPermissions} 
          columns={columns}
          rightActions={
            <>
              <div className="hidden sm:block">
                <SearchBar 
                  placeholder="Search by Resource or Action..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>
              <Button 
                variant="primary" 
                className="bg-brand-500 hover:bg-brand-600 border-none text-white cursor-pointer h-[26px] sm:h-[35px] px-2.5 sm:px-3 flex items-center gap-1 sm:gap-1.5 rounded-[4px] sm:rounded-[5px] transition-colors w-full sm:w-auto shadow-sm" 
                onClick={() => {
                  setPermissionToEdit(null);
                  setIsModalOpen(true);
                }} 
              >
                <Plus size={13} strokeWidth={2.5} />
                <span className="font-semibold text-[11px] sm:text-[12.5px]">Add Permission</span>
              </Button>
            </>
          }
        />
      </div>

      <AddEditPermission
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPermissions}
        permissionToEdit={permissionToEdit}
      />

      <DeleteModal 
        isOpen={!!permissionToDelete}
        onClose={() => setPermissionToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Permission"
        itemType="permission"
        itemName={`${permissionToDelete?.resource}:${permissionToDelete?.action}`}
      />
    </div>
  );
}
