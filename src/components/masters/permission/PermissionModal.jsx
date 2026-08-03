import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { X, Shield, List, PlusCircle, Edit2, Trash2 } from "lucide-react";
import { Input, Button, Textarea, Dropdown } from "../../ui";
import { permissionService } from "../../../services/permissionService";

export default function PermissionModal({ isOpen, onClose, onSuccess, permissionToEdit }) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    resource: "",
    action: "",
    description: "",
    isActive: true,
  });
  
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (permissionToEdit) {
        setFormValues({
          resource: permissionToEdit.resource || "",
          action: permissionToEdit.action || "",
          description: permissionToEdit.description || "",
          isActive: permissionToEdit.isActive !== undefined ? permissionToEdit.isActive : (permissionToEdit.is_active !== undefined ? permissionToEdit.is_active : true),
        });
      } else {
        setFormValues({
          resource: "",
          action: "",
          description: "",
          isActive: true,
        });
      }
      setFormErrors({});
    }
  }, [isOpen, permissionToEdit]);

  const handleChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.resource.trim()) {
      errors.resource = "Resource is required.";
    }
    if (!formValues.action.trim()) {
      errors.action = "Action is required.";
    }
    if (!formValues.description.trim()) {
      errors.description = "Description is required.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        resource: formValues.resource.trim(),
        action: formValues.action.trim(),
        description: formValues.description.trim(),
        isActive: String(formValues.isActive) === "true",
      };

      if (permissionToEdit) {
        const hasChanges = 
          payload.resource !== (permissionToEdit.resource || "") ||
          payload.action !== (permissionToEdit.action || "") ||
          payload.description !== (permissionToEdit.description || "") ||
          payload.isActive !== (permissionToEdit.isActive !== undefined ? permissionToEdit.isActive : permissionToEdit.is_active);

        if (!hasChanges) {
          toast.info("No changes made");
          onClose();
          setLoading(false);
          return;
        }

        await permissionService.updatePermission(permissionToEdit.permissionId || permissionToEdit.id, payload);
        toast.success("Permission updated successfully!");
      } else {
        await permissionService.createPermission(payload);
        toast.success("Permission added successfully!");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const hasChanges = permissionToEdit 
    ? formValues.resource.trim() !== (permissionToEdit.resource || "") ||
      formValues.action.trim() !== (permissionToEdit.action || "") ||
      formValues.description.trim() !== (permissionToEdit.description || "") ||
      formValues.isActive !== (permissionToEdit.isActive !== undefined ? permissionToEdit.isActive : permissionToEdit.is_active !== false)
    : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="text-brand-600">
              <Shield size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-500">
                {permissionToEdit ? "Edit Permission" : "Add New Permission"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-red-600 rounded-[8px] transition-colors cursor-pointer"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            
            <div>
              <Input 
                label="Resource"
                placeholder="e.g. activity_log, user, jd"
                value={formValues.resource}
                onChange={(e) => handleChange("resource", e.target.value)}
                error={formErrors.resource}
                required
              />
            </div>
            
            <div>
              <Dropdown 
                label="Action"
                options={[
                  { label: "List", value: "list", icon: <List size={14} className="text-blue-500" /> },
                  { label: "Create", value: "create", icon: <PlusCircle size={14} className="text-emerald-500" /> },
                  { label: "Update", value: "update", icon: <Edit2 size={14} className="text-amber-500" /> },
                  { label: "Delete", value: "delete", icon: <Trash2 size={14} className="text-rose-500" /> }
                ]}
                value={formValues.action}
                onChange={(val) => handleChange("action", val)}
              />
            </div>

            <div>
              <Textarea 
                label="Description"
                placeholder="e.g. List activity log entries"
                value={formValues.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={formErrors.description}
                required
                rows={3}
              />
            </div>

           
           
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 bg-slate-50/50 mt-auto">
            <Button 
              type="button"
              variant="outline" 
              onClick={onClose}
              disabled={loading}
              className="h-9 px-4 text-[13px] cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="primary" 
              disabled={loading || !hasChanges}
              className="h-9 px-6 cursor-pointer text-[13px] bg-brand-500 hover:bg-brand-600 border-none text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {permissionToEdit ? "Update" : "Add Permission"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
