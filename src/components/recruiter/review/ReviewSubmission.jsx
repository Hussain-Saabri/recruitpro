import React from 'react';
import { User, Building, GraduationCap, Briefcase, FileUp } from "lucide-react";
import CandidateProfileCard from "./CandidateProfileCard";
import ReviewSection from "./ReviewSection";
import ReviewListSection from "./ReviewListSection";
import ReviewResumeSection from "./ReviewResumeSection";
import Checkbox from "../../ui/Checkbox";

export default function ReviewSubmission({ isChecked, setIsChecked }) {
    return (
        <>
            <CandidateProfileCard
                candidate={{
                    firstName: "Dadapir",
                    lastName: "Shaikh",
                    role: "Full Stack Developer",
                    location: "Goa",
                    submittedAt: "20 Jul 2026",
                }}
            />

            <div className="flex flex-col gap-4 mt-4">
                <ReviewSection 
                    title="Personal Information"
                    icon={<User size={14} />}
                    items={[
                        { label: "FIRST NAME", value: "dDDDDDDDDDDD" },
                        { label: "LAST NAME", value: "dDDDDDDDDDDD" },
                        { label: "EMAIL", value: "dadapir19ce30@gmail.com" },
                        { label: "PHONE", value: "9922841004" },
                        { label: "GENDER", value: "Male" },
                        { label: "DATE OF BIRTH", value: "2000-01-20" },
                        { label: "TOTAL EXPERIENCE", value: "0.3 yrs" },
                        { label: "RELEVANT EXPERIENCE", value: "0.2 yrs" },
                        { empty: true },
                        { label: "ADDRESS", value: "Dattagad, ponda, Goa, 403401", fullWidth: true }
                    ]}
                />

                <ReviewSection 
                    title="Client Information"
                    icon={<Building size={14} />}
                    items={[
                        { label: "CLIENT NAME", value: "Tech Corp" },
                        { label: "REQUIREMENT ID", value: "REQ-2025-FS-001" },
                        { label: "WORK TYPE", value: "Remote" },
                        { label: "INTERVIEW TYPE", value: "Virtual" },
                        { label: "ONBOARDING", value: "Contract to Hire" },
                        { label: "CURRENT CTC", value: "0.5" },
                        { label: "EXPECTED CTC", value: "0.3" },
                        { label: "UAN NUMBER", value: "111111111111" },
                        { empty: true }
                    ]}
                />

                <ReviewListSection 
                    title="Education"
                    icon={<GraduationCap size={14} />}
                    cardIcon={<GraduationCap size={16} />}
                    items={[
                        { 
                            title: "Goa College Of Engineering", 
                            badge1: "FFFFFFFFFFFFFF", 
                            badge2: "FFFFFFFFFFFFFF", 
                            badge3: "Full-time",
                            dateRange: "2018-01 → 2019-07",
                            location: "FFFFFFFFFFFFFF"
                        }
                    ]}
                />

                <ReviewListSection 
                    title="Employment History"
                    icon={<Briefcase size={14} />}
                    cardIcon={<Briefcase size={16} />}
                    items={[
                        { 
                            title: "FFFFFFFFFFFFFFF", 
                            subtitle: "FFFFFFFFFFFFFFF",
                            badge4: "FFFFFFFFFFFFFFF", 
                            badge3: "Part-time",
                            dateRange: "2025-08 → 2026-06",
                            location: "FFFFFFFFFFFFFFF"
                        }
                    ]}
                />

                <ReviewResumeSection 
                    icon={<FileUp size={14} />}
                    file={{ name: "Dadapir_Shaikh_Resume.pdf", size: "108.6 KB" }}
                />
            </div>

            <div className="bg-slate-50/50 border border-slate-200 rounded-lg py-2.5 px-3 mt-4">
                <Checkbox 
                    id="submission"
                    label="I confirm that all information provided is accurate and complete, and I take full responsibility for this submission."
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
            </div>
        </>
    );
}
