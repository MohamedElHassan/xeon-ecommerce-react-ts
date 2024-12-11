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
        <Footer />
      </div>
      <WhatsappBtn />
    </>
  );
};

export default Layout;
