import { useAuthStore } from "@/store/useAuthStore";
import PageHeader from "../../components/shared/PageHeader";
import Cards from "@/components/ui/Cards";

import { Users,FileText,CheckCircle,Percent } from "lucide-react";
import { useMemo } from "react";
import Filter from "@/components/team-leader/Filter";
import CandidateTable from "@/components/team-leader/CandidateTable";
export default function TeamLeaderDashboard() {
  const user = useAuthStore();
  const role = user?.role || "recruiter";
  const roleMetrics = useMemo(() => {
      switch (role) {
        case "admin":
          return {
            candidates: "5",
            candidatesTrend: { value: "+12%", isUp: true },
            candidatesChart: [{ v: 2 }, { v: 3 }, { v: 3 }, { v: 4 }, { v: 5 }],
            jds: "6",
            jdsTrend: { value: "+5", isUp: true },
            jdsChart: [{ v: 1 }, { v: 3 }, { v: 4 }, { v: 4 }, { v: 6 }],
            processed: "2",
            processedTrend: { value: "+8%", isUp: true },
            processedChart: [{ v: 0 }, { v: 1 }, { v: 1 }, { v: 2 }, { v: 2 }],
            success: "85%",
            successTrend: { value: "+3%", isUp: true },
            successChart: [{ v: 75 }, { v: 78 }, { v: 80 }, { v: 82 }, { v: 85 }]
          };
        case "teamLeader":
          return {
            candidates: "4",
            candidatesTrend: { value: "+12%", isUp: true },
            candidatesChart: [{ v: 1 }, { v: 2 }, { v: 2 }, { v: 3 }, { v: 4 }],
            jds: "4",
            jdsTrend: { value: "+5", isUp: true },
            jdsChart: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 3 }, { v: 4 }],
            processed: "1",
            processedTrend: { value: "+8%", isUp: true },
            processedChart: [{ v: 0 }, { v: 1 }, { v: 0 }, { v: 1 }, { v: 1 }],
            success: "85%",
            successTrend: { value: "+3%", isUp: true },
            successChart: [{ v: 70 }, { v: 75 }, { v: 80 }, { v: 82 }, { v: 85 }]
          };
        case "recruiter":
          return {
            candidates: "3",
            candidatesTrend: { value: "+10%", isUp: true },
            candidatesChart: [{ v: 1 }, { v: 2 }, { v: 2 }, { v: 3 }],
            jds: "3",
            jdsTrend: { value: "+2", isUp: true },
            jdsChart: [{ v: 1 }, { v: 2 }, { v: 3 }],
            processed: "1",
            processedTrend: { value: "-2%", isUp: false },
            processedChart: [{ v: 2 }, { v: 1 }, { v: 1 }],
            success: "80%",
            successTrend: { value: "+2%", isUp: true },
            successChart: [{ v: 75 }, { v: 78 }, { v: 80 }]
          };
        default:
          return {
            candidates: "3",
            candidatesTrend: { value: "+8%", isUp: true },
            candidatesChart: [{ v: 1 }, { v: 2 }, { v: 3 }],
            jds: "4",
            jdsTrend: { value: "+3", isUp: true },
            jdsChart: [{ v: 1 }, { v: 2 }, { v: 4 }],
            processed: "1",
            processedTrend: { value: "+4%", isUp: true },
            processedChart: [{ v: 0 }, { v: 1 }],
            success: "82%",
            successTrend: { value: "-1%", isUp: false },
            successChart: [{ v: 83 }, { v: 82 }]
          };
      }
    }, [role]);
  return (
     <div className="flex flex-col gap-4 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
          
          <PageHeader 
            title="Team Leader Dashboard"
            subtitle="Efficient pipeline management"
          />
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
            
            <Cards
              Icon={Users}
              value={roleMetrics.candidates}
              label="Candidates"
              trend={roleMetrics.candidatesTrend}
              chartData={roleMetrics.candidatesChart}
              colorTheme="purple"
            />
            <Cards
              Icon={FileText}
              value={roleMetrics.jds}
              label="JDs Active"
              trend={roleMetrics.jdsTrend}
              chartData={roleMetrics.jdsChart}
              colorTheme="green"
            />
            <Cards
              Icon={CheckCircle}
              value={roleMetrics.processed}
              label="Processed"
              trend={roleMetrics.processedTrend}
              chartData={roleMetrics.processedChart}
              colorTheme="orange"
            />
            <Cards
              Icon={Percent}
              value={roleMetrics.success}
              label="Success"
              trend={roleMetrics.successTrend}
              chartData={roleMetrics.successChart}
              colorTheme="blue"
            />
            
          </div>
    
          <Filter/>
          <CandidateTable/>
          

        </div>
  );
}
