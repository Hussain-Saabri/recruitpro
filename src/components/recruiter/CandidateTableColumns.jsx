import React from 'react';
import { User, Layers, Flag, CalendarDays, Settings, Eye } from 'lucide-react';
import Button from '../ui/Button';


export const getCandidateTableColumns = (onViewClick) => [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-1.5">
        <User size={13} strokeWidth={2.5} className="text-brand-500 " />
        <span className='text-gray-900 font-semibold'>Candidate</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className=" text-[13px] font-medium text-gray-900">{row.original.name}</span>
        <span className="text-[10px] mt-0.5 text-gray-400 font-medium">{row.original.email}</span>
      </div>
    )
  },
  {
    accessorKey: "role",
    header: () => (
      <div className="flex items-center gap-1.5">
        <User size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Role</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900">{row.original.role}</span>
        <span className="text-[10px] mt-0.5 text-gray-700 font-medium">{row.original.id}</span>
      </div>
    )
  },
  {
    accessorKey: "experience",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Layers size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Exp.</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900">{row.original.experience}</span>
        <span className="text-[10px] mt-0.5 text-gray-700 font-medium">Rel: {row.original.rel}</span>
      </div>
    )
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Flag size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Status</span>
      </div>
    ),
    cell: ({ getValue }) => {
      const status = getValue().toUpperCase();
       const statusStyles = {
    SUBMITTED: "bg-blue-50 text-blue-600 border-blue-200",
    "PROCESSED TO CLIENT": "bg-emerald-50 text-emerald-600 border-emerald-200",
    "PROFILE REJECTED BY CLIENT": "bg-red-50 text-red-500 border-red-200",
    "PROFILE REJECTED BY TEAM LEAD": "bg-orange-50 text-orange-500 border-orange-200",
    "NO RESPONSE": "bg-gray-100 text-gray-600 border-gray-300",
  };
      return (
        <span className={`text-[12px] rounded-full border border-gray-300 px-2 py-0.5 font-medium  ${statusStyles[status]}`}>
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: "recruiter",
    header: () => (
      <div className="flex items-center gap-1.5">
        <User size={13} strokeWidth={2.5} className="text-brand-500"/>
        <span className='text-gray-900 font-semibold'>Recruiter</span>
      </div>
    ),
    cell: ({ getValue }) => {
      const recruiter = getValue();

      return (
        <span className='text-[13px] font-medium text-gray-900'>
          {recruiter}
        </span>
      );
    }
  },
  
  {
    accessorKey: "created",
    header: () => (
      <div className="flex items-center gap-1.5">
        <CalendarDays size={13} strokeWidth={2.5} className="text-brand-500"/>
        <span className='text-gray-900 font-semibold'>Date</span>
      </div>
    ),
    cell: ({ getValue }) => {
      const createdDate = getValue();
      const [date, hour, time] = createdDate.split(" ");
      return (
        <div className="flex flex-col mt-0.5">
          <span className='text-[13px] font-medium text-gray-900'>
            {date}
          </span>
          <span className="text-[10px] mt-0.5 text-gray-700 font-medium">
            {hour} {time}
          </span>
        </div>
      );
    }
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Settings size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Actions</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {/* View Button */}
        <Button variant="outline" size="icon" className="group relative w-8 h-8 rounded-[5px] border-gray-200 hover:bg-slate-50 transition-all cursor-pointer" onClick={() => onViewClick(row.original)}>
          <Eye size={14} className="text-slate-600" />
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
            View
          </span>
        </Button>
      </div>
    )
  }
];
