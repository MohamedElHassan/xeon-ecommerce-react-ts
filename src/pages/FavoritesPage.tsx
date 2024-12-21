import ProductList from "@/components/ProductList";
import { RootState } from "@/store/store";
import { Product } from "@/types";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface IFavoritesPageProps {}

export const FavoritesPage: FC<IFavoritesPageProps> = (props) => {
  const favoritesProducts = useAppSelector(
    (state: RootState) => state.favorite.favoriteItems
  );
  return (
    <>
      <div className="flex justify-center items-center py-5 px-2">
        <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo">
          <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">
            Your Favorites
          </h1>
          {favoritesProducts.length === 0 && (
            <p className="font-extralight text-base max-w-xl min-h-64">
              You Have No Favorites Yet, Start Adding Some!
            </p>
          )}
        </div>
      </div>
      {favoritesProducts.length !== 0 && (
        <div className="w-full px-10 md:px-5">
          <ProductList gap={2} cardWidth={280} products={favoritesProducts} />
        </div>
      )}
    </>
  );
};
