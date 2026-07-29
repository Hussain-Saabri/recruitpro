import React, { useState, useEffect } from 'react';
import DataTable from '../shared/DataTable';
import { getorganisationColumns } from './organisationcolums';
import { Button } from '../ui';
import { Download, RefreshCcw, Table } from "lucide-react";
import { organizationService } from '../../services/organizationService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function OrganisationTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 
  const[selectedRowData,setSelectedRowData] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const handleEdit = (orgData) => {
    console.log("CLicked on edit",orgData);
    setSelectedRowData(orgData);
    navigate(`/edit-organisation/${orgData.id || orgData._id || '1'}`, { state: { orgDataToEdit: orgData } });
  };
  const columns = getorganisationColumns(handleEdit);
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const res = await organizationService.getOrganizations();
      setData(res);
    } catch (error) {
      toast.error("Failed to load organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleRefresh = () => {
    fetchOrganizations();
    toast.success("List refreshed");
  };

  const handleExport = () => {
    toast.success("Exporting data...");
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-300 overflow-hidden mt-4 relative min-h-[200px] flex flex-col">
      <DataTable 
        loading={loading}
        title="Organization"
        icon={<Table size={16} />}
        rightActions={
            <>
             <Button onClick={handleExport} variant="outline" size="sm" className="h-8 gap-1.5 hover:border-brand-500 border-2 text-xs text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                <Download size={13} className='text-brand-500 font-bold'/> Export
            </Button>
            <Button onClick={handleRefresh} variant="outline" size="sm" className="h-8 gap-1.5 hover:border-brand-500 border-2 text-xs text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                <RefreshCcw size={13} className={`text-brand-500 ${loading ? 'animate-spin' : ''}`}/> Refresh
            </Button>
            </>                 
        }
        data={data} 
        columns={columns} 
      />
    </div>
  );
}
