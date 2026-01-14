"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, FileText, Zap } from "lucide-react";
import { PlanTier } from "@/types/pricing";
import { GradientButton } from "@/components/shared/GradientButton";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: "cover_letter" | "export" | "detailed_profile";
  currentPlan: PlanTier;
}

export const UpgradeModal = ({ isOpen, onClose, feature, currentPlan }: UpgradeModalProps) => {
  if (!isOpen) return null;

  const content = {
    cover_letter: {
      title: "Limite de lettres atteinte",
      description: "Vous avez utilisé toutes vos générations de lettres pour ce mois.",
      icon: <FileText className="h-12 w-12 text-orange-500" />,
      recommendation: "pro",
    },
    export: {
      title: "Fonctionnalité Premium",
      description: "L'export PDF est réservé aux membres Starter et plus.",
      icon: <Lock className="h-12 w-12 text-purple-500" />,
      recommendation: "starter",
    },
    detailed_profile: {
      title: "Débloquez votre potentiel",
      description: "L'analyse détaillée et les soft skills sont réservées aux membres Pro.",
      icon: <Zap className="h-12 w-12 text-blue-500" />,
      recommendation: "pro",
    },
  };

  const info = content[feature];

  const handleUpgrade = (plan: string) => {
    // Redirect to pricing or trigger checkout
    window.location.href = `/pricing?upgrade=${plan}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center p-8 text-center">
            <div className="mb-6 rounded-full bg-slate-50 p-4 dark:bg-slate-800">
              {info.icon}
            </div>

            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              {info.title}
            </h3>
            <p className="mb-8 text-slate-600 dark:text-slate-400">
              {info.description}
            </p>

            <div className="w-full space-y-3">
              <GradientButton 
                variant="gradient" 
                className="w-full"
                onClick={() => handleUpgrade(info.recommendation)}
              >
                Passer au plan {info.recommendation.charAt(0).toUpperCase() + info.recommendation.slice(1)}
              </GradientButton>
              
              <button
                onClick={onClose}
                className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Pas maintenant
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
