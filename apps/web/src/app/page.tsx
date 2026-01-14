"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Sparkles,
  GraduationCap,
  ArrowDown,
  Check
} from "lucide-react";
import Link from "next/link";
import { BrutalistButton } from "@/components/ui/brutalist/BrutalistButton";
import { Polaroid } from "@/components/ui/brutalist/Polaroid";
import { Tape } from "@/components/ui/brutalist/Tape";
import { Stamp } from "@/components/ui/brutalist/Stamp";
import { TestimonialMarquee } from "@/components/TestimonialMarquee";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-[110vh] flex flex-col items-center pt-32 pb-20 px-4 md:px-8">

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[-5%] w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Text Content */}
        <div className="max-w-4xl text-center space-y-6 mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block relative"
          >
            <Tape className="top-[-10px] left-[-20px] -rotate-6" />
            <span className="font-hand text-xl md:text-2xl text-primary rotate-[-2deg] block mb-2 font-bold">
              Pour les étudiants en recherche de stage & alternance
            </span>
          </motion.div>

          <h1 className="font-serif text-4xl md:text-7xl font-black text-foreground leading-[1.1] relative">
            Tout ce que tu as fait et que tu feras <span className="relative inline-block text-primary px-2 md:px-4 py-1 md:py-2 mx-1">vaut de l'or.
              <svg className="absolute w-full h-full -top-1 left-0 text-secondary -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 20 Q 50 10 100 20 L 100 90 Q 50 95 0 85 Z" fill="#FDFF00" />
              </svg>
            </span>
            <span className="text-2xl md:text-5xl block mt-2">(Si tu sais le vendre).</span>
          </h1>

          <p className="font-sans text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Arrête les lettres ChatGPT. Laisse-nous transformer tes expériences ou celles dont tu n'as pas encore pris conscience en arguments de recrutement incomparables.
          </p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pt-8"
          >
            <Link href="/login">
              <BrutalistButton className="text-xl px-8 py-4">
                Créer mon dossier "perfect match"
                <ArrowRight className="ml-2 inline-block" />
              </BrutalistButton>
            </Link>
            <div className="mt-4 font-hand text-primary -rotate-2">
              (C'est gratuit pour le premier essai !)
            </div>
          </motion.div>
        </div>

        {/* COMPARISON VISUAL (The "Scroll" part) */}
        <div className="w-full max-w-6xl relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center px-4">

          {/* LEFT: The Boring Reality */}
          <motion.div
            initial={{ x: -50, opacity: 0, rotate: -2 }}
            animate={{ x: 0, opacity: 1, rotate: -2 }}
            transition={{ delay: 0.4 }}
            className="relative scale-90 md:scale-100"
          >
            <Tape className="top-[-15px] left-[30%] bg-gray-300" />
            <div className="bg-white p-8 shadow-md border border-gray-200 min-h-[400px] flex flex-col relative rotate-scrappy opacity-90 contrast-75 saturate-50 transition-all hover:opacity-100 hover:contrast-100 hover:saturate-100 group">
              {/* OVERLAY REJECTED (Always visible) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <Stamp text="REFUSÉ" color="text-red-700 border-red-700" rotate={-15} className="text-6xl border-8 opacity-80 mix-blend-multiply" />
              </div>

              {/* Ratures Red overlay */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 rotate-12 opacity-40"></div>
              <div className="absolute top-1/3 left-0 w-full h-0.5 bg-red-500 -rotate-6 opacity-40"></div>

              <h3 className="font-sans font-bold text-gray-500 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" /> Lettre_Motivation_Générique.pdf
              </h3>
              <div className="space-y-4 text-gray-400 font-serif text-sm blur-[0.3px] group-hover:blur-0 transition-all">
                <p>Madame, Monsieur,</p>
                <p>Actuellement étudiant en Master 2 Marketing, je me permets de vous solliciter pour un stage.</p>
                <p>Dynamique et motivé, j'ai toujours admiré votre entreprise leader sur son marché. Je souhaite mettre mes compétences à votre service...</p>
                <p>Dans l'attente de votre réponse...</p>
                <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
              </div>
            </div>
            <p className="text-center font-hand text-gray-500 mt-4 rotate-1 text-lg">
              ☝️ "Lu et ignoré en 3 secondes"
            </p>
          </motion.div>

          {/* RIGHT: The StageFlow Way */}
          <motion.div
            initial={{ x: 50, opacity: 0, rotate: 2 }}
            animate={{ x: 0, opacity: 1, rotate: 2 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <Tape className="top-[-15px] right-[30%] bg-secondary" rotate={3} />

            {/* Main Polaroid Container acting as the "Desk" */}
            <div className="bg-white p-2 shadow-hard border-2 border-black min-h-[450px] relative rotate-1 flex flex-col gap-2">

              {/* Top: The Dossier (Mini) */}
              <div className="bg-gray-50 border-2 border-black p-3 relative transform -rotate-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-black text-xs uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> StageFlow Dossier
                  </span>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <div className="bg-white border border-black p-2 text-[10px] font-bold shadow-sm">
                    ✨ Compétence : Gestion de Projet
                  </div>
                  <div className="bg-white border border-black p-2 text-[10px] font-bold shadow-sm">
                    🧠 Soft Skill : Leadership
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center -my-3 z-10">
                <div className="bg-secondary text-black rounded-full p-1 border-2 border-black shadow-sm transform rotate-3">
                  <ArrowDown className="w-5 h-5 stroke-[4px]" />
                </div>
              </div>

              {/* Bottom: The Personalized Letter */}
              <div className="bg-white border-2 border-black p-4 flex-1 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1">
                  <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 border border-green-700 rounded-full transform rotate-2">
                    Score: 98%
                  </div>
                </div>

                <h4 className="font-bold text-sm mb-2 border-b border-gray-200 pb-2">
                  Objet : <span className="text-indigo-600">Votre croissance sur le Q3</span>
                </h4>

                <p className="font-serif text-xs text-gray-800 leading-relaxed">
                  "J'ai lu votre rapport annuel avec attention.
                </p>
                <p className="font-serif text-xs text-gray-800 leading-relaxed mt-2">
                  Votre défi actuel sur l'acquisition client ressemble étonnamment à situation que j'ai gérée lors de mon projet associatif, où j'ai..."
                </p>

                <Stamp text="RECRUTÉ !" color="text-primary border-primary" rotate={-5} className="absolute bottom-4 right-4 text-2xl opacity-100 rotate-scrappy" />
              </div>

            </div>

            <p className="text-center font-hand text-primary mt-4 -rotate-1 text-lg">
              ✨ "C'est ça qu'ils veulent voir !"
            </p>
          </motion.div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialMarquee />

      {/* PROBLEM SECTION */}
      <section className="bg-white border-y-2 border-black py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 relative space-y-8">
              <Stamp text="LE PROBLÈME" color="text-black border-black" className="text-xl rotate-0 inline-block mb-4" />
              <h2 className="font-serif text-4xl font-bold">
                Pourquoi 90% des étudiants talentueux sont invisibles ?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-serif">
                Tu as passé des nuits blanches sur tes dossiers. Tu as rédigé des mémoires de 50 pages. Tu maîtrises des concepts que tes parents ne comprennent même pas.
                <br /><br />
                Mais sur ton CV, c'est juste écrit : <span className="bg-gray-200 px-1 font-mono text-sm">Master 1 - Mention Bien</span>.
              </p>
              <div className="font-hand text-2xl text-red-600 rotate-[-1deg]">
                🤬 C'est du gâchis pur !
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center relative">
              <Polaroid
                src="/frustratedstudentpolaroid.webp"
                alt="Étudiant frustré devant son ordi"
                caption="Toi essayant d'écrire une lettre originale"
                rotate={3}
                className="w-80"
              />
              <Tape className="top-[-10px] right-[20%] bg-blue-400" rotate={12} />
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-24 px-4 bg-background relative">
        <div className="absolute top-10 left-10 opacity-10 rotate-12">
          <GraduationCap size={120} />
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            L'approche <span className="bg-secondary px-2 border-2 border-black inline-block transform -skew-x-6">grand frère</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            On ne te donne pas des phrases toutes faites. On te pose les bonnes questions pour extraire tes pépites.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {/* Step 1 */}
          <div className="bg-white p-8 border-2 border-black shadow-hard relative">
            <div className="absolute -top-6 -left-6 bg-black text-white w-12 h-12 flex items-center justify-center font-bold text-xl border-2 border-black rounded-lg transform -rotate-6">
              1
            </div>
            <h3 className="font-bold text-2xl mb-4 mt-2">Le debrief socratique</h3>
            <p className="text-gray-600">
              L'IA te pose les questions que tu ne t'es jamais posées. Raconte tes projets, tes galères et tes victoires. C'est là que tout commence.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 border-2 border-black shadow-hard relative top-8 md:top-12">
            <div className="absolute -top-6 -left-6 bg-black text-white w-12 h-12 flex items-center justify-center font-bold text-xl border-2 border-black rounded-lg transform rotate-3">
              2
            </div>
            <h3 className="font-bold text-2xl mb-4 mt-2">Le décodage</h3>
            <p className="text-gray-600">
              On analyse tes réponses pour extraire tes talents cachés : méthodologies, outils, soft skills... Tout ce que tu pensais "banal" devient vital.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 border-2 border-black shadow-hard relative">
            <div className="absolute -top-6 -left-6 bg-black text-white w-12 h-12 flex items-center justify-center font-bold text-xl border-2 border-black rounded-lg transform -rotate-3">
              3
            </div>
            <h3 className="font-bold text-2xl mb-4 mt-2">Le profil "match"</h3>
            <p className="text-gray-600">
              On génère un profil de combat unique, optimisé pour matcher parfaitement avec les entreprises qui cherchent exactement qui tu es.
            </p>
          </div>
        </div>

        {/* PRICING HIGHLIGHT */}
        <section className="mt-32 max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Investis dans ton avenir</h2>
            <p className="text-xl text-gray-600">(C'est 100x plus rentable que Netflix)</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

            {/* FREE TEASER */}
            <div className="w-full md:w-1/3 opacity-80 hover:opacity-100 transition-opacity">
              <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
                <h3 className="font-bold text-xl text-gray-500">Plan Free</h3>
                <div className="text-3xl font-black my-2 text-gray-400">0€</div>
                <p className="text-sm text-gray-500 mb-4">Juste pour tester.</p>
                <Link href="/login">
                  <BrutalistButton variant="outline" className="w-full text-sm">Créer un compte</BrutalistButton>
                </Link>
              </div>
            </div>

            {/* PRO HIGHLIGHT */}
            <div className="w-full md:w-1/2 relative z-10">
              <div className="bg-[#6D28D9] p-8 border-2 border-black shadow-hard transform md:rotate-1 relative text-white">
                <Stamp text="BEST SELLER" color="text-yellow-400 border-yellow-400" className="absolute -top-6 -right-6 rotate-12 bg-black" />
                <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-300 w-32" rotate={-2} />

                <h3 className="font-serif text-3xl font-bold mb-2">Plan Pro</h3>
                <div className="flex items-baseline gap-2 mb-6 justify-center">
                  <span className="text-6xl font-black">9.99€</span>
                  <span className="text-xl opacity-80">/ mois</span>
                </div>

                <ul className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                  <li className="flex gap-3 items-center"><Check className="text-yellow-400 shrink-0" /> <span className="font-bold">Entreprises illimitées</span></li>
                  <li className="flex gap-3 items-center"><Check className="text-yellow-400 shrink-0" /> <span className="font-bold">30 lettres / mois</span></li>
                  <li className="flex gap-3 items-center"><Check className="text-yellow-400 shrink-0" /> <span className="font-bold">IA Claude 3.5 Sonnet</span></li>
                  <li className="flex gap-3 items-center"><Check className="text-yellow-400 shrink-0" /> <span className="font-bold">Profil Détaillé inclus</span></li>
                </ul>

                <Link href="/login">
                  <BrutalistButton className="text-lg md:text-xl px-8 py-6 rounded-full font-black border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                    CRÉER MON DOSSIER "PERFECT MATCH" →
                  </BrutalistButton>
                </Link>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="inline-block font-hand text-xl underline decoration-wavy underline-offset-4 text-primary hover:text-black transition-colors">
              Besoin de plus de puissance ou juste d'un profil one-shot ? Comparer les 5 offres détaillées &rarr;
            </Link>
          </div>
        </section>

        <div className="mt-20 text-center pb-20">
          <Link href="/login">
            <BrutalistButton className="text-2xl px-12 py-6 bg-secondary text-black hover:bg-yellow-400">
              🚀 Je lance ma carrière maintenant
            </BrutalistButton>
          </Link>
        </div>
      </section>

    </main>
  );
}
