import PageHeader from "@/components/shared/PageHeader";
import { useAuthStore } from "@/store/useAuthStore";
import JDCard from "@/components/shared/JDCard";
export default function Jds() {
  const user = useAuthStore();
  const role = user.role;
  return (
    <div className="flex flex-col gap-6 font-sans text-left w-full p-2">
      <PageHeader 
        title="Assigned JDs"
        subtitle="Select JD to add candidates"
      />
      
      {/* Grid of JD Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JDCard 
          jd={{
            id: "REQ-2025-FS-001",
            title: "Full Stack Developer",
            company: "Tech Corp",
            experience: "3-5 years",
            location: "Bangalore",
            salary: "12-15 LPA",
            type: "Contract to Hire",
            filled: 2,
            total: 5
          }} 
        />
        <JDCard 
          jd={{
            id: "REQ-2025-DO-002",
            title: "DevOps Engineer",
            company: "Cloud Solutions Ltd",
            experience: "4-6 years",
            location: "Mumbai",
            salary: "15-20 LPA",
            type: "Employer Payroll",
            filled: 1,
            total: 3
          }} 
        />
        <JDCard 
          jd={{
            id: "REQ-2025-DA-004",
            title: "Data Analyst",
            company: "Analytics Corp",
            experience: "2-5 years",
            location: "Bangalore",
            salary: "10-14 LPA",
            type: "Employer Payroll",
            filled: 1,
            total: 3
          }} 
        />
        <JDCard 
          jd={{
            id: "REQ-2025-DA-004",
            title: "Data Analyst",
            company: "Analytics Corp",
            experience: "2-5 years",
            location: "Bangalore",
            salary: "10-14 LPA",
            type: "Employer Payroll",
            filled: 1,
            total: 3
          }} 
        />
      </div>
    </div>
  );
}
