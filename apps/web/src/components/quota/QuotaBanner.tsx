"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { useQuota } from "@/hooks/useQuota";
import { QuotaProgress } from "./QuotaProgress";
import Link from "next/link";

export const QuotaBanner = () => {
  const { data: quota, isLoading } = useQuota();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("quota_banner_dismissed");
    if (dismissed && new Date(dismissed) > new Date(Date.now() - 86400000)) {
      setIsVisible(false); // Hidden for 24h
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("quota_banner_dismissed", new Date().toISOString());
  };

  if (isLoading || !quota || !isVisible) return null;
  if (quota.plan === "unlimited") return null; // Don't show for unlimited

  const limit = quota.usage.coverLetters.limit;
  if (!limit) return null; // Should handle unlimited case logic above, but safety check

  const used = quota.usage.coverLetters.used;
  const percentage = (used / limit) * 100;
  
  if (percentage < 50) return null; // Only show when usage is significant

  const isCritical = percentage >= 100;
  const isWarning = percentage >= 80;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative z-40 w-full px-4 py-2 text-sm font-medium border-b ${
          isCritical 
            ? "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-900"
            : isWarning
              ? "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-900/20 dark:text-orange-200 dark:border-orange-900"
              : "bg-slate-50 text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <AlertCircle className={`h-4 w-4 ${isCritical ? "text-red-500" : "text-orange-500"}`} />
            <span className="hidden sm:inline">
              {isCritical ? "Limite atteinte :" : "Usage mensuel :"}
            </span>
            <div className="w-24 sm:w-32">
              <QuotaProgress used={used} limit={limit} size="sm" />
            </div>
            <span>
              {used} / {limit} lettres
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/pricing"
              className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              Upgrade
            </Link>
            <button 
              onClick={handleDismiss}
              className="rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
