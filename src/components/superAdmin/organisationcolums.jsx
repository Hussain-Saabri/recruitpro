import React from 'react';
import { Edit2, Trash2, Mail, Phone, MapPin, Table, Code, Activity, Settings } from 'lucide-react';

export const organisationColumns = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Table size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Organization</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900">{row.original.name}</span>
      </div>
    )
  },
  {
    accessorKey: "code",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Code size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Code</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900">{row.original.code}</span>
      </div>
    )
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Mail size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Email</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900">{row.original.email}</span>
      </div>
    )
  },
  {
    accessorKey: "phone",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Phone size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Phone</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900">{row.original.phone}</span>
      </div>
    )
  },
  {
    accessorKey: "address",
    header: () => (
      <div className="flex items-center gap-1.5">
        <MapPin size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Address</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="relative group flex flex-col w-fit">
        <span className="text-[13px] font-medium text-gray-900 truncate max-w-[200px] cursor-pointer">
          {row.original.address}
        </span>
        
        {/* Custom Tooltip */}
        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-slate-800 text-white text-[11.5px] font-medium py-1.5 px-3 rounded-lg shadow-xl w-max max-w-[250px] text-wrap leading-tight">
            {row.original.address}
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: "isActive",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Activity size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Status</span>
      </div>
    ),
    cell: ({ row }) => (
      <span
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
          row.original.isActive
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}
      >
        {row.original.isActive ? 'Active' : 'Inactive'}
      </span>
    )
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
        <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:text-brand-500 hover:border-brand-500 hover:bg-brand-50 transition-colors">
          <Edit2 size={13} strokeWidth={2.5} />
        </button>
        <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-50 transition-colors">
          <Trash2 size={13} strokeWidth={2.5} />
        </button>
      </div>
    )
  }
];
