// Import necessary functions from Redux Toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Import Redux Persist functions and constants
// FLUSH, REHYDRATE, etc. are action types that Redux Persist dispatches automatically
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Import localStorage as our storage engine
import storage from "redux-persist/lib/storage";

// Import our Redux slices
import appReducer from "./features/appSlice";
import cartReducer from "./features/cartSlice";
import favoriteReducer from "./features/favoriteSlice";
import toastReducer from "./features/toastSlice";

// Combine all reducers into a single root reducer
// This creates a single reducer that manages all state slices
const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  toast: toastReducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: "root", // Key for the root of our persisted state
  storage, // Storage engine to use (localStorage in this case)
  whitelist: ["cart", "favorite"], // Persist both cart and favorite states
};

// Create a persisted version of our root reducer
// This enhances our reducer with persistence capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure serialization checks
      // We need to ignore Redux Persist actions as they contain non-serializable values
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor object
// This is used by the PersistGate component to persist and rehydrate the store
export const persistor = persistStore(store);

// Type definitions for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for using dispatch and selector with proper TypeScript types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
