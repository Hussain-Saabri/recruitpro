import Search from "../ui/Search";
import Dropdown from "../ui/Dropdown";
import AppDatePicker from "../ui/AppDatePicker";
import { 
  CalendarDays, 
  User, 
  Tag, 
  ArrowUpDown,
  Clock,
  History,
  ArrowDownAZ,
  ArrowUpZA,
  Layers,
  Send,
  XCircle,
  UserX,
  CheckCircle2,
  HelpCircle,
  Users
} from "lucide-react";
import { useState } from "react";
import Separator from "../ui/Separator";
import ResetButton from "../ui/ResetButton";
import { FilterBadge } from "../ui/FilterBadge";

export default function Filter() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [recruiter, setRecruiter] = useState("all");

  const handleReset = () => {
    setSortOrder("latest");
    setStartDate("");
    setEndDate("");
    setSearch("");
    setStatus("all");
    setRecruiter("all");
  };

  const handleClearStatus = () => {
    setStatus("all");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const statusOptions = [
    { label: "All", value: "all", icon: <Layers size={14} className="text-brand-500" /> },
    { label: "Submitted", value: "submitted", icon: <Send size={14} className="text-blue-600" />, className: "text-blue-600 font-medium" },
    { label: "Profile Rejected By Client", value: "profile_rejected_by_client", icon: <XCircle size={14} className="text-red-500" />, className: "text-red-500 font-medium" },
    { label: "Profile Rejected By Team Lead", value: "profile_rejected_by_team_lead", icon: <UserX size={14} className="text-orange-500" />, className: "text-orange-500 font-medium" },
    { label: "Processed To Client", value: "processed_to_client", icon: <CheckCircle2 size={14} className="text-emerald-600" />, className: "text-emerald-600 font-medium" },
    { label: "No Response", value: "no_response", icon: <HelpCircle size={14} className="text-slate-500" />, className: "text-slate-700 font-medium" }
  ];

  const recruiterOptions = [
    { label: "All", value: "all", icon: <Users size={14} className="text-brand-500" /> },
    { label: "John Recruiter", value: "John Recruiter", icon: <User size={14} className="text-purple-600" /> }
  ];

  const dateOptions = [
    { label: "Latest", value: "latest", icon: <Clock size={14} className="text-brand-500" /> },
    { label: "Oldest", value: "oldest", icon: <History size={14} className="text-amber-500" /> },
    { label: "Name A-Z", value: "name_a_z", icon: <ArrowDownAZ size={14} className="text-blue-500" /> },
    { label: "Name Z-A", value: "name_z_a", icon: <ArrowUpZA size={14} className="text-indigo-500" /> }
  ];

  const getStatusLabel = (val) => {
    const option = statusOptions.find((opt) => opt.value === val);
    return option ? option.label : val;
  };

  return (
    <div className="relative z-30 flex flex-col gap-4 mt-4 mb-6 rounded-lg border border-slate-300 bg-white p-3 shadow-xs">
      <Search
        placeholder="Search by name or role...."
        value={search}
        onChange={handleSearch}
      />
      <div className="flex flex-row gap-4 md:gap-5 flex-wrap items-end">
        {/* Custom Date Range Section */}
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-800">
            <CalendarDays size={14} className="text-brand-500" />
            <span>Date Range</span>
          </div>
          <div className="flex items-center gap-2">
            <AppDatePicker
              value={startDate}
              onChange={setStartDate}
              placeholder="From Date"
            
              align="left"
             
            />
            <span className="text-xs text-slate-400 font-medium">to</span>
            <AppDatePicker
              value={endDate}
              onChange={setEndDate}
              placeholder="To Date"
          
              align="right"
              
            />
          </div>
        </div>

        <Dropdown
          wrapperClassName="w-full md:w-auto md:flex-none"
          label="Status"
          icon={<Tag size={14} className="text-brand-500" />}
          options={statusOptions}
          value={status || "all"}
          onChange={setStatus}
          defaultValue="all"
          className="w-full md:w-[255px] h-[42px] border-slate-300"
        />

        <Dropdown
          wrapperClassName="w-full md:w-auto md:flex-none"
          label="Recruiter"
          icon={<User size={14} className="text-brand-500" />}
          options={recruiterOptions}
          value={recruiter || "all"}
          onChange={setRecruiter}
          className="w-full md:w-[255px] h-[42px] border-slate-300"
          defaultValue="all"
        />

        <Dropdown
          wrapperClassName="w-full md:w-auto md:flex-none"
          label="Sort"
          icon={<ArrowUpDown size={14} className="text-brand-500" />}
          options={dateOptions}
          value={sortOrder}
          onChange={setSortOrder}
          className="w-full md:w-[262px] h-[42px] border-slate-300"
          defaultValue="latest"
        />
        <Separator />
        <ResetButton onClick={handleReset} />

        <div className="flex flex-row gap-3 ml-auto items-end pb-0.5">
          {status && status !== "all" && (
            <FilterBadge
              data=""
              value={getStatusLabel(status)}
              onClick={handleClearStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}