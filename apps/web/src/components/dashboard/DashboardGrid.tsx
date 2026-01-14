"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Star, Zap, Brain, MessageSquare, ShieldCheck, Trophy, Sparkles, Map as MapIcon, ChevronRight, Edit2, X, Save, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JOURNEY_PHASES } from "@/constants/phases";
import { apiClient } from "@/lib/api-client";

// ... ProfileCard, StatsCard, Timeline, CoachWidget remain the same ...
// I will include them to avoid breaking the file content flow

const ProfileCard = ({ userEmail }: { userEmail: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient("/me");
        if (res.ok) {
          const data = await res.json();
          setName(data.full_name || userEmail?.split('@')[0] || "Étudiant");
          setSchool(data.school || "Votre École");
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchProfile();
  }, [userEmail]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({ full_name: name, school: school }),
      });
      if (res.ok) {
        setIsEditing(false);
      }
    } catch (e) {
      console.error("Failed to save profile", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsEditing(true)}
        className="h-full bg-indigo-700 rounded-[2rem] p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-lg shadow-indigo-200 cursor-pointer group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 p-2 rounded-full">
          <Edit2 className="w-4 h-4 text-white" />
        </div>
        <div className="flex justify-between items-start">
          <div className="w-16 h-16 rounded-full bg-white/20 p-1">
            <div className="w-full h-full bg-white rounded-full border-4 border-indigo-200 flex items-center justify-center font-black text-indigo-700 text-xl uppercase">
              {name?.[0]}
            </div>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20">
            Héros
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-1 text-white">Bonjour !</h3>
          <p className="opacity-90 font-medium text-indigo-100">{name}</p>
          <p className="text-xs text-indigo-200 mt-1">{school}</p>
        </div>
      </motion.div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditing(false); }}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Modifier mon profil</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom d'affichage</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">École / Université</Label>
                <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} className="rounded-xl h-11" placeholder="Ex: HEC, 42, Sorbonne..." />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold mt-4">
                <Save className="w-4 h-4 mr-2" /> {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const StatsCard = () => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="h-full bg-white border border-gray-200 rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-sm"
  >
    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
      <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
    </div>
    <h3 className="text-5xl font-black text-gray-900 mb-1">12</h3>
    <p className="font-bold text-gray-600">Skills Validés</p>
  </motion.div>
);

const Timeline = ({ currentPhase }: { currentPhase: number }) => (
  <div className="bg-white rounded-[2rem] border border-gray-200 p-8 h-full shadow-sm relative overflow-hidden">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
        <MapIcon className="w-6 h-6 text-indigo-600 stroke-[2.5px]" />
        Ton Parcours
      </h3>
      <div className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-bold">
        Phase {currentPhase}/10
      </div>
    </div>
    <div className="relative pl-4 space-y-8">
      <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-indigo-100" />
      {JOURNEY_PHASES.slice(0, 4).map((phase, i) => {
        const isActive = phase.id === currentPhase;
        const isPast = phase.id < currentPhase;
        return (
          <div key={phase.id} className="relative flex items-center gap-4 group">
            <div className={`w-6 h-6 rounded-full border-[3px] shrink-0 z-10 transition-colors ${isActive ? 'bg-yellow-400 border-yellow-400 scale-125 ring-4 ring-yellow-100' : isPast ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-200'}`}>
              {isPast && <ShieldCheck className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
            </div>
            <div className={`p-4 rounded-xl flex-1 transition-all border ${isActive ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm' : 'bg-white border-gray-100 text-gray-500'}`}>
              <p className="font-bold text-sm">{phase.name}</p>
              {isActive && <p className="text-xs text-indigo-600 mt-1 font-bold">En cours...</p>}
            </div>
          </div>
        )
      })}
    </div>
  </div>
);

const CoachWidget = () => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="h-full bg-white rounded-[2rem] border border-gray-200 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm"
  >
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
        <MessageSquare className="w-7 h-7 text-white stroke-[2.5px]" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900">Coach IA</h3>
        <p className="text-xs text-gray-500 font-medium mt-1">Prêt à discuter ?</p>
      </div>
    </div>
    <div className="mt-4">
      <Link href="/chat">
        <Button className="w-full rounded-xl h-12 font-bold bg-indigo-700 text-white hover:bg-indigo-800 shadow-lg shadow-indigo-200 group border-none">
          Lancer le chat <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  </motion.div>
);

const InventoryWidget = () => {
  const handleDownloadCV = async () => {
    try {
        const response = await apiClient("/api/documents/cv");
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "Mon_CV_StageFlow.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    } catch(e) { console.error(e) }
  };

  return (
    <div className="md:col-span-1 bg-white rounded-[2rem] border border-gray-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4 rotate-6 border border-purple-100">
          <Trophy className="w-10 h-10 text-indigo-600 stroke-[2.5px]" />
        </div>
        <h3 className="font-bold text-xl mb-2 text-gray-900">Inventaire</h3>
        <p className="text-sm text-gray-500 mb-6 font-medium">Collectionne tes skills comme des badges !</p>
        <div className="grid grid-cols-3 gap-2 w-full mb-6">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 font-black text-xl hover:border-indigo-300 hover:text-indigo-300 transition-colors cursor-pointer">?</div>
           ))}
        </div>
        
        <Button onClick={handleDownloadCV} variant="outline" className="w-full rounded-xl gap-2 font-bold border-indigo-200 text-indigo-700 hover:bg-indigo-50">
            <Download className="w-4 h-4" /> Générer CV
        </Button>
    </div>
  )
}

// --- Main Grid ---
export default function DashboardGrid({ currentPhase, phaseName }: { currentPhase: number, phaseName: string }) {
  const userEmail = "student@school.edu"; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
      <div className="md:col-span-1 h-[240px]">
        <ProfileCard userEmail={userEmail} />
      </div>
      <div className="md:col-span-1 h-[240px]">
        <StatsCard />
      </div>
      <div className="md:col-span-1 h-[240px]">
        <CoachWidget />
      </div>
      <div className="md:col-span-2 min-h-[400px]">
        <Timeline currentPhase={currentPhase} />
      </div>
      <InventoryWidget />
    </div>
  );
}