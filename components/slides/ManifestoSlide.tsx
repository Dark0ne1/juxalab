import React, { useState, useRef } from 'react';

interface ManifestoSlideProps {
  onWakeUp?: () => void;
}

const ManifestoSlide: React.FC<ManifestoSlideProps> = ({ onWakeUp }) => {
  const [input, setInput] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const rules = [
    {
      variable: 'DATA_DRIVEN_DECISIONS',
      value: 'TRUE',
      comment: 'Решения принимаются на основе цифр, а не мнений.',
      valColor: 'text-[#00ff00]'
    },
    {
      variable: 'BLACK_BOX_MARKETING',
      value: 'FALSE',
      comment: 'Ты всегда понимаешь, как работает система. Никакой "магии".',
      valColor: 'text-[#ffffff]'
    },
    {
      variable: 'AUTOMATION_FIRST',
      value: 'TRUE',
      comment: 'Если что-то можно автоматизировать — оно будет автоматизировано.',
      valColor: 'text-[#00ff00]'
    },
    {
      variable: 'SHORT-TERM_HACKS',
      value: 'DISABLED',
      comment: 'Я строю активы, а не ищу "быстрые связки", которые сдохнут через месяц.',
      valColor: 'text-gray-400'
    },
    {
      variable: 'BLAME_GAME_PROTOCOL',
      value: 'NULL',
      comment: 'Если что-то не работает, я это чиню, а не буду искать виноватых.',
      valColor: 'text-[#00f0ff]'
    },
    {
      variable: 'PARTNERSHIP_MODE',
      value: 'IF (CLIENT_ENGAGED)',
      comment: 'Я работаю как партнёр, только если ты готов работать, а не "сделаешь всё за меня".',
      valColor: 'text-[#ffff00]'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    // Normalize string to ignore case and potential trailing punctuation/spaces
    const normalized = val.toLowerCase().trim().replace(/[.,!]/g, '');
    
    // Help Command
    if (normalized === 'help') {
      setHintVisible(true);
    }

    // Trigger Sequence
    if (normalized === 'wake the fuck up samurai') {
      triggerSequence();
    }
  };

  const triggerSequence = () => {
    if (showResponse) return; // Prevent double trigger
    
    // 1. Freeze input
    if (inputRef.current) inputRef.current.blur();
    
    // 2. Show response after small delay
    setTimeout(() => {
      setShowResponse(true);
      
      // 3. Trigger Global Theme Change
      setTimeout(() => {
        if (onWakeUp) onWakeUp();
      }, 2000); // Wait for user to read the message
    }, 500);
  };

  // Focus helper
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center h-full">
      {/* Editor Window */}
      <div 
        onClick={focusInput}
        className="w-full bg-[#050505] border border-[#333] shadow-[10px_10px_0_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col max-h-[85vh] animate-[flicker_6s_infinite] cursor-text"
      >
        
        {/* Title Bar */}
        <div className="bg-[#0000AA] text-white px-3 py-1 font-vt text-lg md:text-xl flex justify-between items-center shrink-0 border-b border-white/20 select-none">
          <div className="flex items-center gap-4">
             <span className="bg-white/20 px-2 text-white">≡</span>
             <span>C:\SYSTEM\CONFIG.INI</span>
          </div>
          <div className="flex gap-2">
             <span>[^]</span>
             <span>[X]</span>
          </div>
        </div>

        {/* Editor Content */}
        <div className="p-4 md:p-8 font-vt text-lg md:text-2xl leading-snug text-gray-300 overflow-y-auto custom-scrollbar bg-[#050505]">
          
          <div className="text-[#00f0ff] mb-6 md:mb-8 font-bold text-xl md:text-3xl tracking-wide drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
            //MANIFESTO: JUXA LAB ГЛАВНЫЕ ПРИНЦИПЫ
          </div>

          <div className="text-[#ff00ff] mb-6 text-xl md:text-3xl font-bold tracking-wider">
            [SYSTEM_RULES]
          </div>

          <div className="flex flex-col gap-6 md:gap-5">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex flex-col group">
                <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
                  <span className="text-gray-600 select-none hidden md:inline-block w-6 text-right opacity-50 text-sm">{idx + 10}</span>
                  <span className="text-[#00ff00] font-bold opacity-80">{'>'}</span>
                  <span className="text-white font-bold tracking-wide break-all">{rule.variable}</span>
                  <span className="text-gray-500">=</span>
                  <span className={`${rule.valColor} font-bold tracking-wider drop-shadow-sm`}>{rule.value}</span>
                </div>
                <div className="flex items-start gap-2 mt-1 md:ml-[3.5rem] ml-0 pl-6 md:pl-0 border-l border-gray-800 md:border-none">
   <span className="text-gray-600 font-bold opacity-50 text-sm md:text-base hidden md:inline-block select-none">;</span> 
   {/* ИЗМЕНЕНО ЗДЕСЬ: Сделал цвет светлее (gray-400) и добавил курсив */}
   <span className="text-gray-400 italic text-base md:text-xl font-normal opacity-90">
     // {rule.comment}
   </span>
</div>

              </div>
            ))}
          </div>

          {/* Terminal Input Area */}
          <div className="mt-8 flex gap-2 items-center relative">
             <span className="text-gray-600 select-none hidden md:inline-block w-6 text-right opacity-50 text-sm">16</span>
             
             {/* The visible text */}
             <div className="flex flex-wrap items-center">
                <span className="text-[#00f0ff] mr-2">root@system:~#</span>
                <span className="text-white">{input}</span>
                <span className="animate-pulse bg-[#00f0ff] text-black px-1 ml-1 block">_</span>
             </div>

             {/* Hidden Input for Mobile/Desktop typing */}
             <input 
               ref={inputRef}
               type="text" 
               value={input}
               onChange={handleInputChange}
               className="opacity-0 absolute inset-0 w-full h-full cursor-text"
               autoComplete="off"
               autoCapitalize="off"
               spellCheck="false"
             />
          </div>

          {/* Hint Response */}
          {hintVisible && !showResponse && (
            <div className="mt-2 flex gap-2 animate-[glitch-1_0.2s_ease-out]">
               <span className="text-gray-600 select-none hidden md:inline-block w-6 text-right opacity-50 text-sm">17</span>
               <span className="font-vt text-gray-400 text-xl md:text-2xl tracking-wide">
                 &gt; HINT: The city is cold. Sometimes you need to wake up the samurai.
               </span>
            </div>
          )}

          {/* Wake Up Response */}
          {showResponse && (
            <div className="mt-2 flex gap-2 animate-[glitch-1_0.2s_ease-out]">
               <span className="text-gray-600 select-none hidden md:inline-block w-6 text-right opacity-50 text-sm">{hintVisible ? 18 : 17}</span>
               <span className="font-bold text-[#fcee0a] text-2xl md:text-3xl tracking-widest bg-black drop-shadow-[0_0_10px_#fcee0a]">
                 &gt; WE HAVE A CITY TO BURN.
               </span>
            </div>
          )}

        </div>

        {/* Status Bar */}
        <div className="bg-[#0000AA] text-white px-3 py-1 font-vt text-sm md:text-base flex justify-between items-center shrink-0 border-t border-white/20 select-none">
           <span>Ln 16, Col {input.length + 1}</span>
           <span>ANSI</span>
        </div>
      </div>
    </div>
  );
};

export default ManifestoSlide;
