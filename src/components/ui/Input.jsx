import React, { forwardRef } from "react";
import Label from "../ui/Label";
import { twMerge } from "tailwind-merge";
const Input = forwardRef(({
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
}, ref) => {
  return (
    <div className=" text-left">
      {label && (
        <Label htmlFor={id} required={required} className="flex items-center gap-1.5">
          {labelIcon && <span className="text-brand-600 [&>svg]:w-3.5 [&>svg]:h-3.5 flex items-center justify-center">{labelIcon}</span>}
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
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={twMerge(
  `w-full rounded-[5px] border px-3 py-2 text-sm text-slate-800 bg-white placeholder:text-gray-500 placeholder:text-[12px] focus:outline-none focus:ring-2 transition-all duration-200 ${
    leftIcon ? "pl-9" : ""
  } ${
    rightIcon ? "pr-9" : ""
  } ${
    error
      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/25"
      : "border-slate-200 focus:border-brand-500 focus:ring-brand-500"
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
        <p className="text-xs text-rose-500 mt-1 font-medium text-left">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
