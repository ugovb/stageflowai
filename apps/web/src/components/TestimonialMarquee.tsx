"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const REVIEWS = [
    {
        name: "Thomas D.",
        role: "Étudiant en Génie Méca",
        text: "J'avais que des TPs sur des moteurs. StageFlow a transformé ça en compétence 'Analyse de Systèmes Complexes'. J'ai eu mon stage chez Airbus !",
        tag: "Ingénierie"
    },
    {
        name: "Sarah L.",
        role: "Master Bio-informatique",
        text: "Je savais pas comment vendre mes projets de code. L'IA a trouvé les mots exacts pour rassurer les recruteurs.",
        tag: "Tech"
    },
    {
        name: "Mehdi B.",
        role: "Licence Eco-Gestion",
        text: "Mes dossiers étaient trop scolaires. Maintenant ils font 'Pro'. C'est le jour et la nuit.",
        tag: "Business"
    },
    {
        name: "Julie C.",
        role: "Chimie des Matériaux",
        text: "J'ai décroché une alternance alors que je n'avais que des expériences de labo à la fac. Merci !",
        tag: "Science"
    },
    {
        name: "Lucas P.",
        role: "IUT Info",
        text: "Simple, efficace. Pas de blabla ChatGPT générique. Ça parle de mes vrais projets.",
        tag: "Tech"
    },
];

export function TestimonialMarquee() {
    return (
        <div className="w-full overflow-hidden py-12 bg-black text-white border-y-2 border-white/20">
            <div className="flex w-[200%]">
                <div className="flex animate-scroll hover:[animation-play-state:paused] w-1/2 justify-around">
                    {REVIEWS.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
                <div className="flex animate-scroll hover:[animation-play-state:paused] w-1/2 justify-around">
                    {REVIEWS.map((review, i) => (
                        <ReviewCard key={`clone-${i}`} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
    return (
        <div className="w-[300px] md:w-[400px] shrink-0 mx-4 bg-[#1a1a1a] p-6 border border-white/20 relative group hover:bg-[#252525] transition-colors">
            <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest border border-white/40 px-2 py-1 rounded-full text-white/60">
                {review.tag}
            </div>
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 border border-white/20">
                    <AvatarFallback className="bg-primary text-white font-bold">{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-xs text-gray-400">{review.role}</div>
                </div>
            </div>
            <p className="text-gray-300 italic">"{review.text}"</p>
        </div>
    );
}
