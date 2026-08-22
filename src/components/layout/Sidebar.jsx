import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useRoleNavigation } from "../../hooks/useRoleNavigation";
import { 
  Rocket, 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  User as UserIcon,
  LayoutGrid,
  Menu,
  X
} from "lucide-react";

export default function Sidebar({ onToggleLayout, currentLayout = "sidebar" }) {
  const { user, logout } = useAuthStore();
  const navItems = useRoleNavigation();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSubmenu = (id) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formattedRole = (role) => {
    if (!role) return "User";
    if (role === "teamleader") return "Team Leader";
    if (role === "accountmanager") return "Account Manager";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-40 w-full h-[56px] bg-white border-b border-slate-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Rocket size={15} />
            </div>
            <span className="font-bold text-base text-slate-800">RecruitPro</span>
          </div>
        </div>

        <button
          onClick={onToggleLayout}
          title="Switch to Top Navbar"
          className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Top Nav
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-[240px] bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out shrink-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Header & Branding */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Rocket size={18} strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[17px] text-slate-900 tracking-tight">
                RecruitPro
              </span>
              <span className="bg-brand-100 text-brand-700 text-[10px] font-extrabold rounded-md px-1.5 py-0.5 shadow-2xs">
                v1.0
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Navigation
          </div>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isSubmenuOpen = openSubmenus[item.id];
            const isActive = location.pathname === item.path;

            if (hasChildren) {
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      {IconComponent && <IconComponent size={18} className="text-slate-500" />}
                      <span>{item.title}</span>
                    </div>
                    {isSubmenuOpen ? (
                      <ChevronDown size={15} className="text-slate-400" />
                    ) : (
                      <ChevronRight size={15} className="text-slate-400" />
                    )}
                  </button>

                  {isSubmenuOpen && (
                    <div className="pl-9 pr-2 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                              isActive
                                ? "bg-brand-50 text-brand-600 font-semibold"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                            }`
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand-50 text-brand-600 font-semibold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {IconComponent && (
                      <IconComponent
                        size={18}
                        className={isActive ? "text-brand-600" : "text-slate-400"}
                      />
                    )}
                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Layout Switch Toggle & User Profile */}
        <div className="p-3 border-t border-slate-100 bg-white space-y-2">
          {/* Layout Mode Switch Button */}
          <button
            onClick={onToggleLayout}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <LayoutGrid size={14} className="text-brand-500" />
              <span>Layout Style</span>
            </div>
            <span className="text-[10px] font-bold text-brand-600 bg-brand-100 px-1.5 py-0.5 rounded">
              Sidebar
            </span>
          </button>

          {/* User Profile Dropdown Card */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/80 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-brand-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                  {getInitials(user?.name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-semibold text-slate-800 truncate">
                    {user?.name || "David Leader"}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium truncate">
                    {formattedRole(user?.role)}
                  </span>
                </div>
              </div>
              <ChevronDown size={15} className="text-slate-400 shrink-0" />
            </button>

            {/* Profile Popover */}
            {profileOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="w-full mt-1 flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
