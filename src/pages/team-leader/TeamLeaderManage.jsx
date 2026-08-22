import React, { useState } from 'react';
import PageHeader from "../../components/shared/PageHeader";
import JDAssignmentTable from "../../components/team-leader/JDAssignmentTable";
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import JDManagementForm from '@/components/team-leader/JDManagementForm';
import AssignRecruiterModal from '@/components/team-leader/AssignRecruiterModal';

export default function TeamLeaderManage() {
  const [isCreateJDOpen, setIsCreateJDOpen] = useState(false);
  const [selectedJdForAssign, setSelectedJdForAssign] = useState(null);

  const [jdAssignments, setJdAssignments] = useState([
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
  ]);

  const handleCreateJD = () => {
    setIsCreateJDOpen(true);
  };

  const handleOpenAssignModal = (jd) => {
    setSelectedJdForAssign(jd);
  };

  const handleAssignRecruiter = (jdId, recruiterName) => {
    setJdAssignments((prev) =>
      prev.map((item) =>
        item.id === jdId
          ? { ...item, status: "ASSIGNED", assignedTo: recruiterName }
          : item
      )
    );
    setSelectedJdForAssign(null);
  };

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
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white hover:cursor-pointer text-[12px] px-3 py-2 rounded-md font-medium transition-colors"
          >
            <Plus size={12} /> Create JD
          </Button>
        } 
      />
      {isCreateJDOpen && <JDManagementForm onClose={() => setIsCreateJDOpen(false)} />}
      
      <JDAssignmentTable
        data={jdAssignments}
        onManage={handleOpenAssignModal}
      />

      <AssignRecruiterModal
        isOpen={Boolean(selectedJdForAssign)}
        onClose={() => setSelectedJdForAssign(null)}
        jd={selectedJdForAssign}
        onAssign={handleAssignRecruiter}
      />
    </div>
  );
}
