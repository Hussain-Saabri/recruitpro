import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// Login Page
import Login from "../pages/auth/Login";


// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManage from "../pages/admin/AdminManage";
import Users from "../pages/admin/Users";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashbaord";
import AddOrganisation from "../pages/superadmin/AddOrganisation";
import EditOrganisation from "../pages/superadmin/EditOrganisation";
// Recruiter Pages
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import Jds from "../pages/recruiter/Jds";
import AddJd from "../pages/recruiter/AddJd";

// Account Manager Pages
import AccountManagerDashboard from "../pages/account-manager/AccountManagerDashboard";
import AccountManagerManage from "../pages/account-manager/AccountManagerManage";

// Team Leader Pages
import TeamLeaderDashboard from "../pages/team-leader/TeamLeaderDashboard";
import TeamLeaderManage from "../pages/team-leader/TeamLeaderManage";

// Master Pages


import ClientMaster from "../pages/masters/client/ClientMaster";
import DepartmentMaster from "../pages/masters/department/DepartmentMaster";
import RecruiterMaster from "../pages/masters/recruiter/RecruiterMaster";
import RoleMaster from "../pages/masters/role/RoleMaster";
import PermissionMaster from "../pages/masters/permission/PermissionMaster";
import SkillMaster from "../pages/masters/skill/SkillMaster";


// Components
import Navbar from "../components/layout/Navbar";

// Smart Routers
function DashboardRouter() {
  console.log("Inside the dashboard router");
  const { user } = useAuthStore();
  console.log("user",user);
  const role = user?.role?.toLowerCase() || 'admin'; 
  console.log("role",role);
  switch (role) {
    case 'superadmin': return <SuperAdminDashboard />;
    case 'admin': return <AdminDashboard />;
    case 'recruiter': return <RecruiterDashboard />;
    case 'accountmanager': return <AccountManagerDashboard />;
    case 'teamleader': return <TeamLeaderDashboard />;
    default: return <Navigate to="/login" replace />;
  }
}

function ManageRouter() {
  const { user } = useAuthStore();
  const role = user?.role?.toLowerCase() || 'admin'; // fallback for testing

  switch (role) {
    case 'superadmin':
    case 'admin': return <AdminManage />;
    case 'accountmanager': return <AccountManagerManage />;
    case 'teamleader': return <TeamLeaderManage />;
    
    default: return <Navigate to="/dashboard" replace />;
  }
}

function AppLayout() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-4 w-full box-border">
      <Outlet />
      </main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated Layout Routes */}
        <Route element={<AppLayout />}>
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/manage" element={<ManageRouter />} />
          <Route path="/add-organisation" element={<AddOrganisation />} />
          <Route path="/edit-organisation/:id" element={<EditOrganisation />} />
          {/* Admin Specific */}
          <Route path="/users" element={<Users />} />
          
          {/* Recruiter Specific */}
          <Route path="/jds" element={<Jds />} />
          <Route path="/add" element={<AddJd />} />
          
          {/* Master Screens */}


          <Route path="/masters/clients" element={<ClientMaster />} />
          <Route path="/masters/departments" element={<DepartmentMaster />} />
          <Route path="/masters/recruiters" element={<RecruiterMaster />} />
          <Route path="/masters/roles" element={<RoleMaster />} />
          <Route path="/masters/permissions" element={<PermissionMaster />} />
          <Route path="/masters/skills" element={<SkillMaster />} />

        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
