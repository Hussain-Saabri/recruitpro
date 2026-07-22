import React from 'react';
import { cn } from '../../lib/utils';
import Separator from './Separator';

export default function FormCard({ title, icon, actionBadge, children, className }) {
  return (
    <div className={cn("bg-slate-50/50 border border-gray-200 rounded-xl ", className)}>
      {/* Header */}
      <div className="flex items-center justify-between  p-6">
        <div className="flex items-center gap-2.5">
          <div className="text-brand-600 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-[16px] font-bold text-brand-600 ">{title}</h3>
        </div>
        
        {/* Right Action / Badge (e.g., "Secure" badge) */}
        {actionBadge && (
          <div className="flex-shrink-0">
            {actionBadge}
          </div>
        )}
      </div>
      <Separator className=""/>
      {/* Children Content (Form Grid) */}
      <div className="w-full p-6">
        {children}
      </div>
    </div>
  );
}
