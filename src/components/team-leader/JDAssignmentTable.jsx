import React, { useMemo } from 'react';
import DataTable from '../shared/DataTable';
import { User, UserPlus, UserCheck, UserX, Briefcase, Building2, IndianRupee, Flag, Settings } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function JDAssignmentTable({ data, onManage }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: () => (
          <div className="flex items-center gap-1.5">
            <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Role & Req ID</span>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col py-1">
            <span className="text-[13px] font-medium text-gray-900">{row.original.title}</span>
            <span className="text-[10px] mt-0.5 text-gray-400 font-medium">{row.original.reqId}</span>
          </div>
        )
      },
      {
        accessorKey: 'company',
        header: () => (
          <div className="flex items-center gap-1.5">
            <Building2 size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Company</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-[13px] font-medium text-gray-900">{row.original.company}</span>
        )
      },
      {
        accessorKey: 'lpa',
        header: () => (
          <div className="flex items-center gap-1.5">
            <IndianRupee size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Budget (LPA)</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-[13px] font-medium text-gray-900">{row.original.lpa}</span>
        )
      },
      {
        accessorKey: 'status',
        header: () => (
          <div className="flex items-center gap-1.5">
            <Flag size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Status</span>
          </div>
        ),
        cell: ({ row }) => {
          const isAssigned = row.original.status === 'ASSIGNED' && Boolean(row.original.assignedTo);
          return (
            <Badge
              variant={isAssigned ? 'success' : 'error'}
              className="text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider !rounded-[5px]"
            >
              {row.original.status}
            </Badge>
          );
        }
      },
      {
        accessorKey: 'assignedTo',
        header: () => (
          <div className="flex items-center gap-1.5">
            <User size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Recruiter</span>
          </div>
        ),
        cell: ({ row }) => {
          const isAssigned = row.original.status === 'ASSIGNED' && Boolean(row.original.assignedTo);
          return isAssigned ? (
            <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-600 border border-purple-100 px-2.5 py-1 rounded-[5px]">
              <User size={13} className="text-purple-600" />
              <span className="text-[12px] font-semibold">{row.original.assignedTo}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-1 rounded-[5px]">
              <UserX size={13} className="text-rose-500" />
              <span className="text-[12px] font-semibold">Not assigned</span>
            </div>
          );
        }
      },
      {
        id: 'actions',
        header: () => (
          <div className="flex items-center gap-1.5">
            <Settings size={13} strokeWidth={2.5} className="text-brand-500" />
            <span className="text-gray-900 font-semibold">Action</span>
          </div>
        ),
        cell: ({ row }) => {
          const isAssigned = row.original.status === 'ASSIGNED' && Boolean(row.original.assignedTo);
          return isAssigned ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManage(row.original)}
              className="inline-flex items-center gap-1.5 text-[12px] h-8 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-md font-semibold shadow-xs hover:border-slate-400 transition-all cursor-pointer"
            >
              <UserCheck size={14} className="text-slate-600" strokeWidth={2} />
              <span>Reassign</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onManage(row.original)}
              className="inline-flex items-center gap-1.5 text-[12px] h-8 px-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-md font-semibold border border-transparent shadow-xs transition-all cursor-pointer"
            >
              <UserPlus size={14} strokeWidth={2} />
              <span>Assign Recruiter</span>
            </Button>
          );
        }
      }
    ],
    [onManage]
  );

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
      <DataTable
        title="Assign JDs to Recruiters"
        icon={<User size={18} className="text-brand-600" />}
        data={data}
        columns={columns}
      />
    </div>
  );
}
