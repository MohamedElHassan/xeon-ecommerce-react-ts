import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterOptions, Product } from "@/types";
import { motion } from "framer-motion";

interface ProductFiltersProps {
  products: Product[];
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export default function ProductFilters({
  products,
  filterOptions,
  setFilterOptions,
}: ProductFiltersProps) {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const colors = ["black", "pink"];
  const sizes = Array.from(new Set(products.flatMap((p) => p.size)));

  // Calculate discounted prices
  const getDiscountedPrice = (price: number, discountPercentage: number | undefined) => {
    if (discountPercentage) {
      return price - (price * discountPercentage) / 100;
    }
    return price;
  };

  const maxPrice = Math.max(
    ...products.map((p) => getDiscountedPrice(p.price, p.discountPercentage))
  );

  const handleCheckboxChange = (
    filterType: keyof FilterOptions,
    value: string,
    checked: boolean
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter((item) => item !== value),
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilterOptions((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Category</h3>
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center space-x-2 hover:text-black/80 transition-colors duration-200"
          >
            <Checkbox
              id={`category-${category}`}
              checked={filterOptions.category.includes(category)}
              onCheckedChange={(checked) => 
                handleCheckboxChange("category", category, checked as boolean)
              }
              className="border-gray-500 m-1"
            />
            <Label htmlFor={`category-${category}`}>{category}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Color</h3>
        {colors.map((color) => (
          <div
            key={color}
            className="flex items-center space-x-2 hover:text-black/80 transition-colors duration-200"
          >
            <Checkbox
              id={`color-${color}`}
              checked={filterOptions.color.includes(color)}
              onCheckedChange={(checked) => 
                handleCheckboxChange("color", color, checked as boolean)
              }
              className="border-gray-500 m-1"
            />
            <Label htmlFor={`color-${color}`} className="capitalize">{color}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Size</h3>
        {sizes.map((size) => (
          <div
            key={size}
            className="flex items-center space-x-2 hover:text-black/80 transition-colors duration-200"
          >
            <Checkbox
              id={`size-${size}`}
              checked={filterOptions.size.includes(size)}
              onCheckedChange={(checked) => 
                handleCheckboxChange("size", size, checked as boolean)
              }
              className="border-gray-500 m-1"
            />
            <Label htmlFor={`size-${size}`}>{size}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="pt-4">
          <Slider
            defaultValue={[filterOptions.minPrice, filterOptions.maxPrice]}
            max={maxPrice}
            step={1}
            onValueChange={handlePriceChange}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>EGP {Math.round(filterOptions.minPrice)}</span>
            <span>EGP {Math.round(filterOptions.maxPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
