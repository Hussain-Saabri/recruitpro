import BaseCard from "../ui/BaseCard"
import { Button, Input, Dropdown, Label, Textarea } from "../ui"
import { Plus, File, Briefcase, Hash, LineChart, MapPin, Building2, Handshake, IndianRupee, GraduationCap, FileText } from "lucide-react"
import { useState } from "react"

export default function JDManagementForm({ onClose }) {
    const [jdData, setJdData] = useState({
        roleName: "",
        requirementId: "",
        experience: "",
        location: "",
        clientName: "",
        onboardingType: "",
        budget: "",
        mandatorySkills: "",
        description: "",
        educationRequirements: ""
    })

    
    const [errors, setErrors] = useState({});

    
    const handleSubmit = () => {
        let newErrors = {};

       
        if (!jdData.roleName.trim()) {
            newErrors.roleName = "Role Name is required";
        }
        if (!jdData.requirementId) {
            
            newErrors.requirementId= "Role ID is required";
        }
        if (!jdData.experience) {
            
            newErrors.experience= "Experience is required";
        }
        if (!jdData.location) {
            
            newErrors.location= "Location is required";
        }
        if(!jdData.clientName) {
             newErrors.clientName= "Client Name is required";
        }
        if(!jdData.onboardingType) {
             newErrors.onboardingType= "Onboarding Type is required";
        }
        if(!jdData.budget) {
             newErrors.budget= "Budget is required";
        }
       
        if(!jdData.mandatorySkills) {
             newErrors.mandatorySkills= "Mandatory Skills is required";
        }
        if(!jdData.description) {
             newErrors.description= "Description is required";
        }
        if(!jdData.educationRequirements) {
             newErrors.educationRequirements= "Education Requirements is required";
        }

        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; 
        }

        
        console.log("Form data ready to submit:", jdData);
        setErrors({}); 
    }

    return (
        <BaseCard title="Create Job Description" icon={<File size={18}/>}> 
            <div className="p-5 flex flex-col gap-6">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                        label="Role Name"
                        labelIcon={<Briefcase size={14} />}
                        type="text"
                        placeholder="Enter Role"
                        value={jdData.roleName}
                        onChange={(e) => {
                            setJdData({...jdData, roleName: e.target.value});
                            
                            if (errors.roleName) {
                                setErrors({...errors, roleName: ""});
                            }
                        }}
                        required={true} 
                       
                        error={errors.roleName} 
                    />
                    
                    <Input
                        label="Requirement ID"
                        labelIcon={<Hash size={14} />}
                        type="text"
                        placeholder="Enter ID"
                        value={jdData.requirementId}
                        onChange={(e) => {setJdData({...jdData, requirementId: e.target.value}) ;
                        if (errors.requirementId) {
                                setErrors({...errors, requirementId: ""});
                            }}}
                        required={true} 
                        className=""
                        error={errors.requirementId}
                    />
                    <Input
                        label="Experience"
                        labelIcon={<LineChart size={14} />}
                        type="text"
                        placeholder="4-6 years"
                        value={jdData.experience}
                        onChange={(e) => {
                            setJdData({...jdData, experience: e.target.value});
                            if (errors.experience) {
                                setErrors({...errors, experience: ""});
                            }}}
                        required={true} 
                        className="text-slate-700 text-[13px]"
                        error={errors.experience}
                    />
                    <Input
                        label="Location"
                        labelIcon={<MapPin size={14} />}
                        type="text"
                        placeholder="Enter Location"
                        value={jdData.location}
                        onChange={(e) => {
                            setJdData({...jdData, location: e.target.value});
                            if (errors.location) {
                                setErrors({...errors, location: ""});
                            }}}
                        required={true} 
                        className="text-slate-700 text-[13px]"
                        error={errors.location}
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Dropdown
                        label="Client Name"
                        labelIcon={<Building2 size={14} />}
                        placeholder="Select Client"
                        options={[{label: "Tech Corp", value: "tech_corp"}]}
                        value="tech_corp"
                        onChange={(e) => {
                            setJdData({...jdData, clientName: e.target.value});
                            if (errors.clientName) {
                                setErrors({...errors, clientName: ""});
                            }}}
                        required={true}
                        className="py-[12px]"
                        error={errors.clientName}
                    />
                    <Dropdown
                        label="Onboarding Type"
                        labelIcon={<Handshake size={14} />}
                        placeholder="Select Type"
                        options={[{label: "Contract to Hire", value: "contract_hire"},{label: "Employer Payroll", value: "employer_payroll"}]}
                        value="contract_hire"
                        onChange={(e) => {
                            setJdData({...jdData, onboardingType: e.target.value});
                            if (errors.onboardingType) {
                                setErrors({...errors, onboardingType: ""});
                            }}}
                        required={true}
                        className="py-[12px]"
                        error={errors.onboardingType}
                    />
                    <Input
                        label="Budget (LPA)"
                        labelIcon={<IndianRupee size={14} />}
                        type="text"
                        placeholder="e.g. 8-12 LPA"
                        value={jdData.budget}
                       onChange={(e) => {
                            setJdData({...jdData, budget: e.target.value});
                            if (errors.budget) {
                                setErrors({...errors, budget: ""});
                            }}}
                        required={true} 
                        
                        error={errors.budget}
                    />
                </div>

                {/* Row 3 */}
                <div className="flex flex-col text-left">
                    <Textarea 
                        label="Mandatory Skills"
                        labelIcon={<span className="font-mono font-bold text-[10px] bg-brand-100 text-brand-700 px-1 rounded">&lt;/&gt;</span>}
                        value={jdData.mandatorySkills}
                        onChange={(e) => {
                            setJdData({...jdData, mandatorySkills: e.target.value});
                            if (errors.mandatorySkills) {
                                setErrors({...errors, mandatorySkills: ""});
                            }}}
                        required={true}
                        error={errors.mandatorySkills}
                    />
                </div>

                {/* Row 4 */}
                <div className="flex flex-col text-left mt-2">
                    <Textarea 
                        label="Education Requirements"
                        labelIcon={<GraduationCap size={14} />}
                        value={jdData.educationRequirements || "Bachelor's in CS or related"}
                        onChange={(e) => {
                            setJdData({...jdData, educationRequirements: e.target.value});
                            if (errors.educationRequirements) {
                                setErrors({...errors, educationRequirements: ""});
                            }}}
                        required={true}
                        error={errors.educationRequirements}
                    />
                </div>

                {/* Row 5 */}
                <div className="flex flex-col text-left mt-2">
                    <Textarea 
                        label="Full Job Description"
                        labelIcon={<FileText size={14} />}
                        value={jdData.description || "About the Role\nDescribe the role overview...\n\nKey Responsibilities\n- Responsibility 1\n- Responsibility 2\n\nRequirements\n- Requirement 1"}
                        onChange={(e) => {
                            setJdData({...jdData, description: e.target.value});
                            if (errors.description) {
                                setErrors({...errors, description: ""});
                            }}}
                        required={false}
                        className="min-h-[160px]"
                        error={errors.description}
                    />
                </div>
                
                <div className="flex flex-row gap-3 mt-2 pt-4 border-t border-slate-100 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        className="flex items-center gap-2 bg-slate-50 text-slate-700 border border-slate-200 cursor-pointer text-[13px] px-4 py-2 rounded-md font-medium hover:bg-slate-100 transition-colors">
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-brand-500 text-white cursor-pointer text-[13px] px-4 py-2 rounded-md font-medium hover:bg-brand-600 transition-colors">
                        <Plus size={14}/> Create JD
                    </Button>
                </div>
            </div>
        </BaseCard>
    )
}
