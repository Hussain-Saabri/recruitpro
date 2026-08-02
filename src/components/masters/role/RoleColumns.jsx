import React, { useMemo } from "react";
import { Badge, Tooltip } from "../../../components/ui";
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
      {
        accessorKey: "is_active",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Activity size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Status</span>
          </div>
        ),
        cell: ({ row }) => {
          const isActive = String(row.original.is_active) === "true";
          return (
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-rose-50 text-rose-600 border border-rose-200'
              }`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Settings size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Actions</span>
          </div>
        ),
        cell: ({ row }) => {
          const role = row.original;
          return (
            <div className="flex gap-2 items-center">
              <Tooltip text="Edit Role" position="left">
                <button
                  onClick={() => handleEdit(role)}
                  className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <Edit2 size={14} strokeWidth={2.5} />
                </button>
              </Tooltip>
              <Tooltip text="Delete Role" position="top">
                <button
                  onClick={() => handleDelete(role)}
                  disabled={role.is_system}
                  className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={14} strokeWidth={2.5} />
                </button>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    [handleEdit, handleDelete]
  );
};
