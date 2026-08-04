import React, { useState, useEffect } from "react";
import { Input, Button, Label, Badge, Dropdown } from "../../ui";
import { UserPlus, X, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { roleService } from "../../../services/roleService";
import { departmentService } from "../../../services/departmentService";
import { useAuthStore } from "../../../store/useAuthStore";
import { userService } from "../../../services/userService";

export default function UserModal({ isOpen, onClose, editingUser, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",
    isActive: true,
    roleId: "",
    departmentId: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Fetch roles and departments
      const fetchData = async () => {
        try {
          const fetchedRoles = await roleService.getRoles();
          const fetchedDepts = await departmentService.getDepartments();
          setRoles(fetchedRoles || []);
          setDepartments(fetchedDepts || []);
        } catch (error) {
          console.error("Failed to fetch roles or departments", error);
        }
      };
      fetchData();

      if (editingUser) {
        setFormData({
          firstName: editingUser.firstName || "",
          lastName: editingUser.lastName || "",
          email: editingUser.email || "",
          phone: editingUser.phone || "",
          password: "",
          confirmPassword: "",
          avatarUrl: editingUser.avatarUrl || editingUser.avatar_url || "",
          isActive: editingUser.isActive !== false && editingUser.is_active !== false,
          roleId: editingUser.roleId || editingUser.role_id || "",
          departmentId: editingUser.departmentId || editingUser.department_id || ""
        });
      } else {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          avatarUrl: "",
          isActive: true,
          roleId: "",
          departmentId: ""
        });
      }
    }
  }, [editingUser, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNext = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    
    if (!editingUser) {
      if (!formData.password) {
        errors.password = "Password is required";
      }
      if (formData.password && formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else if (formData.password && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!formData.roleId) {
      errors.roleId = "Role is required";
    }
    if (!formData.departmentId) {
      errors.departmentId = "Department is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        passwordHash: formData.password,
        avatarUrl: formData.avatarUrl,
        roleId: formData.roleId,
        departmentId: formData.departmentId,
        organizationId: 1
      };
      
      if (editingUser) {
        const id = editingUser.userId || editingUser.user_id || editingUser.id;
        await userService.updateUser(id, payload);
        toast.success("User updated successfully");
      } else {
        await userService.createUser(payload);
        toast.success("User created successfully");
      }
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="text-brand-600">
              <UserPlus size={16} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-500">
                {editingUser ? "Edit User" : "Add New User"} 
                <span className="text-slate-400 font-normal ml-2 text-xs">Step {step} of 2</span>
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
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
              
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>First Name <span className="text-red-500">*</span></Label>
                  <Input
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    error={formErrors.firstName}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label>Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    placeholder="e.g. Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    error={formErrors.lastName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Email <span className="text-red-500">*</span></Label>
                  <Input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={formErrors.email}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input
                    placeholder="e.g. +1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    error={formErrors.phone}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Password {!editingUser && <span className="text-red-500">*</span>}</Label>
                  <Input
                    type="password"
                    placeholder={editingUser ? "Leave blank to keep current" : "••••••••"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    error={formErrors.password}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm Password {!editingUser && <span className="text-red-500">*</span>}</Label>
                  <Input
                    type="password"
                    placeholder={editingUser ? "Leave blank to keep current" : "••••••••"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    error={formErrors.confirmPassword}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 min-h-[350px]">
              

              <div className="space-y-1.5">
                <Label>Avatar URL</Label>
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatarUrl}
                  onChange={(e) => handleChange("avatarUrl", e.target.value)}
                  error={formErrors.avatarUrl}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Dropdown
                    label={<>Role <span className="text-red-500">*</span></>}
                    options={roles.map(r => ({ label: r.name, value: String(r.roleId || r.id) }))}
                    value={String(formData.roleId)}
                    onChange={(val) => handleChange("roleId", val ? parseInt(val) : "")}
                    error={formErrors.roleId}
                  />
                </div>
                <div className="space-y-1.5">
                  <Dropdown
                    label={<>Department <span className="text-red-500">*</span></>}
                    options={departments.map(d => ({ label: d.departmentName || d.name, value: String(d.departmentId || d.id) }))}
                    value={String(formData.departmentId)}
                    onChange={(val) => handleChange("departmentId", val ? parseInt(val) : "")}
                    error={formErrors.departmentId}
                    menuMaxHeight="h-[190px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-slate-50/50 shrink-0">
          <div>
            {step === 2 ? (
              <Button 
                type="button"
                variant="outline" 
                onClick={handlePrevious}
                disabled={loading}
                className="h-9 px-4 text-[13px] cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Previous
              </Button>
            ) : (
              <Button 
                type="button"
                variant="outline" 
                onClick={onClose}
                className="h-9 px-4 text-[13px] cursor-pointer"
              >
                Cancel
              </Button>
            )}
          </div>

          <div>
            {step === 1 ? (
              <Button 
                type="button"
                variant="primary" 
                onClick={handleNext}
                className="h-9 px-6 cursor-pointer text-[13px] bg-brand-500 hover:bg-brand-600 border-none text-white shadow-sm flex items-center gap-1.5"
              >
                Next <ArrowRight size={14} />
              </Button>
            ) : (
              <Button 
                type="button"
                variant="primary" 
                onClick={handleSubmit}
                disabled={loading}
                className="h-9 px-6 cursor-pointer text-[13px] bg-brand-500 hover:bg-brand-600 border-none text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingUser ? "Update User" : "Create User"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
