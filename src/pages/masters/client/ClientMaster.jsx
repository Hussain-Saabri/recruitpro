import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";
import {Search,Table } from "lucide-react";
import { clientService } from "../../../services/clientService";
import { Button, Input } from "../../../components/ui";
import DataTable from "../../../components/shared/DataTable";
import ClientModal from "../../../components/masters/client/ClientModal";
import { useClientColumns } from "../../../components/masters/client/ClientColumns";

export default function ClientMaster() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getClients();
      setClients(data);
    } catch (error) {
      toast.error("Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  

  const openModal = (client = null) => {
    if (client) {
      setEditingClient(client);
    } else {
      setEditingClient(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleDelete = async (client) => {
    if (window.confirm(`Delete client "${client.name}"?`)) {
      try {
        await clientService.deleteClient(client.id);
        toast.success(`Client deleted!`);
        fetchClients();
      } catch (error) {
        toast.error("Failed to delete.");
      }
    }
  };

  const filteredClients = clients.filter((c) => {
    const query = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(query) || (c.code && c.code.toLowerCase().includes(query));
  });

  const columns = useClientColumns({ openModal, handleDelete });

  return (
    <div className="flex flex-col space-y-6 w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Manage Client" subtitle=""  />        
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center ">
          <Input 
            type="text" 
            placeholder="Search by Company Name..." 
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
          title="Clients"
          icon={<Table size={16} />}
          rightActions={
            <>
              <Button variant="primary" className="bg-brand-500 border-none  text-white cursor-pointer" size="sm" onClick={() => openModal()} >Add Client</Button>
            </>
          }
          data={filteredClients} 
          columns={columns} 
        />
      </div>

      <ClientModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        editingClient={editingClient} 
        onSuccess={fetchClients} 
      />
    </div>
  );
}
