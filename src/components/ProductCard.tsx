import React, { useMemo, useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { Product } from "@/types";
import { Link } from "react-router-dom";

export interface ProductCardProps {
  product: Product;
  cardType: "cardLook1" | "cardLook2";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cardType }) => {
  const [isHovered, setIsHovered] = useState(false);

  const discountEndDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Set to 24 hours from now
    return date;
  }, []);

  const timeLeft = useCountdown(discountEndDate);

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <>
      {cardType === "cardLook1" && (
        <Link
          to={`/product/${product.id}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <div
            className="group bg-[#fcfcfca9] rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-[500px] overflow-hidden">
              <img
                src={product.image[0]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
              {product.discountPercentage && (
                <div className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg  font-archivo">
                  {product.discountPercentage}% OFF
                </div>
              )}
            </div>
            <div className="p-4 text-center  font-archivo">
              <h2 className="text-xl font-semibold mb-2 underline">
                {product.name}
              </h2>
              <div className="flex justify-center items-center mb-4">
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-500">
                    EGP{discountedPrice.toFixed(2)}
                  </span>
                  {product.discountPercentage && (
                    <span className="text-black line-through text-xl ml-2">
                      EGP{product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
      {cardType === "cardLook2" && (
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-64 object-cover transition-transform duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            {product.discountPercentage && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <span className="text-gray-500 line-through ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-gray-600">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
            </div>
            {product.discountPercentage && (
              <div className="text-sm text-gray-600 mb-4">
                Offer ends in: {timeLeft.days}d {timeLeft.hours}h{" "}
                {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
              <button
                className={`px-4 py-2 rounded-full flex items-center transition-all duration-300 ${
                  isHovered
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isHovered ? "Add to Cart" : "View Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
