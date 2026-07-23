import { Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {Hash,Video,Building2,ReceiptIndianRupee,Logs,Handshake,ChartLine} from "lucide-react";
import { useState, useEffect } from "react";
export default function ClientInformation({ jdData, submitTrigger, onValidationResult }) {       
    const [clientName, setClientName] = useState(jdData?.company || "");
    const [reqId, setReqId] = useState(jdData?.id || "");
    const [workType, setWorkType] = useState("");
    const [onboarding, setOnboarding] = useState(jdData?.type || "");
    const [interviewType, setInterviewType] = useState("");
    const [currentCtc, setCurrentCtc] = useState("");
    const [expectedCtc, setExpectedCtc] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const [uanNumber, setUanNumber] = useState("");
    const [errors, setErrors] = useState({});
    console.log("jdData",jdData.company);
    useEffect(() => {
        if (submitTrigger?.count > 0 && submitTrigger?.step === 4) {
            const newErrors = {};
            if (!clientName?.trim()) newErrors.clientName = "Required";
            if (!reqId?.toString().trim()) newErrors.reqId = "Required";
            if (!workType) newErrors.workType = "Required";
            if (!onboarding?.trim()) newErrors.onboarding = "Required";
            if (!interviewType?.trim()) newErrors.interviewType = "Required";
            if (!currentCtc?.trim()) newErrors.currentCtc = "Required";
            if (!expectedCtc?.trim()) newErrors.expectedCtc = "Required";
            if (!noticePeriod?.trim()) newErrors.noticePeriod = "Required";
            
            if (!uanNumber?.trim()) {
                newErrors.uanNumber = "Required";
            } else if (!/^\d{12}$/.test(uanNumber)) {
                newErrors.uanNumber = "UAN must be exactly 12 digits";
            }
            
            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
                onValidationResult(true, { 
                    clientInfo: { clientName, reqId, workType, onboarding, interviewType, currentCtc, expectedCtc, noticePeriod, uanNumber } 
                });
            } else {
                onValidationResult(false, null);
            }
        }
    }, [submitTrigger]);

    const handleUanChange = (e) => {
        const val = e.target.value;
        setUanNumber(val);
        if (/[^0-9]/.test(val)) {
            setErrors(prev => ({ ...prev, uanNumber: "Enter a valid 12-digit UAN" }));
        } else {
            setErrors(prev => ({ ...prev, uanNumber: "" }));
        }
    };

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
                value={jdData.company}
                readOnly
               
                className="w-full"
                labelIcon ={<Building2 />}
                required={true} 
                />              
                <Input
                label="Requirement ID"
                type="text"                
                value={jdData.id}
                readOnly
               
                labelIcon ={<Hash/>}               
                required={true} 
                />
                <Dropdown
                label="Work Type"
                labelIcon={<Logs />}
                options={[
                    {value:"Remote", label:"Remote"},
                    {value:"Work From Office", label:"Work From Office"},
                    {value:"Hybrid", label:"Hybrid"}
                ]}
                value={workType}
                onChange={(val) => {setWorkType(val); errors.workType = "";}}
                error={errors.workType}
                required={true}
                className="w-full h-[46px]"
                />
                <Input
                label="Onboarding"
                labelIcon={<Handshake />}
                type="text"               
                value={jdData.type}
                
                
                required={true} 
                readOnly
                />       
                      
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                
                <Dropdown
                label="Interview Type"
                labelIcon ={<Video  />}
                options={[
                    {value:"virtual", label:"Virtual"},
                    {value:"face_to_face", label:"Face To Face"},
                    {value:"telephonic", label:"Telephonic Interview"}
                ]}
                value={interviewType}
                onChange={(e) => {setInterviewType(e); errors.interviewType = "";}}
                
                error={errors.interviewType}
                required={true}
                className="w-full h-[46px]"
                placeholder="Select Interview Type"
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
                <Dropdown
                label="Notice Period"
                labelIcon={<ChartLine  />}
                options={[
                    {value: "Less than a week", label: "Less than a week"},
                    {value: "Less than 15 days", label: "Less than 15 days"},
                    {value: "Less than 30 days", label: "Less than 30 days"},
                    {value: "Above 45 days", label: "Above 45 days"}
                ]}
                value={noticePeriod}
                onChange={(val) => {setNoticePeriod(val); setErrors(prev => ({ ...prev, noticePeriod: "" }));}}
                error={errors.noticePeriod}
                required={true}
                placeholder="Select Notice Period"
                className="w-full h-[46px]"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="UAN Number"
                type="text"               
                value={uanNumber}
                onChange={handleUanChange}
                maxLength={12}
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