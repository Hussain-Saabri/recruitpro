import { Button, Input } from "../ui";
import { MoveRight, MoveLeft, ClipboardCheck, Send, Check, UserPlus, User, GraduationCap, Briefcase, Building, FileUp } from "lucide-react";
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
import { useNavigate, useLocation } from "react-router-dom";
export default function AddJD({ onSubmit }) {
    const { state } = useLocation();
    const jdData = state?.jdData;
    const [isChecked, setIsChecked] = useState(false);
    const [isReviewChecked, setIsReviewChecked] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [step, setStep] = useState(1);
    const [review, setReview] = useState(false);

    const [submitTrigger, setSubmitTrigger] = useState({ count: 0, step: 1 });
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const handleSubmit = () => {
        console.log("DATA COLLECTED SO FAR:", formData);
        console.log(formData.resumeFile);
        setReview(false); // Close first modal
        setShowInfo(true); // Open second modal

    }
    const handleNext = () => {
        if (step >= 1 && step <= 4) {
            setSubmitTrigger(prev => ({ count: prev.count + 1, step: step }));
        }
    }

    const onStepValid = (isValid, stepData, currentStep) => {
        if (stepData) {
            setFormData(prev => ({ ...prev, ...stepData }));
        }
        if (isValid) {
            if (currentStep === 5) {
                setReview(true);
            } else {
                setStep((prev) => prev + 1);
            }
        } else {
            toast.error("Please fill all required fields correctly.");
        }
    }

    const handlePre = () => {
        setStep(step - 1);
        console.log("clicked on handlepre");
    }

    const handleReview = () => {
        console.log("clicked on handleReview");
        setSubmitTrigger(prev => ({ count: prev.count + 1, step: 5 }));
    }

    const handleSubmitProfile = () => {
        console.log("FINAL PROFILE DATA TO SUBMIT:", formData);
        toast.success("Data Submitted Sucessfully")
        setShowInfo(false);
        navigate('/jds');
    }



    return (
        <div className="flex flex-col items-center w-full">
            <StepperHeader
                title="Add Candidate"
                icon={<UserPlus size={16} strokeWidth={2.5} />}
                subtitle={jdData ? `For: ${jdData.title} - ${jdData.company} (${jdData.id})` : "For: Unknown Role"}
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
                <div className={step === 1 ? "block" : "hidden"}>
                    <PersonalInformation jdData={jdData} submitTrigger={submitTrigger} onValidationResult={(isValid, data) => onStepValid(isValid, data, 1)} />
                </div>
                <div className={step === 2 ? "block" : "hidden"}>
                    <EducationalInformation submitTrigger={submitTrigger} onValidationResult={(isValid, data) => onStepValid(isValid, data, 2)} />
                </div>
                <div className={step === 3 ? "block" : "hidden"}>
                    <EmploymentInformation submitTrigger={submitTrigger} onValidationResult={(isValid, data) => onStepValid(isValid, data, 3)} />
                </div>
                <div className={step === 4 ? "block" : "hidden"}>
                    <ClientInformation jdData={jdData} submitTrigger={submitTrigger} onValidationResult={(isValid, data) => onStepValid(isValid, data, 4)} />
                </div>
                <div className={step === 5 ? "block" : "hidden"}>
                    <ResumeUpload submitTrigger={submitTrigger} onValidationResult={(isValid, data) => onStepValid(isValid, data, 5)} />
                </div>
            </div>

            {
                step > 1 && step < 5 && (
                    <div className="w-full">
                        <Separator className="mt-4 mb-4 bg-brand-500/20" />
                        <div className="flex justify-between items-center w-full">
                            <Button onClick={handlePre} variant="outline" size="sm" className=" hover:bg-brand-50  border-gray-200 text-black h-8 gap-1.5  transition-all cursor-pointer hover:border-brand-600">
                                <MoveLeft className="text-black font-bold" /> Previous
                            </Button>
                            <Button onClick={handleNext} variant="outline" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white border-none h-8 gap-1.5  transition-all cursor-pointer hover:text-white">
                                Next<MoveRight className="text-white font-bold" />
                            </Button>
                        </div>
                    </div>
                )
            }
            {
                step === 1 && (
                    <div className="w-full">
                        <Separator className="mt-4 mb-4 bg-brand-500/20" />
                        <div className="flex justify-end items-center w-full">
                            <Button onClick={handleNext} variant="outline" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white border-none h-8 gap-1.5  transition-all cursor-pointer hover:text-white">
                                Next<MoveRight className="text-white font-bold" />
                            </Button>
                        </div>
                    </div>
                )
            }

            {
                step == 5 && (
                    <div className="w-full">
                        <Separator className="mt-4 mb-4 bg-brand-500/20" />
                        <div className="flex justify-between items-center w-full">
                            <Button onClick={handlePre} variant="outline" size="sm" className=" hover:bg-brand-50  border-gray-200 text-black h-8 gap-1.5  transition-all cursor-pointer hover:border-brand-600">
                                <MoveLeft className="text-black font-bold" /> Previous
                            </Button>
                            <Button onClick={handleReview} variant="outline" size="sm" className="bg-brand-500 hover:bg-brand-600 text-white border-none h-8 gap-1.5  transition-all cursor-pointer hover:text-white">
                                <ClipboardCheck className="text-white font-bold" />Review & Submit
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
                            submitButtonIcon={<Check className="text-black" />}
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
                        submitButtonIcon={<Send className="text-black" />}
                        cancelButtonIcon={<MoveRight className="text-black" />}
                        submitButton="Submit Profile"
                        cancelButton="Back"
                        icon={<ClipboardCheck size={16} />}
                        className="max-w-3xl"
                        onSubmit={handleSubmitProfile}
                        disabled={!isReviewChecked}
                    >

                        <ReviewSubmission isChecked={isReviewChecked} setIsChecked={setIsReviewChecked} apiData={formData} jdData={jdData} />
                    </Modal>
                )
            }

        </div>
    );
}