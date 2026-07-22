import React, { useMemo } from 'react';
import DataTable from '../shared/DataTable';
import { Briefcase, Building, Layers, Flag, CalendarDays, Settings, Building2, ReceiptIndianRupee, Edit, Trash2, Eye, Table, Download } from 'lucide-react';
import Button from '../ui/Button';
export default function ManageTable() {
  // Mock data for Job Descriptions
  const data = useMemo(
    () => [
      {
        id: "REQ-2025-CSE-006",
        title: "Frontend Developer",
        employment_type: "Contract To Hire",
        client: "TechCorp Inc.",
        experience: "3-5 Years",
        status: "Active",

        location: "Ahmedabad",
        budget: "40-50 LPA",
        created: "10/1/2025 02:30 PM"
      },
      {
        id: "JD-002",
        title: "Backend Engineer",
        employment_type: "Employment Payroll",
        experience: "5+ Years",
        status: "Closed",
        client: "TechCorp Solutions",
        location: "Ahmedabad",
        budget: "40-50 LPA",
        created: "10/1/2025 02:30 PM"
      },
      {
        id: "JD-004",
        title: "UI/UX Designer",
        employment_type: "Employment Payroll",
        experience: "2-4 Years",
        status: "Active",
        client: "TechCorp Solutions",
        location: "Ahmedabad",
        budget: "40-50 LPA",
        created: "10/1/2025 02:30 PM"
      },{
        id: "JD-005",
        title: "UI/UX Designer",
        employment_type: "Employment Payroll",
        experience: "2-4 Years",
        status: "Active",
        client: "TechCorp Solutions",
        location: "Ahmedabad",
        budget: "40-50 LPA",
        created: "10/1/2025 02:30 PM"
      },
      {
        id: "JD-003",
        title: "UI/UX Designer",
        employment_type: "Employment Payroll",
        experience: "2-4 Years",
        status: "Active",
        client: "TechCorp Solutions",
        location: "Ahmedabad",
        budget: "40-50 LPA",
        created: "10/1/2025 02:30 PM"
      }
    ],
    []
  );

  // Column definitions for the Job Descriptions table
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Role</span>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-semibold text-[13px] text-gray-900">{row.original.title}</span>
            <span className="text-[10px] mt-0.5 text-gray-700 font-medium">{row.original.employment_type}</span>
          </div>
        )
      },
      {
        accessorKey: "id",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Building size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>ID</span>
          </div>
        ),
        cell: ({ getValue }) => <span className="font-medium  font-mono !text-brand-500 text-[13px]">{getValue()}</span>
      },
      {
        accessorKey: "experience",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Layers size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Exp</span>
          </div>
        ),
        cell: ({ getValue }) => <span className="font-semibold text-[13px] text-gray-900">{getValue()}</span>
      },
      {
        accessorKey: "location",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Flag size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Location</span>
          </div>
        ),
        cell: ({ getValue }) => {
          const location = getValue();
          return (
            <span className='font-semibold text-[13px] text-gray-900'>
              {location}
            </span>
          );
        }
      },
      {
        accessorKey: "client",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Building2 size={13} strokeWidth={2.5} className="text-brand-500"/>
            <span>Client</span>
          </div>
        ),
        cell: ({ getValue }) => {
          const client = getValue();

          return (
            <span className='font-semibold text-[13px] text-gray-900'>
              {client}
            </span>
          );
        }
      },
      {
        accessorKey: "budget",
        header: () => (
          <div className="flex items-center gap-1.5">
            <ReceiptIndianRupee size={13} strokeWidth={2.5} className="text-brand-500"/>
            <span>Budget</span>
          </div>
        ),
        cell: ({ getValue }) => {
          const budget = getValue();

          return (
            <span className='font-semibold text-[13px] text-gray-900'>
              {budget}
            </span>
          );
        }
      },
      {
        accessorKey: "created",
        header: () => (
          <div className="flex items-center gap-1.5">
            <CalendarDays size={13} strokeWidth={2.5} className="text-brand-500"/>
            <span>Created</span>
          </div>
        ),
        cell: ({ getValue }) => {
          const createdDate = getValue();
          const [date, hour, time] = createdDate.split(" ");
          return (
            <div className="flex flex-col mt-0.5">
              <span className='font-semibold text-[13px] text-gray-900'>
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
            <span>Actions</span>
          </div>
        ),
        cell: () => (
          <div className="flex items-center gap-2">
            {/* View Button */}
            <Button variant="outline" size="icon" className="group relative w-8 h-8 border-gray-200 hover:bg-slate-50 transition-all">
              <Eye size={14} className="text-slate-600" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                View
              </span>
            </Button>
           
            {/* Edit Button */}
            <Button variant="outline" size="icon" className="group relative w-8 h-8 border-gray-200 hover:bg-slate-50 transition-all">
              <Edit size={14} className="text-slate-600" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                Edit
              </span>
            </Button>

            {/* Delete Button */}
            <Button variant="outline" size="icon" className="group relative w-8 h-8 border-gray-200 hover:bg-rose-50 hover:border-rose-200 transition-all">
              <Trash2 size={14} className="text-rose-500" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                Delete
              </span>
            </Button>
          </div>
        )
      }
    ],
    []
  );

  return (
    <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
      <DataTable 
        title="Job Descriptions"
        icon={<Table size={16} />}
        rightActions={
          <Button variant="outline" size="sm" className="h-8 gap-1.5 border-gray-200 text-xs text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={13} /> Export
          </Button>
        }
        data={data} 
        columns={columns} 
      />
    </div>
  );
}
