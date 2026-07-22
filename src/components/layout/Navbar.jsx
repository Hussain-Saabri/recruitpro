import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useRoleNavigation } from "../../hooks/useRoleNavigation";

import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";
import MobileDrawer from "./MobileDrawer";

import { Rocket, Menu } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navItems = useRoleNavigation();
  console.log("navItems", navItems);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full h-[60px] flex items-center justify-between px-4 md:px-6 transition-all duration-300 font-sans ${scrolled
            ? "bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
            : "bg-white border-b border-slate-100"
          }`}
      >
        {/* Left Section: Logo & Hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex md:hidden w-8 h-8 border border-slate-200 rounded-[8px] items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50 transition-all duration-200 cursor-pointer"
          >
            <Menu size={18} strokeWidth={2} />
          </button>

          {/* Logo & Branding */}
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-brand-500 rounded-[8px] flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <Rocket size={18} strokeWidth={2} />
            </div>
            <span className="ml-3 font-bold text-lg text-slate-800 tracking-tight leading-none">
              RecruitPro
            </span>
            <span className="ml-2 bg-emerald-500 text-white text-[10px] font-extrabold rounded-md px-1.5 py-0.5">
              v1.0
            </span>
          </div>
        </div>

        {/* Center Section: Navigation Links (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              to={item.path}
              icon={item.icon}
              title={item.title}
              children={item.children}
            />
          ))}
        </div>

        {/* Right Section: User Profile & Actions */}
        <ProfileMenu user={user} onLogout={logout} />
      </nav>

      {/* Mobile Drawer Slide-over */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        onLogout={logout}
        navItems={navItems}
      />
    </>
  );
}
