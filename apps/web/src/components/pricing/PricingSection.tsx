"use client";

import React from "react";
import { BrutalistPricingCard } from "@/components/ui/brutalist/BrutalistPricingCard";
import { PRICING_PLANS } from "@/config/pricing";

export function PricingSection() {
  return (
    <section className="py-20 px-4 max-w-[90rem] mx-auto bg-[#FDFBF7]">
      <div className="text-center mb-20 relative">
        <h1 className="font-serif text-5xl md:text-7xl font-black mb-6 mt-8 relative inline-block">
          <span className="relative z-10">
            Grille Tarifaire.
            <span className="absolute -inset-2 bg-yellow-300/50 -z-10 -rotate-2 skew-x-3 rounded-sm block transform scale-110 blur-[0.5px]"></span>
          </span>
          <br />
          <span className="text-primary text-3xl md:text-5xl block mt-4">(Choisis ton arme)</span>
        </h1>
      </div>

      <div className="space-y-20">
        {/* DISCOVERY SECTION */}
        <div>
          <div className="flex items-center justify-center mb-10">
            <span className="bg-gray-100 border-2 border-black px-6 py-2 rounded-full font-bold text-xl shadow-hard transform -rotate-1">
              🌱 Découverte : Pour commencer doucement
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 items-start">
            {PRICING_PLANS.filter(p => ['free', 'profil_pro', 'starter'].includes(p.id)).map((plan) => (
              <div key={plan.id} className="w-full md:w-[350px] shrink-0">
                <BrutalistPricingCard
                  name={plan.name}
                  price={plan.price.oneTime ? `${plan.price.oneTime}€` : `${plan.price.monthly}€`}
                  period={plan.price.oneTime ? "Paiement unique" : "/ mois"}
                  description={plan.description}
                  color={plan.id === 'profil_pro' ? 'blue' : plan.id === 'starter' ? 'green' : 'white'}
                  popular={plan.popular}
                  ctaText={plan.cta.text}
                  features={plan.features.map(f => ({
                    text: f.text,
                    included: f.included,
                    highlight: f.highlight
                  }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* EXPERT SECTION */}
        <div>
          <div className="flex items-center justify-center mb-10">
            <span className="bg-yellow-300 border-2 border-black px-6 py-2 rounded-full font-black text-2xl shadow-hard transform rotate-1">
              🚀 Expert : La machine de guerre
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 items-start">
            {PRICING_PLANS.filter(p => ['pro', 'unlimited'].includes(p.id)).map((plan) => (
              <div key={plan.id} className={`w-full md:w-[350px] shrink-0 ${plan.popular ? 'z-10 scale-105' : ''}`}>
                <BrutalistPricingCard
                  name={plan.name}
                  price={plan.price.oneTime ? `${plan.price.oneTime}€` : `${plan.price.monthly}€`}
                  period={plan.price.oneTime ? "Paiement unique" : "/ mois"}
                  description={plan.description}
                  color={plan.id === 'pro' ? 'purple' : 'black'}
                  popular={plan.popular}
                  ctaText={plan.cta.text}
                  features={plan.features.map(f => ({
                    text: f.text,
                    included: f.included,
                    highlight: f.highlight
                  }))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center mt-12 text-gray-500 text-sm max-w-2xl mx-auto">
        Satisfait ou remboursé sous 14 jours. "Profil Pro" est un achat unique, parfait si tu veux juste un CV béton.
        "Pro" et "Unlimited" sont des abonnements sans engagement (mensuels).
      </p>
    </section >
  );
}
