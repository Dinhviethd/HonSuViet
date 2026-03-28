import { memo } from "react";
import { FloatingDecoration } from "@/features/hon-su-viet/components/DragonPattern";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * All infinite background decorations use pure CSS @keyframes instead of
 * JS-driven framer-motion. This offloads work to the browser compositor
 * thread (GPU), freeing the main thread for interactions.
 *
 * When the user has "prefers-reduced-motion: reduce" enabled, decorations
 * are still rendered but without animation.
 */
export const BackgroundEffect = memo(function BackgroundEffect() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Gradient Background — no animation needed */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-red-50 to-yellow-50" />

      {/* Dragon decorations — framer-motion elements, hidden when reduced motion */}
      {!reduced && (
        <>
          <FloatingDecoration
            src="/smallDragon.png"
            className="top-10 right-10 w-32 h-auto z-0 opacity-50"
            duration={8}
          />
          <FloatingDecoration
            src="/smallDragon.png"
            className="bottom-10 left-10 w-24 h-auto z-0 opacity-50 scale-x-[-1]"
            duration={7}
            yOffset={10}
          />
        </>
      )}

      {/* Floating Clouds — CSS animation */}
      <div
        className="absolute top-40 left-1/4 w-32 h-16 opacity-20 bg-amber-300 rounded-full blur-xl animate-cloud-right"
      />
      <div
        className="absolute bottom-40 right-1/4 w-40 h-20 opacity-20 bg-red-300 rounded-full blur-xl animate-cloud-left"
      />

      {/* Traditional Patterns — CSS rotation */}
      <img
        src="/chim.png"
        alt=""
        className="absolute top-3/4 right-10 w-40 opacity-20 h-40 object-contain transform scale-x-[-1]"
      />
      <img
        src="/chim.png"
        alt=""
        className="absolute bottom-1/3 left-10 w-40 opacity-20 h-40 object-contain rotate-12"
      />

      {/* Decorative fire elements — CSS animation (5 elements) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-red-500 rounded-full opacity-20 blur-sm animate-fire"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + Math.sin(i) * 20}%`,
            animationDuration: `${4 + i}s`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
});
