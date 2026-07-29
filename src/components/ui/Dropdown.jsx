import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Check,
  CircleAlert,
} from "lucide-react";
import { cn } from "../../lib/utils";
import Label from "./Label";

export default function Dropdown({
  label,
  icon,
  labelIcon,
  required = false,
  options = [],
  value,
  onChange,
  defaultValue,
  placeholder = "Select an option",
  className = "",
  wrapperClassName = "",
  error = "",
  direction = "down",
  searchable = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((opt) => opt.value === value) ||
    (defaultValue
      ? options.find((opt) => opt.value === defaultValue)
      : null);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className={cn("text-left", wrapperClassName)} ref={dropdownRef}>
      {(label || labelIcon || icon) && (
        <Label
          required={required}
          className="flex items-center"
        >
          {(labelIcon || icon) && (
            <span className="text-brand-600 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5 mr-1.5 mt-[1px]">
              {labelIcon || icon}
            </span>
          )}
          {label}
        </Label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-[5px] border bg-white px-3 py-2 text-sm text-slate-800 transition-all focus:outline-none",

            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              : "border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",

            isOpen &&
              (error
                ? "ring-2 ring-red-500/20 border-red-500"
                : "ring-2 ring-brand-500/20 border-brand-500"),

            className
          )}
        >
          <span
            className={cn(
              "truncate pr-2 text-[14px]",
              !selectedOption &&
                "text-gray-500 text-[12px]"
            )}
          >
            {selectedOption
              ? selectedOption.label
              : placeholder}
          </span>

          <ChevronDown
            size={14}
            className={cn(
              "text-gray-500 transition-transform",
              isOpen && direction === "down" && "rotate-180",
              isOpen && direction === "up" && "rotate-0",
              !isOpen && direction === "up" && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute z-50 w-full max-h-60 overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95",
              direction === "up" ? "bottom-full mb-1" : "top-full mt-1"
            )}
          >
            {searchable && (
              <div className="sticky top-0 z-10 bg-white p-1 pb-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-brand-500 bg-gray-50"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-[13px] text-left outline-none transition-colors hover:bg-gray-100 hover:text-gray-900",

                    selectedOption?.value === option.value &&
                      "font-medium text-brand-500 hover:text-brand-600"
                  )}
                >
                  {selectedOption?.value === option.value && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-brand-500">
                      <Check
                        size={14}
                        strokeWidth={3}
                      />
                    </span>
                  )}

                  <span className="block w-full">{option.label}</span>
                </button>
              ))
            ) : (
              <div className="px-2 py-3 text-xs text-center text-gray-500">
                No results found
              </div>
            )}
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