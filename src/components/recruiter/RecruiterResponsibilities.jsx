import React from 'react';
import Checkbox from '../ui/Checkbox';
import { Building2 } from 'lucide-react';
import Separator from '../ui/Separator';

export default function RecruiterResponsibilities({ isChecked, setIsChecked }) {
    return (
        <div className="flex flex-col text-[14px] text-slate-700">
            
            {/* Header Badge */}
            <div className="mb-6 flex">
                <div className="inline-flex items-center gap-1.5 text-brand-500 px-0 py-0 text-[12.5px] font-semibold">
                    <Building2 size={14} />
                    <span>Tech Corp • Technology</span>
                </div>
            </div>

            {/* Section 1 */}
            <div className="mb-6">
                <h3 className="text-base font-bold text-brand-500 mb-3">
                    Recruiter Responsibilities
                </h3>
                <ul className="list-decimal pl-5 space-y-2.5 text-slate-600 leading-relaxed text-[13.5px]">
                    <li>Confirm that the candidate has completed 15 years of continuous full-time education without any academic gaps.</li>
                    <li>
                        Verify that the candidate can provide the following mandatory employment documents:
                        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-500">
                            <li>Provident Fund (PF) records</li>
                            <li>Form 16 documents</li>
                            <li>Last 3 years’ bank statements</li>
                            <li>UAN (Universal Account Number) details</li>
                        </ul>
                    </li>
                    <li>Ensure that the candidate’s notice period does not exceed 15 days.</li>
                    <li>Validate that all candidate information submitted is accurate, complete, and supported by appropriate documentation.</li>
                </ul>
            </div>

            <Separator className="mb-6" />

            {/* Section 2 */}
            <div className="mb-6">
                <h3 className="text-base font-bold text-brand-500 mb-3">
                    Do Not Submit Candidates If
                </h3>
                <ul className="list-decimal pl-5 space-y-2.5 text-slate-600 leading-relaxed text-[13.5px]">
                    <li>There is any overlap between the candidate’s education and employment timelines.</li>
                    <li>The candidate has a career gap exceeding 2 years.</li>
                    <li>Mandatory employment verification documents are unavailable.</li>
                    <li>Any information provided by the candidate is incomplete, inaccurate, or unverifiable.</li>
                </ul>
            </div>

            <Separator className="mb-6" />

            {/* Confirmation Checkbox */}
            <div className="bg-brand-50/50 border border-brand-100 rounded-lg p-4">
                <Checkbox 
                    id="confirm-responsibilities"
                    label="I have read and understood the above responsibilities and confirm that the candidate profile I am submitting complies with all stated requirements."
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
            </div>
            
        </div>
    );
}
