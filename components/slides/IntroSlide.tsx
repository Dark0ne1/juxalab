import React from 'react';
import GlitchText from '../GlitchText';

const IntroSlide: React.FC = () => {
  return (
    <div className="
      w-full 
      flex 
      flex-col 
      items-center 
      justify-center 
      text-center 
      px-4
    ">
      <GlitchText text="JUXA LAB" />

      <p className="
        font-vt 
        text-xl md:text-4xl 
        mt-6 md:mt-10
        text-[#00f0ff] 
        drop-shadow-[0_0_15px_rgba(0,240,255,0.6)] 
        max-w-4xl 
        leading-normal
      ">
        маркетинг полного цикла <br />
        <span className="text-white">стратегия</span> • <span className="text-white">код</span> • <span className="text-white">воронки</span>
      </p>

      <a 
        href="https://t.me/D4Dark" 
        target="_blank"
        rel="noreferrer"
        className="
          intro-slide-cta
          mt-8 md:mt-16
          group relative inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-4
          border-4 border-[#00f0ff] bg-transparent overflow-hidden
          transition-all duration-300 
          shadow-[0_0_30px_rgba(0,240,255,0.5)] md:shadow-none
          md:hover:shadow-[0_0_50px_rgba(0,240,255,0.6)]
          animate-[mobile-button-pulse_3s_ease-in-out_infinite] md:animate-none
        "
      >
        <div className="absolute inset-0 bg-[#00f0ff] transition-all duration-[250ms] ease-out w-full md:w-0 md:group-hover:w-full opacity-100" />
        <span className="relative font-grotesk text-base md:text-xl font-bold text-black md:text-[#00f0ff] md:group-hover:text-black transition-colors z-10 tracking-widest uppercase">
          ► ОБСУДИТЬ ПРОЕКТ
        </span>
      </a>

      <p className="font-vt text-sm md:text-2xl mt-8 md:mt-16 text-gray-400">
        by Daniil Koppalov
      </p>
    </div>
  );
};

export default IntroSlide;