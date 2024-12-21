import React from "react";
import { SortOption } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortProps {
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
}

export default function ProductSort({ setSortOption }: ProductSortProps) {
  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
  };

  return (
    <Select onValueChange={handleSortChange} defaultValue="name-asc">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="font-archivo">
        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        <SelectItem value="price-asc">Price (Low to High)</SelectItem>
        <SelectItem value="price-desc">Price (High to Low)</SelectItem>
      </SelectContent>
    </Select>
  );
}
