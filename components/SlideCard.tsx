import React from 'react';

interface SlideCardProps {
  children: React.ReactNode;
  className?: string;
}

const SlideCard: React.FC<SlideCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        relative bg-[#141432]/80 border-2 border-[#00f0ff] p-8 md:p-12 
        shadow-[0_0_40px_rgba(0,240,255,0.2),inset_0_0_40px_rgba(0,0,0,0.6)] 
        backdrop-blur-md max-w-3xl w-full mx-4 animate-[flicker_6s_infinite]
        will-change-[opacity]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default SlideCard;