import React, { useMemo } from "react";
import { Tooltip } from "../../../components/ui";
import { Edit2, Trash2, Tag, Activity, Settings, Brain } from "lucide-react";

export const useSkillColumns = ({ handleEdit, handleDelete }) => {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Brain size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Skill</span>
          </div>
        ),
        cell: ({ row }) => {
          const skill = row.original;
          return (
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-gray-900">{skill.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Tag size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Category</span>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-gray-900">
              {row.original.category || <span className="text-slate-400 italic font-normal">N/A</span>}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "isActive",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Activity size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Status</span>
          </div>
        ),
        cell: ({ row }) => {
          const isActive = String(row.original.isActive) === "true";
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
          const skill = row.original;
          return (
            <div className="flex gap-2 items-center">
              <Tooltip text="Edit Skill" position="left">
                <button
                  onClick={() => handleEdit && handleEdit(skill)}
                  className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <Edit2 size={14} strokeWidth={2.5} />
                </button>
              </Tooltip>
              <Tooltip text="Delete Skill" position="right">
                <button
                  onClick={() => handleDelete && handleDelete(skill)}
                  className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
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
