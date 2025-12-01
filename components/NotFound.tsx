import React from 'react';
import { useNavigate } from 'react-router-dom';
import TVFrame from './TVFrame';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <TVFrame currentSlide={403}> {/* CH-404 */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0000AA] text-white font-vt p-4 md:p-8 select-none relative overflow-hidden">
        {/* Background noise/glitch decoration */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #ffffff 2px, #ffffff 4px)`}} 
         />
         
        <div className="max-w-3xl w-full z-10 flex flex-col items-start">
          <div className="bg-white text-[#0000AA] px-2 py-1 w-fit mb-8 font-bold text-lg md:text-xl shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            JUXA_OS FATAL ERROR
          </div>
          
          <h1 className="text-5xl md:text-8xl mb-8 animate-pulse font-bold tracking-tighter">
            404_NOT_FOUND
          </h1>
          
          <p className="text-lg md:text-2xl mb-8 leading-relaxed opacity-90">
            A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
            00010E36. The current application will be terminated.
          </p>
          
          <ul className="list-none space-y-2 mb-8 text-base md:text-xl opacity-80">
            <li>* Press any key to terminate the current application.</li>
            <li>* Press REBOOT to restart the system and return to the home screen.</li>
            <li>* You will lose any unsaved information in all applications.</li>
          </ul>

          <div className="text-base md:text-xl mb-12 text-[#ffff00] font-mono bg-black/20 p-4 w-full border border-[#ffff00]/30">
             &gt; ERROR_CODE: LOCATION_MISSING<br/>
             &gt; STATUS: CRITICAL_FAILURE<br/>
             &gt; PATH: {window.location.pathname}
          </div>

          <button
            onClick={() => navigate('/')}
            className="group relative px-8 py-3 md:px-10 md:py-4 border-4 border-white bg-[#0000AA] hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
             <span className="relative z-10 font-bold text-xl md:text-2xl tracking-widest group-hover:text-[#0000AA] uppercase">
               [ PRESS TO REBOOT ]
             </span>
          </button>
          
          <div className="mt-12 text-center w-full opacity-50 text-sm">
            Press any key to continue _
          </div>
        </div>
      </div>
    </TVFrame>
  );
};

export default NotFound;
