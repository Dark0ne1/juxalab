import React from 'react';

const StackItem: React.FC<{ text: string; delay: string }> = ({ text, delay }) => (
  <span
    className="inline-block mx-2 my-2 md:mx-4 text-lg md:text-2xl text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-[pulse_3s_infinite]"
    style={{ animationDelay: delay }}
  >
    {text}
  </span>
);

const StackSlide: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h2 className="font-grotesk text-6xl md:text-8xl font-bold mb-12 text-white drop-shadow-[0_0_20px_#ffffff] text-left uppercase tracking-widest">
        //STACK
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-start md:items-baseline gap-8 md:gap-12">
        {/* МАРКЕТИНГ&СТРАТЕГИЯ */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="font-bold text-[#00f0ff] text-xl md:text-3xl mb-6 mt-1 text-center drop-shadow-[0_2px_8px_#00fff2] uppercase tracking-wider">
            МАРКЕТИНГ & СТРАТЕГИЯ
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <StackItem text="Анализ аудитории" delay="0s" />
            <StackItem text="Позиционирование" delay="0.1s" />
            <StackItem text="Воронки" delay="0.2s" />
            <StackItem text="Контент-стратегия" delay="0.3s" />
            <StackItem text="VK Реклама" delay="0.4s" />
            <StackItem text="Telegram Ads" delay="0.5s" />
            <StackItem text="Яндекс Директ" delay="0.6s" />
            <StackItem text="A/B-тесты" delay="0.7s" />
            <StackItem text="CustDev" delay="0.8s" />
          </div>
        </div>
        {/* РАЗРАБОТКА & АВТОМАТИЗАЦИЯ */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="font-bold text-[#00f0ff] text-xl md:text-3xl mb-6 mt-1 text-center drop-shadow-[0_2px_8px_#00fff2] uppercase tracking-wider">
            РАЗРАБОТКА & АВТОМАТИЗАЦИЯ
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <StackItem text="PYTHON" delay="0s" />
            <StackItem text="AIOGRAM" delay="0.1s" />
            <StackItem text="FASTAPI" delay="0.2s" />
            <StackItem text="SQL" delay="0.3s" />
            <StackItem text="React" delay="0.4s" />
            <StackItem text="Tailwind" delay="0.5s" />
            <StackItem text="Telegram API" delay="0.6s" />
            <StackItem text="Notion" delay="0.7s" />
            <StackItem text="CRM-интеграции" delay="0.8s" />
          </div>
        </div>
        {/* АНАЛИТИКА & ОПТИМИЗАЦИЯ */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="font-bold text-[#00f0ff] text-xl md:text-3xl mb-6 mt-1 text-center drop-shadow-[0_2px_8px_#00fff2] uppercase tracking-wider">
            АНАЛИТИКА & ОПТИМИЗАЦИЯ
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <StackItem text="Google Analytics" delay="0s" />
            <StackItem text="Яндекс метрика" delay="0.1s" />
            <StackItem text="SQL dashboards" delay="0.2s" />
            <StackItem text="Когортный анализ" delay="0.3s" />
            <StackItem text="CPL-оптимизация" delay="0.4s" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackSlide;
