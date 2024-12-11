import images from "@/images";
import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Premium Hoodie",
    price: 59.99,
    description: "Premium cotton blend hoodie with minimalist design",
    image: images.habiboPinkPrint1,
    category: "hoodies",
    size: ["S", "M", "L", "XL"],
    color: ["Black", "Gray", "Navy"]
  },
  {
    id: "2",
    name: "Urban Street Hoodie",
    price: 69.99,
    description: "Street-style inspired hoodie with modern cut",
    image: images.habiboPink1,
    category: "hoodies",
    size: ["S", "M", "L", "XL"],
    color: ["White", "Black", "Red"]
  },
  {
    id: "3",
    name: "Tech Comfort Hoodie",
    price: 79.99,
    description: "Technical fabric hoodie for maximum comfort",
    image: images.habiboBlackSpider1,
    category: "hoodies",
    size: ["S", "M", "L", "XL"],
    color: ["Gray", "Blue", "Green"]
  },
  {
    id: "4",
    name: "Vintage Collection Hoodie",
    price: 64.99,
    description: "Retro-inspired design with modern comfort",
    image: images.habiboBlackPrint1,
    category: "hoodies",
    size: ["S", "M", "L", "XL"],
    color: ["Beige", "Brown", "Black"]
  }
];
