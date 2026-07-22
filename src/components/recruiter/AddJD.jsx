import { Button, Input } from "../ui";
import {MoveRight,MoveLeft,ClipboardCheck,Send,Check, UserPlus, User, GraduationCap, Briefcase, Building, FileUp} from "lucide-react";
import Separator from "../ui/Separator";
import EducationalInformation from "./EducationalInformation";
import EmploymentInformation from "./EmploymentInformation";
import PersonalInformation from "./PersonalInformation";
import { toast } from "sonner";
import ClientInformation from "./ClientInformation";
import ResumeUpload from "./ResumeUpload";
import { useState } from "react";
import Modal from "../ui/Modal";
import RecruiterResponsibilities from "./RecruiterResponsibilities";
import ReviewSubmission from "./review/ReviewSubmission";
import StepperHeader from "../ui/StepperHeader";
import { useNavigate } from "react-router-dom";
export default function AddJD({onSubmit}) {
    const [isChecked, setIsChecked] = useState(false);
    const [showInfo,setShowInfo] = useState(false);
    const[step,setStep] = useState(1);
    const[review,setReview] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = () => {
        setReview(false); // Close first modal
        setShowInfo(true); // Open second modal
        
    }
    const handleNext=()=>{
        setStep(step+1);
        console.log("clicked on handlenext");
        
    }

    const handlePre=()=>{
        setStep(step-1);
        console.log("clicked on handlepre");
        
    }

    const handleReview=()=>{
        
        console.log("clicked on handleReview");
        setReview(true);
    }

    const handleSubmitProfile=()=>{
        
        toast.success("Data Submitted Sucessfully")       
        setShowInfo(false);
        navigate('/jds');
    }
    
   
    
    return (
        <div className="flex flex-col items-center w-full">
            <StepperHeader 
                title="Add Candidate"
                icon={<UserPlus size={16} strokeWidth={2.5} />}
                subtitle="For: Full Stack Developer - Tech Corp (REQ-2025-FS-001)"
                description="Complete all sections to submit"
                currentStep={step}
                steps={[
                    { label: "Personal", icon: <User size={18} /> },
                    { label: "Education", icon: <GraduationCap size={18} /> },
                    { label: "Employment", icon: <Briefcase size={18} /> },
                    { label: "Client", icon: <Building size={18} /> },
                    { label: "Resume", icon: <FileUp size={18} /> }
                ]}
            />
        <div className="w-full mt-4">
        {step === 1 && (
                                  
            <PersonalInformation/>              
        )}
       
        {
        step === 2 && (
        <EducationalInformation />
        )
        }   
        {
        step === 3 && (
        <EmploymentInformation />
        )
        }
        {step === 4 && (
                                  
            <ClientInformation/>              
        )}
        {step === 5 && (
                                  
            <ResumeUpload/>              
        )}
        </div>

    {
        step > 1 && step < 5 && (
            <div className="w-full">
            <Separator className="mt-4 mb-4 bg-brand-500/20"/>
            <div className="flex justify-between items-center w-full">
                <Button onClick={handlePre} variant="outline" size="sm" className=" hover:bg-brand-50  border-gray-200 text-black h-8 gap-1.5  transition-all cursor-pointer hover:border-brand-600">
                 <MoveLeft className="text-black font-bold"/> Previous
            </Button>
            <Button onClick={handleNext} variant="outline" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white border-none h-8 gap-1.5  transition-all cursor-pointer hover:text-white">
                 Next<MoveRight className="text-white font-bold"/>
            </Button>
            </div>
            </div>
        )
    }
    {
        step === 1 && (
            <div className="w-full">
            <Separator className="mt-4 mb-4 bg-brand-500/20"/>
            <div className="flex justify-end items-center w-full">
                <Button onClick={handleNext} variant="outline" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white border-none h-8 gap-1.5  transition-all cursor-pointer hover:text-white">
                 Next<MoveRight className="text-white font-bold"/>
                </Button>
            </div>
            </div>
        )
    }

    {
        step == 5  && (
            <div className="w-full">
            <Separator className="mt-4 mb-4 bg-brand-500/20"/>
            <div className="flex justify-between items-center w-full">
                <Button onClick={handlePre} variant="outline" size="sm" className=" hover:bg-brand-50  border-gray-200 text-black h-8 gap-1.5  transition-all cursor-pointer hover:border-brand-600">
                 <MoveLeft className="text-black font-bold"/> Previous
            </Button>
            <Button onClick={handleReview} variant="outline" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white border-none h-8 gap-1.5  transition-all cursor-pointer hover:text-white">
                 <ClipboardCheck  className="text-white font-bold"/>Review & Submit
            </Button>
            </div>
            </div>
        )
    }
{
    review == true && (
        <>
            <Modal  
            isOpen={review}
            disabled={!isChecked}
            onClose={() => setReview(false)}
            title="Recruiter Responsibilities"
            submitButtonIcon={<Check className="text-black"/>}
            submitButton="Confirm & Review Submission"
            cancelButton="Cancel"
            icon={<ClipboardCheck size={16} />}
            className="max-w-3xl"
            onSubmit={handleSubmit}
            >

            <RecruiterResponsibilities 
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                
            />

            </Modal>
        </>
    )
}
{
    showInfo && (
        <Modal
        isOpen={showInfo}
        onClose={() => {
            setShowInfo(false);
            setReview(false);
        }}
        title="Review & Confirm Submission"
        submitButtonIcon={<Send className="text-black"/>}
        cancelButtonIcon={<MoveRight className="text-black"/>}
        submitButton="Submit Profile" 
        cancelButton="Back"
        icon={<ClipboardCheck size={16} />}
        className="max-w-3xl"
        onSubmit={handleSubmitProfile}
        disabled={!isChecked}
        >

        <ReviewSubmission isChecked={isChecked} setIsChecked={setIsChecked} />
        </Modal>
    )
}
    
        </div>
    );
}