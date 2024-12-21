import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
interface IProps {
  image: string;
  hasContent?: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const HeroSection: FC<IProps> = ({
  title,
  description,
  image,
  buttonText,
  buttonLink,
  hasContent,
}) => {
  return (
    <>
      <section className="w-full relative font-archivo">
        <div className="relative">
          <img
            className="w-full h-auto object-cover"
            src={image}
            alt={title}
          />
          {hasContent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <h1 className="text-4xl md:text-3xl sm:text-2xl font-extrabold uppercase z-10">
                {title}
              </h1>
              <p className="mt-4 max-w-lg text-sm sm:text-base z-10">
                {description}
              </p>
              <Link className="z-10 mt-6" to={buttonLink || "/products"}>
                <Button className="rounded-sm" size="lg">
                  {buttonText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
