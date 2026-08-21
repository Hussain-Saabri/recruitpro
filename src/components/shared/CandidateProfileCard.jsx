import React from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export default function CandidateProfileCard({ candidate }) {
  if (!candidate) return null;

  const {
    id,
    firstName,
    lastName,
    role,
    location,
    submittedAt,
  } = candidate;

  const fullName = candidate.name || `${firstName || ""} ${lastName || ""}`.trim() || "Candidate Name";
  
  // Initials for avatar
  const initials = fullName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-lg p-3 sm:p-3.5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
      {/* Left Section: Avatar & Info */}
      <div className="flex items-center gap-3">
        {/* Compact Avatar Container with Green Dot */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#6C5CE7] text-white font-bold text-sm sm:text-base flex items-center justify-center shadow-2xs">
            {initials || "AJ"}
          </div>
          {/* Green Status Dot */}
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white absolute bottom-0 right-0 z-10" />
        </div>

        {/* Candidate Details */}
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight">
            {fullName}
          </h2>
          
          {role && (
            <p className="text-[11px] text-slate-500 font-medium leading-none mb-0.5">
              {role}
            </p>
          )}

          {/* Badges Row */}
          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
            {role && (
              <span className="bg-[#F0EEFF] text-[#6C5CE7] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-purple-100/60 shadow-2xs">
                <Briefcase size={11} strokeWidth={2} />
                <span>{role}</span>
              </span>
            )}

            <span className="bg-[#F0EEFF] text-[#6C5CE7] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-purple-100/60 shadow-2xs">
              <MapPin size={11} strokeWidth={2} />
              <span>{location || "Goa"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Submitted Timestamp & Candidate ID */}
      <div className="flex flex-col sm:items-end justify-center text-[11px] text-slate-500 font-medium border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
        <div className="flex items-center gap-1 text-slate-500 font-medium">
          <Calendar size={11} className="text-slate-400" />
          <span>{submittedAt || "10/01/2025 02:30 PM"}</span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          Candidate ID: <span className="font-semibold text-slate-700">{id || "REQ-2025-FS-001"}</span>
        </p>
      </div>
    </div>
  );
}