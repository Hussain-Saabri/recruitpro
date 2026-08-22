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
  return (
    <div className="bg-white border border-gray-300 rounded-[5px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all relative group overflow-hidden flex flex-col w-full sm:w-[380px] h-[210px]">
      
      {/* Top Hover Border */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800 leading-tight">{title}</h3>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {company} • {reqId}
          </p>
        </div>
        <Badge variant={status === 'ASSIGNED' ? 'success' : status === 'UNASSIGNED' ? 'error' : 'warning'} className="text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider !rounded-[5px]">
          {status}
        </Badge>
      </div>

      {/* Assigned To */}
      <div className="">
        <span className="text-[15px] font-bold text-slate-800 block">Assigned:</span>
        {assignedTo ? (
          <div className="flex items-center gap-1.5 bg-brand-50/50 w-fit px-2 py-1 rounded-[5px]">
            <User size={14} className="text-brand-600" />
            <span className="text-[13px] font-medium text-brand-700">{assignedTo}</span>
          </div>
        ) : (
          <span className="text-[13px] text-slate-400 italic">Unassigned</span>
        )}
      </div>

      {/* Footer */}
      <div className=" pt-3 flex items-center justify-between">
        <span className="text-[14px] font-medium text-slate-700">{lpa}</span>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={onManage}
          className="flex items-center gap-1.5 text-[12px] h-8 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-md font-semibold border-none"
        >
          <User size={14} strokeWidth={2.5}/>
          <span>Manage</span>
        </Button>
      </div>
      
    </div>
  );
}
