import React, { forwardRef } from "react";
import Label from "./Label";
import { twMerge } from "tailwind-merge";
import { CircleAlert } from "lucide-react";

const Textarea = forwardRef(
  (
    {
      label,
      labelIcon,
      id,
      placeholder = "",
      value,
      onChange,
      required = false,
      error = "",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="text-left w-full">
        {label && (
          <Label
            htmlFor={id}
            required={required}
            className="flex items-center"
          >
            {labelIcon && (
              <span className="text-brand-600 flex items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5 mr-1.5 mt-[1px]">
                {labelIcon}
              </span>
            )}
            {label}
          </Label>
        )}

        <div className="relative w-full">
          <textarea
            ref={ref}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={twMerge(
              `w-full min-h-[80px] rounded-[5px] border px-3 py-2 text-[12.5px] text-slate-800 bg-white placeholder:text-gray-500 placeholder:text-[12px]
               transition-all duration-200 outline-none resize-y
               ${
                 error
                   ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/20"
                   : "border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
               }`,
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <div className="mt-1 flex items-center gap-1 text-[12.5px] font-medium text-red-500">
            <CircleAlert size={14} className="shrink-0" />
            <span className="leading-tight">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
