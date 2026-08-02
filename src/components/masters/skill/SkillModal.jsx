import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { X, Brain } from "lucide-react";
import { Input, Button} from "../../ui";
import { skillService } from "../../../services/skillService";

export default function SkillModal({ isOpen, onClose, onSuccess, skillToEdit }) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    category: "",
    isActive: true,
  });
  
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (skillToEdit) {
        setFormValues({
          name: skillToEdit.name || "",
          category: skillToEdit.category || "",
          isActive: skillToEdit.isActive !== false,
        });
      } else {
        setFormValues({
          name: "",
          category: "",
          isActive: true,
        });
      }
      setFormErrors({});
    }
  }, [isOpen, skillToEdit]);

  const handleChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) {
      errors.name = "Skill name is required.";
    }
    if (!formValues.category.trim()) {
      errors.category = "Category is required.";
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
        name: formValues.name.trim(),
        category: formValues.category.trim(),
        isActive: String(formValues.isActive) === "true",
      };

      if (skillToEdit) {
        const hasChanges = 
          payload.name !== (skillToEdit.name || "") ||
          payload.category !== (skillToEdit.category || "") ||
          payload.isActive !== (skillToEdit.isActive !== false);

        if (!hasChanges) {
          toast.info("No changes made");
          onClose();
          setLoading(false);
          return;
        }

        await skillService.updateSkill(skillToEdit.skillId || skillToEdit.id, payload);
        toast.success("Skill updated successfully!");
      } else {
        
        await skillService.addSkill(payload);
        toast.success("Skill added successfully!");
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

  const hasChanges = skillToEdit 
    ? formValues.name.trim() !== (skillToEdit.name || "") ||
      formValues.category.trim() !== (skillToEdit.category || "") ||
      formValues.isActive !== (skillToEdit.isActive !== false)
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
              <Brain size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-500">
                {skillToEdit ? "Edit Skill" : "Add New Skill"}
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
                label="Skill Name"
                placeholder="e.g. React.js, AWS, Marketing"
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={formErrors.name}
                required
              />
              
            </div>
            
            <div>
              <Input 
                label="Category"
                placeholder="e.g. Frontend, Cloud, Soft Skill"
                value={formValues.category}
                onChange={(e) => handleChange("category", e.target.value)}
                error={formErrors.category}
                required
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
              {skillToEdit ? "Update" : "Add Skill"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
