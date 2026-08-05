

import React, { useMemo } from "react";
import { Edit2, Trash2, Mail, Phone, Shield, Building, Building2, User as UserIcon, Activity, Settings, Briefcase } from "lucide-react";
import { Badge, Tooltip } from "../../ui";

export const useUserColumns = ({ openModal, handleDelete }) => {
  return useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: () => (
          <div className="flex items-center gap-1.5">
            
            <span className="text-gray-900 font-semibold">User</span>
          </div>
        ),
        cell: ({ row }) => {
          const { firstName, lastName, email, avatarUrl } = row.original;
          const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
          
          return (
            <div className="flex items-center gap-3 py-1">
              <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-sm shrink-0 overflow-hidden border border-brand-200">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={`${firstName} ${lastName}`} className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-[14px] text-gray-900 truncate">{`${firstName || ""} ${lastName || ""}`}</span>
                <span className="text-[12px] text-slate-500 flex items-center gap-1 truncate">
                  <Mail size={11} className="shrink-0" /> {email || <span className="italic">No email</span>}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "phone",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Phone size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Contact</span>
          </div>
        ),
        cell: ({ row }) => {
          const { phone } = row.original;
          return (
            <span className="text-[13px] font-medium text-slate-700 flex items-center gap-1.5">
              {phone || <span className="text-slate-400 italic font-normal">N/A</span>}
            </span>
          );
        }
      },
      {
        accessorKey: "roleId",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Role & Dept</span>
          </div>
        ),
        cell: ({ row }) => {
          const { roleId, departmentId, roleName, departmentName, role_name, department_name } = row.original;
          const displayRoleName = roleName || role_name || (roleId === 0 ? "Super Admin" : roleId === 1 ? "Admin" : `Role ID: ${roleId}`);
          const displayDeptName = departmentName || department_name || `Dept ID: ${departmentId}`;
          
          return (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Shield size={12} className="text-blue-500 shrink-0" />
                <span className="text-[13px] font-medium text-slate-700 truncate">{displayRoleName}</span>
              </div>
              {departmentId !== null && departmentId !== undefined && (
                <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Building2 size={11} className="shrink-0" />
                  <span className="truncate">{displayDeptName}</span>
                </div>
              )}
            </div>
          );
        }
      },
      {
        accessorKey: "organizationId",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Building size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Organization</span>
          </div>
        ),
        cell: ({ row }) => {
          const { organizationId } = row.original;
          return (
            <span className="text-[13px] font-medium text-slate-700">
              {organizationId ? `Org ID: ${organizationId}` : <span className="text-slate-400 italic font-normal">N/A</span>}
            </span>
          );
        }
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
          <div className="flex items-center justify-end gap-1.5">
            <Settings size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Actions</span>
          </div>
        ),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex justify-end gap-2 items-center">
              <Tooltip text="Edit User" position="left">
                <button
                  onClick={() => openModal(user)}
                  className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <Edit2 size={14} strokeWidth={2.5} />
                </button>
              </Tooltip>
              <Tooltip text="Delete User" position="top">
                <button
                  onClick={() => handleDelete(user)}
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
    [openModal, handleDelete]
  );
};
