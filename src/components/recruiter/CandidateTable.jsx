import React, { useMemo, useState } from 'react';
import DataTable from '../shared/DataTable';
import { Table, Download, RefreshCcw } from 'lucide-react';
import Button from '../ui/Button';
import { getCandidateTableColumns } from './CandidateTableColumns';
import CandidateModal from './CandidateModal';

export default function CandidateTable() {
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const data = useMemo(
    () => [
      {
        id: "REQ-2025-FS-001",
        name: "Alice Johnson",
        email : "alice.johnson@email.com",
        role: "Full Stack Developer",
        experience: "5Y",
        rel : '4y',
        recruiter: "John Recruiter",
        status: "Profile Rejected by Client",   
        created: "10/1/2025 02:30 PM"
      },{
        id: "JD-003",
        name: "Hussain Saabri",
        email : "alice.johnson@email.com",
        role: "Full Stack Developer",
        experience: "5Y",
        rel : '4y',
        recruiter: "John Recruiter",
        status: "Profile Rejected by Client",   
        created: "10/1/2025 02:30 PM"
      },{
        id: "JD-003",
        name: "Alice Johnson",
        email : "alice.johnson@email.com",
        role: "Full Stack Developer",
        experience: "5Y",
        rel : '4y',
        recruiter: "John Recruiter",
        status: "submitted",   
        created: "10/1/2025 02:30 PM"
      },{
        id: "JD-003",
        name: "Alice Johnson",
        email : "alice.johnson@email.com",
        role: "Full Stack Developer",
        experience: "5Y",
        rel : '4y',
        recruiter: "John Recruiter",
        status: "Profile Rejected by Client",   
        created: "10/1/2025 02:30 PM"
      },
      {
        id: "JD-003",
        name: "Alice Johnson",
        email : "alice.johnson@email.com",
        role: "Full Stack Developer",
        experience: "5Y",
        rel : '4y',
        recruiter: "John Recruiter",
        status: "Processed to Client",   
        created: "10/1/2025 02:30 PM"
      }
    ],
    []
  );

  const columns = useMemo(() => getCandidateTableColumns((candidate) => {
    setSelectedCandidate(candidate);
    console.log(candidate);
  }), []);

  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
      <DataTable 
        title="Candidates"
        icon={<Table size={16} />}
        rightActions={
            <>
             <Button variant="outline" size="sm" className="h-8 gap-1.5  hover:border-brand-500 border-2 text-xs text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                <Download size={13} className='text-brand-500 font-bold'/> Export
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 hover:border-brand-500 border-2 text-xs text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                <RefreshCcw size={13} className='text-brand-500'/> Refresh
            </Button>
            </>                 
        }
        data={data} 
        columns={columns} 
      />

      
      <CandidateModal 
        candidate={selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
      />
    </div>
  );
}
