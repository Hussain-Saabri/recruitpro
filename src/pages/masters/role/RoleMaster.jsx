import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  ShieldAlert,
  Plus,
  Edit2,
  Trash2,
  Download,
  RefreshCw,
  Search,
  X
} from "lucide-react";
;
import { roleService } from "../../../services/roleService";
import { Button, Input, Label, Badge, DataTable } from "../../../components/ui";

export default function RoleMaster() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Form states matching rp.role schema
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    description: "",
    is_system: false,
    is_active: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleRefresh = () => {
    fetchRoles();
    toast.success("Roles list refreshed");
  };

  const openModal = (role = null) => {
    setFormErrors({});
    if (role) {
      setEditingRole(role);
      setFormValues({ ...role });
    } else {
      setEditingRole(null);
      setFormValues({
        name: "",
        code: "",
        description: "",
        is_system: false,
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value
    }));
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "Name is required.";
    if (!formValues.code.trim()) errors.code = "Code slug is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { 
        ...formValues,
        is_system: String(formValues.is_system) === "true",
        is_active: String(formValues.is_active) === "true",
    };
    console.log("PAYLOAD (rp.role):", JSON.stringify(payload, null, 2));

    try {
      setIsSubmitting(true);
      if (editingRole) {
        const updated = await roleService.updateRole(editingRole.id, payload);
        toast.success(`Role "${updated.name}" updated!`);
      } else {
        const created = await roleService.createRole(payload);
        toast.success(`Role "${created.name}" created!`);
      }
      closeModal();
      fetchRoles();
    } catch (error) {
      toast.error(error.message || "Failed to save role.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (role) => {
    if (role.is_system) {
        toast.error("System roles cannot be deleted.");
        return;
    }
    if (window.confirm(`Delete role "${role.name}"?`)) {
      try {
        await roleService.deleteRole(role.id);
        toast.success(`Role deleted!`);
        fetchRoles();
      } catch (error) {
        toast.error(error.message || "Failed to delete.");
      }
    }
  };

  const filteredRoles = roles.filter((r) => {
    const query = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(query) || r.code.toLowerCase().includes(query);
  });

  const columns = React.useMemo(() => [
    {
      accessorKey: "name",
      header: "Role Name",
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800">{role.name}</span>
            {role.description && <span className="text-[10px] text-slate-400 font-normal mt-0.5">{role.description}</span>}
          </div>
        );
      }
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <span className="bg-slate-100 px-2 py-1 rounded font-mono text-[11px]">{row.original.code}</span>
    },
    {
      accessorKey: "is_system",
      header: "System Role",
      cell: ({ row }) => (
        row.original.is_system ? <Badge variant="primary">Yes</Badge> : <Badge variant="gray">No</Badge>
      )
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = String(row.original.is_active) === "true";
        return <Badge variant={isActive ? "success" : "gray"}>{isActive ? "Active" : "Inactive"}</Badge>;
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => openModal(role)} className="w-7 h-7 rounded border border-gray-200 hover:bg-brand-50 hover:text-brand-500 flex items-center justify-center transition-all"><Edit2 size={12} /></button>
            <button onClick={() => handleDelete(role)} disabled={role.is_system} className="w-7 h-7 rounded border border-gray-200 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"><Trash2 size={12} /></button>
          </div>
        );
      }
    }
  ], [searchQuery]);

  return (
    <div className="flex flex-col space-y-6 w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 m-0 leading-tight">Role Settings</h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Manage access roles for the system.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported!")} leftIcon={<Download size={13} />}>Export</Button>
          <Button variant="primary" size="sm" onClick={() => openModal()} leftIcon={<Plus size={14} />}>Add Role</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden w-full">
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search roles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-1.5 w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500 transition-all duration-200" />
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} leftIcon={<RefreshCw size={12} />}>Refresh</Button>
        </div>

        <DataTable columns={columns} data={filteredRoles} loading={loading} emptyMessage="No roles found." />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full z-10 border border-gray-100 flex flex-col relative">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-sm font-bold">{editingRole ? "Edit Role" : "Add Role"}</h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center"><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-4 space-y-4">
                <Input label="Name" id="name" required placeholder="e.g. Finance Manager" value={formValues.name} onChange={handleInputChange} error={formErrors.name} />
                <Input label="Code Slug" id="code" required placeholder="e.g. finance_mgr" value={formValues.code} onChange={handleInputChange} error={formErrors.code} />
                <div className="text-left">
                  <Label htmlFor="description">Description</Label>
                  <textarea id="description" value={formValues.description} onChange={handleInputChange} rows="2" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500" placeholder="Role description..." />
                </div>
                
                <div className="flex gap-4">
                    <div className="text-left flex-1">
                    <Label htmlFor="is_system">System Role</Label>
                    <select id="is_system" value={formValues.is_system} onChange={handleInputChange} disabled={editingRole?.is_system} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500 disabled:bg-slate-50">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    </div>
                    <div className="text-left flex-1">
                    <Label htmlFor="is_active">Status</Label>
                    <select id="is_active" value={formValues.is_active} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                    </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 p-4 border-t border-gray-100 bg-slate-50">
                <Button variant="outline" size="sm" onClick={closeModal} type="button">Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>{editingRole ? "Update" : "Save"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
