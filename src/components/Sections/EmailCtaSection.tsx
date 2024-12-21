import { FC } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface IEmailCtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  // Optional
  buttonLink?: string;
}

const EmailCtaSection: FC<IEmailCtaSectionProps> = (props) => {
  return (
    <>
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-muted text-center">
        <h2 className="text-xl sm:text-2xl font-bold">{props.title}</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          {props.description}
        </p>
        <form className="mt-6 flex flex-col sm:flex-row justify-center items-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md mb-4 sm:mb-0 sm:mr-4"
          />
          <Button type="submit">{props.buttonText}</Button>
        </form>
      </section>
    </>
  );
};

export default EmailCtaSection;
