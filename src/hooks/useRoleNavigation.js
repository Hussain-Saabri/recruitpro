import { LayoutDashboard, FileText,PlusCircle, Users, Settings, FolderKanban } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export function useRoleNavigation() {
  console.log("Inside the useRoleNavigation");
  const { user } = useAuthStore();
  console.log("user",user);
  if (!user) return [];

  const role = user?.role?.toLowerCase();
  console.log("role",role);

  switch (role) {
    case "recruiter":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "jds", title: "JDs", path: "/jds", icon: FileText },
      ];
    
    case "admin":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "users", title: "Users", path: "/users", icon: Users },
        {
          id: "masters",
          title: "Settings",
          icon: Settings,
          children: [
            { id: "clients", title: "Clients", path: "/masters/clients" },
            { id: "departments", title: "Departments", path: "/masters/departments" },
            { id: "recruiters", title: "Recruiters", path: "/masters/recruiters" },
            { id: "roles", title: "Roles", path: "/masters/roles" },
            { id: "permissions", title: "Permissions", path: "/masters/permissions" },
            { id: "skills", title: "Skills", path: "/masters/skills" },
          ]
        },
      ];

    case "super admin":
    case "superadmin":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "add", title: "Add Organisation", path: "/add-organisation", icon: PlusCircle },
      ];

    case "accountmanager":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "manage", title: "Manage", path: "/manage", icon: Users },
      ];

    case "teamleader":
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { id: "manage", title: "Manage", path: "/manage", icon: FolderKanban },
      ];

    default:
      return [
        { id: "dashboard", title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      ];
  }
}
