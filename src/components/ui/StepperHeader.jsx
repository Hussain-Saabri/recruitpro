import React from 'react';
import { cn } from "@/lib/utils";

export default function StepperHeader({
  title,
  icon,
  subtitle,
  description,
  steps = [],
  currentStep = 1,
}) {
  return (
    <div className="flex flex-col items-center gap-1 mb-3 w-full">
      {/* Title */}
      <div className="flex items-center gap-2 text-brand-500 mb-2 mt-1">
        {icon}
        <p className="text-[12.5px] font-bold">{title}</p>
      </div>
      
      {/* Subtitle */}
      {subtitle && (
        <div className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-[13.5px] text-slate-700 font-medium w-full max-w-4xl text-center shadow-sm">
          {subtitle}
        </div>
      )}
      
      {/* Description */}
      {description && (
        <p className="text-[12.5px] text-slate-600 font-medium mt-3 mb-4">
          {description}
        </p>
      )}

      {/* Stepper */}
      <div className="flex items-center justify-between sm:justify-center mt-2 w-full max-w-xl relative overflow-x-auto pb-2 pt-1 px-1">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center gap-2 z-10 w-16 shrink-0">
                <div 
                  className={cn(
                    "flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300",
                    isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : 
                    isCurrent ? "bg-brand-500 border-brand-500 text-white shadow-md shadow-brand-500/20" : 
                    "bg-white border-slate-200 text-slate-400"
                  )}
                >
                  {step.icon}
                </div>
                <span className={cn(
                  "text-xs font-semibold text-center leading-tight",
                  isCompleted ? "text-slate-700" : 
                  isCurrent ? "text-brand-600" : 
                  "text-slate-500"
                )}>
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "flex-1 min-w-[16px] h-0.5 mx-1 sm:mx-2 -mt-6 transition-all duration-300 shrink-0",
                    stepNumber < currentStep ? "bg-brand-500" : "bg-slate-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
