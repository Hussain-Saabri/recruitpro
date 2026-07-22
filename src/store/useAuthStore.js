import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: (() => {
    const savedUser = localStorage.getItem("recruitpro_user");
    return savedUser ? JSON.parse(savedUser) : null;
  })(),

  login: (email) => {
    let role = "admin";
    let name = "Mike Admin";
    let initials = "MA";

    if (email.includes("superadmin")) {
      role = "superadmin";
      name = "Super Admin";
      initials = "SA";
    } else if (email.includes("recruiter")) {
      role = "recruiter";
      name = "Sarah Recruiter";
      initials = "SR";
    } else if (email.includes("leader")) {
      role = "teamLeader";
      name = "David Leader";
      initials = "DL";
    } else if (email.includes("manager")) {
      role = "teamLeader";
      name = "Alex Manager";
      initials = "AM";
    }

    const newUser = {
      email,
      name,
      role,
      initials,
    };

    localStorage.setItem("recruitpro_user", JSON.stringify(newUser));
    set({ user: newUser });
  },

  logout: () => {
    localStorage.removeItem("recruitpro_user");
    set({ user: null });
  },
}));
