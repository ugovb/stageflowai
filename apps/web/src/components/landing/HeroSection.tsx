"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Gamepad2, Rocket, PlayCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 overflow-hidden pt-20 pb-10 px-4">
      
      {/* Background Decor */}
      <div className="absolute top-20 left-10 w-12 h-12 border-4 border-indigo-200 rounded-full opacity-50" />
      <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50" />

      <div className="container max-w-6xl mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-block bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
            <span className="font-bold text-indigo-700 flex items-center gap-2">
              <Star className="w-4 h-4 fill-indigo-600 text-indigo-600" />
              Nouveau : IA Coach V2
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight relative z-10">
            Le stage de vos <br />
            <span className="relative inline-block ml-2 z-10">
              rêves
              <svg className="absolute w-[130%] h-[130%] -left-[15%] -top-[15%] -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q50,0 100,50 T200,50" fill="none" stroke="#FCD34D" strokeWidth="12" className="opacity-80" style={{ d: "path('M5 50 Q 50 5 95 50 Q 50 95 5 50')" }} />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Transforme ta recherche en jeu vidéo. Débloque des skills, gagne des badges et trouve ton entreprise idéale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/auth/signup">
              {/* FIX: SOLID INDIGO BUTTON */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 px-8 rounded-full bg-indigo-700 text-white font-bold text-lg shadow-xl shadow-indigo-200 flex items-center gap-2 hover:bg-indigo-800 transition-colors"
              >
                Lancer ma carrière <ArrowRight className="w-6 h-6 stroke-[3px]" />
              </motion.button>
            </Link>
            <Button variant="ghost" className="h-14 px-8 rounded-full text-gray-900 font-bold hover:bg-gray-200 text-lg gap-2 border border-gray-200 bg-white">
              <PlayCircle className="w-6 h-6" /> Demo
            </Button>
          </div>
        </div>

        {/* Right: Bento Grid Visual */}
        <div className="relative p-4">
           <div className="grid grid-cols-2 gap-4 auto-rows-[180px]">
              
              {/* Card 1: Gamification (Violet) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="col-span-2 bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100 shadow-sm relative overflow-hidden"
              >
                <Gamepad2 className="w-10 h-10 stroke-[2.5px] text-indigo-600 mb-4" />
                <div>
                  {/* FIX: Dark Text */}
                  <h3 className="text-2xl font-bold text-gray-900">Gamification</h3>
                  <p className="font-medium text-gray-600 mt-1">Ton avenir est un jeu.</p>
                </div>
              </motion.div>

              {/* Card 2: Boost (Yellow) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-yellow-50 rounded-[2rem] p-6 border border-yellow-100 flex flex-col justify-center items-center text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-yellow-100">
                  <Rocket className="w-6 h-6 text-yellow-600 fill-yellow-600" />
                </div>
                {/* FIX: Dark Text */}
                <h3 className="text-xl font-bold text-gray-900">Boost</h3>
                <p className="text-sm font-bold text-gray-600 mt-1">x10 Rapidité</p>
              </motion.div>

              {/* Card 3: Communauté (Pink) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-pink-50 rounded-[2rem] p-6 border border-pink-100 flex flex-col justify-between shadow-sm"
              >
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-pink-200 border-2 border-white" />)}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                    <Users className="w-5 h-5 text-pink-600" />
                    {/* FIX: Dark Text */}
                    <p className="font-bold text-gray-900">Communauté</p>
                </div>
              </motion.div>

           </div>
        </div>

      </div>
    </section>
  );
}
