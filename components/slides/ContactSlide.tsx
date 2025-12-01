import React from 'react';

const ContactSlide: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col">
      {/* Header stays left-aligned */}
      <h2 className="font-grotesk text-6xl md:text-8xl font-bold mb-10 text-white drop-shadow-[0_0_20px_#ffffff] text-left">
        //CONTACT
      </h2>
      
      {/* Content wrapper centered */}
      <div className="w-full flex flex-col items-center text-center">
        <p className="font-vt text-4xl md:text-5xl mb-16 text-[#ff00ff] drop-shadow-[0_0_10px_rgba(255,0,255,0.8)] max-w-4xl leading-tight">
          Готов к системе, <br />
          которая работает без бюджета?
        </p>
        
        <a 
          href="https://t.me/D4Dark" 
          target="_blank"
          rel="noreferrer"
          className="
            group relative inline-flex items-center justify-center px-10 py-5 md:px-16 md:py-6
            border-4 border-[#00f0ff] bg-transparent overflow-hidden
            transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,240,255,0.6)]
          "
        >
          <div className="absolute inset-0 w-0 bg-[#00f0ff] transition-all duration-[250ms] ease-out group-hover:w-full opacity-100" />
          <span className="relative font-grotesk text-2xl md:text-3xl font-bold text-[#00f0ff] group-hover:text-black transition-colors z-10 tracking-widest">
            НАПИСАТЬ В TELEGRAM
          </span>
        </a>

        <p className="mt-24 font-vt text-xl md:text-2xl text-[#00f0ff]/60">
          by Daniil Koppalov • 2025
        </p>
      </div>
    </div>
  );
};

export default ContactSlide;