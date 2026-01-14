"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { BrutalistButton } from "@/components/ui/brutalist/BrutalistButton";
import { Tape } from "@/components/ui/brutalist/Tape";
import { Stamp } from "@/components/ui/brutalist/Stamp";
import { cn } from "@/lib/utils";

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingPlanProps {
    name: string;
    price: string;
    period: string;
    description: string;
    features: PricingFeature[];
    ctaText: string;
    popular?: boolean;
    color?: "white" | "yellow" | "purple";
}

export function BrutalistPricingCard({
    name,
    price,
    period,
    description,
    features,
    ctaText,
    popular,
    color = "white",
}: PricingPlanProps) {
    const bgColors = {
        white: "bg-white",
        yellow: "bg-[#FDFF00]",
        purple: "bg-[#6D28D9] text-white",
    };

    const textColor = color === "purple" ? "text-white" : "text-black";
    const subTextColor = color === "purple" ? "text-white/80" : "text-gray-600";
    const borderColor = "border-black";

    return (
        <div className={cn(
            "relative border-2 border-black p-8 shadow-hard flex flex-col h-full",
            bgColors[color],
            popular ? "transform md:-rotate-1 z-10 scale-105" : "transform md:rotate-1"
        )}>
            {popular && (
                <React.Fragment>
                    <Tape className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 bg-red-500/80" rotate={2} />
                    <Stamp
                        text="POPULAIRE"
                        color="text-red-600 border-red-600"
                        rotate={15}
                        className="absolute -right-6 -top-6 bg-white z-20"
                    />
                </React.Fragment>
            )}
            {!popular && <Tape className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e0e0e0] w-24" rotate={-2} />}

            <div className="mb-6 text-center">
                <h3 className={cn("font-serif text-3xl font-bold mb-2", textColor)}>{name}</h3>
                <p className={cn("font-hand text-lg", subTextColor)}>{description}</p>
            </div>

            <div className={cn("text-center mb-8 border-b-2 border-dashed pb-6", color === "purple" ? "border-white/30" : "border-black/20")}>
                <div className={cn("text-5xl font-black mb-1", textColor)}>{price}</div>
                <div className={cn("text-sm uppercase tracking-widest font-bold", subTextColor)}>{period}</div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className={cn("flex items-start gap-3", textColor)}>
                        {feature.included ? (
                            <Check className={cn("w-6 h-6 shrink-0", color === "purple" ? "text-yellow-400" : "text-green-600")} strokeWidth={3} />
                        ) : (
                            <X className={cn("w-6 h-6 shrink-0 opacity-40")} />
                        )}
                        <span className={cn("text-lg", !feature.included && "opacity-50 line-through")}>{feature.text}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                <BrutalistButton
                    className="w-full text-lg py-6"
                    variant={color === "purple" ? "secondary" : "primary"}
                >
                    {ctaText}
                </BrutalistButton>
            </div>
        </div>
    );
}
