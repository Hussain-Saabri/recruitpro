import React from 'react';
import { cn } from '../../lib/utils';

export default function InfoSection({ title, icon, items = [], className }) {
  return (
    <div className={cn("bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl overflow-hidden shadow-sm hover:ring-1 hover:ring-brand-500 transition-all duration-200", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-white">
        <div className="w-6 h-6 rounded-md bg-brand-50 flex items-center justify-center text-brand-600">
          {icon}
        </div>
        <h4 className="text-[14px] font-semibold text-slate-800">{title}</h4>
      </div>

      {/* Grid Content */}
      <div className="flex flex-wrap bg-slate-50/50">
        {items.map((item, index) => {
          // Determine width based on fullWidth prop
          const widthClass = item.fullWidth ? 'w-full' : 'w-full md:w-1/3';
          
          return (
            <div 
              key={index} 
              className={cn(
                "px-3 py-2 bg-white border-slate-100 flex flex-col justify-center ",
                widthClass,
                // Add top border for all except first row
                index > 2 && !item.fullWidth ? "border-t" : "",
                index > 0 && item.fullWidth ? "border-t" : "",
                // Add right border for 1st and 2nd column items
                !item.fullWidth && (index % 3 !== 2) ? "md:border-r" : ""
              )}
            >
              <p className="text-[10px] font-bold  text-slate-400 uppercase tracking-wider ">
                {item.label}
              </p>
              <p className="text-[13px] font-medium text-slate-800 break-words">
                {item.value || '-'}
              </p>
            </div>
          );
        })}
        
        {/* Fill remaining space with grey background if items aren't divisible by 3 */}
        {!items[items.length - 1]?.fullWidth && items.length % 3 !== 0 && (
          <div className={cn(
            "hidden md:block flex-1 bg-slate-50/50 border-t border-slate-100",
            items.length % 3 === 1 ? "md:w-2/3" : "md:w-1/3"
          )} />
        )}
      </div>
    </div>
  );
}
