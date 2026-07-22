import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Fade,
} from "@mui/material";
import { Button } from "../ui";
import {
  RocketIcon,
  EmailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SignInIcon,
  InfoIcon,
  UserIcon,
  UsersIcon,
} from "../../lib/icons";
import { toast } from 'sonner'
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";



export default function LoginComponent() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoAccess = (role) => {
    setIsLoading(true);
    let demoEmail = "";
    let demoPass = "password123";
    switch (role) {
      case "Super Admin":
        demoEmail = "superadmin@recruitpro.com";
        break;
      case "Admin":
        demoEmail = "admin@company.com";
        break;
      case "Recruiter":
        demoEmail = "recruiter@recruitpro.com";
        break;
      case "Team Leader":
        demoEmail = "leader@recruitpro.com";
        break;
      case "Account Manager":
        demoEmail = "manager@recruitpro.com";
        break;
      default:
        demoEmail = "admin@company.com";
    }

    // Simulate standard autofill animation delay
    setTimeout(() => {
      setEmail(demoEmail);
      setPassword(demoPass);
      setIsLoading(false);
      
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast("Sign in successful! Welcome to RecruitPro.");
      
      login(email);

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFC",
        background: "radial-gradient(circle at 50% 50%, #FAF5FF 0%, #F1F5F9 100%)",
        padding: "24px",
        width: "100%",
      }}
    >
      <Fade in={true} timeout={600}>
        <Card
          sx={{
            width: "100%",
            maxWidth: "460px",
            borderRadius: "24px",
            boxShadow:
              "0px 20px 40px rgba(124, 77, 255, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.02)",
            padding: { xs: "20px 24px 32px", sm: "28px 40px 48px" },
            backgroundColor: "#FFFFFF",
            border: "1px solid #F1F5F9",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              width: "64px",
              height: "64px",
              backgroundColor: "#7C4DFF",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 8px 16px rgba(124, 77, 255, 0.2)",
              color: "#FFFFFF",
            }}
          >
            <RocketIcon size={32} strokeWidth={2} />
          </Box>

          {/* Heading */}
          <Box sx={{ textAlign: "center", marginBottom: "24px" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1E293B",
                fontSize: "20px",
                marginBottom: "4px",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome Back To RecruitPro!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                lineHeight: 1.4,
                fontSize: "13px",
              }}
            >
              Sign in to access detailed insights into your operational workflow.
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <Box sx={{ marginBottom: "16px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#475569",
                  marginBottom: "6px",
                }}
              >
                <Box sx={{ color: "#2563EB", display: "flex" }}>
                  <EmailIcon size={16} strokeWidth={2} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "13px",
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
                  borderRadius: "10px",
                  backgroundColor: "#FAFAFA",
                  height: "44px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#CBD5E1",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7C4DFF",
                    borderWidth: "1.5px",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ marginBottom: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#475569",
                  marginBottom: "6px",
                }}
              >
                <Box sx={{ color: "#2563EB", display: "flex" }}>
                  <LockIcon size={16} strokeWidth={2} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "13px",
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
                        <EyeOffIcon size={18} strokeWidth={2} />
                      ) : (
                        <EyeIcon size={18} strokeWidth={2} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#FAFAFA",
                  height: "44px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#CBD5E1",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7C4DFF",
                    borderWidth: "1.5px",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              />
            </Box>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="default"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full h-[52px] rounded-xl text-base font-semibold shadow-md shadow-[#7C4DFF]/20 hover:shadow-lg hover:shadow-[#7C4DFF]/40 mb-8 bg-[#7C4DFF] hover:bg-[#651FFF] text-white border-none"
              leftIcon={<SignInIcon size={18} strokeWidth={2} />}
            >
              Sign In
            </Button>
          </Box>

          {/* Demo Access Panel */}
          <Box
            sx={{
              backgroundColor: "#FAF9FF",
              border: "1px solid #ECE9FF",
              borderRadius: "18px",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#7C4DFF",
                marginBottom: "12px",
              }}
            >
              <InfoIcon size={16} strokeWidth={2} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Quick Demo Access
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {/* Super Admin */}
              <Box
                component="button"
                type="button"
                onClick={() => handleDemoAccess("Super Admin")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#7C4DFF",
                    backgroundColor: "#FAF5FF",
                    color: "#7C4DFF",
                  },
                }}
              >
                Super Admin
              </Box>

              {/* Admin */}
              <Box
                component="button"
                type="button"
                onClick={() => handleDemoAccess("Admin")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#7C4DFF",
                    backgroundColor: "#FAF5FF",
                    color: "#7C4DFF",
                  },
                }}
              >
                Admin
              </Box>

              {/* Recruiter */}
              <Box
                component="button"
                type="button"
                onClick={() => handleDemoAccess("Recruiter")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#7C4DFF",
                    backgroundColor: "#FAF5FF",
                    color: "#7C4DFF",
                  },
                }}
              >
                Recruiter
              </Box>

              {/* Team Leader */}
              <Box
                component="button"
                type="button"
                onClick={() => handleDemoAccess("Team Leader")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#7C4DFF",
                    backgroundColor: "#FAF5FF",
                    color: "#7C4DFF",
                  },
                }}
              >
                Team Leader
              </Box>

              {/* Account Manager */}
              <Box
                component="button"
                type="button"
                onClick={() => handleDemoAccess("Account Manager")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "8px",
                  gridColumn: "span 2",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#7C4DFF",
                    backgroundColor: "#FAF5FF",
                    color: "#7C4DFF",
                  },
                }}
              >
                Account Manager
              </Box>
            </Box>
          </Box>
        </Card>
      </Fade>

    </Box>
  );
}
