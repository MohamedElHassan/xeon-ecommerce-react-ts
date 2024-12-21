import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterProps {
  companyName: string;
  companyTagline?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  contactEmail?: string;
  address?: string;
  quickLinks?: { label: string; href: string }[];
  newsletterPlaceholder?: string;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "Your Company",
  companyTagline = "Innovative Solutions for Modern Challenges",
  socialLinks = {},
  contactEmail = "contact@yourcompany.com",
  address = "123 Business Street, City, Country",
  quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ],
  newsletterPlaceholder = "Enter your email"
}) => {
  const currentYear = new Date().getFullYear();

  const SocialIcon = ({ Icon, link }: { Icon: React.ElementType, link?: string }) => (
    link ? (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white hover:text-gray-300 transition-colors"
      >
        <Icon className="w-6 h-6" />
      </a>
    ) : null
  );

  return (
    // <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
    <footer className="bg-black text-white py-12 px-4">
      {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"> */}
      <div className="grid grid-cols-4 gap-8 lg:grid-cols-2 sm:grid-cols-1 container mx-auto">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{companyName}</h2>
          <p className="text-gray-300">{companyTagline}</p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 pt-4">
            <SocialIcon Icon={Facebook} link={socialLinks.facebook} />
            <SocialIcon Icon={Twitter} link={socialLinks.twitter} />
            <SocialIcon Icon={Instagram} link={socialLinks.instagram} />
            <SocialIcon Icon={Linkedin} link={socialLinks.linkedin} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-300" />
              <span>{contactEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-300" />
              <span>{address}</span>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <div className="flex space-x-2">
            <Input 
              type="email" 
              placeholder={newsletterPlaceholder}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p className="text-gray-400">
          © {currentYear} {companyName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;



// const Footer = () => {
//   return (
//     <>
//       {/* Footer Section */}
//       <footer className="py-8 px-4 sm:px-8 text-center border-t font-archivo bg-black text-white">
//         <p>
//           &copy; {new Date().getFullYear()} Xeon. All rights reserved.{" "}
//           <a
//             className="hover:underline text-[#818aff] hover:text-[#323BAC] transition-all"
//             href="https://mabouhashem.netlify.app/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Developed by Mohamed Abouhashem (Mohamed Don't foget to Create new Identity and New Portfolio)
//           </a>
//         </p>
//       </footer>
//     </>
//   );
// };

// export default Footer;
