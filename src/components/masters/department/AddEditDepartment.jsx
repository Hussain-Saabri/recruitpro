import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { departmentService } from "../../../services/departmentService";
import { Button, Input, Dropdown, Textarea } from "../../ui";

export default function AddEditDepartment({ isOpen, onClose, editingDepartment, onSuccess }) {
  const [formValues, setFormValues] = useState({
    name: "",
    description: ""
  });
  const [initialValues, setInitialValues] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingDepartment) {
        const fetchFreshData = async () => {
          setIsFetching(true);
          try {
            const freshData = await departmentService.getDepartmentById(editingDepartment.departmentId);
            const newValues = {
              name: freshData.name || freshData.Name || freshData.departmentName || freshData.DepartmentName || "",
              description: freshData.description || freshData.Description || "",
              id: freshData.departmentId
            };
            setFormValues(newValues);
            setInitialValues(newValues);
          } catch (error) {
            toast.error("Failed to fetch latest department data.");
            // Fallback to table data if fetch fails
            const fallbackValues = {
              name: editingDepartment.name || editingDepartment.Name || editingDepartment.departmentName || editingDepartment.DepartmentName || "",
              description: editingDepartment.description || editingDepartment.Description || "",
              id: editingDepartment.departmentId
            };
            setFormValues(fallbackValues);
            setInitialValues(fallbackValues);
          } finally {
            setIsFetching(false);
          }
        };
        fetchFreshData();
      } else {
        const defaultValues = { name: "", description: "" };
        setFormValues(defaultValues);
        setInitialValues(defaultValues);
        setIsFetching(false);
      }
      setFormErrors({});
    }
  }, [isOpen, editingDepartment]);

  const hasChanges = initialValues 
    ? formValues.name !== initialValues.name || formValues.description !== initialValues.description 
    : true;

  const handleFieldChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }));

    if (field === "name") {
      if (value && (!/^[a-zA-Z\s]+$/.test(value) || value.trim().length < 2)) {
        setFormErrors((prev) => ({ ...prev, name: "Only Letters, Minium 2 chracter required" }));
      } else {
        setFormErrors((prev) => ({ ...prev, name: "" }));
      }
    } else if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  

  const validateForm = () => {
    const errors = {};
    if (!formValues.name?.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formValues.name) || formValues.name.trim().length < 2) {
      errors.name = "Only Letters, Minium 2 chracter required";
    }
    
    if (!formValues.description?.trim()) errors.description = "Description is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formValues };

    try {
      setIsSubmitting(true);
      if (editingDepartment) {
        const updated = await departmentService.updateDepartment(editingDepartment.departmentId, payload);
        toast.success(`Department "${updated.name}" updated!`);
      } else {
        const created = await departmentService.createDepartment(payload);
        toast.success(`Department "${created.name}" created!`);
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save department.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full z-10 border border-gray-100 flex flex-col relative max-h-[90vh]">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 shrink-0">
          <p className="text-xl font-bold text-brand-500">{editingDepartment ? "Edit Department" : "Add Department"} </p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-red-500 hover:text-white rounded-md cursor-pointer transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col overflow-y-auto">
          {isFetching ? (
            <div className="p-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div className="col-span-full">
                <div className="h-3.5 bg-slate-200/60 rounded-md animate-pulse w-14 mb-2"></div>
                <div className="h-[40px] bg-slate-100/80 rounded-[5px] animate-pulse w-full border border-slate-200/50"></div>
              </div>
              <div className="col-span-full">
                <div className="h-3.5 bg-slate-200/60 rounded-md animate-pulse w-24 mb-2"></div>
                <div className="h-[90px] bg-slate-100/80 rounded-[5px] animate-pulse w-full border border-slate-200/50"></div>
              </div>
            </div>
          ) : (
            <div className="p-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            
            <div className="col-span-full">
              <Input 
                label="Name"  
                required 
                placeholder="e.g. Human Resources" 
                value={formValues.name} 
                onChange={(e) => handleFieldChange("name", e.target.value)} 
                error={formErrors.name} 
              />
            </div>
            
            <div className="col-span-full mt-1">
              <Textarea 
                label="Description"  
                required 
                error={formErrors.description} 
                value={formValues.description} 
                onChange={(e) => handleFieldChange("description", e.target.value)} 
                rows="3" 
                placeholder="Add description..." 
              />
            </div>
          </div>
          )}
          
          <div className="flex justify-end gap-3 p-6 pt-4 bg-white rounded-b-lg mt-auto sticky bottom-0 z-20 border-t border-gray-100 shrink-0">
            <Button variant="outline" className="px-6 py-4 cursor-pointer text-black transition-colors rounded-[5px]" onClick={onClose} type="button">Cancel</Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="px-6 py-4 cursor-pointer bg-brand-500 text-white hover:bg-brand-600 transition-colors rounded-[5px]" 
              isLoading={isSubmitting} 
              disabled={isFetching || (editingDepartment && !hasChanges)}
            >
              {editingDepartment ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
