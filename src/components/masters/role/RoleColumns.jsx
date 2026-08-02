import React, { useMemo } from "react";
import { Badge } from "../../../components/ui";
import { Edit2, Trash2, Shield, AlignLeft, Code, Cpu, Activity, Settings } from "lucide-react";

export const useRoleColumns = ({ handleEdit, handleDelete }) => {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Shield size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Role Name</span>
          </div>
        ),
        cell: ({ row }) => {
          const role = row.original;
          return (
            <div className="flex flex-col min-w-0 py-1">
              <span className="font-semibold text-[14px] text-gray-900 truncate">{role.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "code",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Code size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Code</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-[13px] font-medium text-slate-700">
            {row.original.code || <span className="text-slate-400 italic font-normal">N/A</span>}
          </span>
        ),
      },
      {
        accessorKey: "description",
        header: () => (
          <div className="flex items-center gap-1.5">
            <AlignLeft size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Description</span>
          </div>
        ),
        cell: ({ row }) => {
          const role = row.original;
          return (
            <span className="text-[13px] font-medium text-slate-700">
              {role.description || <span className="text-slate-400 italic font-normal">N/A</span>}
            </span>
          );
        },
      },
      {
        accessorKey: "is_system",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Cpu size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">System Role</span>
          </div>
        ),
        cell: ({ row }) =>
          row.original.is_system ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200">Yes</span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-50 text-slate-600 border border-slate-200">No</span>
          ),
      },
      
      
    ],
    [handleEdit, handleDelete]
  );
};
