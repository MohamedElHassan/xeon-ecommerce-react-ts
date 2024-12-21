export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  image: string[];
  //   image: string[]; later for multiple images
  category: "hoodies" | "t-shirts";
  size: string[];
  color: string[];
  rating?: number;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

export interface FilterOptions {
  category: string[];
  color: string[];
  size: string[];
  material: string[];
  minPrice: number;
  maxPrice: number;
}
