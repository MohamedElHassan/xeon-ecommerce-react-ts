import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgMenuLeft } from "react-icons/cg";
import { NavLink, useLocation } from "react-router-dom";

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

// const MenuItem: React.FC<MenuItem> = ({ to, label }) => (
//   <SheetClose className="flex items-center" asChild>
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center text-lg font-medium transition-colors duration-200 ease-in-out hover:text-white hover:bg-gray-900 p-2 rounded-sm w-full ${
//           isActive ? "bg-black text-white" : ""
//         }`
//       }
//     >
//       <span className="">{label}</span>
//     </NavLink>
//   </SheetClose>
// );
interface NavLinkWithSheetProps {
  to: string
  label: string
}

const NavLinkWithSheet: React.FC<NavLinkWithSheetProps> = ({ to, label }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <SheetClose className="flex items-center"  asChild>
      <NavLink
        to={to}
        className={`flex items-center text-lg font-medium transition-colors duration-200 ease-in-out hover:text-white hover:bg-black/80 p-2 rounded-sm w-full ${
          isActive ? "bg-black text-white" : ""
        }`}
      >
        <span>{label}</span>
      </NavLink>
    </SheetClose>
  )
}

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CgMenuLeft
          size={25}
          className="hidden lg:block cursor-pointer hover:scale-125 transition-all duration-300 "
        />
      </SheetTrigger>
      {/* <SheetContent side={'left'}> */}
      <SheetContent className="w-[400px] sm:w-[90%]" side="left">
        <div className="flex flex-col justify-center items-center w-full gap-10">
          {menuItems.map((item) => (
            <NavLinkWithSheet key={item.to} to={item.to} label={item.label} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
