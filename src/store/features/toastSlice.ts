import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'notification' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: {
      reducer: (state, action: PayloadAction<Toast>) => {
        // Limit max toasts to 5
        if (state.toasts.length >= 5) {
          state.toasts.shift();
        }
        state.toasts.push(action.payload);
      },
      prepare: (toast: Omit<Toast, "id">) => ({
        payload: {
          ...toast,
          id: nanoid(),
        },
      }),
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;
