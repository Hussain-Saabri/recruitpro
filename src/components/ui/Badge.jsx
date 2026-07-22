import React from "react";

export default function Badge({
  children,
  variant = "gray",
  className = "",
  ...props
}) {
  const variantStyles = {
    brand: "bg-brand-50 text-brand-500 border-brand-100",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    error: "bg-rose-50 text-rose-600 border-rose-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
    gray: "bg-slate-50 text-slate-600 border-slate-200"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wide  whitespace-nowrap ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
