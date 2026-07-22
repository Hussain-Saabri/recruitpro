import { Button, Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {BriefcaseBusiness ,GraduationCap,Badge,BookOpen,Clock3,Calendar,CalendarCheck2,MapPin,User,MoveRight,Cake,VenusAndMars,House,Building2,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail, ClockCheckIcon} from "lucide-react";

import { useState } from "react";
import MultiFormCard from "../ui/MultiFormCard";
export default function EmploymentInformation() {
    console.log("EmploymentInformation rendered with responsive grids");
    
const [employments, setEmployments] = useState([
    { id: 1 }
         
]);
const handleAddEmployment = () => {

  setEmployments([
    ...employments,
    {
      id: Date.now(),
    },
  ]);
};

const handleRemoveEmployment = (id) => {

    setEmployments(
        employments.filter(item => item.id !== id)
    );
};
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
                placeholder="Enter College/University Name"
                value=""
                onChange={() => {}}
                className="w-full"
                labelIcon ={<Building2/>}
                required={true} 
                />
                <Input
                label="Company"
                type="text"
                placeholder="Enter Company Name"
                value=""
                labelIcon ={<Badge/>}
                onChange={() => {}}
                required={true} 
                />
                
                <Input
                label="Stream"
                labelIcon={<BookOpen />}
                type="text"
                placeholder="Enter Stream"
                value=""
                onChange={() => {}}
                required={true} 
                
                />
                
                <Dropdown
                label="Type"
                labelIcon={<ClockCheckIcon />}
                options={[
                        {value:"Full-Time", label:"Full-Time"},
                        {value:"Part-Time", label:"Part-Time"},
                        {value:"Distance", label:"Distance"}
                        ]}
                        value=""
                        onChange={() => {}}
                        required={true}
                        className="w-full h-[42px]"
                        placeholder="Select Type"
                />
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 mb-2">
                <Input
                label="Start Date"
                labelIcon={<Calendar />}
                type="date"
                placeholder="dd-mm-yyyy"
                value=""
                onChange={() => {}}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                />
                <Input
                label="End Date"
                labelIcon={<CalendarCheck2 />}
                type="date"
                placeholder="dd-mm-yyyy"
                value=""
                onChange={() => {}}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                />
                <Input
                label="Location"
                type="text"
                placeholder="Enter Location"
                value=""
                labelIcon ={<MapPin />}
                onChange={() => {}}
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
