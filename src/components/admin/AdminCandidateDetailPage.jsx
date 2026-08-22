import React from "react";
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Building, 
  Award, 
  Clock, 
  DollarSign, 
  UserCheck, 
  Download,
  ChevronRight,
  Flag,
  CheckCircle,
  FileText
} from "lucide-react";
import Button from "../ui/Button";
import { getStatusBadgeStyle } from "./CandidateColumns";

export default function AdminCandidateDetailPage({ candidate, onBack, onStatusUpdate }) {
  if (!candidate) return null;

  const initials = candidate.name
    ? candidate.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "CA";

  const statusOptions = [
    "SUBMITTED",
    "PROCESSED TO CLIENT",
    "SELECTED",
    "REJECTED"
  ];

  return (
    <div className="flex flex-col gap-5 font-sans text-left w-full max-w-full overflow-x-hidden p-2 md:p-3 animate-fadeIn">
      {/* Top Breadcrumb & Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/70">
        <div className="flex flex-col gap-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="hover:text-slate-700 cursor-pointer" onClick={onBack}>Dashboard</span>
            <ChevronRight size={12} />
            <span className="hover:text-slate-700 cursor-pointer" onClick={onBack}>Candidates</span>
            <ChevronRight size={12} />
            <span className="text-slate-800 font-semibold">{candidate.name}</span>
          </div>

          {/* Title & Back Button */}
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
              title="Back to Candidates"
            >
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                Candidate Profile
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Complete candidate details & application lifecycle
              </p>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 text-xs font-semibold gap-1.5 border-slate-200 hover:bg-slate-50 cursor-pointer"
            onClick={() => alert("Downloading Candidate Resume...")}
          >
            <Download size={14} className="text-brand-600" />
            <span>Download Resume</span>
          </Button>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Avatar & Candidate Primary Info */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-brand-500/20">
                {initials}
              </div>
              <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5 z-10 shadow-2xs" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  {candidate.name}
                </h2>
                <span className={`px-3 py-0.5 text-[10px] font-extrabold rounded-full border tracking-wide uppercase ${getStatusBadgeStyle(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                {candidate.role}
              </p>

              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 font-medium mt-0.5">
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                  <Briefcase size={12} className="text-brand-500" />
                  <span>{candidate.role}</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                  <MapPin size={12} className="text-brand-500" />
                  <span>{candidate.workLocation || "Location N/A"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Info: Submitted Timestamp & Candidate ID */}
          <div className="flex flex-col sm:items-end justify-center text-xs text-slate-500 font-medium border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <div className="bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 mb-1.5">
              <Calendar size={13} className="text-brand-500" />
              <span>Applied: {candidate.date} {candidate.time || ""}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Requirement ID: <span className="font-bold text-slate-800">{candidate.reqCode || candidate.id || "REQ-001"}</span>
            </p>
          </div>
        </div>

        {/* KPI Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100">
          <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Award size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Exp.</span>
              <span className="text-xs font-bold text-slate-800">{candidate.exp || "5Y"}</span>
            </div>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Clock size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rel. Exp.</span>
              <span className="text-xs font-bold text-slate-800">{candidate.relExp || "4Y"}</span>
            </div>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expected CTC</span>
              <span className="text-xs font-bold text-slate-800">{candidate.clientInfo?.expectedCtc || "15 LPA"}</span>
            </div>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UserCheck size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notice Period</span>
              <span className="text-xs font-bold text-slate-800">{candidate.noticePeriod || "Immediate"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Columns: Personal, Professional, Education & Employment */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Personal Information Card */}
          <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white">
              <div className="w-6 h-6 rounded-md bg-brand-50 flex items-center justify-center text-brand-600">
                <User size={14} strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 text-xs">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Name</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.firstName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Name</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.lastName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gender</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.gender}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date of Birth</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.dob}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">PAN Number</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block uppercase">{candidate.panNumber}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.email}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.phone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.address}</span>
              </div>
            </div>
          </div>

          {/* Professional Details Card */}
          <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white">
              <div className="w-6 h-6 rounded-md bg-brand-50 flex items-center justify-center text-brand-600">
                <Briefcase size={14} strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Professional Details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 text-xs">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role Applied For</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.role}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Experience</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.exp}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Relevant Experience</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.relExp}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notice Period</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.noticePeriod}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Skills</span>
                <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.skills}</span>
              </div>
            </div>
          </div>

          {/* Education History Card */}
          {candidate.education && candidate.education.length > 0 && (
            <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-brand-50 flex items-center justify-center text-brand-600">
                    <GraduationCap size={14} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Education History</h3>
                </div>
                <span className="bg-brand-50 text-brand-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  {candidate.education.length} record(s)
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {candidate.education.map((edu, idx) => (
                  <div key={idx} className="border border-slate-200/80 bg-slate-50/50 rounded-xl p-3.5 flex gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-brand-100/60 text-brand-600 flex items-center justify-center shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <h4 className="text-sm font-bold text-slate-900">{edu.collegeName}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-brand-600">{edu.degree}</span>
                        <span>•</span>
                        <span>{edu.stream}</span>
                        <span>•</span>
                        <span className="italic">{edu.streamType}</span>
                      </div>
                      <div className="flex gap-4 text-[11px] text-slate-400 font-medium mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {edu.startDate} - {edu.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employment History Card */}
          {candidate.employment && candidate.employment.length > 0 && (
            <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-brand-50 flex items-center justify-center text-brand-600">
                    <Briefcase size={14} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Employment History</h3>
                </div>
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  {candidate.employment.length} record(s)
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {candidate.employment.map((emp, idx) => (
                  <div key={idx} className="border border-slate-200/80 bg-slate-50/50 rounded-xl p-3.5 flex gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100/60 text-emerald-600 flex items-center justify-center shrink-0">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <h4 className="text-sm font-bold text-slate-900">{emp.companyName}</h4>
                      <p className="text-xs font-semibold text-brand-600">{emp.designation}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>Payroll: {emp.payrollCompany}</span>
                        <span>•</span>
                        <span>Type: {emp.employmentType}</span>
                      </div>
                      <div className="flex gap-4 text-[11px] text-slate-400 font-medium mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {emp.startDate} - {emp.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {emp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Column: Client Info & Application Status Card */}
        <div className="flex flex-col gap-5">
          {/* Client & Pipeline Info Card */}
          {candidate.clientInfo && (
            <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl overflow-hidden shadow-xs">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white">
                <div className="w-6 h-6 rounded-md bg-brand-50 flex items-center justify-center text-brand-600">
                  <Building size={14} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Client & Pipeline Info</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 text-xs">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client Name</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.clientName}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Requirement ID</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.requirementId}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Work Type</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.requirementType}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interview Type</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.interviewType}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Onboarding Type</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.onboardingType}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current CTC</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.currentCtc}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expected CTC</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.expectedCtc}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">UAN Number</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">{candidate.clientInfo.uanNumber}</span>
                </div>
              </div>
            </div>
          )}

          {/* Status Management Card */}
          <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl p-4 shadow-xs flex flex-col gap-3 overflow-hidden">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Flag size={16} className="text-brand-600" />
              <h3 className="font-semibold text-slate-800 text-sm">Application Status</h3>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-slate-500 font-medium">Current Status:</span>
              <span className={`px-3 py-0.5 text-[10px] font-extrabold rounded-full border tracking-wide uppercase ${getStatusBadgeStyle(candidate.status)}`}>
                {candidate.status}
              </span>
            </div>

            {onStatusUpdate && (
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-xs text-slate-500 font-medium">Update Status:</span>
                <div className="flex flex-col gap-1.5">
                  {statusOptions.map((status) => {
                    const isCurrent = candidate.status === status;
                    return (
                      <button
                        key={status}
                        onClick={() => onStatusUpdate(candidate, status)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                          isCurrent
                            ? 'bg-brand-50 border-brand-300 font-semibold text-brand-700 shadow-2xs'
                            : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{status}</span>
                        {isCurrent && (
                          <CheckCircle size={14} className="text-brand-600" />
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
