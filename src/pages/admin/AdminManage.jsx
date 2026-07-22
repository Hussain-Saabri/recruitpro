import { useState } from "react";
import PageHeader from "../../components/shared/PageHeader";
import ManageTable from "../../components/manage/ManageTable";

import Filter from "../../components/admin/Filter";
export default function Manage() {
  const [dateFilter, setDateFilter] = useState("All");
  return (
    <div className="">
      <PageHeader 
        title="JD Administration" 
        subtitle="Full access" 
      />     
      <Filter 
        dateFilter={dateFilter} 
        setDateFilter={setDateFilter} 
      />
      <ManageTable />
    </div>
  );
}
