import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface ProductSearchProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductSearch({ setSearchQuery }: ProductSearchProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
      <Input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        className="w-full sm:w-64 pl-10 py-2 bg-gray-50 text-gray-800 border-gray-600 focus:border-white focus:ring-white"
      />
    </div>
  );
}

