import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function AppDatePicker({
  value,
  onChange,
  placeholder = "dd-mm-yyyy",
  className = "",
  align = "left",
  position = "above"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentMonth(d);
      }
    }
  }, [value]);

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

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    if (!year || !month || !day) return dateStr;
    return `${day}/${month}/${year}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDay = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateStr = `${year}-${month}-${formattedDay}`;

    if (onChange) {
      onChange(dateStr);
    }
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange("");
    }
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const selectedDateObj = value ? new Date(value) : null;
  const isSelectedDateMonth = selectedDateObj &&
    selectedDateObj.getFullYear() === year &&
    selectedDateObj.getMonth() === month;
  const selectedDayNum = selectedDateObj ? selectedDateObj.getDate() : null;

  const today = new Date();
  const isTodayMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDayNum = today.getDate();

  return (
    <div className="relative inline-block w-full md:w-auto" ref={containerRef}>
      {/* Input Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`h-[42px] px-3 border border-slate-300 hover:border-slate-400 focus-within:border-brand-500 rounded-md bg-white text-xs font-medium text-slate-700 flex items-center justify-between gap-2 shadow-2xs transition-all cursor-pointer outline-none min-w-[140px] ${className}`}
      >
        <span className={value ? "text-slate-900 font-semibold" : "text-slate-400"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={12} />
            </button>
          )}
          <CalendarDays size={14} className="text-brand-500 shrink-0" />
        </div>
      </div>

      {/* Compact Brand-Themed Calendar Popup (Positioned Above) */}
      {isOpen && (
        <div
          className={`absolute z-[9999] bg-white border border-slate-200 shadow-2xl rounded-lg p-2.5 w-[230px] animate-in fade-in zoom-in-95 duration-150 ${
            position === "above" ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } ${align === "right" ? "right-0" : "left-0"}`}
        >
          {/* Header Month Navigation */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-800">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 hover:bg-brand-50 text-slate-600 hover:text-brand-600 rounded transition-colors cursor-pointer"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 hover:bg-brand-50 text-slate-600 hover:text-brand-600 rounded transition-colors cursor-pointer"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Weekday Headers (High Contrast Colors) */}
          <div className="grid grid-cols-7 gap-0.5 mt-1 text-center text-[11px] font-bold py-0.5 border-b border-slate-100 pb-1">
            <span className="text-amber-600">Mo</span>
            <span className="text-teal-600">Tu</span>
            <span className="text-purple-600">We</span>
            <span className="text-blue-600">Th</span>
            <span className="text-emerald-600">Fr</span>
            <span className="text-indigo-600">Sa</span>
            <span className="text-red-500 font-extrabold">Su</span>
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-0.5 mt-0.5 text-center">
            {/* Empty slots for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-6" />
            ))}

            {/* Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = isSelectedDateMonth && selectedDayNum === day;
              const isToday = isTodayMonth && todayDayNum === day;
              const dayOfWeek = (firstDay + i) % 7;
              const isSunday = dayOfWeek === 6;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-6 w-6 text-[11px] font-medium rounded-full flex items-center justify-center transition-all cursor-pointer mx-auto ${
                    isSelected
                      ? "bg-brand-500 text-white font-bold shadow-sm ring-2 ring-brand-300"
                      : isToday
                      ? "bg-brand-100 text-brand-700 font-bold border border-brand-300"
                      : isSunday
                      ? "text-red-500 font-semibold hover:bg-red-50 hover:text-red-600"
                      : "text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer Today Button */}
          <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                if (onChange) onChange("");
                setIsOpen(false);
              }}
              className="text-[10px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, "0");
                const day = String(now.getDate()).padStart(2, "0");
                if (onChange) onChange(`${year}-${month}-${day}`);
                setIsOpen(false);
              }}
              className="text-[10px] font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
