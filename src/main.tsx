import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Provider } from 'react-redux'
import { store } from './store/store'

import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme"> */}
        <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </Provider>
  </React.StrictMode>
);
