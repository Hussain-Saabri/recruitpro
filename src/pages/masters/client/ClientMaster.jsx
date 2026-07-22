import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Download,
  RefreshCw,
  Search,
  X,
  Mail,
  Building
} from "lucide-react";
;
import { clientService } from "../../../services/clientService";
import { Button, Input, Label, Badge, DataTable } from "../../../components/ui";

export default function ClientMaster() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Form states matching rp.client schema
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    type: "enterprise",
    industry: "",
    company_size: "1-50",
    hq_country: "India",
    email: "",
    phone: "",
    website: "",
    account_tier: "standard",
    contract_start_date: "",
    contract_end_date: "",
    notes: "",
    is_active: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleRefresh = () => {
    fetchClients();
    toast.success("Clients list refreshed");
  };

  const openModal = (client = null) => {
    setFormErrors({});
    if (client) {
      setEditingClient(client);
      setFormValues({ ...client });
    } else {
      setEditingClient(null);
      setFormValues({
        name: "",
        code: "",
        type: "enterprise",
        industry: "",
        company_size: "1-50",
        hq_country: "India",
        email: "",
        phone: "",
        website: "",
        account_tier: "standard",
        contract_start_date: "",
        contract_end_date: "",
        notes: "",
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value
    }));
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "Name is required.";
    if (formValues.email && !/\S+@\S+\.\S+/.test(formValues.email)) errors.email = "Invalid email format.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formValues };
    console.log("PAYLOAD (rp.client):", JSON.stringify(payload, null, 2));

    try {
      setIsSubmitting(true);
      if (editingClient) {
        const updated = await clientService.updateClient(editingClient.id, payload);
        toast.success(`Client "${updated.name}" updated!`);
      } else {
        const created = await clientService.createClient(payload);
        toast.success(`Client "${created.name}" created!`);
      }
      closeModal();
      fetchClients();
    } catch (error) {
      toast.error(error.message || "Failed to save client.");
    } finally {
      setIsSubmitting(false);
    }
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

  const columns = React.useMemo(() => [
    {
      accessorKey: "name",
      header: "Client Name",
      cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.name}</span>
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <span className="bg-slate-100 px-2 py-1 rounded font-mono text-[11px]">{row.original.code || 'N/A'}</span>
    },
    {
      accessorKey: "industry",
      header: "Industry",
      cell: ({ row }) => row.original.industry || 'N/A'
    },
    {
      accessorKey: "account_tier",
      header: "Account Tier",
      cell: ({ row }) => {
        const tier = row.original.account_tier;
        return (
          <span className={`capitalize px-2 py-1 rounded text-[11px] font-semibold ${tier === 'strategic' ? 'bg-purple-100 text-purple-700' : tier === 'enterprise' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
            {tier}
          </span>
        );
      }
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = String(row.original.is_active) === "true";
        return <Badge variant={isActive ? "success" : "gray"}>{isActive ? "Active" : "Inactive"}</Badge>;
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const client = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => openModal(client)} className="w-7 h-7 rounded border border-gray-200 hover:bg-brand-50 hover:text-brand-500 flex items-center justify-center transition-all"><Edit2 size={12} /></button>
            <button onClick={() => handleDelete(client)} className="w-7 h-7 rounded border border-gray-200 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all"><Trash2 size={12} /></button>
          </div>
        );
      }
    }
  ], [searchQuery]);

  return (
    <div className="flex flex-col space-y-6 w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 m-0 leading-tight">Client Settings</h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Manage client companies who require candidate placements.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported!")} leftIcon={<Download size={13} />}>Export</Button>
          <Button variant="primary" size="sm" onClick={() => openModal()} leftIcon={<Plus size={14} />}>Add Client</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden w-full">
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-1.5 w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500 transition-all duration-200" />
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} leftIcon={<RefreshCw size={12} />}>Refresh</Button>
        </div>

        <DataTable columns={columns} data={filteredClients} loading={loading} emptyMessage="No clients found." />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full z-10 border border-gray-100 flex flex-col relative max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-sm font-bold">{editingClient ? "Edit Client" : "Add Client"}</h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center"><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Identity */}
                <div className="col-span-full mb-2"><h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1">Identity</h3></div>
                <Input label="Name" id="name" required placeholder="e.g. TechCorp" value={formValues.name} onChange={handleInputChange} error={formErrors.name} />
                <Input label="Code" id="code" placeholder="e.g. TC-001" value={formValues.code} onChange={handleInputChange} />
                
                <div className="text-left">
                  <Label htmlFor="type">Type</Label>
                  <select id="type" value={formValues.type} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
                    <option value="enterprise">Enterprise</option>
                    <option value="startup">Startup</option>
                    <option value="sme">SME</option>
                    <option value="nonprofit">Nonprofit</option>
                    <option value="government">Government</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <Input label="Industry" id="industry" placeholder="e.g. IT" value={formValues.industry} onChange={handleInputChange} />
                
                <div className="text-left">
                  <Label htmlFor="company_size">Company Size</Label>
                  <select id="company_size" value={formValues.company_size} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1001-5000">1001-5000</option>
                    <option value="5001+">5001+</option>
                  </select>
                </div>

                <Input label="HQ Country" id="hq_country" placeholder="e.g. United States" value={formValues.hq_country} onChange={handleInputChange} />

                {/* Contact */}
                <div className="col-span-full mb-2 mt-4"><h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1">Contact</h3></div>
                <Input label="Email" id="email" type="email" placeholder="e.g. contact@client.com" value={formValues.email} onChange={handleInputChange} error={formErrors.email} />
                <Input label="Phone" id="phone" placeholder="e.g. +1 555-0123" value={formValues.phone} onChange={handleInputChange} />
                <Input label="Website" id="website" placeholder="e.g. https://client.com" value={formValues.website} onChange={handleInputChange} />

                {/* Commercial */}
                <div className="col-span-full mb-2 mt-4"><h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1">Commercial / Account</h3></div>
                <div className="text-left">
                  <Label htmlFor="account_tier">Account Tier</Label>
                  <select id="account_tier" value={formValues.account_tier} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
                    <option value="standard">Standard</option>
                    <option value="preferred">Preferred</option>
                    <option value="strategic">Strategic</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
                
                <Input label="Contract Start" id="contract_start_date" type="date" value={formValues.contract_start_date} onChange={handleInputChange} />
                <Input label="Contract End" id="contract_end_date" type="date" value={formValues.contract_end_date} onChange={handleInputChange} />
                
                <div className="text-left col-span-full">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea id="notes" value={formValues.notes} onChange={handleInputChange} rows="2" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500" placeholder="Account specific notes..." />
                </div>

                <div className="text-left">
                  <Label htmlFor="is_active">Status</Label>
                  <select id="is_active" value={formValues.is_active} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 p-4 border-t border-gray-100 bg-slate-50">
                <Button variant="outline" size="sm" onClick={closeModal} type="button">Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>{editingClient ? "Update" : "Save"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
