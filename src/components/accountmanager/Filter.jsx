import Search from "../ui/Search";
import FilterChips from "../ui/FilterChips";
import Dropdown from "../ui/Dropdown";
import { CalendarDays, User, Tag, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import Separator from "../ui/Separator";
import ResetButton from "../ui/ResetButton";
import { FilterBadge } from "../ui/FilterBadge";

export default function Filter() {
  const [dateFilter, setDateFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [recruiter, setRecruiter] = useState("all");

  const handleReset = () => {
    setSortOrder("latest");
    setDateFilter("All");
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
    { label: "All", value: "all" },
    { label: "Submitted", value: "submitted" },
    { label: "Profile Rejected By Client", value: "profile_rejected_by_client" },
    { label: "Profile Rejected By Team Lead", value: "profile_rejected_by_team_lead" },
    { label: "Processed To Client", value: "processed_to_client" },
    { label: "No Response", value: "no_response" }
  ];

  const recruiterOptions = [
    { label: "All", value: "all" },
    { label: "John Recruiter", value: "John Recruiter" }
  ];

  const dateOptions = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
    { label: "Name A-Z", value: "name_a_z" },
    { label: "Name Z-A", value: "name_z_a" }
  ];

  const getStatusLabel = (val) => {
    const option = statusOptions.find((opt) => opt.value === val);
    return option ? option.label : val;
  };

  return (
    <div className="relative z-20 flex flex-col gap-4 mt-4 mb-6 rounded-lg border border-gray-300 p-2">
      <Search
        placeholder="Search by name or role..."
        value={search}
        onChange={handleSearch}
      />
      <div className="flex flex-row gap-4 md:gap-6 flex-wrap">
        <div className="mr-auto w-full md:w-auto">
          <FilterChips
            label="Date"
            icon={<CalendarDays size={14} className="text-brand-500" />}
            options={["All", "Today", "7d", "30d", "Custom"]}
            value={dateFilter}
            onChange={setDateFilter}
          />
        </div>

        <Dropdown
          wrapperClassName="w-[calc(50%-0.5rem)] md:w-auto md:flex-none"
          label="Status"
          icon={<Tag size={14} className="text-brand-500" />}
          options={statusOptions}
          value={status || "all"}
          onChange={setStatus}
          defaultValue="all"
          className="w-full md:w-[275px] h-[42px]"
        />

        <Dropdown
          wrapperClassName="w-[calc(50%-0.5rem)] md:w-auto md:flex-none"
          label="Recruiter"
          icon={<User size={14} className="text-brand-500" />}
          options={recruiterOptions}
          value={recruiter || "all"}
          onChange={setRecruiter}
          className="w-full md:w-[275px] h-[42px]"
          defaultValue="all"
        />

        <Dropdown
          wrapperClassName="w-full md:w-auto md:flex-none"
          label="Sort"
          icon={<ArrowUpDown size={14} className="text-brand-500" />}
          options={dateOptions}
          value={sortOrder}
          onChange={setSortOrder}
          className="w-full md:w-[275px] h-[42px]"
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
