import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function NavItem({ to, icon: Icon, title, onClick, mobile = false, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseStyles = "font-semibold flex items-center gap-3 transition-all duration-200 cursor-pointer";

  const desktopStyles = (isActive) =>
    `${baseStyles} px-3 py-1.5 rounded-[8px] text-[13px] ${
      isActive
        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
        : "text-slate-600 hover:bg-brand-50 hover:text-brand-500"
    }`;

  const mobileStyles = (isActive) =>
    `${baseStyles} w-full h-10 px-4 rounded-[10px] text-[13px] ${
      isActive
        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/10 hover:bg-brand-600"
        : "text-slate-600 hover:bg-brand-50 hover:text-brand-500"
    }`;

  // If there are children, render a dropdown
  if (children && children.length > 0) {
    const isActive = children.some(child => location.pathname.startsWith(child.path));
    
    return (
      <div className="relative" ref={dropdownRef}>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={mobile ? mobileStyles(isActive) : desktopStyles(isActive)}
        >
          {Icon && <Icon size={mobile ? 16 : 14} strokeWidth={2} />}
          <span>{title}</span>
          <ChevronDown size={13} className={`ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>

        {isOpen && (
          <div className={`${mobile ? "mt-2 ml-4 flex flex-col gap-1" : "absolute top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl z-50 p-2 py-2 flex flex-col gap-1"}`}>
            {children.map((child) => {
              const ChildIcon = child.icon;
              return (
                <NavLink
                  key={child.id}
                  to={child.path}
                  onClick={() => {
                    setIsOpen(false);
                    if (onClick) onClick();
                  }}
                  className={({ isActive }) => 
                    `flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 ${
                      isActive 
                        ? "bg-brand-50 text-brand-600 font-bold" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-brand-500 font-semibold"
                    }`
                  }
                >
                  {ChildIcon && <ChildIcon size={13} strokeWidth={2.5} />}
                  <span>{child.title}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => mobile ? mobileStyles(isActive) : desktopStyles(isActive)}
    >
      {Icon && <Icon size={mobile ? 16 : 14} strokeWidth={2} />}
      <span>{title}</span>
    </NavLink>
  );
}
