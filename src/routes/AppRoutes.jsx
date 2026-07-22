import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// Pages
import Login from "../pages/auth/Login";


// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManage from "../pages/admin/AdminManage";
import Users from "../pages/admin/Users";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashbaord";

// Recruiter Pages
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import Jds from "../pages/recruiter/Jds";
import AddJd from "../pages/recruiter/AddJd";

// Account Manager Pages
import AccountManagerDashboard from "../pages/account-manager/AccountManagerDashboard";
import AccountManagerManage from "../pages/account-manager/AccountManagerManage";

// Team Leader Pages
import TeamLeaderDashboard from "../pages/team-leader/TeamLeaderDashboard";

// Master Pages


import ClientMaster from "../pages/masters/client/ClientMaster";
import RecruiterMaster from "../pages/masters/recruiter/RecruiterMaster";
import RoleMaster from "../pages/masters/role/RoleMaster";
import PermissionMaster from "../pages/masters/permission/PermissionMaster";


// Components
import Navbar from "../components/layout/Navbar";

// Smart Routers
function DashboardRouter() {
  const { user } = useAuthStore();
  const role = user?.role?.toLowerCase() || 'admin'; // fallback for testing

  switch (role) {
    case 'superadmin': return <SuperAdminDashboard />;
    case 'admin': return <AdminDashboard />;
    case 'recruiter': return <RecruiterDashboard />;
    case 'account manager': return <AccountManagerDashboard />;
    case 'team leader': return <TeamLeaderDashboard />;
    default: return <Navigate to="/login" replace />;
  }
}

function ManageRouter() {
  const { user } = useAuthStore();
  const role = user?.role?.toLowerCase() || 'admin'; // fallback for testing

  switch (role) {
    case 'superadmin':
    case 'admin': return <AdminManage />;
    case 'account manager': return <AccountManagerManage />;
    // Other roles don't have manage, send them to dashboard
    default: return <Navigate to="/dashboard" replace />;
  }
}

// Layout wrapper for authenticated users
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
          
          {/* Smart Routes */}
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/manage" element={<ManageRouter />} />
          
          {/* Admin Specific */}
          <Route path="/users" element={<Users />} />
          
          {/* Recruiter Specific */}
          <Route path="/jds" element={<Jds />} />
          <Route path="/add" element={<AddJd />} />
          
          {/* Master Screens */}


          <Route path="/masters/clients" element={<ClientMaster />} />
          <Route path="/masters/recruiters" element={<RecruiterMaster />} />
          <Route path="/masters/roles" element={<RoleMaster />} />
          <Route path="/masters/permissions" element={<PermissionMaster />} />

        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
