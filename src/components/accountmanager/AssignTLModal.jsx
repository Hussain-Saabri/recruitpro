import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { User, Briefcase, UserCheck, X } from 'lucide-react';

export default function AssignTLModal({ isOpen, onClose, jd, onAssign }) {
  const [selectedTL, setSelectedTL] = useState("Sarah TeamLead");

  const teamLeaders = [
    {
      id: 1,
      name: "Sarah TeamLead",
      email: "teamlead@company.com"
    },
    {
      id: 2,
      name: "Alex TeamLead",
      email: "alex.tl@company.com"
    },{
      id: 3,
      name: "Hussain Saabri",
      email: "hussain.tl@company.com"
    }
  ];

  const handleAssign = () => {
    if (onAssign && jd) {
      onAssign(jd.id, selectedTL);
    }
    onClose();
  };

  if (!jd) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign to Team Leader"
      icon={<User size={18} className="text-brand-500" />}
      cancelButton="Cancel"
      cancelButtonIcon={<X size={14} strokeWidth={2} />}
      submitButton="Assign"
      submitButtonIcon={<UserCheck size={14} strokeWidth={2} />}
      submitButtonClassName="bg-brand-500 hover:bg-brand-600 border-none text-white font-semibold text-[13px] px-5 h-9 rounded-md shadow-xs cursor-pointer"
      cancelButtonClassName="border-slate-300 hover:bg-slate-50 text-slate-700 text-[13px] font-medium h-9 px-4 rounded-md cursor-pointer"
      onSubmit={handleAssign}
      className="max-w-md"
    >
      <div className="flex flex-col gap-5">
        {/* Job Description Header Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Briefcase size={16} className="text-brand-500" />
            <span>Job Description</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col gap-1">
            <h4 className="font-bold text-slate-800 text-[15px]">{jd.title}</h4>
            <p className="text-xs text-slate-500 font-medium">
              {jd.company} • {jd.reqId}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Exp: {jd.exp || "2-5 years"} • Loc: {jd.location || "Bangalore"} • Budget: {jd.lpa}
            </p>
          </div>
        </div>

        {/* Select Team Leader Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <User size={16} className="text-brand-500" />
            <span>Select Team Leader</span>
          </div>

          <div className="flex flex-col gap-2">
            {teamLeaders.map((tl) => (
              <label
                key={tl.id}
                onClick={() => setSelectedTL(tl.name)}
                className={`flex items-center gap-3 p-3.5 border rounded-lg cursor-pointer transition-all ${
                  selectedTL === tl.name
                    ? "border-brand-500 bg-brand-50/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="teamLeader"
                  checked={selectedTL === tl.name}
                  onChange={() => setSelectedTL(tl.name)}
                  className="w-4 h-4 text-brand-600 border-gray-300 focus:ring-brand-500 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-[14px]">{tl.name}</span>
                  <span className="text-xs text-slate-500">{tl.email}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
