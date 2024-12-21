import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";

interface IProductList {
  cardWidth?: number;
  products: Product[];
  gap?: number;
}

const ProductList = ({ products, cardWidth, gap }: IProductList) => {
  return (
    <>
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
          gap: `${gap || 5}rem`,
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        layout
      >
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                type: "tween",
              }}
              layout
            >
              <ProductCard
                key={product.id}
                product={product}
                cardType="cardLook1"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ProductList;
