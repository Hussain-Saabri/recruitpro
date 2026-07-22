import Search from "../ui/Search";
import FilterChips from "../ui/FilterChips";
import InputFilter from "../ui/InputFilter";
import SortDropdown from "../ui/SortDropdown";
import { CalendarDays, User, Building2 ,RefreshCcw} from "lucide-react";
import { useState } from "react";
import Separator from "../ui/Separator";
import ResetButton from "../ui/ResetButton";
import { FilterBadge } from "../ui/FilterBadge";
export default function Filter({ dateFilter, setDateFilter, onChange,onClick }) {
    const [role, setRole] = useState("");
    const [client, setClient] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");
    const[search,setSearch]=useState("");
    console.log(dateFilter);
    const handleReset = () =>{
        setRole("");
        setClient("");
        setSortOrder("lastest");
        setDateFilter("All");
        setSearch("");
    }
    const handleClearClient = () => {
        setClient("");
    }
    const handleClearRole = () => {
        setRole("");
    }
    const handleSearch = (event) => {
        setSearch(event.target.value);
    }
    return (
        <div className="flex flex-row md:flex-col gap-4 mt-4 mb-6 rounded-lg border border-gray-300 p-2">
            <Search placeholder="Search JDs...." value={search} onChange={handleSearch} />            
            <div className="flex flex-row  gap-6 flex-wrap">
                <FilterChips 
                    label="Date"
                    icon={<CalendarDays size={14} className="text-brand-500" />}
                    options={["All", "Today", "7d", "30d"]}
                    value={dateFilter}
                    onChange={setDateFilter}
                />

                <InputFilter 
                    placeholder="Filter" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    label="Role" 
                    icon={<User size={14} className="text-brand-500" />}  
                />
                
                <InputFilter 
                    placeholder="Filter Client" 
                    value={client} 
                    onChange={(e) => setClient(e.target.value)}
                    label="Client" 
                    icon={<Building2 size={14} className="text-brand-500" />}  
                />

                <SortDropdown 
                    value={sortOrder}
                    onChange={setSortOrder}
                />
                <Separator/>
                <ResetButton onClick={handleReset}/>
                
                <div className="flex flex-row gap-3 ml-auto items-end pb-0.5">
                    {client && <FilterBadge data="Client" value={client} onClick={handleClearClient}/>}
                    {role && <FilterBadge data="Role" value={role} onClick={handleClearRole} />}
                </div>
            </div>
        </div>
    );
}