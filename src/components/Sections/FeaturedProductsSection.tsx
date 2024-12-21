import { FC } from "react";
import ProductCard from "../ProductCard";
import { Product } from "@/types";
import ProductList from "../ProductList";
interface IFeaturedProductsSectionProps {
  products: Product[];
}

const FeaturedProductsSection: FC<IFeaturedProductsSectionProps> = ({
  products,
}) => {
  return (
    <>
      <section className="py-4 px-6 font-archivo">
        <div className="mb-6 text-center">
          <h2 className="text-6xl md:text-5xl sm:text-4xl font-bold mb-6">
            Featured Products
          </h2>
          <p className="">SIZES ARE LIMITED SHOP NOW</p>
        </div>
          {/* <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "5rem",
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cardType="cardLook1"
              />
            ))}
          </div> */}
          <ProductList cardWidth={300} products={products} />
      </section>
    </>
  );
};

export default FeaturedProductsSection;
