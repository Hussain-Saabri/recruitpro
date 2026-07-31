import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { clientService } from "../../../services/clientService";
import { Button, Input, Dropdown, Textarea } from "../../ui";
import { COUNTRIES } from "../../../lib/countries";

export default function ClientModal({ isOpen, onClose, editingClient, onSuccess }) {
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    type: "",
    industry: "",
    company_size: "",
    hq_country: "",
    email: "",
    phone: "",
    website: "",
    account_tier: "",
    contract_start_date: "",
    contract_end_date: "",
    notes: "",
    is_active: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingClient) {
        setFormValues({ ...editingClient });
      } else {
        setFormValues({
          name: "",
          code: "",
          type: "",
          industry: "",
          company_size: "",
          hq_country: "",
          email: "",
          phone: "",
          website: "",
          account_tier: "",
          contract_start_date: "",
          contract_end_date: "",
          notes: "",
          is_active: true
        });
      }
      setFormErrors({});
    }
  }, [isOpen, editingClient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDropdownChange = (name, val) => {
    setFormValues((prev) => ({ ...prev, [name]: val }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name?.trim()) errors.name = "Name is required";
    if (!formValues.code?.trim()) errors.code = "Code is required";
    if (!formValues.type) errors.type = "Type is required";
    if (!formValues.industry?.trim()) errors.industry = "Industry is required";
    if (!formValues.company_size) errors.company_size = "Company size is required";
    if (!formValues.hq_country?.trim()) errors.hq_country = "HQ country is required";
    if (!formValues.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid format";
    }
    if (!formValues.phone?.trim()) errors.phone = "Phone is required";
    if (!formValues.website?.trim()) errors.website = "Website is required";
    if (!formValues.account_tier) errors.account_tier = "Account tier is required";
    if (!formValues.contract_start_date) errors.contract_start_date = "Contract start-date is required";
    if (!formValues.contract_end_date) errors.contract_end_date = "Contract end-date is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formValues };

    try {
      setIsSubmitting(true);
      if (editingClient) {
        const updated = await clientService.updateClient(editingClient.id, payload);
        toast.success(`Client "${updated.name}" updated!`);
      } else {
        const created = await clientService.createClient(payload);
        toast.success(`Client "${created.name}" created!`);
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full z-10 border border-gray-100 flex flex-col relative max-h-[90vh]">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 shrink-0">
          <p className="text-xl font-bold text-brand-500">{editingClient ? "Edit Client" : "Add Client"} </p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-red-500 hover:text-white rounded-md cursor-pointer transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col overflow-y-auto">
          <div className="p-6 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
            
            <Input label="Name" name="name" id="name" required placeholder="e.g. TechCorp" value={formValues.name} onChange={handleInputChange} error={formErrors.name} />
            <Input label="Code" name="code" id="code" required placeholder="e.g. TC-001" value={formValues.code} onChange={handleInputChange} error={formErrors.code} />
            
            <Dropdown 
              label="Type"
              options={[
                {value: "enterprise", label: "Enterprise"},
                {value: "startup", label: "Startup"},
                {value: "sme", label: "SME"},
                {value: "nonprofit", label: "Nonprofit"},
                {value: "government", label: "Government"},
                {value: "other", label: "Other"}
              ]}
              required
               menuMaxHeight="max-h-80"
              placeholder="Select Type"
              error={formErrors.type}
              className="py-[13.3px]"
              value={formValues.type}
              onChange={(val) => handleDropdownChange("type", val)}
            />
            
            <Input label="Industry" name="industry" id="industry" required placeholder="e.g. IT" value={formValues.industry} onChange={handleInputChange} error={formErrors.industry} />
            
            <Dropdown 
              label="Company Size"
              options={[
                {value: "1-50", label: "1-50"},
                {value: "51-200", label: "51-200"},
                {value: "201-500", label: "201-500"},
                {value: "501-1000", label: "501-1000"},
                {value: "1001-5000", label: "1001-5000"},
                {value: "5001+", label: "5001+"}
              ]}
              required
              placeholder="Select Company Size"
              error={formErrors.company_size}
              className="py-[13.3px]"
              menuMaxHeight="max-h-80"
              value={formValues.company_size}
              onChange={(val) => handleDropdownChange("company_size", val)}
            />

            <Dropdown 
              label="HQ Country"
              options={COUNTRIES}
              required
              searchable={true}
              placeholder="Select Country"
              error={formErrors.hq_country}
              className="py-[13.3px]"
              menuMaxHeight="max-h-50"
              value={formValues.hq_country}
              onChange={(val) => handleDropdownChange("hq_country", val)}
            />
            <Input label="Email" name="email" id="email" required type="email" placeholder="e.g. contact@client.com" value={formValues.email} onChange={handleInputChange} error={formErrors.email} />
            <Input label="Phone" name="phone" id="phone" required placeholder="e.g. +1 555-0123" value={formValues.phone} onChange={handleInputChange} error={formErrors.phone} />
            <Input label="Website" name="website" id="website" required placeholder="e.g. https://client.com" value={formValues.website} onChange={handleInputChange} error={formErrors.website} />             
            
            <Dropdown 
              label="Account Tier"
              options={[
                {value: "standard", label: "Standard"},
                {value: "preferred", label: "Preferred"},
                {value: "strategic", label: "Strategic"},
                {value: "enterprise", label: "Enterprise"}
              ]}
              required
              error={formErrors.account_tier}
              className="py-[13.3px]"
              placeholder="Select Account Tier"
             
              value={formValues.account_tier}
              onChange={(val) => handleDropdownChange("account_tier", val)}
            />
            
            <Input label="Contract Start" required name="contract_start_date" id="contract_start_date" type="date" value={formValues.contract_start_date} onChange={handleInputChange} className="text-slate-500" error={formErrors.contract_start_date} />
            <Input label="Contract End" required name="contract_end_date" id="contract_end_date" type="date" value={formValues.contract_end_date} onChange={handleInputChange} className="text-slate-500" error={formErrors.contract_end_date} />
            
            <div className="col-span-full mt-1">
              <Textarea label="Notes"  value={formValues.notes} onChange={handleInputChange} rows="2" placeholder="Add notes..." />
            </div>

            <div className="col-span-full md:col-span-1">
              <Dropdown 
                label="Status"
                direction="up"
                options={[
                  {value: true, label: "Active"},
                  {value: false, label: "Inactive"}
                ]}
                required
                placeholder="Select Status"
                className="py-[12.5px]"
                error={formErrors.is_active}
                value={formValues.is_active}
                onChange={(val) => handleDropdownChange("is_active", val)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 p-6 pt-4 bg-white rounded-b-lg mt-auto sticky bottom-0 z-20 border-t border-gray-100 shrink-0">
            <Button variant="outline" className="px-6 py-4 cursor-pointer text-black transition-colors rounded-[5px]" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit" variant="primary" className="px-6 py-4 cursor-pointer bg-brand-500 text-white hover:bg-brand-600 transition-colors rounded-[5px]" isLoading={isSubmitting}>{editingClient ? "Update" : "Save"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
