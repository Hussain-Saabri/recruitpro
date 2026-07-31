import React, { useMemo } from 'react';
import {
  Briefcase,
  Code,
  Layers,
  Building,
  Users,
  MapPin,
  Mail,
  Phone,
  Globe,
  Image as ImageIcon,
  Star,
  Calendar,
  CalendarDays,
  StickyNote,
  Activity,
  Settings,
  Edit2,
  Trash2
} from "lucide-react";

export const useClientColumns = ({ openModal, handleDelete }) => {
  return useMemo(() => [
    {
      accessorKey: "name",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Client Name</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.name}</span></div>
    },
    {
      accessorKey: "code",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Code size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Code</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.code || 'N/A'}</span></div>
    },
    {
      accessorKey: "type",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Layers size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Type</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900 capitalize">{row.original.type || 'N/A'}</span></div>
    },
    {
      accessorKey: "industry",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Building size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Industry</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.industry || 'N/A'}</span></div>
    },
    {
      accessorKey: "companySize",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Users size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Company Size</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.companySize || row.original.company_size || 'N/A'}</span></div>
    },
    {
      accessorKey: "hqCountry",
      header: () => (
        <div className="flex items-center gap-1.5">
          <MapPin size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">HQ Country</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.hqCountry || row.original.hq_country || 'N/A'}</span></div>
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Mail size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Email</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.email || 'N/A'}</span></div>
    },
    {
      accessorKey: "phone",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Phone size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Phone</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.phone || 'N/A'}</span></div>
    },
    {
      accessorKey: "website",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Globe size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Website</span>
        </div>
      ),
      cell: ({ row }) => {
        const url = row.original.website;
        return url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-brand-600 hover:underline">
            {url}
          </a>
        ) : (
          <span className="text-[13px] font-medium text-gray-900">N/A</span>
        );
      }
    },
    {
      accessorKey: "logoUrl",
      header: () => (
        <div className="flex items-center gap-1.5">
          <ImageIcon size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Logo</span>
        </div>
      ),
      cell: ({ row }) => {
        const logo = row.original.logoUrl;
        return logo ? (
          <img src={logo} alt="Logo" className="h-6 w-6 object-contain rounded-full border border-gray-200" />
        ) : (
          <span className="text-[13px] font-medium text-gray-900">N/A</span>
        );
      }
    },
    {
      accessorKey: "accountTier",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Star size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Account Tier</span>
        </div>
      ),
      cell: ({ row }) => {
        const tier = row.original.accountTier || row.original.account_tier;
        return tier ? (
          <span className={`capitalize px-2.5 py-1 rounded-full text-[11px] font-bold ${tier === 'strategic' ? 'bg-purple-50 text-purple-600 border border-purple-200' : tier === 'enterprise' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
            {tier}
          </span>
        ) : (
          <span className="text-[13px] font-medium text-gray-900">N/A</span>
        );
      }
    },
    {
      accessorKey: "contractStartDate",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Calendar size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Contract Start</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.contractStartDate || row.original.contract_start_date || 'N/A'}</span></div>
    },
    {
      accessorKey: "contractEndDate",
      header: () => (
        <div className="flex items-center gap-1.5">
          <CalendarDays size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Contract End</span>
        </div>
      ),
      cell: ({ row }) => <div className="flex flex-col"><span className="text-[13px] font-medium text-gray-900">{row.original.contractEndDate || row.original.contract_end_date || 'N/A'}</span></div>
    },
    {
      accessorKey: "notes",
      header: () => (
        <div className="flex items-center gap-1.5">
          <StickyNote size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Notes</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col max-w-[150px]">
          <span className="text-[13px] font-medium text-gray-900 truncate" title={row.original.notes || ''}>
            {row.original.notes || 'N/A'}
          </span>
        </div>
      )
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
        const isActiveStr = row.original.isActive !== undefined ? row.original.isActive : row.original.is_active;
        const isActive = String(isActiveStr) === "true";
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
      }
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
        const client = row.original;
        return (
          <div className="flex gap-2 items-center">
            <button onClick={() => openModal(client)} className="cursor-pointer p-1.5 border border-slate-200 rounded-full text-slate-500 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 transition-colors"><Edit2 size={14} strokeWidth={2.5} /></button>
            <button onClick={() => handleDelete(client)} className="cursor-pointer p-1.5 border border-slate-200 rounded-full text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"><Trash2 size={14} strokeWidth={2.5} /></button>
          </div>
        );
      }
    }
  ], [openModal, handleDelete]);
};
