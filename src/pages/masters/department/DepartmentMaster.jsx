import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import { Search, Table, Trash2 } from "lucide-react";
import { departmentService } from "../../../services/departmentService";
import { Button, Input, Modal } from "../../../components/ui";
import DataTable from "../../../components/shared/DataTable";
import DepartmentModal from "../../../components/masters/department/DepartmentModal";
import { useDepartmentColumns } from "../../../components/masters/department/DepartmentColumns";

export default function DepartmentMaster() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await departmentService.getDepartments();
      setDepartments(data);
    } catch (error) {
      toast.error("Failed to load departments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const openModal = (department = null) => {
    if (department) {
      setEditingDepartment(department);
    } else {
      setEditingDepartment(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  const handleDelete = (department) => {
    setDepartmentToDelete(department);
  };

  const confirmDelete = async () => {
    if (!departmentToDelete) return;
    setIsDeleting(true);
    try {
      await departmentService.deleteDepartment(departmentToDelete.departmentId);
      toast.success(`Department deleted!`);
      fetchDepartments();
      setDepartmentToDelete(null);
    } catch (error) {
      toast.error("Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredDepartments = departments.filter((d) => {
    const query = searchQuery.toLowerCase();
    const deptName = d.name || d.Name || d.departmentName || d.DepartmentName || "";
    return deptName.toLowerCase().includes(query);
  });

  const columns = useDepartmentColumns({ openModal, handleDelete });

  return (
    <div className="flex flex-col space-y-6 w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Manage Departments" subtitle=""  />        
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center ">
          <Input 
            type="text" 
            placeholder="Search by Department Name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[36px] px-3 w-[300px] text-[13px] bg-white border-r-0 rounded-r-none focus:border-brand-500 focus:ring-0 focus-visible:ring-0 focus:outline-none transition-all" 
          />
          <Button 
            type="button"
            className="flex items-center justify-center h-[36px] px-4 bg-brand-500 text-white border-brand-500 rounded-l-none hover:bg-brand-600 transition-colors cursor-pointer"
          >
            <Search size={16} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl border border-gray-300 overflow-hidden mt-0.5 relative min-h-[200px] flex flex-col">
        <DataTable 
          loading={loading}
          title="Departments"
          icon={<Table size={16} />}
          rightActions={
            <>
              <Button variant="primary" className="bg-brand-500 border-none  text-white cursor-pointer" size="sm" onClick={() => openModal()} >Add Department</Button>
            </>
          }
          data={filteredDepartments} 
          columns={columns} 
        />
      </div>

      <DepartmentModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        editingDepartment={editingDepartment} 
        onSuccess={fetchDepartments} 
      />

      <Modal
        isOpen={!!departmentToDelete}
        onClose={() => setDepartmentToDelete(null)}
        title="Delete Department"
        titleClassName="text-red-600"
        submitButton="Delete"
        cancelButton="Cancel"
        onSubmit={confirmDelete}
        disabled={isDeleting}
        className="max-w-md"
        submitButtonClassName="bg-red-600 hover:bg-red-700"
        submitButtonIcon={<Trash2 size={16} strokeWidth={2.5} />}
      >
        <div className="text-sm text-slate-600">
          <p>
            Are you sure you want to delete the department <strong className="text-gray-900">{departmentToDelete?.name || departmentToDelete?.Name}</strong>?
          </p>
          <p className="mt-2 text-red-500 font-medium">
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
}
