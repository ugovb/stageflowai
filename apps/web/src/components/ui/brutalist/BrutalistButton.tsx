"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrutalistButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline";
}

export function BrutalistButton({
    children,
    className,
    variant = "primary",
    ...props
}: BrutalistButtonProps) {
    const variants = {
        primary: "bg-primary text-primary-foreground border-black hover:bg-violet-700",
        secondary: "bg-secondary text-secondary-foreground border-black hover:bg-yellow-400",
        outline: "bg-transparent text-foreground border-black border-2 hover:bg-muted"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95, rotate: 1 }}
            className={cn(
                "relative py-3 px-6 font-bold text-lg border-2 shadow-hard transition-colors duration-200",
                "font-hand uppercase tracking-widest",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
