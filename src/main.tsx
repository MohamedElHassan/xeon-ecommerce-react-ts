import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Provider } from 'react-redux'
// Import PersistGate to delay app rendering until persisted state is retrieved
import { PersistGate } from 'redux-persist/integration/react';
// Import both store and persistor
import { store, persistor } from './store/store'

import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Redux Provider wraps the entire app to provide store access */}
    <Provider store={store}>
      {/* PersistGate delays rendering until persisted state is retrieved */}
      {/* loading={null} means no loading component will be shown while retrieving state */}
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme"> */}
          <RouterProvider router={router} />
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
