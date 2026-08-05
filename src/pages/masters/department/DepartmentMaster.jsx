import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import { Search, Table,Plus, Trash2 } from "lucide-react";
import { departmentService } from "../../../services/departmentService";
import { Button, Input, Modal } from "../../../components/ui";
import DataTable from "../../../components/shared/DataTable";
import AddEditDepartment from "../../../components/masters/department/AddEditDepartment";
import { useDepartmentColumns } from "../../../components/masters/department/DepartmentColumns";
import SearchBar from "../../../components/shared/SearchBar";

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
    <div className="flex flex-col space-y-2 w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Manage Departments" subtitle=""  />        
      </div>
      <div className="flex items-center  justify-end sm:hidden w-full">
        <SearchBar 
          placeholder="Search by Department Name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full bg-white mt-2 rounded-[10px] border border-gray-300 overflow-hidden  relative min-h-[200px] flex flex-col">
        <DataTable 
          loading={loading}
          title="Departments"
          icon={<Table size={16} />}
          rightActions={
            <>
              <div className="hidden sm:block">
                <SearchBar 
                  placeholder="Search by Department Name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="primary" className="bg-brand-500 hover:bg-brand-600 border-none text-white cursor-pointer h-[26px] sm:h-[35px] px-2.5 sm:px-3 flex items-center gap-1 sm:gap-1.5 rounded-[4px] sm:rounded-[5px] transition-colors w-full sm:w-auto shadow-sm" size="sm" onClick={() => openModal()} ><Plus size={16} /> <span className="font-semibold text-[11px] sm:text-[12.5px]">Add Department</span></Button>
            </>
          }
          data={filteredDepartments} 
          columns={columns} 
        />
      </div>

      <AddEditDepartment 
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
