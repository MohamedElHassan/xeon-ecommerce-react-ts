import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/types";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { addToCart } from "@/store/features/cartSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/store/features/favoriteSlice";
import { addToast } from "@/store/features/toastSlice";

export default function SingleProductPage() {
  const dispatch = useAppDispatch();
  const productInFavorite = useAppSelector(
    (state: RootState) => state.favorite.favoriteItems
  );
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
          <p className="text-gray-400">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying && product.image.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % product.image.length
        );
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, product.image.length]);

  const nextImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.image.length);
  };

  const prevImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.image.length) % product.image.length
    );
  };

  const handleImageDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      dispatch(
        addToast({
          message: "Please select size and color",
          type: "error",
          duration: 3000,
        })
      );
      return;
    }

    dispatch(
      addToCart({ ...product, selectedSize, selectedColor, quantity: 1 })
    );

    dispatch(
      addToast({

        message: `${product?.name} has been added to your cart`,
        type:  "success",
        duration: 3000,
      })
    );
  };

  return (
    <div className=" text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* grid md:grid-cols-2 gap-12 */}
        <div className="flex justify-between items-start gap-7 sm:flex-col">
          {/* Product Image Gallery Section */}
          <div className="relative group w-[40%] sm:w-full">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative w-full h-[680px]">
                {product.image.map((img, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out",
                      index === currentImageIndex
                        ? "opacity-100 translate-x-0"
                        : index < currentImageIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    )}
                    style={{
                      zIndex: index === currentImageIndex ? 1 : 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              {product.image.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur p-2 rounded-full 
                             hover:bg-black/40 transition-all duration-300 z-10
                             hover:scale-110"
                  >
                    <ChevronLeft className="text-white w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur p-2 rounded-full 
                             hover:bg-black/40 transition-all duration-300 z-10
                             hover:scale-110"
                  >
                    <ChevronRight className="text-white w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center mt-4 space-x-3">
              {product.image.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageDotClick(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300 transform",
                    currentImageIndex === index
                      ? "bg-black scale-150"
                      : "bg-black/40 hover:bg-black/60 hover:scale-125"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => {
                // Add to favorite logic here and toggle the button
                if (productInFavorite.find((p) => p.id === product.id)) {
                  // Remove from favorite logic here
                  dispatch(removeFromFavorite(product.id));
                } else {
                  dispatch(addToFavorite(product));
                }
              }}
              className="absolute top-4 right-4 bg-black/20 backdrop-blur p-2 rounded-full 
                   hover:bg-black/40 transition-all duration-300 z-10
                   hover:scale-110 hover:rotate-12"
            >
              {productInFavorite.find((p) => p.id === product.id) ? (
                <FaHeart className={`text-red-500 w-8 h-8`} />
              ) : (
                <Heart className={`text-white w-8 h-8`} />
              )}
            </button>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6 font-archivo w-[60%] sm:w-full">
            <div>
              <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-black/50">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="space-y-1">
                <span className="text-3xl md:text-3xl sm:text-2xl font-bold text-black">
                  EGP{discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400 line-through">
                      EGP{product.price.toFixed(2)}
                    </span>
                    <span className="text-red-500 text-sm">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                )}
              </div>
              {/* {product.rating && (
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "stroke-current"
                      )}
                    />
                  ))}
                  <span className="text-gray-400 ml-2">({product.rating})</span>
                </div>
              )} */}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-black">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-12 h-12 rounded-full border-4 transition-all",
                      selectedColor === color
                        ? "border-gray-200 scale-110"
                        : "border-transparent hover:border-gray-400"
                    )}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-black">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.size.map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={cn(
                      "w-12 h-12 bg-white rounded-full text-black transition-colors duration-300",
                      selectedSize === size
                        ? "bg-black text-white hover:bg-black/90"
                        : "hover:bg-gray-200"
                    )}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center mb-6">
              {/* <div className="flex items-center border rounded-lg">
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  variant="ghost"
                  className="px-4 py-2 hover:bg-gray-800"
                >
                  -
                </Button>
                <span className="px-4 py-2">{quantity}</span>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  variant="ghost"
                  className="px-4 py-2 hover:bg-gray-800"
                  disabled={product.stock ? quantity >= product.stock : false}
                >
                  +
                </Button>
              </div> */}
              <Button
                onClick={handleAddToCart}
                className="flex-1 py-6 bg-black text-white hover:bg-black/80 transition-colors duration-300"
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>
            </div>

            {product.stock && product.stock < 10 && (
              <p className="text-red-500">
                Only {product.stock} items left in stock!
              </p>
            )}
            {/* Tabs Section */}
            <Tabs
              defaultValue="description"
              className="mt-16 font-archivo min-h-60"
            >
              <TabsList className="mb-6 w-full justify-start space-x-1 bg-transparent">
                <TabsTrigger
                  value="description"
                  className="text-xl sm:text-base border border-black text-black bg-white data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:-translate-y-1"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="text-xl sm:text-base border border-black text-black bg-white data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:-translate-y-1"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="text-xl sm:text-base border border-black text-black bg-white data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:-translate-y-1"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="description"
                className="p-6 rounded-lg bg-transparent text-black"
              >
                <p>{product.description}</p>
              </TabsContent>

              <TabsContent
                value="details"
                className="p-6 rounded-lg bg-transparent text-black"
              >
                <ul className="space-y-2">
                  <li>Category: {product.category}</li>
                  <li>Available Sizes: {product.size.join(", ")}</li>
                  <li>Available Colors: {product.color.join(", ")}</li>
                  {product.stock && <li>Stock: {product.stock} units</li>}
                </ul>
              </TabsContent>

              <TabsContent
                value="reviews"
                className="p-6 rounded-lg bg-transparent text-black"
              >
                {product.rating ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-5 h-5",
                              i < Math.floor(product.rating!)
                                ? "fill-current"
                                : "stroke-current"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-semibold">
                        {product.rating}
                      </span>
                    </div>
                    <p>Be the first to write a review for this product!</p>
                  </div>
                ) : (
                  <p>No reviews yet. Be the first to review this product!</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
