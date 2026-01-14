"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "default" | "gradient" | "outline";
  gradientFrom?: string;
  gradientTo?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const GradientButton = ({
  children,
  variant = "default",
  gradientFrom = "from-purple-500",
  gradientTo = "to-pink-500",
  isLoading = false,
  size = "md",
  className,
  disabled,
  ...props
}: GradientButtonProps) => {
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-8 text-base",
    lg: "h-14 px-10 text-lg",
  };

  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200",
    gradient: cn(
      "text-white shadow-lg border-0",
      `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
      "hover:shadow-xl hover:brightness-110"
    ),
    outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        variants[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
};
