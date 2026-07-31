import React from 'react';
import { Search } from 'lucide-react';
import { Input, Button } from '../ui';

export default function SearchBar({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className = "" 
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <Input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-[36px] px-3 w-full sm:w-[300px] text-[13px] bg-white border-r-0 rounded-r-none focus:border-brand-500 focus:ring-0 focus-visible:ring-0 focus:outline-none transition-all" 
      />
      <Button 
        type="button"
        className="flex items-center justify-center h-[36px] px-4 bg-brand-500 text-white border-brand-500 rounded-l-none hover:bg-brand-600 transition-colors cursor-pointer"
      >
        <Search size={16} strokeWidth={2.5} />
      </Button>
    </div>
  );
}
