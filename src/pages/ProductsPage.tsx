import ProductFilters from "@/components/ProductFilters";
import ProductSearch from "@/components/ProductSearch";
import ProductSort from "@/components/ProductSort";
import { products } from "@/data/products";
import { FilterOptions, Product, SortOption } from "@/types";
import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingBag } from "lucide-react";

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: [],
    color: [],
    size: [],
    material: [],
    minPrice: 0,
    maxPrice: Math.max(...products.map((p) => p.price)),
  });
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  // Helper function to calculate discounted price
  const getDiscountedPrice = (product: Product) => {
    if (product.discountPercentage) {
      return product.price - (product.price * product.discountPercentage) / 100;
    }
    return product.price;
  };

  useEffect(() => {
    if (location.state?.message) {
      setShowMessage(true);
      // Clear the message after showing it
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [location]);

  useEffect(() => {
    let result = products;

    // Apply filters
    if (filterOptions.category.length > 0) {
      result = result.filter((product) =>
        filterOptions.category.includes(product.category)
      );
    }
    if (filterOptions.color.length > 0) {
      result = result.filter((product) =>
        filterOptions.color.some((color) => product.color.includes(color))
      );
    }
    if (filterOptions.size.length > 0) {
      result = result.filter((product) =>
        product.size.some((size) => filterOptions.size.includes(size))
      );
    }

    // Apply price filter with discounts
    result = result.filter((product) => {
      const finalPrice = getDiscountedPrice(product);
      return finalPrice >= filterOptions.minPrice && finalPrice <= filterOptions.maxPrice;
    });

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting with discounted prices
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
        break;
      case "price-desc":
        result.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setFilteredProducts(result);
  }, [filterOptions, sortOption, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {showMessage && location.state?.message && (
        <Alert className="mb-6">
          <ShoppingBag className="h-5 w-5" />
          <AlertDescription>{location.state.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-center items-center py-5 px-2 flex-col">
        <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo mb-4">
          <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">
            Products
          </h1>
        </div>
      </div>

      <div className="flex sm:flex-col lg:flex-row gap-8 py-5 px-2">
        <aside className="sm:w-full md:w-1/2 w-1/4 p-6 rounded-lg shadow-lg text-black font-archivo">
          <ProductFilters
            products={products}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </aside>
        <main className="md:w-full w-3/4 sm:px-8">
          <div className="flex sm:flex-col justify-between items-center mb-6 p-4 rounded-lg shadow-lg font-archivo">
            <ProductSearch setSearchQuery={setSearchQuery} />
            <ProductSort setSortOption={setSortOption} />
          </div>
          <ProductList gap={1} cardWidth={280} products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
