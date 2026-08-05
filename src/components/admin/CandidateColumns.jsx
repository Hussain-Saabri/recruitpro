import React, { useMemo } from "react";
import { User, Briefcase, Layers, Flag, UserCheck, Calendar, Settings, Eye } from "lucide-react";

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "SUBMITTED":
      return "bg-[#EBF3FF] text-[#0066FF] border-[#CCE0FF]";
    case "PROCESSED TO CLIENT":
      return "bg-[#E8F8F0] text-[#10B981] border-[#D1F2E0]";
    case "SELECTED":
      return "bg-[#E8F8F0] text-[#10B981] border-[#D1F2E0]";
    case "REJECTED":
      return "bg-rose-50 text-rose-600 border-rose-200";
    default:
      return "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
  }
};

export function useCandidateColumns(setSelectedCandidate) {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center gap-1.5">
            <User size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Candidate</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col">
              <span className=" text-[12px] font-semibold ">{c.name}</span>
              <span className="text-[12px]  mt-0.5">{c.email}</span>
            </div>
          );
        }
      },
      {
        accessorKey: "role",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Role</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col text-left">
              <span className=" text-[12px] font-bold text-gray-700">{c.role}</span>
              <span className=" text-[12px] mt-0.5">{c.reqCode}</span>
            </div>
          );
        }
      },
      {
        accessorKey: "exp",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Layers size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Exp.</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold ">{c.exp}</span>
              <span className="text-[12px] mt-0.5">Rel: {c.relExp}</span>
            </div>
          );
        }
      },
      {
        accessorKey: "status",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Flag size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Status</span>
          </div>
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={`px-3 py-1 text-[10px] font-bold rounded-full border tracking-wide uppercase whitespace-nowrap ${getStatusBadgeStyle(
                status
              )}`}
            >
              {status}
            </span>
          );
        }
      },
      {
        accessorKey: "recruiter",
        header: () => (
          <div className="flex items-center gap-1.5">
            <UserCheck size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Recruiter</span>
          </div>
        ),
        cell: ({ getValue }) => (
          <span className="text-[12px] font-semibold">{getValue()}</span>
        )
      },
      {
        accessorKey: "date",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Calendar size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Date</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold ">{c.date}</span>
             
            </div>
          );
        }
      },
      {
        id: "actions",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Settings size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Actions</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <button
              onClick={() => setSelectedCandidate(c)}
              className="w-6 h-6 rounded border border-gray-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-all"
              title="View Profile"
            >
              <Eye size={14} className="text-slate-600" />
            </button>
          );
        }
      }
    ],
    [setSelectedCandidate]
  );
}
