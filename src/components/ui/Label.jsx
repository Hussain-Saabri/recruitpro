import React from "react";

export default function Label({
  children,
  htmlFor,
  required = false,
  className = "",
  ...props
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xs font-semibold text-brand-700 text-left mb-1.5 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
    </label>
  );
}
