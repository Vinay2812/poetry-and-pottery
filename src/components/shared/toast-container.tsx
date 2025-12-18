"use client";

import { useUIStore } from "@/store/ui.store";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconColors = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

interface ToastProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  onRemove: (id: string) => void;
}

function Toast({ id, type, message, duration = 3000, onRemove }: ToastProps) {
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex items-center gap-3 rounded-xl border p-4 shadow-lg ${colors[type]}`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${iconColors[type]}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 shrink-0 hover:bg-black/5"
        onClick={() => onRemove(id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  const handleRemove = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast],
  );

  return (
    <div className="pointer-events-none fixed top-4 right-4 left-4 z-[100] flex flex-col items-center gap-2 sm:left-auto sm:w-96">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full">
            <Toast
              id={toast.id}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              onRemove={handleRemove}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
