import { Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {Hash,Video,Building2,ReceiptIndianRupee,Logs,Handshake,ChartLine} from "lucide-react";
export default function ClientInformation() {       
    console.log("ClientInformation responsive grids applied");
    return (
        <>
            <FormCard
                title="Client Information"
                
                icon ={<Building2 />}
            >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <Input
                label="Client Name"
                type=""                
                value=""              
                className="w-full"
                labelIcon ={<Building2 />}
                required={true} 
                />              
                <Input
                label="Requirement ID"
                type="text"                
                value=""
                labelIcon ={<Hash/>}               
                required={true} 
                />
                <Dropdown
                label="Work Type"
                labelIcon={<Logs />}
                options={[
                    {value:"Remote", label:"remote"},
                    {value:"Work From Office", label:"wfo"},
                    {value:"Hybrid", label:"hybrid"}
                ]}
                value=""                
                required={true}
                className="w-full h-[42px]"
                />
                <Input
                label="Onboarding"
                labelIcon={<Handshake />}
                type="text"               
                value=""               
                required={true} 
               
                />                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="Interview Type"
                type="text"               
                value=""              
                className="w-full"
                labelIcon ={<Video  />}
                required={true} 
                />
                <Input
                label="Current CTC"
                type="text"              
                value=""
                labelIcon ={<ReceiptIndianRupee />}              
                required={true} 
                />
                <Input
                label="Expected CTC"
                labelIcon={<ReceiptIndianRupee />}
                type="text"               
                value=""                
                required={true} 
                />
                <Input
                label="Notice Period"
                labelIcon={<ChartLine  />}
                type="text"                
                value=""                
                required={true}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="UAN Number "
                type="text"               
                value=""            
                className=""
                labelIcon ={<ChartLine />}
                required={true} 
                />                
            </div>                                     
            </FormCard>            
            <div>                
        </div>
            
              
            
 </>
    );
}