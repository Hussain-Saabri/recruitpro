import { Button, Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {MoveLeft,GraduationCap,Badge,BookOpen,Clock3,Calendar,CalendarCheck2,MapPin,User,MoveRight,Cake,VenusAndMars,House,Building2,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail, ClockCheckIcon} from "lucide-react";
import Separator from "../ui/Separator";
import EducationalCard from "./EducationalCard";
import { useState } from "react";
import MultiFormCard from "../ui/MultiFormCard";
export default function EducationalInformation() {
    const [educations, setEducations] = useState([
    { id: 1 }
         
]);
const [employments, setEmployments] = useState([
    { id: 1 }
         
]);
const handleAddEducation = () => {
console.log("clicked on add education");
  setEducations([
    ...educations,
    {
      id: Date.now(),
    },
  ]);
};

const handleRemoveEducation = (id) => {
    console.log("Clicked on remove button");
    setEducations(
        educations.filter(item => item.id !== id)
    );
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
                value=""
                onChange={() => {}}
                className="w-full"
                labelIcon ={<Building2/>}
                required={true} 
                />
                <Input
                label="Degree"
                type="text"
                placeholder="Enter Degree"
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
