import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, ChevronDown, Check } from "lucide-react";
import { cn } from "../../lib/utils";

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
];

export default function SortDropdown({
  label = "Sort",
  value,
  onChange,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      {/* Header / Title */}
      {label && (
        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-[14px]">
          <ArrowUpDown size={14} className="text-brand-500" />
          <span>{label}</span>
        </div>
      )}

      {/* Custom Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full md:w-[300px] h-8 items-center justify-between rounded-[5px] border border-gray-300 bg-white px-3 text-[13px] text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all",
            isOpen && "ring-2 ring-brand-500 border-brand-500",
            className
          )}
        >
          <span>{selectedOption.label}</span>
          <ChevronDown size={14} className={cn("text-gray-500 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange && onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-[13px] outline-none transition-colors hover:bg-gray-100 hover:text-gray-900",
                  value === option.value && "text-brand-500 font-medium hover:text-brand-600"
                )}
              >
                {value === option.value && (
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-brand-500">
                    <Check size={14} strokeWidth={3} />
                  </span>
                )}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
