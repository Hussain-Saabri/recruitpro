import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material";
import {
  Rocket as RocketIcon,
  Mail as EmailIcon,
  Lock as LockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  ShieldCheck as ShieldIcon,
  UserCheck as UserCheckIcon,
  Building2 as BuildingIcon,
  Users as UsersIcon,
  Briefcase as BriefcaseIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "../../store/useAuthStore";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";

export default function LoginComponent() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { label: "Super Admin", value: "Super Admin", icon: <ShieldIcon size={14} className="text-purple-600" /> },
    { label: "Admin", value: "Admin", icon: <UserCheckIcon size={14} className="text-indigo-600" /> },
    { label: "Account Manager", value: "Account Manager", icon: <BuildingIcon size={14} className="text-emerald-600" /> },
    { label: "Team Leader", value: "Team Leader", icon: <UsersIcon size={14} className="text-amber-600" /> },
    { label: "Recruiter", value: "Recruiter", icon: <BriefcaseIcon size={14} className="text-blue-600" /> }
  ];

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    let demoEmail = "";
    switch (role) {
      case "Super Admin":
        demoEmail = "superadmin@company.com";
        break;
      case "Admin":
        demoEmail = "admin@company.com";
        break;
      case "Account Manager":
        demoEmail = "accountmanager@company.com";
        break;
      case "Team Leader":
        demoEmail = "teamleader@company.com";
        break;
      case "Recruiter":
        demoEmail = "recruiter@company.com";
        break;
      default:
        demoEmail = "admin@company.com";
    }

    setEmail(demoEmail);
    setPassword("password123");
    toast.success(`Selected ${role} credentials`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Sign in successful! Welcome to RecruitPro.");
      login(email);

      setTimeout(() => {
        navigate("/dashboard");
      }, 400);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        background: "#FFFFFF",
        padding: "16px",
        width: "100%",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Top Left Brand Logo Header */}
      <div className="absolute top-5 left-6 flex items-center cursor-pointer z-20 font-sans">
        <div className="w-8 h-8 bg-brand-500 rounded-[8px] flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
          <RocketIcon size={18} strokeWidth={2} />
        </div>
        <span className="ml-3 font-bold text-lg text-slate-800 tracking-tight leading-none">
          RecruitPro
        </span>
        <span className="ml-2 bg-emerald-500 text-white text-[10px] font-extrabold rounded-md px-1.5 py-0.5">
          v1.0
        </span>
      </div>

      <Fade in={true} timeout={500}>
        <Card
          sx={{
            width: "100%",
            maxWidth: "380px",
            borderRadius: "16px",
            border: "1px solid #E9D5FF",
            boxShadow: "0 20px 40px -10px rgba(124, 77, 255, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
            padding: { xs: "20px 20px 24px", sm: "24px 28px 28px" },
            background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 60%, #EDE9FE 100%)",
            boxSizing: "border-box",
            overflow: "visible",
          }}
        >
          {/* Logo Section inside card */}
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundColor: "#6D5DF6",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "#FFFFFF",
              boxShadow: "0 6px 16px rgba(109, 93, 246, 0.25)",
            }}
          >
            <RocketIcon size={24} strokeWidth={2.2} />
          </Box>

          {/* Heading */}
          <Box sx={{ textAlign: "center", marginBottom: "18px" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#0F172A",
                fontSize: "17px",
                marginBottom: "3px",
                letterSpacing: "-0.3px",
              }}
            >
              Welcome Back To RecruitPro!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                lineHeight: 1.35,
                fontSize: "12px",
              }}
            >
              Sign in to access your operational workflow.
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <Box sx={{ marginBottom: "12px", textAlign: "left" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "#475569",
                  marginBottom: "4px",
                }}
              >
                <Box sx={{ color: "#6D5DF6", display: "flex" }}>
                  <EmailIcon size={14} strokeWidth={2} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  Email
                </Typography>
              </Box>
              <OutlinedInput
                fullWidth
                size="small"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#FAFAFA",
                  height: "38px",
                  fontSize: "13px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#EAE8FF",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C7D2FE",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6D5DF6",
                    borderWidth: "1.5px",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ marginBottom: "14px", textAlign: "left" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "#475569",
                  marginBottom: "4px",
                }}
              >
                <Box sx={{ color: "#6D5DF6", display: "flex" }}>
                  <LockIcon size={14} strokeWidth={2} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  Password
                </Typography>
              </Box>
              <OutlinedInput
                fullWidth
                size="small"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{ color: "#64748B", padding: "4px" }}
                    >
                      {showPassword ? (
                        <EyeOffIcon size={16} strokeWidth={2} />
                      ) : (
                        <EyeIcon size={16} strokeWidth={2} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#FAFAFA",
                  height: "38px",
                  fontSize: "13px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#EAE8FF",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C7D2FE",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6D5DF6",
                    borderWidth: "1.5px",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              />
            </Box>

            {/* Demo Role Selector Dropdown from UI Folder */}
            <div className="mb-4">
              <Dropdown
                label="Quick Demo Role"
                icon={<ShieldIcon size={13} className="text-brand-500" />}
                options={roleOptions}
                value={selectedRole}
                onChange={handleRoleChange}
                placeholder="Select a demo role"
                direction="up"
                wrapperClassName="w-full font-sans text-left"
                className="h-[38px] text-xs rounded-lg border-brand-100 bg-brand-50/40 hover:bg-brand-50/70 focus:border-brand-500 font-semibold"
              />
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="default"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full h-[42px] rounded-xl text-sm font-semibold shadow-md shadow-[#6D5DF6]/25 hover:shadow-lg bg-[#6D5DF6] hover:bg-[#5A4EE0] text-white border-none transition-all cursor-pointer"
            >
              Sign In
            </Button>
          </Box>
        </Card>
      </Fade>
    </Box>
  );
}
