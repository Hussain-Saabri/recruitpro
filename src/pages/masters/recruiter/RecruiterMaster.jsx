import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Download,
  RefreshCw,
  Search,
  X,
  Mail,
  Building,
  Phone
} from "lucide-react";
;
import { recruiterService } from "../../../services/recruiterService";
import { Button, Input, Label, Badge, DataTable } from "../../../components/ui";

export default function RecruiterMaster() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState(null);

  // Form states matching rp.recruiter schema
  const [formValues, setFormValues] = useState({
    name: "",
    type: "agency",
    email: "",
    phone: "",
    mobile: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    postal_code: "",
    primary_contact_name: "",
    primary_contact_email: "",
    primary_contact_mobile: "",
    specialization: "",
    commission_rate: "",
    contract_start_date: "",
    contract_end_date: "",
    notes: "",
    is_active: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleRefresh = () => {
    fetchRecruiters();
    toast.success("Recruiters list refreshed");
  };

  const openModal = (recruiter = null) => {
    setFormErrors({});
    if (recruiter) {
      setEditingRecruiter(recruiter);
      setFormValues({ ...recruiter });
    } else {
      setEditingRecruiter(null);
      setFormValues({
        name: "",
        type: "agency",
        email: "",
        phone: "",
        mobile: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "India",
        postal_code: "",
        primary_contact_name: "",
        primary_contact_email: "",
        primary_contact_mobile: "",
        specialization: "",
        commission_rate: "",
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
    setEditingRecruiter(null);
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
    if (formValues.commission_rate && (isNaN(formValues.commission_rate) || formValues.commission_rate < 0 || formValues.commission_rate > 100)) {
        errors.commission_rate = "Must be between 0 and 100.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formValues };
    console.log("PAYLOAD (rp.recruiter):", JSON.stringify(payload, null, 2));

    try {
      setIsSubmitting(true);
      if (editingRecruiter) {
        const updated = await recruiterService.updateRecruiter(editingRecruiter.id, payload);
        toast.success(`Recruiter "${updated.name}" updated!`);
      } else {
        const created = await recruiterService.createRecruiter(payload);
        toast.success(`Recruiter "${created.name}" created!`);
      }
      closeModal();
      fetchRecruiters();
    } catch (error) {
      toast.error(error.message || "Failed to save recruiter.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (recruiter) => {
    if (window.confirm(`Delete recruiter "${recruiter.name}"?`)) {
      try {
        await recruiterService.deleteRecruiter(recruiter.id);
        toast.success(`Recruiter deleted!`);
        fetchRecruiters();
      } catch (error) {
        toast.error("Failed to delete.");
      }
    }
  };

  const filteredRecruiters = recruiters.filter((r) => {
    const query = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(query) || (r.email && r.email.toLowerCase().includes(query));
  });

  const columns = React.useMemo(() => [
    {
      accessorKey: "name",
      header: "Recruiter Name",
      cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.name}</span>
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span className="capitalize">{(row.original.type || 'agency').replace('_', ' ')}</span>
    },
    {
      id: "primary_contact",
      header: "Primary Contact",
      cell: ({ row }) => {
        const rec = row.original;
        return (
          <>
            {rec.primary_contact_name && <div className="font-medium text-slate-700">{rec.primary_contact_name}</div>}
            {rec.primary_contact_email && <div className="text-slate-500 flex items-center gap-1"><Mail size={10}/> {rec.primary_contact_email}</div>}
          </>
        );
      }
    },
    {
      id: "location",
      header: "Location",
      cell: ({ row }) => {
        const rec = row.original;
        return <span>{rec.city}{rec.city && rec.state ? ', ' : ''}{rec.state}</span>;
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
        const rec = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => openModal(rec)} className="w-7 h-7 rounded border border-gray-200 hover:bg-brand-50 hover:text-brand-500 flex items-center justify-center transition-all"><Edit2 size={12} /></button>
            <button onClick={() => handleDelete(rec)} className="w-7 h-7 rounded border border-gray-200 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all"><Trash2 size={12} /></button>
          </div>
        );
      }
    }
  ], [searchQuery]);

  return (
    <div className="flex flex-col space-y-6 w-full font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 m-0 leading-tight">Recruiter Settings</h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Manage external recruitment agencies and freelancers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported!")} leftIcon={<Download size={13} />}>Export</Button>
          <Button variant="primary" size="sm" onClick={() => openModal()} leftIcon={<Plus size={14} />}>Add Recruiter</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden w-full">
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search recruiters..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-1.5 w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500 transition-all duration-200" />
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} leftIcon={<RefreshCw size={12} />}>Refresh</Button>
        </div>

        <DataTable columns={columns} data={filteredRecruiters} loading={loading} emptyMessage="No recruiters found." />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full z-10 border border-gray-100 flex flex-col relative max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-sm font-bold">{editingRecruiter ? "Edit Recruiter" : "Add Recruiter"}</h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center"><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Identity */}
                <div className="col-span-full mb-2"><h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1">Identity</h3></div>
                <Input label="Name" id="name" required placeholder="e.g. Tech Hunters" value={formValues.name} onChange={handleInputChange} error={formErrors.name} />
                <div className="text-left">
                  <Label htmlFor="type">Type</Label>
                  <select id="type" value={formValues.type} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
                    <option value="agency">Agency</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="headhunter">Headhunter</option>
                    <option value="staffing_firm">Staffing Firm</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Input label="Specialization" id="specialization" placeholder="e.g. IT, Sales" value={formValues.specialization} onChange={handleInputChange} />

                {/* General Contact & Address */}
                <div className="col-span-full mb-2 mt-4"><h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1">Contact & Address</h3></div>
                <Input label="Email" id="email" type="email" placeholder="e.g. contact@agency.com" value={formValues.email} onChange={handleInputChange} error={formErrors.email} />
                <Input label="Phone" id="phone" placeholder="e.g. +91 0000000" value={formValues.phone} onChange={handleInputChange} />
                <Input label="Website" id="website" placeholder="e.g. https://agency.com" value={formValues.website} onChange={handleInputChange} />
                <Input label="Address" id="address" placeholder="e.g. 123 Street" value={formValues.address} onChange={handleInputChange} />
                <Input label="City" id="city" placeholder="e.g. Mumbai" value={formValues.city} onChange={handleInputChange} />
                <Input label="State" id="state" placeholder="e.g. Maharashtra" value={formValues.state} onChange={handleInputChange} />
                <Input label="Country" id="country" placeholder="e.g. India" value={formValues.country} onChange={handleInputChange} />
                <Input label="Postal Code" id="postal_code" placeholder="e.g. 400001" value={formValues.postal_code} onChange={handleInputChange} />

                {/* Primary Contact Person */}
                <div className="col-span-full mb-2 mt-4"><h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1">Primary Contact Person</h3></div>
                <Input label="Contact Name" id="primary_contact_name" placeholder="e.g. John Doe" value={formValues.primary_contact_name} onChange={handleInputChange} />
                <Input label="Contact Email" id="primary_contact_email" type="email" placeholder="e.g. john@agency.com" value={formValues.primary_contact_email} onChange={handleInputChange} />
                <Input label="Contact Mobile" id="primary_contact_mobile" placeholder="e.g. +91 999999999" value={formValues.primary_contact_mobile} onChange={handleInputChange} />

                {/* Commercials */}
                <div className="col-span-full mb-2 mt-4"><h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1">Commercial / Operations</h3></div>
                <Input label="Commission Rate (%)" id="commission_rate" type="number" step="0.01" placeholder="e.g. 8.33" value={formValues.commission_rate} onChange={handleInputChange} error={formErrors.commission_rate} />
                <Input label="Contract Start" id="contract_start_date" type="date" value={formValues.contract_start_date} onChange={handleInputChange} />
                <Input label="Contract End" id="contract_end_date" type="date" value={formValues.contract_end_date} onChange={handleInputChange} />
                
                <div className="text-left col-span-full">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea id="notes" value={formValues.notes} onChange={handleInputChange} rows="2" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-brand-500" placeholder="Any operational notes..." />
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
                <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>{editingRecruiter ? "Update" : "Save"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
