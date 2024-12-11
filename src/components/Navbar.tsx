import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { CgMenuLeft } from "react-icons/cg";
import { Home, Search, ShoppingBag } from "lucide-react";
import { BiEnvelope } from "react-icons/bi";
import { Cart } from "./Cart";
import MobileMenu from "./MobileMenu";

type MenuItem = {
  to: string;
  label: string;
};

const menuItems: MenuItem[] = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/track-order", label: "Track Your Order" },
  { to: "/size-table", label: "Size Table" },
  { to: "/refund-policy", label: "Refund Policy" },
  { to: "/shipping-policy", label: "Shipping Policy" },
  { to: "/contact", label: "Contact" },
];

const MenuItem: React.FC<MenuItem> = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center text-sm font-medium transition-colors duration-200 ease-in-out hover:text-white hover:bg-gray-900 p-2 rounded-sm ${
        isActive ? "bg-black text-white" : ""
      }`
    }
  >
    <span className="">{label}</span>
  </NavLink>
);

const Navbar: React.FC = () => {
  return (
    <header className="top-0 z-40 w-full border-b bg-background font-archivo">
      <div className="flex justify-between h-32 items-center px-10 sm:px-5">
        <div className="w-[10%] ">
          <Search
            size={25}
            className="md:hidden cursor-pointer hover:scale-125 transition-all duration-300 "
          />
          <MobileMenu />
        </div>
        <nav className="flex w-[80%] flex-col text-center justify-center items-center gap-6">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:translate-x-1 hover:translate-y-1"
          >
            <span className="inline-block font-bold text-5xl">XEON</span>
          </Link>
          {/* links */}
          <div className="flex text-sm justify-center gap-0.5 items-center w-full md:hidden">
            {menuItems.map((item) => (
              <MenuItem key={item.to} to={item.to} label={item.label} />
            ))}
          </div>
        </nav>
        <div className="flex w-[10%] items-center justify-end space-x-4">
          {/* <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav> */}
          <div className="">
            <Cart />
          </div>
          <div className="hidden md:block">
            <Search
              size={25}
              className="cursor-pointer hover:scale-125 transition-all duration-300 "
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
