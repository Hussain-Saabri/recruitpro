import React, { useMemo } from "react";
import { Badge } from "../../../components/ui";
import { Edit2, Trash2 } from "lucide-react";

export const useRoleColumns = ({ handleEdit, handleDelete }) => {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Role Name",
        cell: ({ row }) => {
          const role = row.original;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800">{role.name}</span>
              {role.description && (
                <span className="text-[10px] text-slate-400 font-normal mt-0.5">
                  {role.description}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => (
          <span className="bg-slate-100 px-2 py-1 rounded font-mono text-[11px]">
            {row.original.code}
          </span>
        ),
      },
      {
        accessorKey: "is_system",
        header: "System Role",
        cell: ({ row }) =>
          row.original.is_system ? (
            <Badge variant="primary">Yes</Badge>
          ) : (
            <Badge variant="gray">No</Badge>
          ),
      },
      {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
          const isActive = String(row.original.is_active) === "true";
          return (
            <Badge variant={isActive ? "success" : "gray"}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const role = row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(role)}
                className="w-7 h-7 rounded border border-gray-200 hover:bg-brand-50 hover:text-brand-500 flex items-center justify-center transition-all"
                title="Edit Role & Permissions"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => handleDelete(role)}
                disabled={role.is_system}
                className="w-7 h-7 rounded border border-gray-200 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                title="Delete Role"
              >
                <Trash2 size={12} />
              </button>
            </div>
          );
        },
      },
    ],
    [handleEdit, handleDelete]
  );
};
