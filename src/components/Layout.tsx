import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsappBtn from "./WhatsappBtn/WhatsappBtn";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="w-full">
          <Outlet />
        </main>
        {/* <Footer /> */}
        <Footer
          companyName="Xeon"
          companyTagline="Just Wear it"
          socialLinks={{
            facebook: "https://facebook.com/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/",
            linkedin: "https://linkedin.com/",
          }}
          contactEmail="hello@xeon-eg.com"
          address="Egypt, Alexandria"
          quickLinks={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Shipping Policy", href: "/shipping-policy" },
            { label: "Refund Policy", href: "/refund-policy" },
            { label: "Size Table", href: "/size-table" },
            { label: "Track Your Order", href: "/track-order" },
            { label: "Contact", href: "/contact" },
          ]}
          newsletterPlaceholder="Enter your email"
        />
      </div>
      <WhatsappBtn />
    </>
  );
};

export default Layout;
