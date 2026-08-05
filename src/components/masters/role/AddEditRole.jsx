import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { X, Save } from "lucide-react";
import { Button, Input, Label, Dropdown, Textarea } from "../../ui";
import { roleService } from "../../../services/roleService";

export default function AddEditRole({ isOpen, onClose, onSuccess, roleToEdit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    organizationId: 0,
    name: "",
    code: "",
    description: "",
    isSystem: true
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (roleToEdit) {
        setFormValues({
          organizationId: roleToEdit.organizationId || 0,
          name: roleToEdit.name || "",
          code: roleToEdit.code || "",
          description: roleToEdit.description || "",
          isSystem: roleToEdit.isSystem !== undefined ? roleToEdit.isSystem : (roleToEdit.is_system !== undefined ? roleToEdit.is_system : true),
        });
      } else {
        setFormValues({
          organizationId: 0,
          name: "",
          code: "",
          description: "",
          isSystem: true
        });
      }
      setFormErrors({});
    }
  }, [isOpen, roleToEdit]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name || e.target.id;
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value
    }));
    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleToggleSystem = (e) => {
    setFormValues(prev => ({
        ...prev,
        isSystem: e.target.value === "true"
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "Name is required.";
    if (!formValues.code.trim()) errors.code = "Code is required.";
    if (!formValues.description.trim()) errors.description = "Description is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const payload = { ...formValues };
      
      // If we have local mock mapping, mapping camelCase to snake_case might be needed for the mock, 
      // but we will send exactly what was requested.
      
      if (roleToEdit) {
        await roleService.updateRole(roleToEdit.id || roleToEdit.roleId, payload);
        toast.success(`Role updated successfully!`);
      } else {
        await roleService.createRole(payload);
        toast.success(`Role created successfully!`);
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save role.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md z-10 flex flex-col relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <p className="text-lg font-bold text-brand-500">
            {roleToEdit ? "Edit Role" : "Add Role"}
          </p>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            
            
              <Input 
                label="Role Name" 
                name="name" 
                required 
                placeholder="e.g. Hiring Manager" 
                value={formValues.name} 
                onChange={handleInputChange} 
                error={formErrors.name}
              />
             
            
            
           
              <Input 
                label="Code" 
                name="code" 
                required 
                placeholder="e.g. hiring_manager" 
                value={formValues.code} 
                onChange={handleInputChange} 
                error={formErrors.code}
              />
             
            
            
            
              <Textarea 
                label="Description"
                name="description" 
                value={formValues.description} 
                onChange={handleInputChange} 
                rows="3" 
                required
                error={formErrors.description}
                placeholder="Briefly describe this role's purpose..." 
              />
            
            
            <div className={roleToEdit && formValues.isSystem ? "pointer-events-none opacity-60" : ""}>
              <Dropdown
                label="System Role"
                options={[
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" }
                ]}
                direction="up"
                value={String(formValues.isSystem)}
                onChange={(val) => handleToggleSystem({ target: { value: val }})}
              />
            </div>
            
          </div>
          
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
            <Button 
              variant="outline" 
              onClick={onClose} 
              type="button"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-brand-500 text-white hover:bg-brand-600 border-none shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1.5">
                  <span className="animate-spin border-2 border-white/20 border-t-white rounded-full w-3.5 h-3.5"></span>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-1.5 cursor-pointer">
                  <Save size={15} strokeWidth={2.5} />
                  {roleToEdit ? "Update Role" : "Create Role"}
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
