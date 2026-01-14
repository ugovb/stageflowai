"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Map as MapIcon, ChevronRight, Download, Edit2, X, Save, MessageSquare, Star, Check } from "lucide-react";
import Link from "next/link";
import { BrutalistButton } from "@/components/ui/brutalist/BrutalistButton";
import { Tape } from "@/components/ui/brutalist/Tape";
import { Stamp } from "@/components/ui/brutalist/Stamp";
import { Polaroid } from "@/components/ui/brutalist/Polaroid";
import { JOURNEY_PHASES } from "@/constants/phases";

const NoteCard = ({ children, className, rotate = 0 }: { children: React.ReactNode, className?: string, rotate?: number }) => (
    <div
        className={`bg-yellow-100 p-10 shadow-hard border-2 border-black relative ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
    >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/10 blur-sm -z-10 rounded-full" />
        <Tape className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-400/80 w-24" rotate={-2} />
        {children}
    </div>
);

const FolderCard = ({ title, children, color = "bg-white" }: { title: string, children: React.ReactNode, color?: string }) => (
    <div className={`relative ${color} border-2 border-black p-6 shadow-hard h-full flex flex-col`}>
        <div className="absolute -top-8 left-0 w-32 h-8 bg-black border-2 border-black border-b-0 rounded-t-lg flex items-center justify-center text-white font-bold text-xs">
            {title}
        </div>
        {children}
    </div>
);

const ProfileWidget = ({ userEmail }: { userEmail: string }) => (
    <FolderCard title="ÉTUDIANT" color="bg-[#FDFBF7]">
        <div className="flex items-start justify-between mb-4">
            <div className="border-2 border-black p-1 bg-white rotate-[-2deg]">
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center font-black text-2xl border border-black">
                    {userEmail?.[0]?.toUpperCase()}
                </div>
            </div>
            <div className="font-hand text-xl rotate-2 text-primary font-bold">
                PROMO 2026
            </div>
        </div>
        <h3 className="font-serif text-2xl font-bold">{userEmail?.split('@')[0]}</h3>
        <p className="font-mono text-xs text-gray-500 mb-4">{userEmail}</p>

        <div className="mt-auto">
            <div className="flex justify-between items-center text-sm font-bold border-t-2 border-black pt-2">
                <span>Niveau</span>
                <span className="bg-black text-white px-2 rounded-sm transform rotate-1">NOVICE</span>
            </div>
        </div>
    </FolderCard>
);

const CoachWidget = () => (
    <NoteCard rotate={-1} className="h-full flex flex-col">
        <h3 className="font-hand text-2xl font-bold mb-2 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" /> Note du Coach
        </h3>
        <p className="font-serif text-sm leading-relaxed mb-4 flex-1">
            "Salut ! N'oublie pas de compléter ton expérience de stage de l'été dernier. C'est une mine d'or pour les skills 'Gestion de projet'."
        </p>
        <Link href="/chat">
            <BrutalistButton className="w-full text-sm py-2">
                Répondre au Coach
            </BrutalistButton>
        </Link>
    </NoteCard>
);

const StatsWidget = () => (
    <div className="bg-white border-2 border-black p-4 shadow-hard flex flex-col justify-center items-center text-center relative h-full transform rotate-1">
        <div className="absolute -top-3 -right-3">
            <Stamp text="TOP !" color="text-green-600 border-green-600" rotate={12} className="text-xs p-1" />
        </div>
        <div className="text-5xl font-black mb-0">12</div>
        <div className="font-hand text-xl bg-secondary px-2 -rotate-2">Skills Validés</div>
    </div>
)

const TimelineWidget = ({ currentPhase }: { currentPhase: number }) => (
    <FolderCard title="PARCOURS" color="bg-white">
        <div className="space-y-0 mt-4 relative pl-4">
            {/* Vertical Dotted Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-gray-300 -z-10" />

            {JOURNEY_PHASES.slice(0, 4).map((phase, i) => {
                const isActive = phase.id === currentPhase;
                const isPast = phase.id < currentPhase;

                return (
                    <div key={phase.id} className={`flex items-start gap-4 mb-8 ${isActive ? 'opacity-100' : 'opacity-60'} relative group`}>
                        {/* Circle Indicator */}
                        <div className={`w-6 h-6 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs shrink-0 bg-white z-10 
                            ${isActive ? 'bg-secondary ring-4 ring-secondary/20' : isPast ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {isPast ? <Check size={12} /> : i + 1}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pt-0.5 transition-all duration-300 ${isActive ? 'translate-x-1' : ''}`}>
                            <span className={`font-bold font-serif text-lg block leading-none ${isActive ? 'text-black' : 'text-gray-500'}`}>
                                {phase.name}
                            </span>
                            {isActive && (
                                <div className="mt-2 text-sm font-hand text-primary rotate-[-1deg] inline-block bg-yellow-100 px-2 py-0.5 border border-black/10 shadow-sm">
                                    En cours...
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    </FolderCard>
)

const InventoryWidget = () => (
    <div className="border-2 border-black p-6 bg-grid-pattern relative">
        <h3 className="font-black text-lg bg-white inline-block border-2 border-black px-2 mb-4 transform -rotate-1">
            INVENTAIRE
        </h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square border-2 border-black bg-white flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">
                    <Star className="w-5 h-5" />
                </div>
            ))}
            {[4, 5, 6].map(i => (
                <div key={i} className="aspect-square border-2 border-dashed border-gray-400 bg-transparent flex items-center justify-center opacity-50">
                </div>
            ))}
        </div>
        <BrutalistButton variant="outline" className="w-full text-xs">
            <Download className="w-3 h-3 mr-1 inline" /> Export CV
        </BrutalistButton>
    </div>
)

export default function BrutalistDashboardGrid({ currentPhase, phaseName }: { currentPhase: number, phaseName: string }) {
    const userEmail = "student@school.edu"; // Mock for now

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 max-w-6xl mx-auto">
            {/* COLUMN 1 */}
            <div className="space-y-8">
                <ProfileWidget userEmail={userEmail} />
                <StatsWidget />
            </div>

            {/* COLUMN 2 */}
            <div className="space-y-8">
                <TimelineWidget currentPhase={currentPhase} />
            </div>

            {/* COLUMN 3 */}
            <div className="space-y-8">
                <CoachWidget />
                <InventoryWidget />
            </div>
        </div>
    );
}
