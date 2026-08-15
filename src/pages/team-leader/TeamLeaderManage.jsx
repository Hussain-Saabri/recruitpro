import React from 'react';
import PageHeader from "../../components/shared/PageHeader";
import JDAssignmentCard from "../../components/team-leader/JDAssignmentCard";
import BaseCard from '@/components/ui/BaseCard';
import { User,Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import JDManagementForm from '@/components/team-leader/JDManagementForm';
export default function TeamLeaderManage() {
  const [isCreateJDOpen,setIsCreateJDOpen] = useState(false)
  const handleCreateJD = () => {
    setIsCreateJDOpen(true)
  }
  const jdAssignments = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Tech Corp",
      reqId: "REQ-2025-FS-001",
      status: "ASSIGNED",
      assignedTo: "John Recruiter",
      lpa: "12-15 LPA"
    },
    {
      id: 2,
      title: "DevOps Engineer",
      company: "Cloud Solutions Ltd",
      reqId: "REQ-2025-DO-002",
      status: "ASSIGNED",
      assignedTo: "John Recruiter",
      lpa: "15-20 LPA"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio Inc",
      reqId: "REQ-2025-UX-003",
      status: "ASSIGNED",
      assignedTo: "John Recruiter",
      lpa: "8-12 LPA"
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Analytics Corp",
      reqId: "REQ-2025-DA-004",
      status: "ASSIGNED",
      assignedTo: "John Recruiter",
      lpa: "10-14 LPA"
    }
  ];

  return (
    <div className="flex flex-col gap-6 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
     <PageHeader
      title="JD Management"
      subtitle="Create, manage and assign JDs"
      
       rightAction={
      <Button
      variant="primary"
      size="sm"
      onClick={handleCreateJD}
      className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white hover:cursor-pointer flex items-center gap-1 text-[12px] text-white px-3 py-2 rounded-md font-medium hover:bg-brand-600 transition-colors">
      <Plus size={12}/> Create JD
    </Button>
  } 
/>
  {isCreateJDOpen && <JDManagementForm onClose={() => setIsCreateJDOpen(false)} />}
      <BaseCard 
      className="p-0 border border-slate-200  min-h-[500px] flex flex-col "
      title="JD Assignment Dashboard"
      subtitle="Assign JDs to recruiters"
      icon={<User/>}
      >
        {/* Header Section */}
        
        {/* Grid Section */}
        <div className="p-2 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jdAssignments.map(jd => (
              <JDAssignmentCard 
                key={jd.id}
                {...jd}
                onManage={() => console.log('Manage', jd.id)}
              />
            ))}
          </div>
        </div>
      </BaseCard>
    </div>
  );
}
