import { useAuthStore } from "@/store/useAuthStore";
import PageHeader from "../../components/shared/PageHeader";
import Cards from "@/components/ui/Cards";

import { Users,FileText,CheckCircle,Percent } from "lucide-react";
import { useMemo } from "react";
import Filter from "@/components/recruiter/Filter";
import CandidateTable from "@/components/recruiter/CandidateTable";
export default function RecruiterDashboard() {
  const user = useAuthStore();
  const role = user?.role || "recruiter";
  const roleMetrics = useMemo(() => {
      switch (role) {
        case "admin":
          return {
            candidates: "5",
            candidatesTrend: { value: "+12%", isUp: true },
            jds: "6",
            jdsTrend: { value: "+5", isUp: true },
            processed: "2",
            processedTrend: { value: "+8%", isUp: true },
            success: "85%",
            successTrend: { value: "+3%", isUp: true }
          };
        case "teamLeader":
          return {
            candidates: "4",
            candidatesTrend: { value: "+12%", isUp: true },
            jds: "4",
            jdsTrend: { value: "+5", isUp: true },
            processed: "1",
            processedTrend: { value: "+8%", isUp: true },
            success: "85%",
            successTrend: { value: "+3%", isUp: true }
          };
        case "recruiter":
          return {
            candidates: "3",
            candidatesTrend: { value: "+10%", isUp: true },
            jds: "3",
            jdsTrend: { value: "+2", isUp: true },
            processed: "1",
            processedTrend: { value: "-2%", isUp: false }, // Negative trend to demonstrate logic
            success: "80%",
            successTrend: { value: "+2%", isUp: true }
          };
        default:
          return {
            candidates: "3",
            candidatesTrend: { value: "+8%", isUp: true },
            jds: "4",
            jdsTrend: { value: "+3", isUp: true },
            processed: "1",
            processedTrend: { value: "+4%", isUp: true },
            success: "82%",
            successTrend: { value: "-1%", isUp: false } // Negative trend to demonstrate logic
          };
      }
    }, [role]);
  return (
     <div className="flex flex-col gap-4 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
          
          <PageHeader 
            title={`${role === "teamLeader" ? "Team Leader" : role} Dashboard`}
            subtitle="Efficient pipeline management"
          />
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
            
            <Cards
              Icon={Users}
              value={roleMetrics.candidates}
              label="Candidates"
              trend={roleMetrics.candidatesTrend}
              colorTheme="purple"
            />
            <Cards
              Icon={FileText}
              value={roleMetrics.jds}
              label="JDs Active"
              trend={roleMetrics.jdsTrend}
              colorTheme="green"
            />
            <Cards
              Icon={CheckCircle}
              value={roleMetrics.processed}
              label="Processed"
              trend={roleMetrics.processedTrend}
              colorTheme="orange"
            />
            <Cards
              Icon={Percent}
              value={roleMetrics.success}
              label="Success"
              trend={roleMetrics.successTrend}
              colorTheme="blue"
            />
            
          </div>
    
          <Filter/>
          
          <CandidateTable/>

        </div>
  );
}
