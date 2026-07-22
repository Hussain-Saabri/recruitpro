import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  PlusCircle,
  Building,
  Settings
} from "lucide-react";

export const NAV_ITEMS = {
  superadmin: [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  admin: [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "manage",
      title: "Manage",
      path: "/manage",
      icon: FolderKanban,
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      children: [
        {
          id: "users",
          title: "Users",
          path: "/masters/users",
          icon: Users,
        },
        {
          id: "recruiters",
          title: "Recruiters",
          path: "/masters/recruiters",
          icon: Users,
        },
        {
          id: "clients",
          title: "Clients",
          path: "/masters/clients",
          icon: Building,
        },
        {
          id: "roles",
          title: "Roles",
          path: "/masters/roles",
          icon: FileText,
        },
        {
          id: "permissions",
          title: "Permission Settings",
          path: "/masters/permissions",
          icon: FileText,
        }
      ]
    },
  ],
  recruiter: [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "jds",
      title: "JDs",
      path: "/jds",
      icon: FileText,
    },
    {
      id: "add",
      title: "Add",
      path: "/add",
      icon: PlusCircle,
    },
  ],
  teamLeader: [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "manage",
      title: "Manage",
      path: "/manage",
      icon: FolderKanban,
    },
  ],
  accountManager: [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "manage",
      title: "Manage",
      path: "/manage",
      icon: FolderKanban,
    },
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    }
    
  ],
};
