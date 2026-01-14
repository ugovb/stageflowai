"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  MessageSquare,
  Search,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Map", href: "/dashboard", icon: Map },
    { name: "Coach", href: "/chat", icon: MessageSquare },
    { name: "Search", href: "/search", icon: Search },
  ];

  return (
    <div className="hidden md:flex flex-col h-[95vh] w-64 fixed left-5 top-1/2 -translate-y-1/2 z-40">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        // FIX: White background with visible border
        className="flex-1 bg-white border-r-2 border-black flex flex-col p-6 overflow-hidden relative"
      >

        {/* Logo FIX: Solid Indigo with White Icon */}


        {/* Navigation */}
        <nav className="flex-1 flex flex-col justify-center space-y-4 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative group block"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-secondary/80 transform -skew-x-3 rounded-sm -z-10 shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                <div
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 transition-colors duration-200",
                    isActive
                      ? "text-black font-black"
                      : "text-gray-500 font-bold hover:text-black"
                  )}
                >
                  <item.icon className={cn("w-6 h-6", isActive ? "stroke-[3px] text-black" : "stroke-[2.5px]")} />
                  <span className={cn("text-lg", isActive ? "font-serif" : "font-sans")}>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions Removed as per user request (redundant with header) */}
      </motion.div>
    </div>
  );
};

export default Sidebar;
