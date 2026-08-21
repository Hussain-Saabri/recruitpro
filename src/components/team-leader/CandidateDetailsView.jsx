import React from 'react';
import CandidateProfileCard from '../shared/CandidateProfileCard';
import InfoSection from '../ui/InfoSection';
import ListSection from '../ui/ListSection';
import Button from '../ui/Button';
import { ArrowLeft, User, Briefcase, GraduationCap, Building2, Tag, Award, Book, Flag, CheckCircle } from 'lucide-react';

export default function CandidateDetailsView({ candidate, onBack, onStatusUpdate }) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [candidate?.id]);

  if (!candidate) return null;

  const firstName = candidate.name?.split(" ")[0] || "Candidate";
  const lastName = candidate.name?.split(" ").slice(1).join(" ") || "";

  const statuses = [
    "Profile Rejected by Client",
    "Submitted",
    "Profile Rejected by Team Lead",
    "Processed to Client",
    "No Response"
  ];

  const getStatusColor = (statusText) => {
    const s = (statusText || '').toLowerCase();
    if (s.includes('rejected')) {
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
        activeBg: 'bg-rose-50 text-rose-700 border-rose-300 font-semibold shadow-2xs',
        iconColor: 'text-rose-600',
      };
    }
    if (s.includes('processed')) {
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
        activeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold shadow-2xs',
        iconColor: 'text-emerald-600',
      };
    }
    if (s.includes('submitted')) {
      return {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        dot: 'bg-indigo-500',
        activeBg: 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold shadow-2xs',
        iconColor: 'text-indigo-600',
      };
    }
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      activeBg: 'bg-amber-50 text-amber-700 border-amber-300 font-semibold shadow-2xs',
      iconColor: 'text-amber-600',
    };
  };

  return (
    <div className="flex flex-col gap-3.5 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
      {/* Top Navigation Bar */}
      <div className="flex justify-start w-full py-0.5">
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-slate-100/80 border border-slate-200/60 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors shadow-2xs">
            <ArrowLeft size={13} strokeWidth={2.2} />
          </div>
          <span>Back to Candidates</span>
        </button>
      </div>

      {/* Profile Overview Banner */}
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
        }}
      />

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Columns: Personal, Education, Work History */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <InfoSection
            title="Personal Information"
            icon={<User size={14} strokeWidth={2.5} />}
            items={[
              { label: "First Name", value: firstName },
              { label: "Last Name", value: lastName || "-" },
              { label: "Gender", value: candidate.gender || "Female" },
              { label: "Date of Birth", value: candidate.dob || "15/5/1990" },
              { label: "PAN Number", value: candidate.pan || "ABCDE1234F" },
              { label: "Email", value: candidate.email || "-" },
              { label: "Phone", value: candidate.phone || "+1234567890" },
              { label: "Address", value: candidate.address || "123 Main St, New York, NY, 10001", fullWidth: true }
            ]}
          />

          <ListSection
            title="Education"
            icon={<GraduationCap size={14} strokeWidth={2.5} />}
            items={[
              {
                title: "MIT",
                icon: <GraduationCap size={20} strokeWidth={2} />,
                badges: [
                  { text: "Bachelor of Science", icon: <Award size={10} /> },
                  { text: "Computer Science", icon: <Book size={10} /> },
                  { text: "Full-time", icon: <Tag size={10} /> }
                ],
                date: "— → 2012-05",
                location: "Cambridge, MA"
              }
            ]}
          />

          <ListSection
            title="Employment History"
            icon={<Briefcase size={14} strokeWidth={2.5} />}
            items={[
              {
                title: "TechCorp Inc",
                subtitle: "Senior Developer",
                icon: <Briefcase size={20} strokeWidth={2} />,
                badges: [
                  { text: "Full-time", icon: <Tag size={10} /> }
                ],
                date: "2018-06 → 2023-12",
                location: "San Francisco, CA"
              }
            ]}
          />
        </div>

        {/* Right 1 Column: Client Information & Status Update */}
        <div className="flex flex-col gap-4">
          <InfoSection
            title="Client Information"
            icon={<Building2 size={14} strokeWidth={2.5} />}
            items={[
              { label: "Client Name", value: candidate.client || "Tech Corp" },
              { label: "Requirement ID", value: candidate.id || "REQ-2025-FS-001" },
              { label: "Work Type", value: "Virtual Drive" },
              { label: "Interview Type", value: "-" },
              { label: "Onboarding", value: "Contract to Hire" },
              { label: "Current CTC", value: "12 LPA" },
              { label: "Expected CTC", value: "15 LPA" },
              { label: "UAN Number", value: "123456789012" },
              { label: "Recruiter", value: candidate.recruiter || "John Recruiter" },
            ]}
          />

          {/* Candidate Status Management Card */}
          <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-lg p-5 shadow-sm flex flex-col gap-3 overflow-hidden">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Flag size={16} className="text-brand-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Application Status</h3>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-slate-500 font-medium">Current Status:</span>
              {(() => {
                const current = getStatusColor(candidate.status);
                return (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${current.bg} ${current.text} ${current.border} border flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
                    {candidate.status || "Submitted"}
                  </span>
                );
              })()}
            </div>

            {onStatusUpdate && (
              <div className="mt-2 flex flex-col gap-1.5">
                <span className="text-xs text-slate-500 font-medium">Update Status:</span>
                <div className="flex flex-col gap-1.5">
                  {statuses.map((status) => {
                    const isCurrent = candidate.status?.toLowerCase() === status.toLowerCase();
                    const style = getStatusColor(status);
                    return (
                      <button
                        key={status}
                        onClick={() => onStatusUpdate(candidate, status)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-md border transition-all cursor-pointer flex items-center justify-between ${
                          isCurrent
                            ? style.activeBg
                            : 'bg-slate-50/80 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                          <span>{status}</span>
                        </div>
                        {isCurrent && (
                          <CheckCircle size={14} className={style.iconColor} />
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
