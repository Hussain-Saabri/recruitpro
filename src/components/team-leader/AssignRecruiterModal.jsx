import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { UserCheck, Users, Briefcase, Target, Save, X } from 'lucide-react';
import { Input } from '../ui';

export default function AssignRecruiterModal({ isOpen, onClose, jd, onAssign }) {
  const [selectedRecruiters, setSelectedRecruiters] = useState(["John Recruiter"]);
  const [targetSubmissions, setTargetSubmissions] = useState("5");

  const recruiters = [
    {
      id: 1,
      name: "John Recruiter",
      email: "recruiter@company.com"
    },
    {
      id: 2,
      name: "Sarah Recruiter",
      email: "sarah.recruiter@company.com"
    }
  ];

  const toggleRecruiter = (name) => {
    if (selectedRecruiters.includes(name)) {
      if (selectedRecruiters.length > 1) {
        setSelectedRecruiters(selectedRecruiters.filter((r) => r !== name));
      }
    } else {
      setSelectedRecruiters([...selectedRecruiters, name]);
    }
  };

  const handleAssign = () => {
    if (onAssign && jd) {
      const assignedName = selectedRecruiters.join(", ");
      onAssign(jd.id, assignedName, targetSubmissions);
    }
    onClose();
  };

  if (!jd) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Recruiters"
      icon={<UserCheck size={18} className="text-brand-500" />}
      cancelButton="Cancel"
      cancelButtonIcon={<X size={14} strokeWidth={2} />}
      submitButton="Save"
      submitButtonIcon={<Save size={14} strokeWidth={2} />}
      submitButtonClassName="bg-brand-500 hover:bg-brand-600 border-none text-white font-semibold text-[13px] px-5 h-9 rounded-md shadow-xs cursor-pointer"
      cancelButtonClassName="border-slate-300 hover:bg-slate-50 text-slate-700 text-[13px] font-medium h-9 px-4 rounded-md cursor-pointer"
      onSubmit={handleAssign}
      className="max-w-md"
    >
      <div className="flex flex-col gap-5">
        {/* Job Description Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Briefcase size={16} className="text-brand-500" />
            <span>Job Description</span>
          </div>
          <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-3.5 flex flex-col gap-1">
            <h4 className="font-bold text-slate-800 text-[15px]">{jd.title}</h4>
            <p className="text-xs text-slate-500 font-medium">
              {jd.company} • {jd.reqId}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Exp: {jd.exp || "3-5 years"} • Loc: {jd.location || "Bangalore"} • Budget: {jd.lpa}
            </p>
          </div>
        </div>

        {/* Select Recruiters Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Users size={16} className="text-brand-500" />
            <span>Select Recruiters</span>
          </div>

          <div className="flex flex-col gap-2">
            {recruiters.map((r) => (
              <label
                key={r.id}
                onClick={() => toggleRecruiter(r.name)}
                className={`flex items-center gap-3 p-3.5 border rounded-lg cursor-pointer transition-all ${
                  selectedRecruiters.includes(r.name)
                    ? "border-brand-500 bg-brand-50/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRecruiters.includes(r.name)}
                  onChange={() => toggleRecruiter(r.name)}
                  className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-[14px]">{r.name}</span>
                  <span className="text-xs text-slate-500">{r.email}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Target Submissions Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Target size={16} className="text-brand-500" />
            <span>Target Submissions</span>
          </div>

          <Input
            type="number"
            min="1"
            value={targetSubmissions}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || Number(val) >= 1) {
                setTargetSubmissions(val);
              }
            }}
            placeholder="5"
            className="w-full text-slate-800 font-medium"
          />
        </div>
      </div>
    </Modal>
  );
}
