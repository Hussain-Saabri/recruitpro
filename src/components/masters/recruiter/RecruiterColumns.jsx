import React, { useMemo, useState } from "react";
import { Edit2, Trash2, Building, Mail, Briefcase, User, Percent, Settings, MapPin, FileText } from "lucide-react";


const AddressCell = ({ row }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const recruiter = row.original;
  
  const addressParts = [
    recruiter.address1 || recruiter.Address1,
    recruiter.landmark || recruiter.Landmark,
    recruiter.city || recruiter.City,
    recruiter.state || recruiter.State,
    recruiter.country || recruiter.Country,
    recruiter.postalCode || recruiter.PostalCode
  ].filter(Boolean);
  
  const fullAddress = addressParts.join(", ");
  if (!fullAddress) return <span className="text-slate-400 italic">Not provided</span>;

  return (
    <div 
      className="relative flex flex-col outline-none" 
      tabIndex="0"
      onClick={() => setShowTooltip(!showTooltip)}
      onBlur={() => setShowTooltip(false)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="block text-[13px] font-medium text-gray-900 truncate max-w-[200px] cursor-pointer">
        {fullAddress}
      </span>
      
      {/* Custom Tooltip */}
      {showTooltip && (
        <div className="absolute left-0 bottom-full mb-2 z-50 transition-opacity duration-200 pointer-events-none">
          <div className="bg-slate-800 text-white text-[11.5px] font-medium py-1.5 px-3 rounded-lg shadow-xl w-max max-w-[250px] text-wrap leading-tight">
             {fullAddress}
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export const useRecruiterColumns = ({ handleEdit, handleDelete }) => {
  return useMemo(() => [
    {
      accessorKey: "name",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Building size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Agency Name</span>
        </div>
      ),
      cell: ({ row }) => {
        const recruiter = row.original;
        return (
          <div className="flex flex-col min-w-0 py-1">
            <span className="font-semibold text-[14px] text-gray-900 truncate">
              {recruiter.name || recruiter.Name}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="truncate">{recruiter.specialization || recruiter.Specialization || "General"}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Type</span>
        </div>
      ),
      cell: ({ row }) => {
        const type = row.original.type || row.original.Type;
        return (
          <span className="text-[13px] font-medium text-slate-700">
            {type || <span className="text-slate-400 italic font-normal">N/A</span>}
          </span>
        );
      },
    },
    {
      accessorKey: "contact",
      header: () => (
        <div className="flex items-center gap-1.5">
          <User size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Primary Contact</span>
        </div>
      ),
      cell: ({ row }) => {
        const recruiter = row.original;
        const contactName = recruiter.primaryContactName || recruiter.PrimaryContactName;
        const contactPhone = recruiter.primaryContactMobile || recruiter.PrimaryContactMobile || recruiter.phone || recruiter.Phone;
        
        if (!contactName) return <span className="text-slate-400 italic">Not provided</span>;
        
        return (
          <div className="flex flex-col">
            <span className="font-medium text-[13.5px] text-slate-700">{contactName}</span>
            <div className="text-xs text-slate-500 mt-0.5">
              <span>{contactPhone || "No phone"}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Mail size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Email</span>
        </div>
      ),
      cell: ({ row }) => {
        const email = row.original.email || row.original.Email;
        return (
          <span className="text-[13.5px] text-slate-600">
            {email || "N/A"}
          </span>
        );
      },
    },
    {
      accessorKey: "commissionRate",
      header: () => (
        <div className="flex items-center gap-1.5">
          <Percent size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Commission</span>
        </div>
      ),
      cell: ({ row }) => {
        const rate = row.original.commissionRate ?? row.original.CommissionRate;
        if (rate === null || rate === undefined) return <span className="text-slate-400">-</span>;
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
            {rate}%
          </span>
        );
      },
    },
    {
      accessorKey: "address",
      header: () => (
        <div className="flex items-center gap-1.5">
          <MapPin size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">Address</span>
        </div>
      ),
      cell: ({ row }) => <AddressCell row={row} />,
    },
    {
      accessorKey: "pan",
      header: () => (
        <div className="flex items-center gap-1.5">
          <FileText size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">PAN</span>
        </div>
      ),
      cell: ({ row }) => {
        const pan = row.original.pan || row.original.Pan || row.original.PAN;
        return (
          <span className="text-[13px] font-medium text-slate-700">
            {pan || <span className="text-slate-400 italic font-normal">N/A</span>}
          </span>
        );
      },
    },
    {
      accessorKey: "tin",
      header: () => (
        <div className="flex items-center gap-1.5">
          <FileText size={13} strokeWidth={2.5} className="text-brand-500" />
          <span className="text-gray-900 font-semibold">TIN</span>
        </div>
      ),
      cell: ({ row }) => {
        const tin = row.original.tin || row.original.Tin || row.original.TIN;
        return (
          <span className="text-[13px] font-medium text-slate-700">
            {tin || <span className="text-slate-400 italic font-normal">N/A</span>}
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
        const recruiter = row.original;
        return (
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleEdit(row.original)}
              className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
            >
              <Edit2 size={14} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => handleDelete(recruiter)}
              className="cursor-pointer p-2 border border-slate-200 rounded-full text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
            >
              <Trash2 size={14} strokeWidth={2.5} />
            </button>
          </div>
        );
      },
    },
  ], [handleEdit, handleDelete]);
};
