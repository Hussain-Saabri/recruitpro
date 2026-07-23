import { Button, Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {BriefcaseBusiness ,Badge,BookOpen,Clock3,Calendar,CalendarCheck2,MapPin,User,MoveRight,Cake,VenusAndMars,House,Building2,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail, ClockCheckIcon} from "lucide-react";

import { useState, useEffect } from "react";
import MultiFormCard from "../ui/MultiFormCard";
export default function EmploymentInformation({ submitTrigger, onValidationResult }) {
    const [employments, setEmployments] = useState([
        { id: 1, payrollCompany: "", company: "", designation: "", type: "", startDate: "", endDate: "", location: "" }
    ]);
    const [errors, setErrors] = useState([{}]);

    const handleAddEmployment = () => {
        setEmployments([
            ...employments,
            { id: Date.now(), payrollCompany: "", company: "", designation: "", type: "", startDate: "", endDate: "", location: "" },
        ]);
        setErrors([...errors, {}]);
    };

    const handleRemoveEmployment = (id) => {
        const index = employments.findIndex(item => item.id === id);
        setEmployments(employments.filter(item => item.id !== id));
        setErrors(errors.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        const newEmployments = [...employments];
        newEmployments[index][field] = value;
        setEmployments(newEmployments);
        
        const newErrors = [...errors];
        if (newErrors[index]) {
            newErrors[index] = { ...newErrors[index], [field]: "" };
        }
        setErrors(newErrors);
    };

    useEffect(() => {
        if (submitTrigger?.count > 0 && submitTrigger?.step === 3) {
            const newErrors = employments.map(emp => {
                const err = {};
                if (!emp.payrollCompany?.trim()) err.payrollCompany = "Required";
                if (!emp.company?.trim()) err.company = "Required";
                if (!emp.designation?.trim()) err.designation = "Required";
                if (!emp.type?.trim()) err.type = "Required";
                if (!emp.startDate) err.startDate = "Required";
                if (!emp.endDate) err.endDate = "Required";
                if (!emp.location?.trim()) err.location = "Required";
                
                if (emp.startDate && emp.endDate) {
                    if (new Date(emp.endDate) < new Date(emp.startDate)) {
                        err.endDate = "End date cannot be less than start date";
                    }
                }
                return err;
            });

            // Check for date overlaps between employment blocks
            for (let i = 0; i < employments.length; i++) {
                for (let j = i + 1; j < employments.length; j++) {
                    const emp1 = employments[i];
                    const emp2 = employments[j];
                    
                    if (emp1.startDate && emp1.endDate && emp2.startDate && emp2.endDate) {
                        const start1 = new Date(emp1.startDate);
                        const end1 = new Date(emp1.endDate);
                        const start2 = new Date(emp2.startDate);
                        const end2 = new Date(emp2.endDate);

                        // If dates overlap
                        if (start1 <= end2 && start2 <= end1) {
                            newErrors[i].startDate = newErrors[i].startDate || `Overlap with Employment #${j + 1}`;
                            newErrors[j].startDate = newErrors[j].startDate || `Overlap with Employment #${i + 1}`;
                        }
                    }
                }
            }

            setErrors(newErrors);

            const hasErrors = newErrors.some(err => Object.keys(err).length > 0);
            if (!hasErrors) {
                onValidationResult(true, { employments });
            } else {
                onValidationResult(false, null);
            }
        }
    }, [submitTrigger, employments]);
    return (
      <div>
            <FormCard
                title="Employment History"
                subtitle=""
                icon ={<BriefcaseBusiness  className=""/>}
            >                
{
            employments.map((employment,index)=>(
        <   MultiFormCard 
            key={employment.id}
            count={index+1}
            onAdd={handleAddEmployment}
            onRemove={() => handleRemoveEmployment(employment.id)}
            isLast={index === employments.length - 1}
            totalCount={employments.length}
            icon={<BriefcaseBusiness />}
            title="Employment"
            
        >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <Input
                label="Payroll Company"
                type="text"
                placeholder="Enter Payroll Company"
                value={employment.payrollCompany}
                onChange={(e) => handleChange(index, 'payrollCompany', e.target.value)}
                error={errors[index]?.payrollCompany}
                className="w-full"
                labelIcon ={<Building2/>}
                required={true} 
                />
                <Input
                label="Company"
                type="text"
                placeholder="Enter Company Name"
                value={employment.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                error={errors[index]?.company}
                labelIcon ={<Badge/>}
                required={true} 
                />
                
                <Input
                label="Designation"
                labelIcon={<BookOpen />}
                type="text"
                placeholder="Enter Designation"
                value={employment.designation}
                onChange={(e) => handleChange(index, 'designation', e.target.value)}
                error={errors[index]?.designation}
                required={true} 
                />
                
                <Dropdown
                label="Employment Type"
                labelIcon={<ClockCheckIcon />}
                options={[
                        {value:"Full-Time", label:"Full-Time"},
                        {value:"Part-Time", label:"Part-Time"},
                        {value:"Distance", label:"Distance"}
                        ]}
                        value={employment.type}
                        onChange={(val) => handleChange(index, 'type', val)}
                        error={errors[index]?.type}
                        required={true}
                        className="w-full h-[42px]"
                        placeholder="Select Type Of Employment"
                />
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 mb-2">
                <Input
                label="Start Date"
                labelIcon={<Calendar />}
                type="date"
                placeholder="dd-mm-yyyy"
                value={employment.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                error={errors[index]?.startDate}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                />
                <Input
                label="End Date"
                labelIcon={<CalendarCheck2 />}
                type="date"
                placeholder="dd-mm-yyyy"
                value={employment.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                error={errors[index]?.endDate}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                />
                <Input
                label="Location"
                type="text"
                placeholder="Enter Employment Location"
                value={employment.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                error={errors[index]?.location}
                labelIcon ={<MapPin />}
                required={true} 
                />
            </div>
            </MultiFormCard >
    ))
} 






            </FormCard>                                   
        </div> 
        
        

    );
}
