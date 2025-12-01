import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// Explicitly casting motion.div to any to bypass potential TypeScript definition mismatches
// where 'initial' property is sometimes not recognized in strict environments.
const MotionDiv = motion.div as any;

interface FullScreenWipeProps {
  trigger: number;
  direction?: 'next' | 'prev';
  onMiddle: () => void;
  onEnd: () => void;
}

export const FullScreenWipe: React.FC<FullScreenWipeProps> = ({ 
  trigger, 
  direction = 'next', 
  onMiddle, 
  onEnd 
}) => {
  const controls = useRef(0);

  const isNext = direction === 'next';
  // Next: Enter from Right (100%), Exit to Left (-100%)
  // Prev: Enter from Left (-100%), Exit to Right (100%)
  const startX = isNext ? '100%' : '-100%';
  const endX = isNext ? '-100%' : '100%';

  return (
    <MotionDiv
      key={trigger} // Re-mount animation on trigger change
      initial={{ x: startX }}
      // Only animate if trigger > 0. On initial load (trigger 0), stay hidden.
      animate={trigger === 0 ? { x: startX } : { x: [startX, '0%', endX] }}
      transition={{ 
        duration: 0.9, 
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
      onUpdate={(latest: any) => {
        // Check if we are close to center (0%)
        // When animating 'x' with percentages, latest.x will be a string like "12.3%"
        if (latest.x && trigger !== 0) {
           const val = parseFloat(latest.x as string);
           if (!isNaN(val) && val <= 5 && val >= -5 && controls.current !== trigger) {
             controls.current = trigger;
             onMiddle();
           }
        }
      }}
      onAnimationComplete={() => {
        if (trigger !== 0) onEnd();
      }}
      className="absolute inset-0 z-[100] flex pointer-events-none overflow-hidden"
    >
       <div className="h-full w-full bg-[#050505] relative flex">
          <div className="w-2 h-full bg-[#ff00ff] shadow-[0_0_20px_#ff00ff] z-20"></div>
          <div className="flex-1 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10" style={{background: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #111 10px, #111 20px)'}}></div>
          </div>
          <div className="w-4 h-full bg-[#00f0ff] shadow-[0_0_40px_#00f0ff] z-20"></div>
       </div>
    </MotionDiv>
  );
}

export default FullScreenWipe;