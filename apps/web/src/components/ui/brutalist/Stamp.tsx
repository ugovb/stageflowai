import { cn } from "@/lib/utils";

interface StampProps {
    text: string;
    color?: string;
    rotate?: number;
    className?: string;
}

export function Stamp({ text, color = "text-red-600 border-red-600", rotate = -12, className }: StampProps) {
    return (
        <div
            className={cn(
                "border-4 rounded-lg px-4 py-2 font-black uppercase tracking-widest opacity-80 mix-blend-multiply select-none",
                "font-serif text-2xl",
                color,
                className
            )}
            style={{
                transform: `rotate(${rotate}deg)`,
                maskImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mnk+A8AAQUBAScY42YAAAAASUVORK5CYII=)", // Placeholder for grunge mask
                // In a real implementation we would use a proper SVG grunge mask 
                // to make it look like ink on paper.
                // For now, we simulate with dashed border style in CSS if needed, 
                // but solid with opacity is a good start.
            }}
        >
            {text}
        </div>
    );
}
