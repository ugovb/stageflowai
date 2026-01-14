import { cn } from "@/lib/utils";
import Image from "next/image";

interface PolaroidProps {
    src: string;
    alt: string;
    caption?: string;
    rotate?: number;
    className?: string;
}

export function Polaroid({ src, alt, caption, rotate = 0, className }: PolaroidProps) {
    return (
        <div
            className={cn(
                "bg-white p-3 pb-8 shadow-md border border-gray-200 w-fit transform transition-transform duration-500 hover:scale-105 hover:z-10",
                className
            )}
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-gray-100 bg-gray-100">
                {/* Using a placeholder div if src is empty or for layout simulation purposes, 
            but ideal usage implies a valid image src */}
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-64 h-80 flex items-center justify-center text-gray-400 font-hand">
                        [Polaroid: {alt}]
                    </div>
                )}
            </div>
            {caption && (
                <div className="mt-4 text-center font-hand text-xl text-gray-800 rotate-1">
                    {caption}
                </div>
            )}
        </div>
    );
}
