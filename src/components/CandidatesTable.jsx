import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import DataTable from "./shared/DataTable";
import {
  User,
  Briefcase,
  Layers,
  Flag,
  UserCheck,
  Calendar,
  Settings,
  Eye,
  Download,
  RefreshCw,
  Table,
  X,
  GraduationCap,
  Building,
  MapPin
} from "lucide-react";

export default function CandidatesTable() {
  // Modal state
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Enriched mock data of candidates matching the screenshot and detailed profile layout
  const [candidates, setCandidates] = useState([
    {
      id: "C001",
      name: "Priya Sharma",
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      gender: "Female",
      dob: "1998-05-15",
      panNumber: "ABCDE1234F",
      address: "123 Outer Ring Road, HSR Layout, Bangalore, Karnataka, 560102",
      role: "Cyber Security Engineer",
      reqCode: "REQ-2025-CSE-008",
      exp: "9y",
      relExp: "8y",
      status: "SUBMITTED",
      recruiter: "John Recruiter",
      date: "10/1/2025",
      time: "04:30 PM",
      skills: "Firewall Configuration, Penetration Testing, SIEM, Incident Response, Python",
      noticePeriod: "Immediate",
      workLocation: "Bangalore (On-site)",
      education: [
        {
          collegeName: "IIT Kharagpur",
          degree: "B.Tech",
          stream: "Computer Science & Engineering",
          streamType: "Full-Time",
          startDate: "2012",
          endDate: "2016",
          location: "Kharagpur, West Bengal"
        }
      ],
      employment: [
        {
          companyName: "Securify Technologies",
          designation: "Senior Security Consultant",
          payrollCompany: "Securify Payroll",
          employmentType: "Permanent",
          startDate: "2018",
          endDate: "Present",
          location: "Bangalore"
        },
        {
          companyName: "CyberSafe Corp",
          designation: "Security Analyst",
          payrollCompany: "CyberSafe Payroll",
          employmentType: "Permanent",
          startDate: "2016",
          endDate: "2018",
          location: "Mumbai"
        }
      ],
      clientInfo: {
        clientName: "SecureBank Solutions",
        requirementId: "REQ-2025-CSE-008",
        requirementType: "Contract to Hire",
        interviewType: "Video Call",
        onboardingType: "Employer Payroll",
        currentCtc: "18 LPA",
        expectedCtc: "22 LPA",
        uanNumber: "100987654321"
      }
    },
    {
      id: "C002",
      name: "David Lee",
      firstName: "David",
      lastName: "Lee",
      email: "david.lee@email.com",
      phone: "+91 99887 76655",
      gender: "Male",
      dob: "1999-11-22",
      panNumber: "XYZWP5678Q",
      address: "456 Tech Park Boulevard, Sector 62, Noida, Uttar Pradesh, 201301",
      role: "Data Analyst",
      reqCode: "REQ-2025-DA-004",
      exp: "3y",
      relExp: "3y",
      status: "SUBMITTED",
      recruiter: "John Recruiter",
      date: "10/1/2025",
      time: "03:00 PM",
      skills: "SQL, Python, PowerBI, Tableau, Data Warehousing, Statistics",
      noticePeriod: "15 Days",
      workLocation: "Noida (Hybrid)",
      education: [
        {
          collegeName: "Delhi University",
          degree: "B.Sc",
          stream: "Mathematical Statistics",
          streamType: "Full-Time",
          startDate: "2017",
          endDate: "2020",
          location: "New Delhi, Delhi"
        }
      ],
      employment: [
        {
          companyName: "DataMetrics Labs",
          designation: "Data Analyst",
          payrollCompany: "DataMetrics Payroll",
          employmentType: "Permanent",
          startDate: "2020",
          endDate: "Present",
          location: "Noida"
        }
      ],
      clientInfo: {
        clientName: "Global FinTech Corp",
        requirementId: "REQ-2025-DA-004",
        requirementType: "Permanent",
        interviewType: "F2F Panel",
        onboardingType: "Employer Payroll",
        currentCtc: "8 LPA",
        expectedCtc: "11 LPA",
        uanNumber: "102345678901"
      }
    },
    {
      id: "C003",
      name: "Carol Davis",
      firstName: "Carol",
      lastName: "Davis",
      email: "carol.davis@email.com",
      phone: "+91 91234 56789",
      gender: "Female",
      dob: "1997-09-10",
      panNumber: "MNBVC9876P",
      address: "789 Design Lane, Indiranagar, Bangalore, Karnataka, 560038",
      role: "UX Designer",
      reqCode: "REQ-2025-UX-003",
      exp: "4y",
      relExp: "3y",
      status: "SUBMITTED",
      recruiter: "John Recruiter",
      date: "9/30/2025",
      time: "10:15 PM",
      skills: "Figma, Adobe XD, Wireframing, User Research, Interaction Design",
      noticePeriod: "30 Days",
      workLocation: "Bangalore (Remote)",
      education: [
        {
          collegeName: "NID Ahmedabad",
          degree: "Master of Design (M.Des)",
          stream: "Interaction Design",
          streamType: "Full-Time",
          startDate: "2018",
          endDate: "2020",
          location: "Ahmedabad, Gujarat"
        },
        {
          collegeName: "IIT Guwahati",
          degree: "Bachelor of Design (B.Des)",
          stream: "Industrial & Product Design",
          streamType: "Full-Time",
          startDate: "2014",
          endDate: "2018",
          location: "Guwahati, Assam"
        }
      ],
      employment: [
        {
          companyName: "Creative UX Studio",
          designation: "UI/UX Designer",
          payrollCompany: "Creative Studio Payroll",
          employmentType: "Permanent",
          startDate: "2021",
          endDate: "Present",
          location: "Remote"
        },
        {
          companyName: "Digital Solutions Inc",
          designation: "Junior Interaction Designer",
          payrollCompany: "Digital Solutions Payroll",
          employmentType: "Contractor",
          startDate: "2020",
          endDate: "2021",
          location: "Bangalore"
        }
      ],
      clientInfo: {
        clientName: "E-Commerce Giants Ltd",
        requirementId: "REQ-2025-UX-003",
        requirementType: "Permanent",
        interviewType: "Portfolio Review",
        onboardingType: "Employer Payroll",
        currentCtc: "12 LPA",
        expectedCtc: "15 LPA",
        uanNumber: "105556667778"
      }
    },
    {
      id: "C004",
      name: "Bob Smith",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@email.com",
      phone: "+91 90000 11111",
      gender: "Male",
      dob: "1994-03-05",
      panNumber: "PLKJH4321R",
      address: "246 Cloud Infrastructure Street, HITEC City, Hyderabad, Telangana, 500081",
      role: "DevOps Engineer",
      reqCode: "REQ-2025-DO-002",
      exp: "7y",
      relExp: "6y",
      status: "PROCESSED TO CLIENT",
      recruiter: "John Recruiter",
      date: "9/29/2025",
      time: "03:45 PM",
      skills: "AWS, Kubernetes, Docker, Jenkins, Terraform, CI/CD, Linux Shell",
      noticePeriod: "Immediate",
      workLocation: "Hyderabad (Hybrid)",
      education: [
        {
          collegeName: "BITS Pilani",
          degree: "B.E. (Hons)",
          stream: "Computer Science",
          streamType: "Full-Time",
          startDate: "2013",
          endDate: "2017",
          location: "Pilani, Rajasthan"
        }
      ],
      employment: [
        {
          companyName: "CloudScale Systems",
          designation: "Lead DevOps Specialist",
          payrollCompany: "CloudScale Payroll",
          employmentType: "Permanent",
          startDate: "2020",
          endDate: "Present",
          location: "Hyderabad"
        },
        {
          companyName: "Infrastructure Partners",
          designation: "Systems & DevOps Engineer",
          payrollCompany: "Infra Partners Payroll",
          employmentType: "Permanent",
          startDate: "2017",
          endDate: "2020",
          location: "Pune"
        }
      ],
      clientInfo: {
        clientName: "Enterprise Cloud Platforms",
        requirementId: "REQ-2025-DO-002",
        requirementType: "Contract to Hire",
        interviewType: "Technical + Hands-on",
        onboardingType: "Employer Payroll",
        currentCtc: "16 LPA",
        expectedCtc: "20 LPA",
        uanNumber: "109876543210"
      }
    }
  ]);

  const handleExport = () => {
    toast.success("Candidates list exported successfully!");
  };

  const handleRefresh = () => {
    toast.success("Candidates list refreshed!");
  };

  // Helper to style status badges matching screenshot
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-[#EBF3FF] text-[#0066FF] border-[#CCE0FF]";
      case "PROCESSED TO CLIENT":
        return "bg-[#E8F8F0] text-[#10B981] border-[#D1F2E0]";
      case "SELECTED":
        return "bg-[#E8F8F0] text-[#10B981] border-[#D1F2E0]";
      case "REJECTED":
        return "bg-rose-50 text-rose-600 border-rose-200";
      default:
        return "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
    }
  };

  // Define table columns using useMemo
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center gap-1.5">
            <User size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Candidate</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800">{c.name}</span>
              <span className="text-xs text-slate-400 mt-0.5">{c.email}</span>
            </div>
          );
        }
      },
      {
        accessorKey: "role",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Briefcase size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Role</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col text-left">
              <span className="font-bold text-gray-700">{c.role}</span>
              <span className="text-xs text-gray-700 mt-0.5">{c.reqCode}</span>
            </div>
          );
        }
      },
      {
        accessorKey: "exp",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Layers size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Exp.</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800">{c.exp}</span>
              <span className="text-xs text-slate-400 mt-0.5">Rel: {c.relExp}</span>
            </div>
          );
        }
      },
      {
        accessorKey: "status",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Flag size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Status</span>
          </div>
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={`px-3 py-1 text-[10px] font-bold rounded-full border tracking-wide uppercase whitespace-nowrap ${getStatusBadgeStyle(
                status
              )}`}
            >
              {status}
            </span>
          );
        }
      },
      {
        accessorKey: "recruiter",
        header: () => (
          <div className="flex items-center gap-1.5">
            <UserCheck size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Recruiter</span>
          </div>
        ),
        cell: ({ getValue }) => (
          <span className="text-slate-700 font-medium">{getValue()}</span>
        )
      },
      {
        accessorKey: "date",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Calendar size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Date</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800">{c.date}</span>
              <span className="text-xs text-slate-400 mt-0.5">{c.time}</span>
            </div>
          );
        }
      },
      {
        id: "actions",
        header: () => (
          <div className="flex items-center gap-1.5">
            <Settings size={13} strokeWidth={2.5} className="text-brand-500" />
            <span>Actions</span>
          </div>
        ),
        cell: ({ row }) => {
          const c = row.original;
          return (
            <button
              onClick={() => setSelectedCandidate(c)}
              className="w-8 h-8 rounded border border-gray-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-all"
              title="View Profile"
            >
              <Eye size={14} className="text-slate-600" />
            </button>
          );
        }
      }
    ],
    []
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden w-full font-sans text-left mt-8">
      {/* Table Header Action Bar */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-500">
            <Table size={16} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 m-0">Candidates</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all"
          >
            <Download size={13} /> Export
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Table Element */}
      <DataTable data={candidates} columns={columns} />

      {/* Candidate Profile Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCandidate(null)}
          />

          {/* Modal Container */}
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-gray-100 flex flex-col relative animate-fadeInUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-500">
                  <User size={16} strokeWidth={2.5} />
                </div>
                <h2 className="text-base font-bold text-slate-800 m-0">Candidate Profile</h2>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-8 h-8 rounded hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center cursor-pointer transition-all"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm">
              {/* Hero Banner Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 font-bold text-2xl shrink-0">
                  {selectedCandidate.firstName[0]}
                  {selectedCandidate.lastName[0]}
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                  <div className="text-xl font-bold text-slate-800 leading-tight">
                    {selectedCandidate.name}
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      <Briefcase size={12} className="text-slate-500" />
                      {selectedCandidate.role}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      <MapPin size={12} className="text-slate-500" />
                      {selectedCandidate.workLocation}
                    </span>
                    <span className={`px-3 py-0.5 text-[9px] font-bold rounded-full border tracking-wide uppercase ${getStatusBadgeStyle(selectedCandidate.status)}`}>
                      {selectedCandidate.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar size={11} />
                    Submitted: {selectedCandidate.date} at {selectedCandidate.time}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold">
                  <User size={14} className="text-brand-500" />
                  <span>Personal Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3">
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">First Name</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.firstName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Last Name</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.lastName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Gender</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.gender}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Date of Birth</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.dob}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">PAN Number</span>
                    <span className="text-slate-800 font-semibold uppercase">{selectedCandidate.panNumber}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Email</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.email}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Phone</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.phone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-xs text-slate-400 font-semibold">Address</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.address}</span>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold">
                  <Briefcase size={14} className="text-brand-500" />
                  <span>Professional Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3">
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Role Applied For</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.role}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Total Experience</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.exp}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Relevant Experience</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.relExp}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Notice Period</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.noticePeriod}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-xs text-slate-400 font-semibold">Key Skills</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.skills}</span>
                  </div>
                </div>
              </div>

              {/* Education section */}
              <div>
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold mb-3">
                  <GraduationCap size={15} className="text-brand-500" />
                  <span>Education History</span>
                </div>
                <div className="space-y-3">
                  {selectedCandidate.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 border-l-4 border-l-brand-500 rounded-lg p-3 bg-brand-50/10 flex gap-3 relative"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 shrink-0 mt-0.5">
                        <GraduationCap size={15} />
                      </div>
                      <div className="flex flex-col text-left space-y-1">
                        <span className="font-semibold text-slate-800 text-sm">
                          {edu.collegeName}
                        </span>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{edu.degree}</span>
                          <span>•</span>
                          <span>{edu.stream}</span>
                          <span>•</span>
                          <span className="italic">{edu.streamType}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} /> {edu.startDate} - {edu.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employment section */}
              <div>
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold mb-3">
                  <Briefcase size={14} className="text-brand-500" />
                  <span>Employment History</span>
                </div>
                <div className="space-y-3">
                  {selectedCandidate.employment.map((emp, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 border-l-4 border-l-emerald-500 rounded-lg p-3 bg-emerald-50/10 flex gap-3 relative"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                        <Briefcase size={15} />
                      </div>
                      <div className="flex flex-col text-left space-y-1">
                        <span className="font-semibold text-slate-800 text-sm">
                          {emp.companyName}
                        </span>
                        <span className="text-xs text-slate-600 font-medium">
                          {emp.designation}
                        </span>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>Payroll: {emp.payrollCompany}</span>
                          <span>•</span>
                          <span>Type: {emp.employmentType}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} /> {emp.startDate} - {emp.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {emp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Information */}
              <div>
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-50 text-slate-700 font-bold">
                  <Building size={14} className="text-brand-500" />
                  <span>Client & Pipeline Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3">
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Client Name</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.clientName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Requirement ID</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.requirementId}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Work Type</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.requirementType}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Interview Type</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.interviewType}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Onboarding Type</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.onboardingType}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Current CTC</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.currentCtc}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">Expected CTC</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.expectedCtc}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold">UAN Number</span>
                    <span className="text-slate-800 font-semibold">{selectedCandidate.clientInfo.uanNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
