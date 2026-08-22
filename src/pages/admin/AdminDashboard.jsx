import { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../../store/useAuthStore";
import Cards from "@/components/ui/Cards";
import PageHeader from "../../components/shared/PageHeader";
import DataTable from "../../components/shared/DataTable";
import { useCandidateColumns } from "../../components/admin/CandidateColumns";
import CandidateDetailsView from "@/components/team-leader/CandidateDetailsView";
import CandidateDetailModal from "../../components/admin/CandidateDetailModal";
import { mockCandidates } from "../../components/admin/mockCandidates";
import {
  Users,
  FileText,
  CheckCircle,
  Percent,
  Table,
  Download,
  RefreshCw
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuthStore();
  const role = user?.role || "admin";

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState(mockCandidates);
  const columns = useCandidateColumns(setSelectedCandidate);

  const handleExport = () => {
    toast.success("Candidates list exported successfully!");
  };

  const handleRefresh = () => {
    toast.success("Candidates list refreshed!");
  };

  if (role === "superadmin") {
    return <Navigate to="/masters/organization" replace />;
  }

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
          processedTrend: { value: "-2%", isUp: false },
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
          successTrend: { value: "-1%", isUp: false }
        };
    }
  }, [role]);

  const handleStatusUpdate = (cand, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === cand.id ? { ...c, status: newStatus } : c));
    setSelectedCandidate(prev => prev ? { ...prev, status: newStatus } : null);
  };

  if (selectedCandidate) {
    return (
      <CandidateDetailsView
        candidate={selectedCandidate}
        onBack={() => setSelectedCandidate(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 font-sans text-left w-full p-2">
      <PageHeader 
        title={`${role === "teamLeader" ? "Team Leader" : role} Dashboard`}
        subtitle="Efficient pipeline management"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Candidates Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden w-full font-sans text-left">
        {/* Table Header Action Bar */}
        <div className="flex flex-row items-center justify-between p-4 gap-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="text-brand-600">
              <Table size={16} />
            </div>
            <p className="text-[15px] font-bold text-gray-900">Candidates</p>
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
      </div>

      <CandidateDetailModal
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
      />
    </div>
  );
}
