import { memo } from "react";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { FloatingDecoration } from "@/features/hon-su-viet/components/DragonPattern";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const HeroSection = memo(function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-4 relative"
    >
      {/* Small decorative dragons flanking title */}
      {!reduced && (
        <>
          <div className="absolute -left-20 top-0 w-16 h-16 opacity-30 hidden xl:block">
            <FloatingDecoration
              src="/smallDragon.png"
              className="top-10 right-10 w-32 h-auto z-0 opacity-50"
              duration={8}
            />
          </div>
          <div className="absolute -right-20 top-0 w-16 h-16 opacity-30 hidden xl:block transform scale-x-[-1]">
            <FloatingDecoration
              src="/smallDragon.png"
              className="bottom-10 left-10 w-24 h-auto z-0 opacity-50 scale-x-[-1]"
              duration={7}
              yOffset={10}
            />
          </div>
        </>
      )}

      {/* Title pulse: CSS animation instead of framer-motion infinite loop */}
      <div className="animate-title-pulse">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl py-3">
          HỒN SỬ VIỆT
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-amber-800 font-medium">
        Khám phá hành trình 4000 năm dựng nước và giữ nước
      </p>
      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-line-scale" />
        <div className="animate-spin" style={{ animationDuration: "3s" }}>
          <Flame className="w-6 h-6 text-red-600" />
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-line-scale" />
      </div>
    </motion.div>
  );
});