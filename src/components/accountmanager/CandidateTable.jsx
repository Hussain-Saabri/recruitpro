import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../shared/DataTable';
import { Table, Download, RefreshCcw } from 'lucide-react';
import Button from '../ui/Button';
import { getCandidateTableColumns } from './CandidateTableColumns';

export default function CandidateTable() {
  const navigate = useNavigate();
  
  const [tableData, setTableData] = useState([
    {
      id: "REQ-2025-FS-001",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      role: "Full Stack Developer",
      experience: "5Y",
      rel: '4y',
      recruiter: "John Recruiter",
      status: "Profile Rejected by Client",   
      created: "10/1/2025 02:30 PM"
    },
    {
      id: "JD-003",
      name: "Hussain Saabri",
      email: "hussain.saabri@email.com",
      role: "Full Stack Developer",
      experience: "5Y",
      rel: '4y',
      recruiter: "John Recruiter",
      status: "Profile Rejected by Client",   
      created: "10/1/2025 02:30 PM"
    },
    {
      id: "JD-003",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      role: "Full Stack Developer",
      experience: "5Y",
      rel: '4y',
      recruiter: "John Recruiter",
      status: "submitted",   
      created: "10/1/2025 02:30 PM"
    },
    {
      id: "JD-003",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      role: "Full Stack Developer",
      experience: "5Y",
      rel: '4y',
      recruiter: "John Recruiter",
      status: "Profile Rejected by Client",   
      created: "10/1/2025 02:30 PM"
    },
    {
      id: "JD-003",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      role: "Full Stack Developer",
      experience: "5Y",
      rel: '4y',
      recruiter: "John Recruiter",
      status: "Processed to Client",   
      created: "10/1/2025 02:30 PM"
    }
  ]);

  const handleStatusUpdate = (candidate, newStatus) => {
    setTableData(prevData => prevData.map(item => 
      item.email === candidate.email && item.id === candidate.id && item.name === candidate.name
        ? { ...item, status: newStatus }
        : item
    ));
  };

  const columns = useMemo(() => getCandidateTableColumns(
    (candidate) => {
      navigate(`/candidate-details/${candidate.id}`, { state: { candidate } });
    },
    handleStatusUpdate
  ), [navigate]);

  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
      <DataTable 
        title="Candidates"
        icon={<Table size={16} />}
        rightActions={
          <>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 hover:border-brand-500 border-2 text-xs text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
              <Download size={13} className='text-brand-500 font-bold'/> Export
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 hover:border-brand-500 border-2 text-xs text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
              <RefreshCcw size={13} className='text-brand-500'/> Refresh
            </Button>
          </>                 
        }
        data={tableData} 
        columns={columns} 
      />
    </div>
  );
}
