import { motion } from "motion/react";

export function DragonPattern() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="dragonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d="M50 100 Q60 80 80 85 Q90 70 100 75 Q110 65 120 72 Q135 60 145 75 Q155 85 150 100 Q145 115 135 120 Q125 128 115 125 Q105 130 95 125 Q85 120 75 115 Q65 110 50 100 Z"
        fill="url(#dragonGradient)"
        stroke="#7c2d12"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      <motion.circle
        cx="145"
        cy="75"
        r="8"
        fill="#dc2626"
        stroke="#7c2d12"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      
      <motion.circle
        cx="145"
        cy="73"
        r="3"
        fill="#fef3c7"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />

      <motion.path
        d="M140 68 Q135 55 138 50"
        fill="none"
        stroke="#7c2d12"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.path
        d="M150 68 Q155 55 152 50"
        fill="none"
        stroke="#7c2d12"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />

      {[80, 95, 110, 125].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={85 + Math.sin(i) * 10}
          r="4"
          fill="#eab308"
          stroke="#7c2d12"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
        />
      ))}

      <motion.path
        d="M30 90 Q35 85 40 90 Q45 85 50 90"
        fill="none"
        stroke="#eab308"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
      <motion.path
        d="M160 95 Q165 90 170 95 Q175 90 180 95"
        fill="none"
        stroke="#eab308"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
    </motion.svg>
  );
}

export function TranHoPattern() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="tranPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="3" fill="#dc2626" opacity="0.3" />
          <circle cx="10" cy="10" r="1.5" fill="#eab308" opacity="0.5" />
          <line x1="10" y1="7" x2="10" y2="3" stroke="#7c2d12" strokeWidth="0.5" opacity="0.4" />
          <line x1="10" y1="13" x2="10" y2="17" stroke="#7c2d12" strokeWidth="0.5" opacity="0.4" />
          <line x1="7" y1="10" x2="3" y2="10" stroke="#7c2d12" strokeWidth="0.5" opacity="0.4" />
          <line x1="13" y1="10" x2="17" y2="10" stroke="#7c2d12" strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#tranPattern)" />
    </svg>
  );
}

export function FloatingDragon({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <defs>
          <linearGradient id="floatDragon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M10 40 Q20 30 35 35 L45 32 Q55 25 65 30 L75 28 Q88 22 95 30 Q100 35 98 42 L105 38 Q112 35 115 40"
          fill="none"
          stroke="url(#floatDragon)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            strokeDashoffset: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            strokeDasharray: "10 5",
          }}
        />
        
        <circle cx="115" cy="40" r="6" fill="#dc2626" stroke="#7c2d12" strokeWidth="1.5" />
        <circle cx="115" cy="39" r="2" fill="#fef3c7" />
        
        <line x1="115" y1="34" x2="118" y2="28" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
        <line x1="115" y1="46" x2="118" y2="52" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
        
        {[25, 50, 75].map((x, i) => (
          <motion.g key={i}>
            <circle cx={x} cy="42" r="3" fill="#eab308" opacity="0.4" />
            <circle cx={x + 4} cy="40" r="2.5" fill="#eab308" opacity="0.3" />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
