import { memo, useId, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const DRAGON_SCALE_POINTS = [25, 50, 75] as const;
const DRAGON_PATH_STYLE = { strokeDasharray: "10 5" } as const;

interface FloatingDecorationProps {
  src: string;
  className?: string;
  duration?: number; // Thời gian một chu kỳ bay
  yOffset?: number;  // Độ cao bay lên xuống
}

export const FloatingDecoration = memo(function FloatingDecoration({
  src,
  className,
  duration = 6,
  yOffset = 15,
}: FloatingDecorationProps) {
  const shouldReduceMotion = useReducedMotion();

  const animate = useMemo(
    () => (shouldReduceMotion ? undefined : { y: [-yOffset, yOffset, -yOffset], rotate: [-2, 2, -2] }),
    [shouldReduceMotion, yOffset]
  );

  const transition = useMemo(
    () => (shouldReduceMotion ? undefined : { duration, repeat: Infinity, ease: "easeInOut" as const }),
    [shouldReduceMotion, duration]
  );

  return (
    <motion.div
      className={cn("absolute pointer-events-none select-none [will-change:transform]", className)}
      animate={animate}
      transition={transition}
    >
      <img
        src={src}
        alt="decoration"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain opacity-80"
      />
    </motion.div>
  );
});

export const FloatingDragon = memo(function FloatingDragon({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const gradientId = useId().replace(/:/g, "");

  const animate = shouldReduceMotion ? undefined : { y: [0, -20, 0], rotate: [0, 5, 0] };
  const transition = shouldReduceMotion
    ? undefined
    : {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  const pathAnimate = shouldReduceMotion ? undefined : { strokeDashoffset: [0, -20, 0] };

  return (
    <motion.div
      className={cn(className, "[will-change:transform]")}
      animate={animate}
      transition={transition}
    >
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M10 40 Q20 30 35 35 L45 32 Q55 25 65 30 L75 28 Q88 22 95 30 Q100 35 98 42 L105 38 Q112 35 115 40"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={pathAnimate}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          style={DRAGON_PATH_STYLE}
        />
        
        <circle cx="115" cy="40" r="6" fill="#dc2626" stroke="#7c2d12" strokeWidth="1.5" />
        <circle cx="115" cy="39" r="2" fill="#fef3c7" />
        
        <line x1="115" y1="34" x2="118" y2="28" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
        <line x1="115" y1="46" x2="118" y2="52" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
        
        {DRAGON_SCALE_POINTS.map((x, i) => (
          <motion.g key={i}>
            <circle cx={x} cy="42" r="3" fill="#eab308" opacity="0.4" />
            <circle cx={x + 4} cy="40" r="2.5" fill="#eab308" opacity="0.3" />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
});
