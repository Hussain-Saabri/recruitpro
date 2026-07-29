import React, { forwardRef } from "react";
import Label from "../ui/Label";
import { twMerge } from "tailwind-merge";
import { CircleAlert } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      labelIcon,
      id,
      type = "text",
      placeholder = "",
      value,
      onChange,
      required = false,
      error = "",
      className = "",
      leftIcon = null,
      rightIcon = null,
      ...props
    },
    ref
  ) => {
    return (
      <div className="text-left">
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

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={twMerge(
              `w-full rounded-[5px] border px-3 py-2 text-[12.5px]  bg-white placeholder:text-gray-600 placeholder:text-[12px]
               transition-all duration-200 outline-none
               ${
                 leftIcon ? "pl-9" : ""
               }
               ${
                 rightIcon ? "pr-9" : ""
               }
               ${
                 error
                   ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                   : "border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
               }`,
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 text-slate-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
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

Input.displayName = "Input";

export default Input;