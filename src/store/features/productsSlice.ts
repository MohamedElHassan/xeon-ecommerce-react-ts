import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";
import images from "@/images";

const initialState: Product[] = [
  {
    id: "1",
    name: "Classic Premium Hoodie",
    price: 649.9,
    description: "Premium cotton blend hoodie with minimalist design",
    image: [images.habiboPinkPrint1, images.habiboPink1],
    category: "hoodies",
    size: ["S", "M", "L", "XL"],
    color: ["Black", "Pink"],
    discountPercentage: 20,
    rating: 4.5,
    stock: 50,
  },
];
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers:{
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    }
  }
});
export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
