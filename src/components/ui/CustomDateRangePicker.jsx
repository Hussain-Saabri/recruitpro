import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronDown, X, Check } from "lucide-react";
import Button from "./Button";

export default function CustomDateRangePicker({
  startDate,
  endDate,
  onDateChange,
  placeholder = "Select Date Range"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState(startDate || "");
  const [tempEnd, setTempEnd] = useState(endDate || "");
  const containerRef = useRef(null);

  useEffect(() => {
    setTempStart(startDate || "");
    setTempEnd(endDate || "");
  }, [startDate, endDate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    if (onDateChange) {
      onDateChange(tempStart, tempEnd);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempStart("");
    setTempEnd("");
    if (onDateChange) {
      onDateChange("", "");
    }
    setIsOpen(false);
  };

  const setPreset = (days) => {
    const end = new Date();
    const start = new Date();
    if (days === 0) {
      // Today
    } else {
      start.setDate(end.getDate() - days);
    }

    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];

    setTempStart(startStr);
    setTempEnd(endStr);
    if (onDateChange) {
      onDateChange(startStr, endStr);
    }
    setIsOpen(false);
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getDisplayText = () => {
    if (startDate && endDate) {
      return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
    }
    if (startDate) {
      return `From ${formatDisplayDate(startDate)}`;
    }
    if (endDate) {
      return `Until ${formatDisplayDate(endDate)}`;
    }
    return placeholder;
  };

  return (
    <div className="relative inline-block w-full md:w-auto" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[42px] px-3.5 w-full md:w-auto border border-slate-300 hover:border-slate-400 focus:border-brand-500 rounded-md bg-white text-xs font-medium text-slate-700 flex items-center justify-between gap-3 shadow-2xs transition-all cursor-pointer outline-none"
      >
        <div className="flex items-center gap-2 truncate">
          <CalendarDays size={15} className="text-brand-500 shrink-0" />
          <span className="truncate">{getDisplayText()}</span>
        </div>
        {(startDate || endDate) ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="p-0.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={13} />
          </div>
        ) : (
          <ChevronDown size={14} className="text-slate-400 shrink-0" />
        )}
      </button>

      {/* Custom Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 shadow-xl rounded-xl p-4 flex flex-col gap-4 min-w-[300px] max-w-[340px] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">Select Date Range</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
            >
              <X size={14} />
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setPreset(0)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-brand-50 text-brand-600 hover:bg-brand-100 rounded-md transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setPreset(7)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => setPreset(30)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Last 30 Days
            </button>
          </div>

          {/* Custom Date Inputs */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-600">Start Date</label>
              <input
                type="date"
                value={tempStart}
                onChange={(e) => setTempStart(e.target.value)}
                className="h-9 px-3 border border-slate-300 focus:border-brand-500 rounded-md text-xs text-slate-700 bg-white outline-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-600">End Date</label>
              <input
                type="date"
                value={tempEnd}
                onChange={(e) => setTempEnd(e.target.value)}
                className="h-9 px-3 border border-slate-300 focus:border-brand-500 rounded-md text-xs text-slate-700 bg-white outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="h-8 px-3 text-xs text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleApply}
              className="h-8 px-4 text-xs bg-brand-500 hover:bg-brand-600 text-white font-medium border-none cursor-pointer flex items-center gap-1"
            >
              <Check size={13} /> Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
