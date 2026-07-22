import React from 'react';
import { MapPin, TrendingUp, IndianRupee, Handshake, UserPlus } from 'lucide-react';
import Button from '../ui/Button';
import Separator from '../ui/Separator';
import { useNavigate } from 'react-router-dom';
export default function JDCard({ jd, onAddClick }) {
  const navigate = useNavigate()
  return (
    <div className="bg-white border border-gray-300 rounded-[5px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all relative group overflow-hidden cursor-pointer">
      
      {/* Top Hover Border */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Top Right ID Badge */}
      <div className="absolute top-5 right-5 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">
        {jd.id}
      </div>

      {/* Header */}
      <div className="pr-24">
        <h3 className="text-[16px] font-bold text-slate-800 leading-tight">{jd.title}</h3>
        <p className="text-[13px] text-slate-500 mt-1 font-medium">{jd.company}</p>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-2 text-[12.5px] font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-brand-500" />
          <span className="truncate">{jd.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-brand-500" />
          <span className="truncate">{jd.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee size={14} className="text-brand-500" />
          <span className="truncate">{jd.salary}</span>
        </div>
        <div className="flex items-center gap-2">
          <Handshake size={14} className="text-brand-500" />
          <span className="truncate">{jd.type}</span>
        </div>
      </div>
      <Separator className = "mt-3"/>
      {/* Footer */}
      <div className="mt-2 flex items-center justify-between pt-1">
        <div className="text-[13px] font-bold text-slate-700">
          {jd.filled} / {jd.total}
        </div>
        <Button 
          onClick={() => navigate('/add') }
          className="bg-brand-500 hover:bg-brand-600 text-white rounded-md px-4 py-1.5 h-8 gap-1.5 text-xs font-semibold border-none"
        >
          <UserPlus size={14} strokeWidth={2.5} /> Add
        </Button>
      </div>
      
    </div>
  );
}
