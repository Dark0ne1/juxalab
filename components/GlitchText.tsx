import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', size = 'xl' }) => {
  const sizeClasses = {
    sm: 'text-2xl md:text-4xl',
    md: 'text-4xl md:text-6xl',
    lg: 'text-6xl md:text-8xl',
    xl: 'text-[15vw] md:text-[12vw] leading-none',
  };

  return (
    <div className={`relative inline-block font-bold uppercase text-white font-grotesk tracking-tighter ${sizeClasses[size]} ${className}`}>
      <span className="relative z-10 block">{text}</span>
      <span 
        className="absolute top-0 left-0 z-0 w-full h-full text-[#00f0ff] opacity-70 animate-[glitch-1_2.5s_infinite]"
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 z-0 w-full h-full text-[#ff00ff] opacity-70 animate-[glitch-2_3s_infinite]"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
};

export default GlitchText;