import React from "react";
import { twMerge } from "tailwind-merge";

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
        <div className={twMerge("flex items-start gap-2", className)}>
            <div className="flex h-5 items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    required={required}
                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer accent-brand-600"
                />
            </div>
            {(label || description) && (
                <div className="text-sm leading-5 flex flex-col pt-[2px]">
                    {label && (
                        <label htmlFor={id} className="font-medium text-slate-700 cursor-pointer">
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
