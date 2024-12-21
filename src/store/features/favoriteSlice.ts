import { Product } from "@/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FavoriteState {
  favoriteItems: Product[];
}

const initialState: FavoriteState = {
  favoriteItems: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Product>) => {
      if(state.favoriteItems.find((item) => item.id === action.payload.id)) { return; } 
      state.favoriteItems.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteItems = state.favoriteItems.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;