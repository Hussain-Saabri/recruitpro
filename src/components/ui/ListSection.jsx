import React from 'react';
import { cn } from '../../lib/utils';
import { Calendar, MapPin, Tag, Book, Award, Briefcase } from 'lucide-react';

export default function ListSection({ title, icon, items = [], className }) {
  return (
    <div className={cn("bg-white border border-slate-200 border-l-[4px] border-l-brand-500 rounded-xl overflow-hidden shadow-sm hover:ring-1 hover:ring-brand-500 transition-all duration-200", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-50 flex items-center justify-center text-brand-600">
            {icon}
          </div>
          <h4 className="text-[14px] font-semibold text-slate-800">{title}</h4>
        </div>
        
        {/* Record count badge */}
        <div className="bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
          {items.length} record(s)
        </div>
      </div>

      {/* List Content */}
      <div className="p-3 flex flex-col gap-3 bg-white">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="border border-slate-100 bg-slate-50/50 rounded-xl p-3 flex gap-4 relative"
          >
            {/* Record Number */}
            <span className="absolute top-3 right-4 text-[12px] font-bold text-slate-300">
              #{index + 1}
            </span>

            {/* Left Icon */}
            {item.icon && (
              <div className="w-10 h-10 rounded-lg bg-brand-100/50 text-brand-600 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col gap-1.5 w-full pr-6">
              {/* Title & Subtitle */}
              <div>
                <h5 className="text-[14px] font-bold text-slate-800 leading-tight">{item.title}</h5>
                {item.subtitle && (
                  <p className="text-[12px] font-semibold text-brand-600 mt-0.5">{item.subtitle}</p>
                )}
              </div>

              {/* Badges */}
              {item.badges && item.badges.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {item.badges.map((badge, bIdx) => (
                    <div 
                      key={bIdx}
                      className="flex items-center gap-1 bg-brand-50 text-brand-600 border border-brand-100 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    >
                      {badge.icon && badge.icon}
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer: Date & Location */}
              <div className="flex items-center gap-4 mt-1 text-[11px] font-medium text-slate-400">
                {item.date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
