"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Infinity } from "lucide-react";

interface QuotaProgressProps {
  used: number;
  limit: number | null;
  variant?: "linear" | "circular";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const QuotaProgress = ({
  used,
  limit,
  variant = "linear",
  size = "md",
  className,
}: QuotaProgressProps) => {
  const percentage = limit ? Math.min((used / limit) * 100, 100) : 0;
  
  // Determine color based on usage
  let colorClass = "bg-emerald-500";
  if (!limit) colorClass = "bg-emerald-500";
  else if (percentage >= 100) colorClass = "bg-red-500";
  else if (percentage > 80) colorClass = "bg-orange-500";
  else if (percentage > 60) colorClass = "bg-amber-400";

  if (variant === "circular") {
    // Basic SVG circular progress implementation
    const radius = size === "sm" ? 10 : size === "md" ? 16 : 24;
    const stroke = size === "sm" ? 2 : size === "md" ? 3 : 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className={cn("relative flex items-center justify-center", className)}>
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg]"
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-200 dark:text-slate-800"
          />
          <motion.circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            className={cn("transition-colors duration-300", colorClass.replace('bg-', 'text-'))}
          />
        </svg>
        <div className="absolute text-xs font-bold text-slate-700 dark:text-slate-300">
          {!limit ? <Infinity className="h-4 w-4" /> : `${Math.round(percentage)}%`}
        </div>
      </div>
    );
  }

  // Linear variant
  const heightClass = size === "sm" ? "h-1.5" : size === "md" ? "h-2.5" : "h-4";

  return (
    <div className={cn("w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden", heightClass, className)}>
      {!limit ? (
        <div className={cn("h-full w-full bg-emerald-500")} />
      ) : (
        <motion.div
          className={cn("h-full rounded-full transition-colors duration-300", colorClass)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </div>
  );
};
