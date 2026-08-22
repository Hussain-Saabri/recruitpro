import React from "react";
import { Briefcase, MapPin, Calendar, Award, Clock, DollarSign, UserCheck } from "lucide-react";

export default function CandidateProfileCard({ candidate }) {
  if (!candidate) return null;

  const {
    id,
    firstName,
    lastName,
    role,
    location,
    submittedAt,
    experience = "5Y",
    rel = "4Y",
    status = "Submitted"
  } = candidate;

  const fullName = candidate.name || `${firstName || ""} ${lastName || ""}`.trim() || "Candidate Name";
  
  // Initials for avatar
  const initials = fullName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const getStatusBadge = (statusText) => {
    const s = (statusText || '').toLowerCase();
    if (s.includes('rejected')) {
      return "bg-rose-50 text-rose-600 border-rose-200";
    }
    if (s.includes('processed')) {
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    }
    if (s.includes('submitted')) {
      return "bg-blue-50 text-blue-600 border-blue-200";
    }
    return "bg-amber-50 text-amber-600 border-amber-200";
  };

  return (
    <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col gap-3 overflow-hidden">
      {/* Top Main Details Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Avatar & Candidate Name Info */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
              {initials || "AJ"}
            </div>
            <span className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5 z-10" />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                {fullName}
              </h2>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(status)}`}>
                {status}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                <Briefcase size={11} className="text-brand-500" />
                <span>{role || "Full Stack Developer"}</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                <MapPin size={11} className="text-brand-500" />
                <span>{location || "Goa"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Candidate ID & Date */}
        <div className="flex flex-col sm:items-end justify-center text-xs text-slate-500 font-medium border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
          <div className="bg-brand-50 text-brand-700 border border-brand-100 px-2.5 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 mb-1">
            <Calendar size={12} className="text-brand-500" />
            <span>Applied: {submittedAt || "10/01/2025 02:30 PM"}</span>
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            Requirement ID: <span className="font-bold text-slate-800">{id || "REQ-2025-FS-001"}</span>
          </p>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-slate-100">
        <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Award size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Exp.</span>
            <span className="text-[11px] font-bold text-slate-800">{experience}</span>
          </div>
        </div>

        <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Rel. Exp.</span>
            <span className="text-[11px] font-bold text-slate-800">{rel}</span>
          </div>
        </div>

        <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Expected CTC</span>
            <span className="text-[11px] font-bold text-slate-800">15 LPA</span>
          </div>
        </div>

        <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UserCheck size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Notice Period</span>
            <span className="text-[11px] font-bold text-slate-800">Immediate</span>
          </div>
        </div>
      </div>
    </div>
  );
}