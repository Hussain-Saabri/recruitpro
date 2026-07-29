import React, { useState } from 'react';
import { Edit2,Globe, Trash2, ReceiptText,ExternalLink,CreditCard,Mail, Phone, MapPin, Table, Code, Activity, Settings } from 'lucide-react';

const AddressCell = ({ row }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative flex flex-col outline-none" 
      tabIndex="0"
      onClick={(e) => {
        // Prevent default to avoid focusing acting weirdly on mobile, toggle tooltip
        setShowTooltip(!showTooltip);
      }}
      onBlur={() => setShowTooltip(false)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="block text-[13px] font-medium text-gray-900 truncate w-[150px] cursor-pointer">
        {row.original.address}
      </span>
      
      {/* Custom Tooltip */}
      {showTooltip && (
        <div className="absolute left-0 bottom-full mb-2 z-50 transition-opacity duration-200 pointer-events-none">
          <div className="bg-slate-800 text-white text-[11.5px] font-medium py-1.5 px-3 rounded-lg shadow-xl w-max max-w-[250px] text-wrap leading-tight">
             {row.original.address}, {row.original.city || ''}, {row.original.state || ''}, {row.original.country || ''} - {row.original.postalCode || ''}
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionCell = ({ row, handleEdit }) => {
  const [hoveredAction, setHoveredAction] = useState(null);

  return (
    <div className="flex items-center gap-2">
      <div 
        className="relative flex items-center justify-center"
        onMouseEnter={() => setHoveredAction('edit')}
        onMouseLeave={() => setHoveredAction(null)}
      >
        <button 
          onClick={() => handleEdit(row.original)}
          className="cursor-pointer p-1.5 border border-slate-200 rounded-full text-slate-500 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 transition-colors"
        >
          <Edit2 size={14} strokeWidth={2.5} />
        </button>
        {hoveredAction === 'edit' && (
          <div className="absolute left-full ml-2 z-50 flex items-center pointer-events-none">
            <div className="bg-slate-800 text-white text-[12px] font-medium py-1 px-3 rounded-md shadow-md whitespace-nowrap relative z-10">
              Edit
            </div>
          </div>
        )}
      </div>

      <div 
        className="relative flex items-center justify-center"
        onMouseEnter={() => setHoveredAction('delete')}
        onMouseLeave={() => setHoveredAction(null)}
      >
        <button 
          className="cursor-pointer p-1.5 border border-slate-200 rounded-full text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
        >
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
        {hoveredAction === 'delete' && (
          <div className="absolute right-full mr-2 z-50 flex items-center pointer-events-none">
            <div className="bg-slate-800 text-white text-[12px] font-medium py-1 px-3 rounded-md shadow-md whitespace-nowrap relative z-10">
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const getorganisationColumns =(handleEdit)=> [

  
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Table size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Name</span>
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
    accessorKey: "website",
    header: () => (
      <div className="flex items-center gap-1.5">
        <Globe size={13} strokeWidth={2.5} className="text-brand-500" />
        <span className='text-gray-900 font-semibold'>Website</span>
      </div>
    ),
    cell: ({ row }) => (
  <a
    href={row.original.website}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 hover:underline"
  >
    
    <span className='text-[13px]'>{row.original.website}</span>
    <ExternalLink size={12} />
  </a>
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
    cell: ({ row }) => <AddressCell row={row} />
  },
  
  {
  accessorKey: "subscriptionPlan",
  header: () => (
    <div className="flex items-center gap-1.5">
      <ReceiptText size={13} strokeWidth={2.5} className="text-brand-500" />
      <span className="text-gray-900 font-semibold">Subscription Plan</span>
    </div>
  ),
  cell: ({ row }) => (
    <span>{row.original.subscriptionPlan}</span>
  ),
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
    cell: ({ row }) => <ActionCell row={row} handleEdit={handleEdit} />
  }
];
