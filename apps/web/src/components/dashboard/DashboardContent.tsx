"use client";

import React, { useEffect, useState } from "react";
import MetroMap from "./MetroMap";
import { apiClient } from "@/lib/api-client";
import { Loader2, MessageSquare, Sparkles, Map } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardContent = () => {
  const [loading, setLoading] = useState(true);
  const [journeyState, setJourneyState] = useState<{ phase: number; phase_name: string } | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await apiClient("/api/chat/state");
        if (response.ok) {
          const data = await response.json();
          setJourneyState({
            phase: data.phase,
            phase_name: data.phase_name
          });
        }
      } catch (error) {
        console.error("Failed to fetch journey state:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 h-[320px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">
      
      {/* SECTION 1: HERO JOURNEY */}
      <div className="lg:col-span-2 bg-card border rounded-3xl p-6 shadow-sm flex flex-col min-h-[320px]">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-xl">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Votre Progression</h2>
            <p className="text-xs text-muted-foreground">Suivez les étapes de votre voyage socratique.</p>
          </div>
        </div>
        
        <div className="flex-1 flex items-center">
          <MetroMap currentPhase={journeyState?.phase || 1} />
        </div>
      </div>

      {/* SECTION 2: NEXT ACTION - Contraste renforcé (Bleu Profond) */}
      <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-background border border-indigo-200/50 dark:border-indigo-500/20 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[320px] relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full bg-indigo-600/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-400 mb-4 border border-indigo-600/20 uppercase tracking-widest">
            <Sparkles className="mr-1 h-3 w-3" />
            Étape Actuelle
          </div>
          
          <h3 className="text-2xl font-black mb-3 tracking-tight text-indigo-900 dark:text-indigo-100">
            {journeyState?.phase_name || "L'Appel à l'Aventure"}
          </h3>
          
          <p className="text-sm text-indigo-900/70 dark:text-indigo-300/70 mb-6 leading-relaxed font-medium">
            Votre coach socratique est prêt. Répondez aux questions pour débloquer de nouvelles compétences.
          </p>
        </div>

        <div className="relative z-10">
          <Link href="/chat" className="w-full">
            <Button size="lg" className="w-full gap-2 font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all bg-indigo-600 hover:bg-indigo-700 text-white border-none h-12">
              <MessageSquare className="w-4 h-4" />
              Continuer la discussion
            </Button>
          </Link>
        </div>
        
        {/* Background Decor */}
        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>
      
    </div>
  );
};

export default DashboardContent;
