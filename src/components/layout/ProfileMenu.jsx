import React from "react";
import { LogOut } from "lucide-react";

export default function ProfileMenu({ user, onLogout }) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      {/* User initials circle */}
      <div className="w-8 h-8 bg-brand-500 text-white text-[13px] font-bold rounded-full flex items-center justify-center shadow-md shadow-brand-500/10 select-none">
        {user.initials}
      </div>

      {/* Profile Name & Role (Desktop Only) */}
      <div className="hidden md:flex flex-col text-left">
        <span className="font-semibold text-[12.5px] text-slate-800 leading-tight">
          {user.name}
        </span>
        <span className="font-medium text-[10px] text-slate-400 capitalize">
          {user.role}
        </span>
      </div>

      {/* Logout Button (Desktop Only) */}
      <button
        onClick={onLogout}
        aria-label="Logout"
        className="hidden md:flex w-8 h-8 border border-slate-200 rounded-[8px] items-center justify-center text-slate-500 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50 transition-all duration-200 cursor-pointer"
      >
        <LogOut size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
