import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import { Table, Plus } from "lucide-react";
import { recruiterService } from "../../../services/recruiterService";
import SearchBar from "../../../components/shared/SearchBar";
import DeleteModal from "../../../components/shared/DeleteModal";
import { Button} from "../../../components/ui";
import DataTable from "../../../components/shared/DataTable";
import { useRecruiterColumns } from "../../../components/masters/recruiter/RecruiterColumns";
import AddRecruiter from "../../../components/masters/recruiter/AddRecruiter";

export default function RecruiterMaster() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [recruiterToDelete, setRecruiterToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddRecruiter, setShowAddRecruiter] = useState(false);
  const [editRecruiterId, setEditRecruiterId] = useState(null);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const data = await recruiterService.getRecruiters();
      setRecruiters(data);
    } catch (error) {
      toast.error("Failed to load recruiters.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleEdit = (recruiter) => {
    setShowAddRecruiter(true);
    setEditRecruiterId(recruiter.recruiterId || recruiter.id);
  };

  const handleDelete = (recruiter) => {
    setRecruiterToDelete(recruiter);
  };

  const confirmDelete = async () => {
    if (!recruiterToDelete) return;
    setIsDeleting(true);
    try {
      await recruiterService.deleteRecruiter(recruiterToDelete.recruiterId || recruiterToDelete.id);
      toast.success(`Recruiter deleted!`);
      fetchRecruiters();
      setRecruiterToDelete(null);
    } catch (error) {
      toast.error("Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredRecruiters = recruiters.filter((r) => {
    const query = searchQuery.toLowerCase();
    const recruiterName = r.name || r.Name || "";
    const contactName = r.primaryContactName || r.PrimaryContactName || "";
    return recruiterName.toLowerCase().includes(query) || contactName.toLowerCase().includes(query);
  });

  const columns = useRecruiterColumns({ handleEdit, handleDelete });

  if (showAddRecruiter) {
    return (
      <AddRecruiter 
        recruiterId={editRecruiterId} 
        onBack={() => {
          setShowAddRecruiter(false);
          setEditRecruiterId(null);
          fetchRecruiters();
        }} 
      />
    );
  }

  return (
    <div className="flex flex-col space-y-4 w-full font-sans text-left">
      <PageHeader title="Manage Recruiters" subtitle="Manage external recruitment agencies and vendors."  />         
      <div className="flex items-center justify-end">
        <SearchBar 
          placeholder="Search by Recruiter Name or Contact..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <div className="w-full bg-white rounded-xl border border-gray-300 overflow-hidden mt-0.5 relative flex flex-col">
        <DataTable 
          loading={loading}
          title="Recruiters"
          icon={<Table size={16} />}
          data={filteredRecruiters} 
          columns={columns}
          rightActions={
            <Button 
              variant="primary" 
              className="bg-brand-500 hover:bg-brand-600 border-none text-white cursor-pointer h-[26px] sm:h-[30px] px-2.5 sm:px-3 flex items-center gap-1 sm:gap-1.5 rounded-[4px] sm:rounded-[5px] transition-colors w-full sm:w-auto shadow-sm" 
              onClick={() => {
                setShowAddRecruiter(true);
                setEditRecruiterId(null);
              }} 
            >
              <Plus size={13} strokeWidth={2.5} />
              <span className="font-semibold text-[11px] sm:text-[12.5px]">Add Recruiter</span>
            </Button>
          }
        />
      </div>
      <DeleteModal 
        isOpen={!!recruiterToDelete}
        onClose={() => setRecruiterToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Recruiter"
        itemType="recruiter"
        itemName={recruiterToDelete?.name || recruiterToDelete?.Name}
      />
    </div>
  );
}
