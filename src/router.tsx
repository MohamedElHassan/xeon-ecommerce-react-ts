import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import SizeTablePage from "./pages/SizeTablePage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "track-order",
        element: <TrackOrderPage />,
      },
      {
        path: "size-table",
        element: <SizeTablePage />,
      },
      {
        path: "refund-policy",
        element: <RefundPolicyPage />,
      },
      {
        path: "shipping-policy",
        element: <ShippingPolicyPage />,
      },

      // Add more routes here as needed
    ],
  },
]);

export default router;
