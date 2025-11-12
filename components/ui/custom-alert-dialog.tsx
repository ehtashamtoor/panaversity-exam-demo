"use client";

import { useEffect } from "react";
import { AlertTriangle, CheckCircle, Info, XCircle, X } from "lucide-react";

interface CustomAlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

export function CustomAlertDialog({
  isOpen,
  title,
  message,
  variant = "info",
  onClose,
}: CustomAlertDialogProps) {
  // Auto-close after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Prevent background scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const variantStyles = {
    success: {
      icon: CheckCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500",
    },
    error: {
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500",
    },
  };

  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-slate-800 rounded-xl border border-slate-700 shadow-2xl max-w-md w-full p-6 animate-scaleIn">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon and Title */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`shrink-0 w-12 h-12 rounded-full ${styles.bgColor} flex items-center justify-center ${styles.iconColor}`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2.5 text-white font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 ${styles.bgColor} ${styles.borderColor}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
