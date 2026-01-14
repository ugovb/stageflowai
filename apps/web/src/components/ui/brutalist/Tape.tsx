import { cn } from "@/lib/utils";

interface TapeProps {
    className?: string;
    color?: string; // hex color or tailwind class
    rotate?: number;
}

export function Tape({ className, color = "bg-yellow-200/80", rotate = -2 }: TapeProps) {
    return (
        <div
            className={cn(
                "absolute h-8 w-24 shadow-sm backdrop-blur-sm",
                color,
                className
            )}
            style={{
                transform: `rotate(${rotate}deg)`,
                clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0 100%, 2% 0)" // slightly irregular
                // A more complex clip-path for jagged edges would be better but simple for now
            }}
        />
    );
}
