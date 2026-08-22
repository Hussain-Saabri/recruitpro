import Cards from "@/components/ui/Cards";
import { Users,FileText,CheckCircle,Percent } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Filter from "@/components/accountmanager/Filter";
import CandidateTable from "@/components/accountmanager/CandidateTable";

export default function AccountManagerDashboard() {
  return (
    <div className="flex flex-col gap-4 font-sans text-left w-full max-w-full overflow-x-hidden p-2">
              
              <PageHeader 
                title="Account Manager Dashboard"
                subtitle="Efficient pipeline management"
              />
        
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
                
                <Cards
                  Icon={Users}
                  value="5"
                  label="Candidates"
                  trend={""}
                  chartData={""}
                  colorTheme="purple"

                />
                <Cards
                  Icon={FileText}
                  value="5"
                  label="JDs Active"
                  trend={""}
                  chartData={""}
                  colorTheme="green"
                />
                <Cards
                  Icon={CheckCircle}
                  value="5"
                  label="Processed"
                  trend={""}
                  chartData={""}
                  colorTheme="orange"
                />
                <Cards
                  Icon={Percent}
                  value="85%"
                  label="Success"
                  trend={""}
                  chartData={""}
                  colorTheme="blue"
                />
                
              </div>
        
              <Filter />
              <CandidateTable />
            </div>
  );
}
