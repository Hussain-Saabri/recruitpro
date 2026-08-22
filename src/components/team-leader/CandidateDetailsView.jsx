import React from 'react';
import CandidateProfileCard from '../shared/CandidateProfileCard';
import InfoSection from '../ui/InfoSection';
import ListSection from '../ui/ListSection';
import Button from '../ui/Button';
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  Tag, 
  Award, 
  Book, 
  Flag, 
  CheckCircle,
  Download,
  Send,
  XCircle,
  UserX,
  CheckCircle2,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export default function CandidateDetailsView({ candidate, onBack, onStatusUpdate }) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [candidate?.id]);

  if (!candidate) return null;

  const firstName = candidate.name?.split(" ")[0] || "Candidate";
  const lastName = candidate.name?.split(" ").slice(1).join(" ") || "";

  const statusOptionsList = [
    { label: "Submitted", icon: <Send size={13} className="text-blue-600" />, textClass: "text-blue-600", dotBg: "bg-blue-500", borderClass: "bg-blue-50 border-blue-200" },
    { label: "Profile Rejected by Client", icon: <XCircle size={13} className="text-red-500" />, textClass: "text-red-500", dotBg: "bg-red-500", borderClass: "bg-red-50 border-red-200" },
    { label: "Profile Rejected by Team Lead", icon: <UserX size={13} className="text-orange-500" />, textClass: "text-orange-500", dotBg: "bg-orange-500", borderClass: "bg-orange-50 border-orange-200" },
    { label: "Processed to Client", icon: <CheckCircle2 size={13} className="text-emerald-600" />, textClass: "text-emerald-600", dotBg: "bg-emerald-500", borderClass: "bg-emerald-50 border-emerald-200" },
    { label: "No Response", icon: <HelpCircle size={13} className="text-slate-500" />, textClass: "text-slate-700", dotBg: "bg-slate-500", borderClass: "bg-slate-100 border-slate-300" }
  ];

  const getStatusItem = (statusText) => {
    return statusOptionsList.find(s => s.label.toLowerCase() === (statusText || '').toLowerCase()) || statusOptionsList[0];
  };

  return (
    <div className="flex flex-col gap-3 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
      {/* Back Navigation Button */}
      <div className="flex items-center justify-between py-0.5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-200 transition-all shadow-2xs">
            <ArrowLeft size={14} strokeWidth={2} />
          </div>
          <span>Back to Candidates</span>
        </button>
      </div>

      {/* Profile Overview Hero Banner */}
      <CandidateProfileCard
        candidate={{
          id: candidate.id || "REQ-2025-FS-001",
          name: candidate.name || `${firstName} ${lastName}`.trim(),
          firstName: firstName,
          lastName: lastName,
          role: candidate.role || "Full Stack Developer",
          location: candidate.location || "Goa",
          status: candidate.status || "Submitted",
          submittedAt: candidate.created || "10/01/2025 02:30 PM",
          experience: candidate.experience || "5Y",
          rel: candidate.rel || "4Y"
        }}
      />

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* Left 2 Columns: Personal Information, Education, Employment History */}
        <div className="lg:col-span-2 flex flex-col gap-3.5">
          <InfoSection
            title="Personal Information"
            icon={<User size={14} strokeWidth={2.5} />}
            items={[
              { label: "First Name", value: firstName },
              { label: "Last Name", value: lastName || "-" },
              { label: "Gender", value: candidate.gender || "Female" },
              { label: "Date of Birth", value: candidate.dob || "15/05/1990" },
              { label: "PAN Number", value: candidate.pan || "ABCDE1234F" },
              { label: "Email", value: candidate.email || "alice.johnson@email.com" },
              { label: "Phone", value: candidate.phone || "+1234567890" },
              { label: "Address", value: candidate.address || "123 Main St, New York, NY, 10001", fullWidth: true }
            ]}
          />

          <ListSection
            title="Education"
            icon={<GraduationCap size={14} strokeWidth={2.5} />}
            items={[
              {
                title: "MIT (Massachusetts Institute of Technology)",
                icon: <GraduationCap size={18} strokeWidth={2} />,
                badges: [
                  { text: "Bachelor of Science", icon: <Award size={10} /> },
                  { text: "Computer Science", icon: <Book size={10} /> },
                  { text: "Full-time", icon: <Tag size={10} /> }
                ],
                date: "2008 → 2012",
                location: "Cambridge, MA"
              }
            ]}
          />

          <ListSection
            title="Employment History"
            icon={<Briefcase size={14} strokeWidth={2.5} />}
            items={[
              {
                title: "TechCorp Solutions Inc",
                subtitle: "Senior Full Stack Developer",
                icon: <Briefcase size={18} strokeWidth={2} />,
                badges: [
                  { text: "Full-time", icon: <Tag size={10} /> }
                ],
                date: "2018-06 → 2023-12",
                location: "San Francisco, CA"
              }
            ]}
          />
        </div>

        {/* Right 1 Column: Client Info & Application Status Card */}
        <div className="flex flex-col gap-3.5">
          <InfoSection
            title="Client Information"
            icon={<Building2 size={14} strokeWidth={2.5} />}
            items={[
              { label: "Client Name", value: candidate.client || "Tech Corp" },
              { label: "Requirement ID", value: candidate.id || "REQ-2025-FS-001" },
              { label: "Work Type", value: "Virtual Drive" },
              { label: "Interview Type", value: "Technical Round" },
              { label: "Onboarding", value: "Contract to Hire" },
              { label: "Current CTC", value: "12 LPA" },
              { label: "Expected CTC", value: "15 LPA" },
              { label: "UAN Number", value: "123456789012" },
              { label: "Recruiter", value: candidate.recruiter || "John Recruiter" },
            ]}
          />

          {/* Candidate Status Management Card */}
          <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl p-3.5 shadow-xs flex flex-col gap-2.5 overflow-hidden">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Flag size={15} className="text-brand-600" />
              <h3 className="font-semibold text-slate-800 text-xs">Application Status</h3>
            </div>

            <div className="flex items-center justify-between py-0.5">
              <span className="text-[11px] text-slate-500 font-medium">Current Status:</span>
              {(() => {
                const currentItem = getStatusItem(candidate.status);
                return (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${currentItem.borderClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${currentItem.dotBg}`} />
                    {candidate.status || "Submitted"}
                  </span>
                );
              })()}
            </div>

            {onStatusUpdate && (
              <div className="mt-1 flex flex-col gap-1.5">
                <span className="text-[11px] text-slate-500 font-medium">Update Candidate Status:</span>
                <div className="flex flex-col gap-1">
                  {statusOptionsList.map((item) => {
                    const isCurrent = candidate.status?.toLowerCase() === item.label.toLowerCase();
                    return (
                      <button
                        key={item.label}
                        onClick={() => onStatusUpdate(candidate, item.label)}
                        className={`w-full text-left px-2.5 py-1.5 text-[11px] rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                          isCurrent
                            ? 'bg-brand-50 border-brand-300 font-semibold text-brand-700 shadow-2xs'
                            : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="shrink-0">{item.icon}</span>
                          <span className={item.textClass}>{item.label}</span>
                        </div>
                        {isCurrent && (
                          <CheckCircle size={13} className="text-brand-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
