import FormCard from "@/components/ui/FormCard"
import { Button, Input } from "@/components/ui"
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Hash,
  Tag,
  BriefcaseBusiness,
  Mail,
  Phone,
  Globe,
  Image,
  MapPin,
  Building,
  Map,
  Earth,
  Mailbox,
  CreditCard,
  CalendarDays,
  Plus,Edit2
} from "lucide-react";

import { useState } from "react"
import { organizationService } from '../../../services/organizationService';

export function AddOrganisation({ onClose }) {
    const navigate = useNavigate();
    const [organisationData, setorganisationData] = useState({
        name: "",
        code: "",
        type: "",
        industry: "",
        email: "",
        phone: "",
        website: "",
        logoUrl: "",
        address: "",
        city: "",
        state:"",
        country:"",
        postalCode:"",
        subscriptionPlan:"",
        trialEndsAt:"",
        
    })
    const [errors, setErrors] = useState({});

    const handleSubmit = async() => {
        let newErrors = {};       
        if (!organisationData.name.trim()) {
            newErrors.name = "Organization Name is required";
        } else if (organisationData.name.trim().length < 2) {
            newErrors.name = "Letters only,minimum 2 characters";
        }else if (!organisationData.name.trim().match(/^[a-zA-Z ]+$/)) {
            newErrors.name = "Letters only,minimum 2 characters";
        }
        if (!organisationData.code) {
            
            newErrors.code= "Code is required";
        }
        if (!organisationData.type) {
            
            newErrors.type= "Type is required";
        }
        if (!organisationData.industry) {
            
            newErrors.industry= "Industry is required";
        }
        if(!organisationData.email) {
             newErrors.email= "Email is required";
        }
        if(!organisationData.phone) {
             newErrors.phone= "Phone is required";
        }
        if(!organisationData.website) {
             newErrors.website= "Website is required";
        }
       /* if(!organisationData.logoUrl) {
             newErrors.logoUrl= "Logo Url is required";
        }*/
        if(!organisationData.address) {
             newErrors.address= "Address is required";
        }
        if(!organisationData.city) {
             newErrors.city= "City is required";
        }
        if(!organisationData.state) {
             newErrors.state= "State is required";
        }
        if(!organisationData.country) {
             newErrors.country= "Country is required";
        }
        if(!organisationData.postalCode) {
             newErrors.postalCode= "Postal Code is required";
        }
        if(!organisationData.subscriptionPlan) {
             newErrors.subscriptionPlan= "Subscription Plan is required";
        }
        /*
        if(!organisationData.trialsEndAt) {
             newErrors.trialsEndAt= "Trails End AT is required";
        }  */
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; 
        }       
        console.log("Form data ready to submit:", organisationData);
        const response = await organizationService.createOrganisation(organisationData);
        console.log("create response", response);
        setErrors({}); 
        if (onClose) onClose();
    }

    return (
        <FormCard title="Add Organisation" icon={<Building2  size={18}/>}> 
            <div className="p-2 sm:p-5 flex flex-col gap-2">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                    <Input
                        label="Name"
                        labelIcon={<Building2 size={14} />}
                        type="text"
                        placeholder="Enter Organisation Name"
                        value={organisationData.name}
                        onChange={(e) => {
                            const val = e.target.value;
                            setorganisationData({...organisationData, name: val});
                            
                            if (val.trim().length > 0 && !val.match(/^[a-zA-Z ]+$/)) {
                                setErrors({...errors, name: "Letters only, minimum 2 characters"});
                            } else if (errors.name) {
                                setErrors({...errors, name: ""});
                            }
                        }}
                        required={true} 
                        className="w-full text-[13px] font-medium text-gray-900"
                        error={errors.name} 
                    />
                    
                    <Input
                        label="Code"
                        labelIcon={<Hash size={14} />}
                        type="text"
                        placeholder="Enter Organisation Code"
                        value={organisationData.code}
                        className="w-full text-[13px] font-medium text-gray-900"
                        onChange={(e) => {setorganisationData({...organisationData, code: e.target.value}) ;
                        if (errors.code) {
                                setErrors({...errors, code: ""});
                            }}}
                        required={true} 
                      
                        error={errors.code}
                    />
                    <Input
                        label="Type"
                        labelIcon={<Tag size={14} />}
                        type="text"
                        placeholder="Enter Type"
                        className="w-full text-[13px] font-medium text-gray-900"
                        value={organisationData.type}
                        onChange={(e) => {
                            setorganisationData({...organisationData, type: e.target.value});
                            if (errors.type) {
                                setErrors({...errors, type: ""});
                            }}}
                        required={true} 
                       
                        error={errors.type}
                    />
                    <Input
                        label="Industry"
                        labelIcon={<BriefcaseBusiness size={14} />}
                        type="text"
                        placeholder="Enter Industry"
                        className="w-full text-[13px] font-medium text-gray-900"
                        value={organisationData.industry}
                        onChange={(e) => {
                            setorganisationData({...organisationData, industry: e.target.value});
                            if (errors.industry) {
                                setErrors({...errors, industry: ""});
                            }}}
                        required={true} 
                      
                        error={errors.industry}
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                    <Input
                        label="Email"
                        labelIcon={<Mail size={14} />}
                        type="email"
                        placeholder="Enter Email"
                        className="w-full text-[13px] font-medium text-gray-900"
                        value={organisationData.email}
                        onChange={(e) => {
                            setorganisationData({...organisationData, email: e.target.value});
                            if (errors.email) {
                                setErrors({...errors, email: ""});
                            }}}
                        required={true} 
                      
                        error={errors.email}
                    />
                    
                    <Input
                        label="Phone"
                        labelIcon={<Phone size={14} />}
                        type="text"
                        className="w-full text-[13px] font-medium text-gray-900"
                        placeholder="Enter Phone"
                        value={organisationData.phone}
                       onChange={(e) => {
                            setorganisationData({...organisationData, phone: e.target.value});
                            if (errors.phone) {
                                setErrors({...errors, phone: ""});
                            }}}
                        required={true} 
                        
                        error={errors.phone}
                    />
                    <Input
                        label="Website"
                        labelIcon={<Globe size={14} />}
                        type="text"
                        placeholder="Enter Website Url"
                        value={organisationData.website}
                        className="w-full text-[13px] font-medium text-gray-900"
                       onChange={(e) => {
                            setorganisationData({...organisationData, website: e.target.value});
                            if (errors.website) {
                                setErrors({...errors, website: ""});
                            }}}
                        required={true} 
                    
                        error={errors.website}
                    />

                    <Input
                        label="Logo Url"
                        labelIcon={<Image size={14} />}
                        type="text"
                        placeholder="Add Logo Image"
                        className="w-full text-[13px] font-medium text-gray-900"
                        value={organisationData.logoUrl}
                        onChange={(e) => {
                            setorganisationData({...organisationData, logoUrl: e.target.value});
                            if (errors.logoUrl) {
                                setErrors({...errors, logoUrl: ""});
                            }}}
                       
                       
                        error={errors.logoUrl}
                    />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                    <Input
                        label="Address"
                        labelIcon={< MapPin size={14} />}
                        type="text"
                        placeholder="Enter Address"
                        className="w-full text-[13px] font-medium text-gray-900"
                        value={organisationData.address}
                        onChange={(e) => {
                            setorganisationData({...organisationData, address: e.target.value});
                            if (errors.address) {
                                setErrors({...errors, address: ""});
                            }}}
                        required={true} 
                        
                        error={errors.address}
                    />
                    <Input
                        label="City"
                        labelIcon={<Building size={14} />}
                        type="text"
                        placeholder="Enter City"
                        value={organisationData.city}
                        className="w-full text-[13px] font-medium text-gray-900"
                        onChange={(e) => {
                            setorganisationData({...organisationData, city: e.target.value});
                            if (errors.city) {
                                setErrors({...errors, city: ""});
                            }}}
                        required={true} 
                 
                        error={errors.city}
                    />

                    <Input
                        label="State"
                        labelIcon={<Map size={14} />}
                        type="text"
                        placeholder="Enter State"
                        value={organisationData.state}
                        className="w-full text-[13px] font-medium text-gray-900"
                        onChange={(e) => {
                            setorganisationData({...organisationData, state: e.target.value});
                            if (errors.state) {
                                setErrors({...errors, state: ""});
                            }}}
                        required={true} 
                  
                        error={errors.state}
                    />
                    <Input
                        label="Country"
                        labelIcon={<Earth size={14} />}
                        type="text"
                        placeholder="Enter Country"
                        value={organisationData.country}
                        className="w-full text-[13px] font-medium text-gray-900"
                        onChange={(e) => {
                            setorganisationData({...organisationData, country: e.target.value});
                            if (errors.country) {
                                setErrors({...errors, country: ""});
                            }}}
                        required={true} 
                       
                        error={errors.country}
                    />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                  <Input
                        label="Postal Code"
                        labelIcon={<Mailbox size={14} />}
                        className="w-full text-[13px] font-medium text-gray-900"
                        type="text"
                        placeholder="Enter Postal Code"
                        value={organisationData.postalCode}
                        onChange={(e) => {
                            setorganisationData({...organisationData, postalCode: e.target.value});
                            if (errors.postalCode) {
                                setErrors({...errors, postalCode: ""});
                            }}}
                        required={true} 
                     
                        error={errors.postalCode}
                    />
                    <Input
                        label="Subscription Plan"
                        labelIcon={< CreditCard size={14} />}
                        type="text"
                        placeholder="Enter Subscription Plan"
                        className="w-full text-[13px] font-medium text-gray-900"
                        value={organisationData.subscriptionPlan}
                        onChange={(e) => {
                            setorganisationData({...organisationData, subscriptionPlan: e.target.value});
                            if (errors.subscriptionPlan) {
                                setErrors({...errors, subscriptionPlan: ""});
                            }}}
                        required={true} 
                     
                        error={errors.subscriptionPlan}
                    />

                    <Input
                        label="Trial Expiry Date"
                        labelIcon={<CalendarDays size={14} />}
                        className="w-full text-[13px] font-medium text-gray-900"
                        type="date"                       
                        value={organisationData.trialEndsAt}
                        onChange={(e) => {
                            setorganisationData({...organisationData, trialEndsAt: e.target.value});
                            if (errors.trialEndsAt) {
                                setErrors({...errors, trialEndsAt: ""});
                            }}}
                        required={true} 
                       
                        error={errors.trialEndsAt}
                    />  
                </div>
                
                <div className="flex flex-row gap-3 mt-2 pt-4 border-t border-slate-100 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/dashboard")}
                        className="flex hover:text-white items-center gap-1 bg-red-500 text-white cursor-pointer text-[13px] px-2 py-4 rounded-md font-medium hover:bg-red-600 transition-colors">
                       Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSubmit}
                        className="flex items-center gap-1 bg-brand-500 text-white cursor-pointer text-[13px] px-2 py-4 rounded-md font-medium hover:bg-brand-600 transition-colors">
                       Add Organisation
                    </Button>
                </div>
            </div>
        </FormCard>
    )
}
