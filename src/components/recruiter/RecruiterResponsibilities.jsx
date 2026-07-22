import React, { useState } from 'react';
import Checkbox from '../ui/Checkbox';
import { Building2 } from 'lucide-react';

export default function RecruiterResponsibilities({ isChecked,
    setIsChecked,}) {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="flex flex-col gap-6 text-[14.5px] text-slate-700 px-2 py-1">
            
            <div className="bg-brand-50 border-l-[3px] border-brand-500 text-brand-600 px-4 py-2.5 rounded-r-md text-sm font-semibold flex flex-wrap items-center gap-2 mb-2">
                <Building2 size={16} className="shrink-0" /> <span className="break-words">Tech Corp • Technology</span>
            </div>

            <div>
                <h3 className="text-[15px] font-medium text-slate-800 mb-3 flex items-center gap-2">
                    ✅ Recruiter Responsibilities
                </h3>
                <div className="space-y-1.5 leading-relaxed text-slate-600">
                    <p>• Confirm that the candidate has completed 15 years of continuous full-time education without any academic gaps.</p>
                    <p>• Verify that the candidate can provide the following mandatory employment documents:</p>
                    <div className="pl-4 space-y-1.5">
                        <p>- Provident Fund (PF) records</p>
                        <p>- Form 16 documents</p>
                        <p>- Last 3 years’ bank statements</p>
                        <p>- UAN (Universal Account Number) details</p>
                    </div>
                    <p>• Ensure that the candidate’s notice period does not exceed 15 days.</p>
                    <p>• Validate that all candidate information submitted is accurate, complete, and supported by appropriate documentation.</p>
                </div>
            </div>

            <div>
                <h3 className="text-[15px] font-medium text-slate-800 mb-3 flex items-center gap-2">
                    ❌ Do Not Submit Candidates If
                </h3>
                <div className="space-y-1.5 leading-relaxed text-slate-600">
                    <p>• There is any overlap between the candidate’s education and employment timelines.</p>
                    <p>• The candidate has a career gap exceeding 2 years.</p>
                    <p>• Mandatory employment verification documents are unavailable.</p>
                    <p>• Any information provided by the candidate is incomplete, inaccurate, or unverifiable.</p>
                </div>
            </div>

            <div className="bg-slate-50/50 border border-slate-200 rounded-lg p-4 mt-2">
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
