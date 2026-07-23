import { Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {Hash,Video,Building2,ReceiptIndianRupee,Logs,Handshake,ChartLine} from "lucide-react";
import { useState, useEffect } from "react";
export default function ClientInformation({ submitTrigger, onValidationResult }) {       
    const [clientName, setClientName] = useState("");
    const [reqId, setReqId] = useState("");
    const [workType, setWorkType] = useState("");
    const [onboarding, setOnboarding] = useState("");
    const [interviewType, setInterviewType] = useState("");
    const [currentCtc, setCurrentCtc] = useState("");
    const [expectedCtc, setExpectedCtc] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const [uanNumber, setUanNumber] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (submitTrigger?.count > 0 && submitTrigger?.step === 4) {
            const newErrors = {};
            if (!clientName.trim()) newErrors.clientName = "Required";
            if (!reqId.trim()) newErrors.reqId = "Required";
            if (!workType) newErrors.workType = "Required";
            if (!onboarding.trim()) newErrors.onboarding = "Required";
            if (!interviewType.trim()) newErrors.interviewType = "Required";
            if (!currentCtc.trim()) newErrors.currentCtc = "Required";
            if (!expectedCtc.trim()) newErrors.expectedCtc = "Required";
            if (!noticePeriod.trim()) newErrors.noticePeriod = "Required";
            if (!uanNumber.trim()) newErrors.uanNumber = "Required";
            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
                onValidationResult(true, { 
                    clientInfo: { clientName, reqId, workType, onboarding, interviewType, currentCtc, expectedCtc, noticePeriod, uanNumber } 
                });
            }
        }
    }, [submitTrigger]);

    return (
        <>
            <FormCard
                title="Client Information"
                
                icon ={<Building2 />}
            >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <Input
                label="Client Name"
                type="text"                
                value={clientName}
                onChange={(e) => {setClientName(e.target.value); errors.clientName = "";}}
                error={errors.clientName}
                className="w-full"
                labelIcon ={<Building2 />}
                required={true} 
                />              
                <Input
                label="Requirement ID"
                type="text"                
                value={reqId}
                onChange={(e) => {setReqId(e.target.value); errors.reqId = "";}}
                error={errors.reqId}
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
                value={workType}
                onChange={(val) => {setWorkType(val); errors.workType = "";}}
                error={errors.workType}
                required={true}
                className="w-full h-[42px]"
                />
                <Input
                label="Onboarding"
                labelIcon={<Handshake />}
                type="text"               
                value={onboarding}
                onChange={(e) => {setOnboarding(e.target.value); errors.onboarding = "";}}
                error={errors.onboarding}
                required={true} 
                />                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="Interview Type"
                type="text"               
                value={interviewType}
                onChange={(e) => {setInterviewType(e.target.value); errors.interviewType = "";}}
                error={errors.interviewType}
                className="w-full"
                labelIcon ={<Video  />}
                required={true} 
                />
                <Input
                label="Current CTC"
                type="text"              
                value={currentCtc}
                onChange={(e) => {setCurrentCtc(e.target.value); errors.currentCtc = "";}}
                error={errors.currentCtc}
                labelIcon ={<ReceiptIndianRupee />}              
                required={true} 
                />
                <Input
                label="Expected CTC"
                labelIcon={<ReceiptIndianRupee />}
                type="text"               
                value={expectedCtc}
                onChange={(e) => {setExpectedCtc(e.target.value); errors.expectedCtc = "";}}
                error={errors.expectedCtc}
                required={true} 
                />
                <Input
                label="Notice Period"
                labelIcon={<ChartLine  />}
                type="text"                
                value={noticePeriod}
                onChange={(e) => {setNoticePeriod(e.target.value); errors.noticePeriod = "";}}
                error={errors.noticePeriod}
                required={true}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="UAN Number "
                type="text"               
                value={uanNumber}
                onChange={(e) => {setUanNumber(e.target.value); errors.uanNumber = "";}}
                error={errors.uanNumber}
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