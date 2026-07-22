import React from "react";
import { cn } from "../../lib/utils";

export default function FilterChips({ 
  label, 
  icon, 
  options = [], 
  value, 
  onChange 
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header / Title */}
      {(label || icon) && (
        <div className="flex items-center gap-1.5 text-gray-900 font-semibold text-[14px]">
          {icon}
          {label && <span>{label}</span>}
        </div>
      )}
      
      {/* Chips */}
      <div className="flex items-center gap-1.5">
        {options.map((option) => {
          // Allow passing strings ["All", "Today"] or objects [{label: "All", value: "all"}]
          const optionLabel = typeof option === "object" ? option.label : option;
          const optionValue = typeof option === "object" ? option.value : option;
          const isActive = value === optionValue;

          return (
            <button
              key={optionValue}
              onClick={() => onChange && onChange(optionValue)}
              className={cn(
                "px-2 h-6 text-[10px] font-medium border rounded-md transition-all cursor-pointer",
                isActive
                  ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                  : "bg-white text-slate-600 border-gray-200 "
              )}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
