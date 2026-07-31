import React, { useMemo } from 'react';
import {
  Briefcase,
 
  StickyNote,
 
  Settings,
  Edit2,
  Trash2
} from "lucide-react";

export const useDepartmentColumns = ({ openModal, handleDelete }) => {
  return useMemo(() => [
    {
      accessorKey: "name",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Department Name</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.name || row.original.Name || row.original.departmentName || row.original.DepartmentName}</span></div>
    },
    {
      accessorKey: "description",
      header: () => (
        <div className="flex items-center gap-1.5">
          <StickyNote size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Description</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col max-w-[250px]">
          <span className="text-[13px] font-medium text-gray-900" title={row.original.description || row.original.Description || ''}>
            {row.original.description || row.original.Description || 'N/A'}
          </span>
        </div>
      )
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
        const department = row.original;
        return (
          <div className="flex gap-2 items-center">
            <button
  onClick={() => openModal(department)}
  className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
>
  <Edit2 size={14} strokeWidth={2.5} />
</button>
            <button
  onClick={() => handleDelete(department)}
  className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
>
  <Trash2 size={14} strokeWidth={2.5} />
</button></div>
        );
      }
    }
  ], [openModal, handleDelete]);
};
