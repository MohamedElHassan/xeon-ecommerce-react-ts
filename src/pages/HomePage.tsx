import { CTASection } from "@/components/Sections/CTASection";
import FeaturedProductsSection from "@/components/Sections/FeaturedProductsSection";
import { HeroSection } from "@/components/Sections/HeroSection";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import images from "@/images";
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const filteredProducts = products.slice(0, 3);
  return (
    <>
      <div className="w-full">
        {/* Hero Section */}
        <HeroSection
          title="Premium Hoodies for Every Style"
          hasContent={true}
          // description="Shop Now"
          buttonText="Shop Now"
          buttonLink="/products"
          image={images.habiboHeroSectionImg}
        />
        <FeaturedProductsSection products={filteredProducts} />
      </div>
      <CTASection
        title="Join the Movement"
        subtitle="Experience premium streetwear that defines your unique style"
        buttonText="Explore Collection"
        backgroundImage={images.ctaHabiboSectionImg}
      />
    </>
  );
};

export default HomePage;
