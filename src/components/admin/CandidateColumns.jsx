import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { 
  User, 
  Briefcase, 
  Layers, 
  Flag, 
  UserCheck, 
  Calendar, 
  Settings, 
  Eye, 
  MoreVertical, 
  Send, 
  CheckCircle2, 
  Award, 
  XCircle 
} from "lucide-react";
import { Tooltip } from "../ui";

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

const AdminActionCell = ({ row, setSelectedCandidate }) => {
  return (
    <div className="flex items-center gap-1.5">
      {/* View Button */}
      <Tooltip text="View Profile">
        <button
          onClick={() => setSelectedCandidate(row.original)}
          className="w-8 h-8 rounded-[6px] border border-slate-200 bg-white hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600 flex items-center justify-center text-slate-600 transition-all cursor-pointer shadow-2xs"
        >
          <Eye size={14} />
        </button>
      </Tooltip>
    </div>
  );
};

export function useCandidateColumns(setSelectedCandidate, onStatusUpdate) {
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
        cell: ({ row }) => (
          <AdminActionCell
            row={row}
            setSelectedCandidate={setSelectedCandidate}
            onStatusUpdate={onStatusUpdate}
          />
        )
      }
    ],
    [setSelectedCandidate, onStatusUpdate]
  );
}
