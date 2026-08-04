import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import { Table, Plus, Brain } from "lucide-react";
import { skillService } from "../../../services/skillService";
import SearchBar from "../../../components/shared/SearchBar";
import DeleteModal from "../../../components/shared/DeleteModal";
import { Button } from "../../../components/ui";
import DataTable from "../../../components/shared/DataTable";
import { useSkillColumns } from "../../../components/masters/skill/SkillColumns";
import SkillModal from "../../../components/masters/skill/SkillModal";

export default function SkillMaster() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      let data = [];
      try {
        data = await skillService.getSkills();
      } catch (err) {
        console.error("API failed, falling back to dummy data", err);
      }

      const dummySkills = [
        { id: 1, name: "React", category: "Frontend", isActive: true },
        { id: 2, name: "Node.js", category: "Backend", isActive: true },
        { id: 3, name: "Python", category: "Backend", isActive: true },
        { id: 4, name: "AWS", category: "Cloud", isActive: true },
        { id: 5, name: "Docker", category: "DevOps", isActive: true },
        { id: 6, name: "Kubernetes", category: "DevOps", isActive: false },
        { id: 7, name: "TypeScript", category: "Frontend", isActive: true },
        { id: 8, name: "SQL", category: "Database", isActive: true },
        { id: 9, name: "MongoDB", category: "Database", isActive: true },
        { id: 10, name: "Figma", category: "Design", isActive: true },
        { id: 11, name: "Communication", category: "Soft Skills", isActive: true },
        { id: 12, name: "Leadership", category: "Soft Skills", isActive: false },
        { id: 13, name: "Agile / Scrum", category: "Management", isActive: true },
        { id: 14, name: "C#", category: "Programming", isActive: true },
        { id: 15, name: "Data Analysis", category: "Data Science", isActive: false },
        { id: 16, name: "Rust", category: "Backend", isActive: true },
        { id: 17, name: "Angular", category: "Frontend", isActive: false },
        { id: 18, name: "Vue.js", category: "Frontend", isActive: true },
        { id: 19, name: "GCP", category: "Cloud", isActive: true },
        { id: 20, name: "Azure", category: "Cloud", isActive: false },
      ];

      data = [...(data || []), ...dummySkills];
      setSkills(data);
    } catch (error) {
      toast.error("Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (skill) => {
    setSkillToEdit(skill);
    setIsModalOpen(true);
  };

  const handleDelete = (skill) => {
    setSkillToDelete(skill);
  };

  const confirmDelete = async () => {
    if (!skillToDelete) return;
    setIsDeleting(true);
    try {
      await skillService.deleteSkill(skillToDelete.skillId || skillToDelete.id);
      toast.success(`Skill deleted successfully!`);
      fetchSkills();
      setSkillToDelete(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredSkills = skills.filter((s) => {
    const query = searchQuery.toLowerCase();
    const skillName = s.name || "";
    const category = s.category || "";
    return skillName.toLowerCase().includes(query) || category.toLowerCase().includes(query);
  });

  const columns = useSkillColumns({ handleEdit, handleDelete });

  return (
    <div className="flex flex-col space-y-4 w-full font-sans text-left">
      <PageHeader 
        title="Manage Skills" 
        subtitle="Manage professional skills and categories."  
      />         
      
      <div className="flex items-center justify-end sm:hidden w-full">
        <SearchBar 
          placeholder="Search by Skill or Category..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="w-full"
        />
      </div>

      <div className="w-full bg-white rounded-[8px] border border-gray-300 overflow-hidden mt-0.5 relative flex flex-col">
        <DataTable 
          loading={loading}
          title="Skills"
          icon={<Brain size={16} />}
          data={filteredSkills} 
          columns={columns}
          rightActions={
            <>
              <div className="hidden sm:block">
                <SearchBar 
                  placeholder="Search by Skill or Category..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>
              <Button 
                variant="primary" 
                className="bg-brand-500 hover:bg-brand-600 border-none text-white cursor-pointer h-[26px] sm:h-[35px] px-2.5 sm:px-3 flex items-center gap-1 sm:gap-1.5 rounded-[4px] sm:rounded-[5px] transition-colors w-full sm:w-auto shadow-sm" 
                onClick={() => {
                  setSkillToEdit(null);
                  setIsModalOpen(true);
                }} 
              >
                <Plus size={13} strokeWidth={2.5} />
                <span className="font-semibold text-[11px] sm:text-[12.5px]">Add Skill</span>
              </Button>
            </>
      }
        />
      </div>

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchSkills}
        skillToEdit={skillToEdit}
      />

      <DeleteModal 
        isOpen={!!skillToDelete}
        onClose={() => setSkillToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Skill"
        itemType="skill"
        itemName={skillToDelete?.name}
      />
    </div>
  );
}
