import React from "react";
import { User, Briefcase, MapPin, Calendar, GraduationCap, Building, X } from "lucide-react";
import { getStatusBadgeStyle } from "./CandidateColumns";

export default function CandidateDetailModal({ selectedCandidate, setSelectedCandidate }) {
  if (!selectedCandidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedCandidate(null)}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-gray-100 flex flex-col relative animate-fadeInUp">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-500">
              <User size={16} strokeWidth={2.5} />
            </div>
            <h2 className="text-base font-bold text-slate-800 m-0">Candidate Profile</h2>
          </div>
          <button
            onClick={() => setSelectedCandidate(null)}
            className="w-8 h-8 rounded hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center cursor-pointer transition-all"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-sm">
          {/* Hero Banner Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 font-bold text-2xl shrink-0">
              {selectedCandidate.firstName[0]}
              {selectedCandidate.lastName[0]}
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
              <div className="text-xl font-bold text-slate-800 leading-tight">
                {selectedCandidate.name}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <Briefcase size={12} className="text-slate-500" />
                  {selectedCandidate.role}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <MapPin size={12} className="text-slate-500" />
                  {selectedCandidate.workLocation}
                </span>
                <span className={`px-3 py-0.5 text-[9px] font-bold rounded-full border tracking-wide uppercase ${getStatusBadgeStyle(selectedCandidate.status)}`}>
                  {selectedCandidate.status}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <Calendar size={11} />
                Submitted: {selectedCandidate.date} at {selectedCandidate.time}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold">
              <User size={14} className="text-brand-500" />
              <span>Personal Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3">
              <div>
                <span className="block text-xs text-slate-400 font-semibold">First Name</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.firstName}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Last Name</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.lastName}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Gender</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.gender}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Date of Birth</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.dob}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">PAN Number</span>
                <span className="text-slate-800 font-semibold uppercase">{selectedCandidate.panNumber}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Email</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.email}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Phone</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.phone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-xs text-slate-400 font-semibold">Address</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.address}</span>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold">
              <Briefcase size={14} className="text-brand-500" />
              <span>Professional Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3">
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Role Applied For</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.role}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Total Experience</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.exp}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Relevant Experience</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.relExp}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Notice Period</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.noticePeriod}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-xs text-slate-400 font-semibold">Key Skills</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.skills}</span>
              </div>
            </div>
          </div>

          {/* Education section */}
          <div>
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold mb-3">
              <GraduationCap size={15} className="text-brand-500" />
              <span>Education History</span>
            </div>
            <div className="space-y-3">
              {selectedCandidate.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 border-l-4 border-l-brand-500 rounded-lg p-3 bg-brand-50/10 flex gap-3 relative"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 shrink-0 mt-0.5">
                    <GraduationCap size={15} />
                  </div>
                  <div className="flex flex-col text-left space-y-1">
                    <span className="font-semibold text-slate-800 text-sm">
                      {edu.collegeName}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{edu.degree}</span>
                      <span>•</span>
                      <span>{edu.stream}</span>
                      <span>•</span>
                      <span className="italic">{edu.streamType}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {edu.startDate} - {edu.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {edu.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employment section */}
          <div>
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold mb-3">
              <Briefcase size={14} className="text-brand-500" />
              <span>Employment History</span>
            </div>
            <div className="space-y-3">
              {selectedCandidate.employment.map((emp, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 border-l-4 border-l-emerald-500 rounded-lg p-3 bg-emerald-50/10 flex gap-3 relative"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                    <Briefcase size={15} />
                  </div>
                  <div className="flex flex-col text-left space-y-1">
                    <span className="font-semibold text-slate-800 text-sm">
                      {emp.companyName}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {emp.designation}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <span>Payroll: {emp.payrollCompany}</span>
                      <span>•</span>
                      <span>Type: {emp.employmentType}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {emp.startDate} - {emp.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {emp.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Information */}
          <div>
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold">
              <Building size={14} className="text-brand-500" />
              <span>Client & Pipeline Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3">
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Client Name</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.clientName}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Requirement ID</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.requirementId}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Work Type</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.requirementType}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Interview Type</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.interviewType}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Onboarding Type</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.onboardingType}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Current CTC</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.currentCtc}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">Expected CTC</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.expectedCtc}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-semibold">UAN Number</span>
                <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.uanNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
