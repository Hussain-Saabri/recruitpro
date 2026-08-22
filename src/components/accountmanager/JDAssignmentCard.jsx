import React from 'react';
import { User } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function JDAssignmentCard({ 
  title, 
  company, 
  reqId, 
  status, 
  assignedTo, 
  lpa, 
  onManage 
}) {
  const isAssigned = status === 'ASSIGNED' && Boolean(assignedTo);

  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all relative group overflow-hidden flex flex-col justify-between w-full h-[210px]">
      
      {/* Top Hover Border */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800 leading-tight">{title}</h3>
          <p className="text-[12px] text-slate-500 mt-1 font-medium">
            {company} • {reqId}
          </p>
        </div>
        <Badge 
          variant={isAssigned ? 'success' : 'error'} 
          className="text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider !rounded-[5px]"
        >
          {status}
        </Badge>
      </div>

      {/* Team Leader Section */}
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-bold text-slate-800">Team Leader:</span>
        {isAssigned ? (
          <div className="flex items-center gap-1.5 bg-purple-50 text-purple-600 w-fit px-2.5 py-1 rounded-[5px]">
            <User size={13} className="text-purple-600" />
            <span className="text-[12px] font-medium">{assignedTo}</span>
          </div>
        ) : (
          <span className="text-[13px] text-slate-500 italic font-normal">Not assigned</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100/50">
        <span className="text-[13px] font-medium text-slate-700">{lpa}</span>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={onManage}
          className="flex items-center gap-1.5 text-[12px] h-8 px-3.5 bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white rounded-md font-semibold border-none cursor-pointer"
        >
          <User size={13} strokeWidth={2.5}/>
          <span>{isAssigned ? "Reassign" : "Assign TL"}</span>
        </Button>
      </div>
      
    </div>
  );
}
