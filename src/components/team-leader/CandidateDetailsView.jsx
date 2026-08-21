import React from 'react';
import PageHeader from '../shared/PageHeader';
import CandidateProfileCard from '../shared/CandidateProfileCard';
import InfoSection from '../ui/InfoSection';
import ListSection from '../ui/ListSection';
import Button from '../ui/Button';
import { ArrowLeft, User, Briefcase, GraduationCap, Building2, Tag, Award, Book, Flag, CheckCircle } from 'lucide-react';

export default function CandidateDetailsView({ candidate, onBack, onStatusUpdate }) {
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

  return (
    <div className="flex flex-col gap-6 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
      <PageHeader
        title={candidate.name || "Candidate Details"}
        subtitle={`Candidate ID: ${candidate.id || 'N/A'} | Role: ${candidate.role || 'N/A'}`}
        icon={User}
        rightAction={
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer text-xs px-3 py-2 rounded-md font-medium"
          >
            <ArrowLeft size={15} /> Back to Candidates
          </Button>
        }
      />

      {/* Profile Overview Banner */}
      <CandidateProfileCard
        candidate={{
          firstName: firstName,
          lastName: lastName,
          role: candidate.role || "Full Stack Developer",
          location: candidate.location || "Goa",
          submittedAt: candidate.created || "20 Jul 2026",
        }}
      />

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Personal, Education, Work History */}
        <div className="lg:col-span-2 flex flex-col gap-6">
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
        <div className="flex flex-col gap-6">
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
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Flag size={16} className="text-brand-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Application Status</h3>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-slate-500 font-medium">Current Status:</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                {candidate.status || "Submitted"}
              </span>
            </div>

            {onStatusUpdate && (
              <div className="mt-2 flex flex-col gap-1.5">
                <span className="text-xs text-slate-500 font-medium">Update Status:</span>
                <div className="flex flex-col gap-1">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => onStatusUpdate(candidate, status)}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer flex items-center justify-between ${
                        candidate.status?.toLowerCase() === status.toLowerCase()
                          ? 'bg-brand-50 text-brand-700 border-brand-300 font-semibold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{status}</span>
                      {candidate.status?.toLowerCase() === status.toLowerCase() && (
                        <CheckCircle size={13} className="text-brand-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
