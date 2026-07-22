import React from "react";

export default function InputFilter({
  label,
  icon,
  placeholder = "Filter...",
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header / Title */}
      {(label || icon) && (
        <div className="flex items-center gap-1.5 text-gray-700 font-medium text-[14px]">
          {icon}
          {label && <span>{label}</span>}
        </div>
      )}

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-[300px] h-8 px-3 border border-gray-300 rounded-[5px] text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
