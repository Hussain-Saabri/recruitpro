import React from "react";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";

export default function Checkbox({ 
    label, 
    description, 
    id, 
    checked, 
    onChange, 
    required = false, 
    className = "" 
}) {
    return (
        <div className={twMerge("flex items-start gap-3", className)}>
            <div className="flex h-5 items-center relative">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    required={required}
                    className="peer appearance-none h-4 w-4 shrink-0 rounded border border-gray-300 bg-white checked:bg-brand-500  focus:outline-none  focus:ring-brand-500 focus:ring-offset-2 transition-all cursor-pointer m-0"
                />
                <Check 
                    size={12} 
                    strokeWidth={4} 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                />
            </div>
            {(label || description) && (
                <div className="text-sm leading-5 flex flex-col pt-[1px]">
                    {label && (
                        <label htmlFor={id} className="font-medium text-slate-700 cursor-pointer select-none">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                    )}
                    {description && (
                        <p className="text-slate-500 text-xs mt-0.5">{description}</p>
                    )}
                </div>
            )}
        </div>
    );
}
