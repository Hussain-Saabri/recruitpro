import React from 'react';
import { cn } from '../../lib/utils';

export default function BaseCard({ children,icon, title,subtitle,className, ...props }) {
  return (
    <div 
      className={cn(
        "bg-white border border-slate-200 rounded-[5px] p-5 border-b   ",
        className
      )}
      {...props}
    >
      {/* Only render header if title or subtitle is provided */}
      {(title || subtitle) && (
        <div className="border-b border-slate-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-brand-600">{icon}</span>}
            {title && <p className="text-[18px] font-bold text-brand-500">{title}</p>}
          </div>
          {subtitle && (
            <span className="text-slate-500 text-[13px] font-medium">{subtitle}</span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
