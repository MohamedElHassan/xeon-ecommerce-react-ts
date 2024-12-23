import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { removeToast } from "@/store/features/toastSlice";
import { 
  CheckCircle2, 
  XCircle, 
  Info, 
  AlertTriangle, 
  Bell, 
  X,
  Loader2
} from "lucide-react";

const toastIcons = {
  success: <CheckCircle2 className="w-5 h-5 text-green-600" />,
  error: <XCircle className="w-5 h-5 text-red-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
  notification: <Bell className="w-5 h-5 text-purple-600" />,
  loading: <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
};

const toastColors = {
  success: "bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800",
  error: "bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800",
  info: "bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800",
  warning: "bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800",
  notification: "bg-purple-100 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800",
  loading: "bg-gray-100 border-gray-200 dark:bg-gray-900/30 dark:border-gray-800"
};

const toastTextColors = {
  success: "text-green-800 dark:text-green-200",
  error: "text-red-800 dark:text-red-200",
  info: "text-blue-800 dark:text-blue-200",
  warning: "text-yellow-800 dark:text-yellow-200",
  notification: "text-purple-800 dark:text-purple-200",
  loading: "text-gray-800 dark:text-gray-200"
};

export const CustomToast: React.FC = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.type !== 'loading') {  // Don't auto-dismiss loading toasts
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration || 3000);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence initial={false} mode="sync">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.8
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
              y: -10,
              transition: {
                duration: 0.15,
                ease: "easeOut"
              }
            }}
            className={`
              ${toastColors[toast.type]} 
              border px-4 py-3 rounded-lg shadow-lg 
              flex items-center gap-3 
              min-w-[320px] max-w-[420px] 
              backdrop-blur-sm pointer-events-auto
              relative
            `}
          >
            <div className="flex-shrink-0">
              {toastIcons[toast.type]}
            </div>
            <div className="flex-grow">
              <p className={`text-sm font-medium ${toastTextColors[toast.type]}`}>
                {toast.message}
              </p>
              {toast.description && (
                <p className={`text-xs mt-1 ${toastTextColors[toast.type]} opacity-80`}>
                  {toast.description}
                </p>
              )}
            </div>
            {toast.type !== 'loading' && (
              <button
                onClick={() => dispatch(removeToast(toast.id))}
                className={`
                  flex-shrink-0 opacity-60 hover:opacity-100 
                  transition-opacity duration-150 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  rounded-full p-0.5 -mr-1
                  ${toastTextColors[toast.type]}
                `}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
