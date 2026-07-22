import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, LogOut, User } from "lucide-react";
import NavItem from "./NavItem";

export default function MobileDrawer({ open, onClose, user, onLogout, navItems }) {
  if (!user) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl flex flex-col p-6 border-r border-slate-100 box-border font-sans"
          >
            {/* Close Button Inside Drawer */}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-4 top-4 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X size={16} strokeWidth={2} />
            </button>

            {/* Navigation Items (Top) */}
            <div className="flex flex-col gap-1.5 mt-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  to={item.path}
                  icon={item.icon}
                  title={item.title}
                  children={item.children}
                  onClick={onClose}
                  mobile={true}
                />
              ))}

              {/* Settings Button */}
              <button
                onClick={() => {
                  onClose();
                  // navigate to settings...
                }}
                className="w-full h-11 px-4 rounded-[12px] text-sm font-semibold flex items-center gap-3 text-slate-600 hover:bg-brand-50 hover:text-brand-500 transition-all duration-200 cursor-pointer"
              >
                <Settings size={18} strokeWidth={2} />
                Settings
              </button>

              {/* Logout Button */}
              <button
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full h-11 px-4 rounded-[12px] text-sm font-semibold flex items-center gap-3 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 cursor-pointer"
              >
                <LogOut size={18} strokeWidth={2} />
                Logout
              </button>
            </div>

            {/* User Profile Card (Bottom) */}
            <div className="mt-auto bg-slate-100 p-3.5 rounded-2xl flex items-center gap-3 w-full box-border">
              <div className="w-9 h-9 bg-white text-brand-500 font-bold rounded-full flex items-center justify-center shadow-sm select-none shrink-0 font-sans">
                {user.initials}
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="font-bold text-sm text-slate-800 truncate leading-none flex items-center gap-1.5">
                  <User size={13} className="text-brand-500" strokeWidth={2.5} />
                  {user.name}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold truncate mt-1">
                  {user.email || `${user.role}@recruitpro.com`}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
