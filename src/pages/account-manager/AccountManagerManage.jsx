import React, { useState } from 'react';
import PageHeader from "@/components/shared/PageHeader";
import JDAssignmentTable from "@/components/accountmanager/JDAssignmentTable";
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import JDManagementForm from '@/components/accountmanager/JDManagementForm';
import AssignTLModal from '@/components/accountmanager/AssignTLModal';

export default function AccountManagerManage() {
  const [isCreateJDOpen, setIsCreateJDOpen] = useState(false);
  const [selectedJdForAssign, setSelectedJdForAssign] = useState(null);

  const [jdAssignments, setJdAssignments] = useState([
    {
      id: 1,
      title: "Data Analyst",
      company: "Analytics Corp",
      reqId: "REQ-2025-DA-004",
      status: "ASSIGNED",
      assignedTo: "Sarah TeamLead",
      lpa: "10-14 LPA"
    },
    {
      id: 2,
      title: "Sales Executive",
      company: "FinServ India",
      reqId: "REQ-2025-SE-005",
      status: "UNASSIGNED",
      assignedTo: null,
      lpa: "6-9 LPA"
    },
    {
      id: 3,
      title: "Cyber Security Engineer",
      company: "TechCorp Solutions",
      reqId: "REQ-2025-CSE-006",
      status: "UNASSIGNED",
      assignedTo: null,
      lpa: "25-40 LPA"
    }
    ,{
      id: 4,
      title: "Cyber Security Engineer",
      company: "TechCorp Solutions",
      reqId: "REQ-2025-CSE-006",
      status: "UNASSIGNED",
      assignedTo: null,
      lpa: "25-40 LPA"
    },
    {
      id: 5,
      title: "Cyber Security Engineer",
      company: "TechCorp Solutions",
      reqId: "REQ-2025-CSE-006",
      status: "UNASSIGNED",
      assignedTo: null,
      lpa: "25-40 LPA"
    },{
      id: 5,
      title: "Cyber Security Engineer",
      company: "TechCorp Solutions",
      reqId: "REQ-2025-CSE-006",
      status: "ASSIGNED",
      assignedTo: "Hussain",
      lpa: "25-40 LPA"
    },{
      id: 5,
      title: "Cyber Security Engineer",
      company: "TechCorp Solutions",
      reqId: "REQ-2025-CSE-006",
      status: "ASSIGNED",
      assignedTo: null,
      lpa: "25-40 LPA"
    }
  ]);

  const handleCreateJD = () => {
    setIsCreateJDOpen(true);
  };

  const handleOpenAssignModal = (jd) => {
    setSelectedJdForAssign(jd);
  };

  const handleAssignTL = (jdId, teamLeadName) => {
    setJdAssignments((prev) =>
      prev.map((item) =>
        item.id === jdId
          ? { ...item, status: "ASSIGNED", assignedTo: teamLeadName }
          : item
      )
    );
    setSelectedJdForAssign(null);
  };

  return (
    <div className="flex flex-col gap-6 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
      <PageHeader
        title="JD Management"
        subtitle="Create JDs and assign to Team Leaders"
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

      <AssignTLModal
        isOpen={Boolean(selectedJdForAssign)}
        onClose={() => setSelectedJdForAssign(null)}
        jd={selectedJdForAssign}
        onAssign={handleAssignTL}
      />
    </div>
  );
}
