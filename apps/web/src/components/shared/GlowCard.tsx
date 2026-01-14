"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: "purple" | "blue" | "green" | "orange" | "pink" | "slate";
  highlighted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const GlowCard = ({
  children,
  glowColor = "purple",
  highlighted = false,
  className,
  onClick,
}: GlowCardProps) => {
  const glowColors = {
    purple: "group-hover:shadow-purple-500/20 dark:group-hover:shadow-purple-500/10 border-purple-500",
    blue: "group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/10 border-blue-500",
    green: "group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/10 border-emerald-500",
    orange: "group-hover:shadow-orange-500/20 dark:group-hover:shadow-orange-500/10 border-orange-500",
    pink: "group-hover:shadow-pink-500/20 dark:group-hover:shadow-pink-500/10 border-pink-500",
    slate: "group-hover:shadow-slate-500/20 dark:group-hover:shadow-slate-500/10 border-slate-300",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-slate-900 transition-all duration-300",
        "border shadow-sm hover:shadow-xl",
        highlighted ? `border-2 ${glowColors[glowColor].split(" ")[1]}` : "border-slate-200 dark:border-slate-800",
        glowColors[glowColor].split(" ")[0], // Shadow class
        className
      )}
    >
      {highlighted && (
        <div 
          className={cn(
            "absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10",
            `bg-${glowColor}-500`
          )} 
        />
      )}
      {children}
    </motion.div>
  );
};
