import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  Download,
  RefreshCw,
  Search,
  X,
  Check,
  Minus
} from "lucide-react";
;
import { permissionService } from "../../../services/permissionService";
import { roleService } from "../../../services/roleService";
import { Button, Input, Label, Badge } from "../../../components/ui";

export default function PermissionMaster() {
  
  // Data states
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleMappings, setRoleMappings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping state
  const [selectedRoleForMapping, setSelectedRoleForMapping] = useState("");
  const [mappedPermissionIds, setMappedPermissionIds] = useState([]);
  const [isSavingMapping, setIsSavingMapping] = useState(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const [perms, rols, mappings] = await Promise.all([
        permissionService.getPermissions(),
        roleService.getRoles(),
        permissionService.getRolePermissions()
      ]);
      setPermissions(perms);
      setRoles(rols);
      setRoleMappings(mappings);
      
      if (rols.length > 0 && !selectedRoleForMapping) {
          setSelectedRoleForMapping(rols[0].id);
      }
    } catch (error) {
      toast.error("Failed to load permissions data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update checkbox state when a new role is selected
  useEffect(() => {
      if (selectedRoleForMapping) {
          const mappedIds = roleMappings.filter(m => m.role_id === selectedRoleForMapping).map(m => m.permission_id);
          setMappedPermissionIds(mappedIds);
      }
  }, [selectedRoleForMapping, roleMappings]);

  const handleRefresh = () => {
    fetchData();
    toast.success("Data refreshed");
  };


  // --- ROLE MAPPING LOGIC ---
  const togglePermissionMapping = (permId) => {
      setMappedPermissionIds(prev => 
          prev.includes(permId) ? prev.filter(id => id !== permId) : [...prev, permId]
      );
  };

  const saveRoleMappings = async () => {
      if (!selectedRoleForMapping) return;
      try {
          setIsSavingMapping(true);
          await permissionService.setRolePermissions(selectedRoleForMapping, mappedPermissionIds);
          toast.success("Role permissions updated successfully!");
          fetchData(); // refresh mappings state
      } catch (error) {
          toast.error("Failed to update role permissions.");
      } finally {
          setIsSavingMapping(false);
      }
  };


  return (
    <div className="flex flex-col w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 m-0 leading-tight">Permission Settings</h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Configure system permissions and map them to roles.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={saveRoleMappings} isLoading={isSavingMapping}>Save Mappings</Button>
        </div>
      </div>

      {loading ? (
          <div className="text-center py-10 text-slate-400">Loading...</div>
      ) : (
          /* --- ROLE MAPPING UI --- */
          <div className="flex flex-col md:flex-row gap-6">
              {/* Role Selection Sidebar */}
              <div className="w-full md:w-64 shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-[500px]">
                  <div className="p-3 border-b border-gray-100 bg-slate-50 font-bold text-sm text-slate-800">Select Role</div>
                  <div className="overflow-y-auto flex-1">
                      {roles.map(role => (
                          <div 
                              key={role.id} 
                              onClick={() => setSelectedRoleForMapping(role.id)}
                              className={`p-3 border-b border-gray-50 cursor-pointer text-sm transition-colors ${selectedRoleForMapping === role.id ? "bg-brand-50 border-l-4 border-l-brand-500 text-brand-700 font-bold" : "hover:bg-slate-50 text-slate-600 font-medium"}`}
                          >
                              {role.name}
                          </div>
                      ))}
                  </div>
              </div>

              {/* Permissions Matrix */}
              <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-[500px] flex flex-col">
                  <div className="p-3 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-800">Assign Permissions</span>
                      <span className="text-xs text-slate-500">{mappedPermissionIds.length} assigned</span>
                  </div>
                  <div className="overflow-y-auto flex-1 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 content-start">
                      {permissions.map(perm => (
                          <label key={perm.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${mappedPermissionIds.includes(perm.id) ? "bg-brand-50/30 border-brand-200" : "bg-white border-slate-200 hover:border-brand-300"}`}>
                              <input 
                                  type="checkbox" 
                                  className="mt-0.5 w-4 h-4 text-brand-500 rounded border-gray-300 focus:ring-brand-500 cursor-pointer"
                                  checked={mappedPermissionIds.includes(perm.id)}
                                  onChange={() => togglePermissionMapping(perm.id)}
                              />
                              <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-800">{perm.resource}:{perm.action}</span>
                                  {perm.description && <span className="text-xs text-slate-500">{perm.description}</span>}
                              </div>
                          </label>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
