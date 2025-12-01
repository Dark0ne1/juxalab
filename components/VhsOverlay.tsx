import React, { useState, useEffect, memo } from 'react';

interface VhsOverlayProps {
  currentSlide: number;
  onChannelClick?: () => void;
}

// 1. ISOLATED TIMER COMPONENT
// This ensures only this tiny span re-renders every ~41ms, 
// rather than the entire Overlay with its complex gradients.
const VhsTimer: React.FC = () => {
  const [elapsed, setElapsed] = useState(0);
  const startTime = React.useRef(Date.now());

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      setElapsed(Date.now() - startTime.current);
      // Using requestAnimationFrame is more battery friendly than setInterval
      // as it pauses when the tab is inactive.
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const centis = Math.floor((ms % 1000) / 10); 

    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${centis.toString().padStart(2, '0')}`;
  };

  return <>{formatTime(elapsed)}</>;
};

// 2. MAIN OVERLAY (MEMOIZED)
// The heavy visual layers are now static and won't re-render on time updates.
const VhsOverlay: React.FC<VhsOverlayProps> = memo(({ currentSlide, onChannelClick }) => {
  // Format channel number with leading zero (e.g., CH-01, CH-02)
  const channelDisplay = `CH-${(currentSlide + 1).toString().padStart(2, '0')}`;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden w-full h-full transform-gpu">
      {/* 1. SCANLINES - Static, GPU promoted */}
      <div 
        className="absolute inset-0 z-10 opacity-15 will-change-transform"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4))',
          backgroundSize: '100% 4px',
          transform: 'translateZ(0)' // Force GPU layer
        }}
      />
      
      {/* 2. ROLLING BAR (VHS Tracking) - Optimized Animation */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-30 will-change-transform"
        style={{
          background: 'linear-gradient(0deg, transparent, rgba(0,240,255,0.1) 2px, transparent 3px)',
          backgroundSize: '100% 100%',
          animation: 'tracking 10s linear infinite',
          transform: 'translateZ(0)'
        }}
      />

      {/* 3. CRT TUBE VIGNETTE */}
      <div 
        className="absolute inset-0 z-30"
        style={{
          background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0.95) 100%)'
        }} 
      />

      {/* 4. PHYSICAL EDGE SHADOW */}
      <div className="absolute inset-0 z-30 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />
      
      {/* 5. GLASS REFLECTION / GLARE - Simplified for performance */}
      <div 
        className="absolute inset-0 z-30 opacity-20 mix-blend-overlay"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 100%)'
        }} 
      />
      {/* Removed the extra blur layer on mobile to save battery, kept subtle */}
      <div 
         className="absolute inset-0 z-30 opacity-10 mix-blend-screen hidden md:block"
         style={{
           background: 'linear-gradient(125deg, transparent 0%, transparent 35%, rgba(255,255,255,0.2) 45%, transparent 50%, transparent 100%)',
           filter: 'blur(5px)'
         }}
      />

      {/* UI Elements */}
      {/* Channel Label */}
      <div 
        onClick={onChannelClick}
        className="absolute top-4 left-4 md:top-6 md:left-10 z-40 bg-black/40 backdrop-blur-[2px] px-2 py-1 border border-[#00f0ff]/30 rounded-sm pointer-events-auto cursor-pointer hover:bg-black/80 hover:border-[#ff0000] group transition-colors duration-300"
      >
        <span className="font-vt text-[#00f0ff] group-hover:text-[#ff0000] transition-colors duration-300 text-xl md:text-2xl tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,240,255,0.8)] group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
          {channelDisplay}
        </span>
      </div>

      {/* REC Indicator */}
      <div className="absolute top-4 right-4 md:top-6 md:right-10 z-40 flex items-center gap-3">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#ff0000] animate-[pulse-slow_2s_infinite] shadow-[0_0_10px_red]" />
        <span className="font-vt text-[#ff0000] text-2xl md:text-3xl tracking-widest drop-shadow-sm opacity-90">REC</span>
      </div>
      
      {/* PLAY Timestamp - Uses Isolated Component */}
      <div className="absolute left-4 top-16 md:top-auto md:bottom-6 md:left-10 z-40 font-vt text-[#00f0ff]/70 text-xl md:text-2xl tracking-widest">
        PLAY &#9658; <VhsTimer />
      </div>
    </div>
  );
});

export default VhsOverlay;