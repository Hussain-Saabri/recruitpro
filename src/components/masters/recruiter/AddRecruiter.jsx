import React, { useState, useEffect } from "react";
import { Input, Button } from "../../../components/ui";
import StepperHeader from "../../../components/ui/StepperHeader";
import RecruiterCompanyStep from "../../../components/masters/recruiter/RecruiterCompanyStep";
import RecruiterAddressStep from "../../../components/masters/recruiter/RecruiterAddressStep";
import RecruiterContactStep from "../../../components/masters/recruiter/RecruiterContactStep";

import { toast } from "sonner";
import { recruiterService } from "../../../services/recruiterService";
import { Building, MapPin, Contact, ArrowRight, ArrowLeft, SendHorizonal } from "lucide-react";

export default function AddRecruiter({ recruiterId, onBack }) {
  const isEditing = !!recruiterId;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", type: 0, website: "", specialization: "", commissionRate: "",
    organizationId: 1, // TODO: To be removed later
    contractStartDate: "", contractEndDate: "", notes: "", isActive: true,
    addressType: 0, // TODO: To be removed later
    address1: "", address2: "", landmark: "", city: "", state: "", country: "", postalCode: "",
    pan: "", tin: "",
    primaryContactName: "", primaryContactEmail: "", primaryContactMobile: "", primaryContactPhone: "",mobile:"",phone:"",
    email1: "", email2: "", phone: "", mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchRecruiterDetails(recruiterId);
    }
  }, [recruiterId, isEditing]);

  const fetchRecruiterDetails = async (idToFetch) => {
    setIsFetching(true);
    try {
      const freshData = await recruiterService.getRecruiterById(idToFetch);
      
      setFormData({
        ...freshData,
        contractStartDate: freshData.contractStartDate ? freshData.contractStartDate.split('T')[0] : "",
        contractEndDate: freshData.contractEndDate ? freshData.contractEndDate.split('T')[0] : "",
      });
    } catch (error) {
      toast.error("Failed to fetch recruiter details.");
      onBack(); // Redirect back if fetch fails
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? (value === "" ? "" : Number(value)) : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleInlineChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) {
          newErrors.name = "Recruiter Name is required";
      }
        
      if (formData.type === "" || formData.type === null || formData.type === undefined) newErrors.type = "Recruiter Type is required";
      if (!formData.specialization) newErrors.specialization = "Specialization is required";
      if (!formData.commissionRate && formData.commissionRate !== 0) newErrors.commissionRate = "Commission is required";
      if (!formData.website) newErrors.website = "Website is required";
      if (!formData.contractStartDate) newErrors.contractStartDate = "Start Date is required";
      
      if (!formData.contractEndDate) {
        newErrors.contractEndDate = "End Date is required";
      } else if (formData.contractStartDate && new Date(formData.contractEndDate) <= new Date(formData.contractStartDate)) {
        newErrors.contractEndDate = "End Date must be after Start Date";
      }
    } else if (step === 2) {
      if (!formData.address1) newErrors.address1 = "Address Line 1 is required";
      if (!formData.address2) newErrors.address2 = "Address Line 2 is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.postalCode) newErrors.postalCode = "Postal Code is required";
      if (!formData.landmark) newErrors.landmark = "Landmark is required";
      if (!formData.pan) newErrors.pan = "PAN is required";
      if (!formData.tin) newErrors.tin = "TIN is required";
    } else if (step === 3) {
      if (!formData.primaryContactName) newErrors.primaryContactName = "Contact Name is required";
      if (!formData.primaryContactEmail) newErrors.primaryContactEmail = "Primary Contact Email is required";
      if (!formData.email1) newErrors.email1 = "Email1 is required";
       if (!formData.email2) newErrors.email2 = "Email2 is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
       
      if (!formData.primaryContactMobile) newErrors.primaryContactMobile = "Mobile is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill the required field");
      return;
    }
    
    const payload = {
      ...formData,
      commissionRate: formData.commissionRate ? Number(formData.commissionRate) : 0,
      organizationId: formData.organizationId ? Number(formData.organizationId) : 1, // TODO: Remove later and default to 1
      addressType: formData.addressType ? Number(formData.addressType) : 0,    // TODO: Remove later and default to 0
      type: formData.type && !isNaN(formData.type) ? Number(formData.type) : 0,
    };

    setLoading(true);
    try {
      if (isEditing) {
        await recruiterService.updateRecruiter(recruiterId, payload);
        toast.success(`Recruiter updated successfully!`);
      } else {
        await recruiterService.createRecruiter(payload);
        toast.success(`Recruiter created successfully!`);
      }
      onBack();
    } catch (error) {
      toast.error(`Failed to ${isEditing ? "update" : "create"} recruiter.`);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill the required field");
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const steps = [
    { id: 1, label: "Company", icon: <Building size={20} /> },
    { id: 2, label: "Address", icon: <MapPin size={20} /> },
    { id: 3, label: "Contact", icon: <Contact size={20} /> },
  ];

  return (
    <div className="flex flex-col space-y-2 w-full font-sans text-left max-w-4xl mx-auto">
        <div className="w-full flex justify-center">
        <StepperHeader 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible flex flex-col mt-2 relative z-10">
        <div className="px-6 md:px-8 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/50 rounded-t-xl">
          <div className="text-brand-600 flex items-center justify-center">
            {React.cloneElement(steps[currentStep - 1].icon, { size: 18, strokeWidth: 2.5 })}
          </div>
          <p className="text-lg font-bold text-brand-600 tracking-tight">{steps[currentStep - 1].label}</p>
        </div>

        <div className="p-6 md:p-8">
          {isFetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col">
                  
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-3.5 w-3.5 bg-brand-100/50 rounded-sm animate-pulse"></div>
                    <div className="h-3 w-24 bg-slate-200/70 rounded-full animate-pulse"></div>
                  </div>
                 
                  <div className="h-[42px] w-full bg-slate-50/80 border border-slate-100/80 rounded-lg animate-pulse shadow-sm"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentStep === 1 && (
                <RecruiterCompanyStep 
                  formData={formData} 
                  handleChange={handleChange} 
                  setFormData={setFormData}
                  errors={errors} 
                />
              )}

              {currentStep === 2 && (
                <RecruiterAddressStep 
                  formData={formData} 
                  handleChange={handleChange} 
                  errors={errors} 
                />
              )}

              {currentStep === 3 && (
                <RecruiterContactStep 
                  formData={formData} 
                  handleInlineChange={handleInlineChange} 
                  errors={errors} 
                />
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 px-6 md:px-8 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between mt-auto">
          <div>
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="flex items-center gap-1.5 h-9 px-4 text-slate-600 font-medium border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <ArrowLeft size={16} strokeWidth={2.5} /> Back
              </Button>
            ) : (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="flex items-center gap-1.5 h-9 px-4 text-slate-600 font-medium border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </Button>
            )}
          </div>
          
          <div>
            <Button
              type="button"
              onClick={currentStep === 3 ? handleSubmit : handleNext}
              disabled={loading || isFetching}
              className="px-6 py-2 text-sm text-white bg-brand-600 hover:bg-brand-700 border border-transparent shadow-sm transition-all cursor-pointer h-9 font-medium flex justify-center items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep < 3 ? (
                <>Next <ArrowRight size={16} strokeWidth={2.5} /></>
              ) : (
                <><SendHorizonal size={16} strokeWidth={2.5} /> {isEditing ? "Update" : "Create"}</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
