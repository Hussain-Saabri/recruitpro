import React from "react";
import { Search as SearchIcon } from "lucide-react";
import Input from "./Input";

export default function Search({
    placeholder = "Search...",
    className = "",
    ...props
}) {
    return (
        <div className="">
            <Input
                placeholder={placeholder}
                className={`w-[350px] h-[40px] text-[14px] ${className}`}
                leftIcon={<SearchIcon size={14} className="text-brand-500" />}
                {...props}
            />
        </div>
    );
}
