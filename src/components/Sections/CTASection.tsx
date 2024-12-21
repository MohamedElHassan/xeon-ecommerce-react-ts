import { Button } from "@/components/ui/button";
import images from "@/images";
import { Link } from "react-router-dom";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

export const CTASection = ({
  title = "Elevate Your Style",
  subtitle = "Discover our latest collection of premium hoodies and streetwear",
  buttonText = "Shop Now",
  buttonLink = "/products",
  backgroundImage = images.ctaHabiboSectionImg,
}: CTASectionProps) => {
  return (
    <section className="relative overflow-hidden font-archivo">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-2xl space-y-8">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {title}
          </h2>
          <p className="text-xl text-gray-300">{subtitle}</p>
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-block"
            to={buttonLink}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
