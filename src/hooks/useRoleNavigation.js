import { LayoutDashboard, FileText, PlusCircle, Users, Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export function useRoleNavigation() {
  const { user } = useAuthStore();
  
  if (!user) return [];

  const role = user?.role?.toLowerCase();

  switch (role) {
    case "recruiter":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "jds", title: "JDs", path: "/jds", icon: FileText },
        { id: "add-jd", title: "Add JD", path: "/add", icon: PlusCircle },
      ];
    
    case "admin":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "users", title: "Users", path: "/users", icon: Users },
        {
          id: "masters",
          title: "Masters",
          icon: Settings,
          children: [
            { id: "clients", title: "Clients", path: "/masters/clients" },
            { id: "recruiters", title: "Recruiters", path: "/masters/recruiters" },
            { id: "roles", title: "Roles", path: "/masters/roles" },
            { id: "permissions", title: "Permissions", path: "/masters/permissions" },
          ]
        },
      ];

    case "super admin":
    case "superadmin":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      ];

    case "account manager":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "manage", title: "Manage", path: "/manage", icon: Users },
      ];

    case "team leader":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      ];

    default:
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      ];
  }
}
