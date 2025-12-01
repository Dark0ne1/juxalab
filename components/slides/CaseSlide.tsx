import React from 'react';

const FlowStep: React.FC<{ 
  title: string; 
  subtitle?: string; 
}> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center group w-full max-w-2xl">
      <div className={`
        relative w-full
        border-2 border-[#00f0ff] 
        bg-[#000000]/80 backdrop-blur-sm
        px-4 py-3 md:px-8 md:py-4
        text-center
        transition-all duration-300
        group-hover:border-[#ff00ff]
        group-hover:shadow-[0_0_15px_rgba(255,0,255,0.4)]
        cursor-default
      `}>
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-1 h-1 md:w-2 md:h-2 border-t-2 border-l-2 border-[#00f0ff] group-hover:border-[#ff00ff]" />
        <div className="absolute top-0 right-0 w-1 h-1 md:w-2 md:h-2 border-t-2 border-r-2 border-[#00f0ff] group-hover:border-[#ff00ff]" />
        <div className="absolute bottom-0 left-0 w-1 h-1 md:w-2 md:h-2 border-b-2 border-l-2 border-[#00f0ff] group-hover:border-[#ff00ff]" />
        <div className="absolute bottom-0 right-0 w-1 h-1 md:w-2 md:h-2 border-b-2 border-r-2 border-[#00f0ff] group-hover:border-[#ff00ff]" />

        <div className="font-vt text-xl md:text-3xl text-[#00f0ff] group-hover:text-[#ff00ff] transition-colors uppercase tracking-wider">
          [ {title} ]
        </div>
        {subtitle && (
          <div className="font-vt text-gray-400 text-sm md:text-xl mt-1 md:mt-2 group-hover:text-white transition-colors">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

const Arrow: React.FC = () => (
  <div className="flex flex-col items-center text-[#00f0ff] font-vt text-2xl md:text-3xl leading-none my-1 md:my-2 opacity-60 select-none">
    <span>|</span>
    <span>V</span>
  </div>
);

const CaseSlide: React.FC = () => {
  const steps = [
    { title: "START" },
    { 
      title: "1. DECONSTRUCTION / АУДИТ", 
      subtitle: "(Анализирую твой хаос, нахожу точки потерь)" 
    },
    { 
      title: "2. ARCHITECTURE / АРХИТЕКТУРА", 
      subtitle: "(Проектирую систему: воронки, боты, интеграции)" 
    },
    { 
      title: "3. DEPLOYMENT / ВНЕДРЕНИЕ", 
      subtitle: "(Пишу код, настраиваю инструменты, запускаю)" 
    },
    { 
      title: "4. OPTIMIZATION / ОПТИМИЗАЦИЯ", 
      subtitle: "(Анализирую метрики, A/B-тесты, ищу точки роста)" 
    },
    { 
      title: "5. AUTOPILOT / АВТОПИЛОТ", 
      subtitle: "(Система работает без твоего участия)" 
    },
    { title: "END_OF_INITIAL_SETUP" }
  ];

  return (
    <div className="w-full flex flex-col items-start max-w-7xl mx-auto px-4 h-full">
      <h2 className="font-grotesk text-6xl md:text-8xl font-bold mb-8 text-white drop-shadow-[0_0_20px_#ffffff] text-left shrink-0 leading-none">
        //PROCESS: МОЙ ПРОТОКОЛ ИЗ 5 ШАГОВ
      </h2>

      <div className="w-full flex flex-col items-center pb-20">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <FlowStep title={step.title} subtitle={step.subtitle} />
            {idx < steps.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CaseSlide;