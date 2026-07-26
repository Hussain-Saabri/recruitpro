import React from 'react';
import { User, Building, GraduationCap, Briefcase, FileUp } from "lucide-react";
import CandidateProfileCard from "../../shared/CandidateProfileCard";
import ReviewSection from "./ReviewSection";
import ReviewListSection from "./ReviewListSection";
import ReviewResumeSection from "./ReviewResumeSection";
import Checkbox from "../../ui/Checkbox";

export default function ReviewSubmission({ isChecked, setIsChecked, apiData = {}, jdData = null }) {
    const { personalInfo = {}, educations = [], employments = [], clientInfo = {}, resumeFile = null } = apiData;
    
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <>
            <CandidateProfileCard
                candidate={{
                    firstName: personalInfo.firstName || "Unknown",
                    lastName: personalInfo.lastName || "Candidate",
                    role: jdData ? jdData.title : "Unknown Role",
                    location: personalInfo.workLocation || "Unknown",
                    submittedAt: today,
                }}
            />

            <div className="flex flex-col gap-4 mt-4">
                <ReviewSection 
                    title="Personal Information"
                    icon={<User size={14} />}
                    items={[
                        { label: "FIRST NAME", value: personalInfo.firstName || "-" },
                        { label: "LAST NAME", value: personalInfo.lastName || "-" },
                        { label: "EMAIL", value: personalInfo.email || "-" },
                        { label: "PHONE", value: personalInfo.phone || "-" },
                        { label: "GENDER", value: personalInfo.gender || "-" },
                        { label: "DATE OF BIRTH", value: personalInfo.dob || "-" },
                        { label: "TOTAL EXPERIENCE", value: personalInfo.totalExperience ? `${personalInfo.totalExperience} yrs` : "-" },
                        { label: "RELEVANT EXPERIENCE", value: personalInfo.relevantExperience ? `${personalInfo.relevantExperience} yrs` : "-" },
                        { empty: true },
                        { label: "LOCATION", value: personalInfo.workLocation || "-", fullWidth: true }
                    ]}
                />

                <ReviewSection 
                    title="Client Information"
                    icon={<Building size={14} />}
                    items={[
                        { label: "CLIENT NAME", value: clientInfo.clientName || "-" },
                        { label: "REQUIREMENT ID", value: clientInfo.reqId || "-" },
                        { label: "WORK TYPE", value: clientInfo.workType || "-" },
                        { label: "INTERVIEW TYPE", value: clientInfo.interviewType || "-" },
                        { label: "ONBOARDING", value: clientInfo.onboarding || "-" },
                        { label: "CURRENT CTC", value: clientInfo.currentCtc || "-" },
                        { label: "EXPECTED CTC", value: clientInfo.expectedCtc || "-" },
                        { label: "UAN NUMBER", value: clientInfo.uanNumber || "-" },
                        { label: "NOTICE PERIOD", value: clientInfo.noticePeriod || "-" }
                    ]}
                />

                <ReviewListSection 
                    title="Education"
                    icon={<GraduationCap size={14} />}
                    cardIcon={<GraduationCap size={16} />}
                    items={educations.map(edu => ({
                        title: edu.college || "-", 
                        badge1: edu.degree || "-", 
                        badge2: edu.stream || "-", 
                        badge3: edu.type || "-",
                        dateRange: `${edu.startDate || ""} → ${edu.endDate || ""}`,
                        location: edu.location || "-"
                    }))}
                />

                <ReviewListSection 
                    title="Employment History"
                    icon={<Briefcase size={14} />}
                    cardIcon={<Briefcase size={16} />}
                    items={employments.map(emp => ({
                        title: emp.company || "-", 
                        subtitle: emp.payrollCompany || "-",
                        badge4: emp.stream || "-", 
                        badge3: emp.type || "-",
                        dateRange: `${emp.startDate || ""} → ${emp.endDate || ""}`,
                        location: emp.location || "-"
                    }))}
                />

                <ReviewResumeSection 
                    icon={<FileUp size={14} />}
                    file={resumeFile ? { 
                        name: resumeFile.name, 
                        size: `${(resumeFile.size / 1024).toFixed(1)} KB` 
                    } : { name: "No file uploaded", size: "" }}
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
