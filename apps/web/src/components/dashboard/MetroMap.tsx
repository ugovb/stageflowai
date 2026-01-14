"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Check, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { JOURNEY_PHASES } from "@/constants/phases";

interface MetroMapProps {
  currentPhase: number;
}

const MetroMap: React.FC<MetroMapProps> = ({ currentPhase }) => {
  return (
    <div className="w-full relative">
      <div className="overflow-x-auto pb-6 pt-2 px-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <div className="flex items-start justify-between min-w-[1000px] relative"> 
          {/* Ligne de fond */}
          <div className="absolute top-[22px] left-0 w-full h-[2px] bg-muted -z-10" />

          {JOURNEY_PHASES.map((phase, index) => {
            const isCompleted = phase.id < currentPhase;
            const isActive = phase.id === currentPhase;
            const isLocked = phase.id > currentPhase;

            return (
              <div key={phase.id} className="flex flex-col items-center group relative w-full px-2">
                {/* Connector Progress */}
                {index < JOURNEY_PHASES.length - 1 && (
                  <div 
                    className={cn(
                      "absolute left-[50%] top-[22px] h-[2px] -z-10 w-full",
                      isCompleted ? "bg-primary transition-all duration-500" : "bg-transparent"
                    )} 
                  />
                )}

                {/* Station Node - Alignement vertical strict */}
                <motion.div
                  initial={false}
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center border-[3px] z-10 transition-all duration-300 bg-background shrink-0",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isActive && "border-primary text-primary shadow-[0_0_20px_rgba(79,70,229,0.3)]",
                    isLocked && "border-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isActive ? (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </motion.div>

                {/* Label Section */}
                <div className="mt-4 text-center w-32 flex flex-col items-center">
                  <p className={cn(
                    "text-[11px] leading-tight transition-colors duration-300 px-1 font-medium h-8 flex items-center justify-center",
                    isActive ? "text-primary font-bold text-xs" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {phase.name}
                  </p>
                  
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1"
                    >
                      <div className="px-2 py-0.5 rounded-full bg-primary/10 text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                        Actuel
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetroMap;
