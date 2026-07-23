import { Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {GraduationCap,Badge,BookOpen,Calendar,CalendarCheck2,MapPin,User,MoveRight,Cake,VenusAndMars,House,Building2,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail, ClockCheckIcon} from "lucide-react";

import { useState,useEffect } from "react";
import MultiFormCard from "../ui/MultiFormCard";
export default function EducationalInformation({submitTrigger,onValidationResult}) {
    const [educations, setEducations] = useState([
        { id: 1, college: "", degree: "", stream: "", type: "", startDate: "", endDate: "", location: "" }
    ]);
    const [errors, setErrors] = useState([{}]);

    const handleChange = (index, field, value) => {
        const newEducations = [...educations];
        newEducations[index][field] = value;
        setEducations(newEducations);
        
        const newErrors = [...errors];
        if (newErrors[index]) {
            newErrors[index] = { ...newErrors[index], [field]: "" };
        }
        setErrors(newErrors);
    };

    const handleAddEducation = () => {
        setEducations([
            ...educations,
            { id: Date.now(), college: "", degree: "", stream: "", type: "", startDate: "", endDate: "", location: "" }
        ]);
        setErrors([...errors, {}]);
    };
    useEffect(() => {
        if (submitTrigger?.count > 0 && submitTrigger?.step === 2) {
            const newErrors = educations.map(edu => {
                const err = {};
                if (!edu.college?.trim()) err.college = "Required";
                if (!edu.degree?.trim()) err.degree = "Required";
                if (!edu.stream?.trim()) err.stream = "Required";
                if (!edu.type?.trim()) err.type = "Required";
                if (!edu.startDate) err.startDate = "Required";
                if (!edu.endDate) err.endDate = "Required";
                if (!edu.location?.trim()) err.location = "Required";
                return err;
            });
            setErrors(newErrors);

            const hasErrors = newErrors.some(err => Object.keys(err).length > 0);
            if (!hasErrors) {
                onValidationResult(true, { educations });
            }
        }
    }, [submitTrigger, educations]);

    const handleRemoveEducation = (id) => {
        const index = educations.findIndex(item => item.id === id);
        setEducations(educations.filter(item => item.id !== id));
        setErrors(errors.filter((_, i) => i !== index));
    };
    return (
      <div>
            <FormCard
                title="Educational Information"
                subtitle=""
                icon ={<GraduationCap className=""/>}
            >
{
            educations.map((education,index)=>(
        <   MultiFormCard 
            key={education.id}
            count={index+1}
            onAdd={handleAddEducation}
            onRemove={() => handleRemoveEducation(education.id)}
            isLast={index === educations.length - 1}
            totalCount={educations.length}
            icon={<GraduationCap />}
            title="Educational"
            
        >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <Input
                label="College/University"
                type="text"
                placeholder="Enter College/University Name"
                value={education.college}
                onChange={(e) => handleChange(index, 'college', e.target.value)}
                className="w-full"
                labelIcon ={<Building2/>}
                required={true} 
                error={errors[index]?.college}
                />
                <Input
                label="Degree"
                type="text"
                placeholder="Enter Degree"
                value={education.degree}
                labelIcon ={<Badge/>}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                required={true} 
                error={errors[index]?.degree} 
                />
                
                <Input
                label="Stream"
                labelIcon={<BookOpen />}
                type="text"
                placeholder="Enter Stream"
                value={education.stream}
                onChange={(e) => handleChange(index, 'stream', e.target.value)}
                required={true} 
                error={errors[index]?.stream}
                />
                
                <Dropdown
                label="Type"
                labelIcon={<ClockCheckIcon />}
                options={[
                        {value:"Full-Time", label:"Full-Time"},
                        {value:"Part-Time", label:"Part-Time"},
                        {value:"Distance", label:"Distance"}
                        ]}
                        value={education.type}
                        onChange={(val) => handleChange(index, 'type', val)}
                        required={true}
                        className="w-full h-[42px]"
                        placeholder="Select Type"
                        error={errors[index]?.type}
                />
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 mb-2">
                <Input
                label="Start Date"
                labelIcon={<Calendar />}
                type="date"
                placeholder="dd-mm-yyyy"
                value={education.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                error={errors[index]?.startDate}
                />
                <Input
                label="End Date"
                labelIcon={<CalendarCheck2 />}
                type="date"
                placeholder="dd-mm-yyyy"
                value={education.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                error={errors[index]?.endDate}
                />
                <Input
                label="Location"
                type="text"
                placeholder="Enter Location"
                value={education.location}
                labelIcon ={<MapPin />}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                required={true} 
                error={errors[index]?.location}
                />
                
            </div>
            </MultiFormCard >
    ))
} 






            </FormCard>                                   
        </div> 
        
        

    );
}
