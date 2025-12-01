import React, { useState, useEffect } from 'react';

const RebootScreen: React.FC = () => {
  const [text, setText] = useState('ACCESS DENIED');
  const [subtext, setSubtext] = useState('UNAUTHORIZED ACCESS');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1: ACCESS DENIED (0 - 1.5s)
    // Stage 2: REBOOTING (1.5s - 4s)
    
    const t1 = setTimeout(() => {
      setText('REBOOTING...');
      setSubtext('RESTORING SYSTEM KERNEL');
    }, 1500);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        // Accelerate progress
        return prev + Math.random() * 5 + 1; 
      });
    }, 100);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#800000] overflow-hidden font-vt cursor-none select-none">
      {/* Intense Red Flicker Overlay */}
      <div className="absolute inset-0 bg-[#ff0000] mix-blend-overlay animate-[flicker_0.08s_infinite] opacity-60" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-40 animate-[noise_0.2s_linear_infinite]" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`}} 
      />

      <div className="relative z-20 flex flex-col items-center gap-6 p-4 w-full max-w-4xl">
        <div className="animate-[glitch-1_0.3s_infinite]">
          <h1 className="text-5xl md:text-9xl font-bold text-black bg-red-500 px-4 py-2 md:px-8 md:py-4 border-4 md:border-8 border-black tracking-tighter shadow-[8px_8px_0_rgba(0,0,0,0.7)] text-center">
            {text}
          </h1>
        </div>
        
        <div className="text-xl md:text-3xl text-red-200 font-mono animate-pulse tracking-widest uppercase bg-black/50 px-4 py-1">
          {subtext}
        </div>

        {text === 'REBOOTING...' && (
          <div className="w-full max-w-lg h-6 md:h-10 border-4 border-black bg-red-950 mt-4 relative">
            <div 
              className="h-full bg-red-500 transition-all duration-100 ease-out relative overflow-hidden"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
               {/* Striped pattern on progress bar */}
               <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(45deg,rgba(0,0,0,0.5) 25%,transparent 25%,transparent 50%,rgba(0,0,0,0.5) 50%,rgba(0,0,0,0.5) 75%,transparent 75%,transparent)', backgroundSize: '20px 20px'}}></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative hex dump background */}
      <div className="absolute top-0 left-0 p-4 text-red-300/20 text-xs font-mono overflow-hidden h-full w-full pointer-events-none break-all leading-tight">
        {Array.from({length: 40}).map((_, i) => (
          <span key={i}>{`0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()} ERROR_STACK_OVERFLOW_AT_ADDRESS_${i} `}</span>
        ))}
      </div>
    </div>
  );
};

export default RebootScreen;