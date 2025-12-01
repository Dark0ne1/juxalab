import React, { useState } from 'react';

interface CaseData {
  id: number;
  filename: string;
  title: string;
  theme: 'cyan' | 'green' | 'magenta' | 'yellow';
  input: { label: string; value: string }[];
  log: string[];
  output: { label: string; value: string }[];
  status: string;
}

const CASES: CaseData[] = [
  {
    id: 1,
    filename: "KSENIA_MORE.SYS",
    title: "АВТОМАТИЗАЦИЯ ЗАПУСКА",
    theme: 'cyan',
    input: [
      { label: "НИША", value: "Психология" },
      { label: "ПРОБЛЕМА", value: "Хаос, низкая доходимость" },
      { label: "БЮДЖЕТ", value: "0 RUB" },
    ],
    log: [
      "Архитектура запуска (4 дня)",
      "Telegram-бот (сегментация)",
      "Кросс-канальная аналитика",
      "Retention (дожимы)"
    ],
    output: [
      { label: "РЕГИСТРАЦИЙ", value: "76 (органика)" },
      { label: "ЯВКА", value: "31.6% (x8 рост)" },
      { label: "ЭКОНОМИЯ", value: "~114 000 ₽" },
    ],
    status: "SUCCESS // DEPLOYED"
  },
  {
    id: 2,
    filename: "LOCAL_GYM.SYS",
    title: "БИЗНЕС-МОДЕЛЬ ЗАЛА",
    theme: 'green',
    input: [
      { label: "НИША", value: "Фитнес" },
      { label: "ПРОБЛЕМА", value: "Конкуренция, старое обор." },
      { label: "БЮДЖЕТ", value: "Минимум (выживание)" },
    ],
    log: [
      "Аудит и отбраковка гипотез",
      "Геотаргетинг VK (1-2 км)",
      "Воронка: Free + Скидка",
      "Фокус: Студенты/Соседи"
    ],
    output: [
      { label: "ROMI", value: "400% (1 к 5)" },
      { label: "LIFETIME", value: "6 лет автономно" },
      { label: "ИТОГ", value: "Прибыль (до COVID)" },
    ],
    status: "SUCCESS // DEPLOYED"
  },
  {
    id: 3,
    filename: "WEEKEND_TOURS.SYS",
    title: "МАСШТАБИРОВАНИЕ EVENT-БИЗНЕСА",
    theme: 'magenta',
    input: [
      { label: "НИША", value: "Туры выходного дня" },
      { label: "ПРОБЛЕМА", value: "Хобби-формат, хаос" },
      { label: "БЮДЖЕТ", value: "Минимальный" },
    ],
    log: [
      "Система «Конвейер туристов»",
      "Таргет VK -> База (Актив)",
      "Конверсия через доверие",
      "Offline-апселл в туре"
    ],
    output: [
      { label: "ЗАГРУЗКА", value: "x5.3 (до 96 чел)" },
      { label: "ПОТОК", value: "Управляемый" },
      { label: "ТРАНСФОРМАЦИЯ", value: "Системный бизнес" },
    ],
    status: "SUCCESS // DEPLOYED"
  },
  {
    id: 4,
    filename: "EDTECH_STARTUP.SYS",
    title: "ПЕРЕСБОРКА ОНЛАЙН-ШКОЛЫ",
    theme: 'yellow',
    input: [
      { label: "НИША", value: "EdTech" },
      { label: "ПРОБЛЕМА", value: "Хаос, нет доверия" },
      { label: "БЮДЖЕТ", value: "30к на тесты" },
    ],
    log: [
      "Ре-дизайн сайта (UX/UI)",
      "Трафик VK (вместо Директа)",
      "Сквозной аудит продаж",
      "Создание базы доверия"
    ],
    output: [
      { label: "ОРГАНИКА", value: "Стабильный поток" },
      { label: "CPA", value: "1700₽ (vs 4800₽)" },
      { label: "КОНВЕРСИЯ", value: "Рост (архитектура)" },
    ],
    status: "SUCCESS // DEPLOYED"
  }
];

const THEMES = {
  cyan: {
    border: 'border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    title: 'text-white',
    header: 'bg-gradient-to-r from-[#000080] to-[#00f0ff]/40',
    marker: 'text-[#00f0ff]',
    button: 'bg-[#00f0ff]'
  },
  green: {
    border: 'border-[#00ff00]',
    text: 'text-[#00ff00]',
    title: 'text-white',
    header: 'bg-gradient-to-r from-[#004d00] to-[#00ff00]/40',
    marker: 'text-[#00ff00]',
    button: 'bg-[#00ff00]'
  },
  magenta: {
    border: 'border-[#ff00ff]',
    text: 'text-[#ff00ff]',
    title: 'text-white',
    header: 'bg-gradient-to-r from-[#4d004d] to-[#ff00ff]/40',
    marker: 'text-[#ff00ff]',
    button: 'bg-[#ff00ff]'
  },
  yellow: {
    border: 'border-[#ffff00]',
    text: 'text-[#ffff00]',
    title: 'text-white',
    header: 'bg-gradient-to-r from-[#4d4d00] to-[#ffff00]/40',
    marker: 'text-[#ffff00]',
    button: 'bg-[#ffff00]'
  }
};

const WindowControls: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex gap-1">
    <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-300 border-t border-l border-white border-b border-r border-gray-800 flex items-center justify-center cursor-default">
      <span className="text-black text-[10px] leading-none mb-1">_</span>
    </div>
    <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-300 border-t border-l border-white border-b border-r border-gray-800 flex items-center justify-center cursor-default">
      <div className="w-2 h-2 border border-black"></div>
    </div>
    {/* Close Button - The Easter Egg Trigger */}
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="w-3 h-3 md:w-4 md:h-4 bg-gray-300 border-t border-l border-white border-b border-r border-gray-800 flex items-center justify-center cursor-default active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white"
    >
      <span className="text-black text-[10px] leading-none">×</span>
    </div>
  </div>
);

const CaseWindow: React.FC<{ data: CaseData; onClose: () => void }> = ({ data, onClose }) => {
  const theme = THEMES[data.theme];

  return (
    <div className={`
      relative flex flex-col w-full h-full
      bg-[#050505] border border-gray-500 
      shadow-[4px_4px_0_rgba(0,0,0,0.5)]
      overflow-hidden
      min-h-[280px]
    `}>
      {/* Header */}
      <div className={`${theme.header} px-2 py-1 flex justify-between items-center border-b border-gray-600 select-none shrink-0`}>
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 bg-white/50 shrink-0"></div>
          <span className="font-vt text-white text-sm md:text-base tracking-wider truncate">{data.filename}</span>
        </div>
        <WindowControls onClose={onClose} />
      </div>

      {/* Content */}
      <div className="p-2 md:p-3 font-vt flex flex-col h-full overflow-y-auto text-sm md:text-sm leading-tight">
        
        {/* Title */}
        <div className={`font-bold ${theme.title} text-base md:text-lg border-b ${theme.border} pb-1 mb-2 tracking-wide uppercase`}>
          {data.title}
        </div>

        {/* Input Data */}
        <div className="mb-2">
          <div className={`text-xs text-gray-500 mb-0.5`}>// INPUT_DATA</div>
          {data.input.map((item, i) => (
            <div key={i} className="flex gap-2 text-gray-300">
              <span className="opacity-60 min-w-[60px] uppercase">{item.label}:</span>
              <span className="truncate">{item.value}</span>
            </div>
          ))}
        </div>

        {/* System Log */}
        <div className="mb-2 flex-grow">
          <div className={`text-xs text-gray-500 mb-0.5`}>// SYSTEM_LOG</div>
          <ul className="list-none pl-0 text-gray-300 space-y-0.5">
            {data.log.map((line, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className={theme.marker}>{'>'}</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Output Data (Highlighted) */}
        <div className={`mt-auto pt-2 border-t border-gray-800`}>
           <div className={`text-xs text-gray-500 mb-0.5`}>// OUTPUT_DATA</div>
           <div className="grid grid-cols-1 gap-0.5">
             {data.output.map((item, i) => (
               <div key={i} className="flex justify-between items-baseline">
                 <span className="text-gray-400 uppercase text-xs">{item.label}</span>
                 <span className={`${theme.text} font-bold text-right`}>{item.value}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 flex justify-between shrink-0 font-mono border-t border-gray-700">
        <span>MEM: OK</span>
        <span className={`${theme.text} brightness-110`}>{data.status}</span>
      </div>
    </div>
  );
};

const RickrollOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative border-4 border-[#ff00ff] bg-black p-2 shadow-[0_0_50px_#ff00ff] animate-[pulse_0.5s_ease-in-out_3]">
        {/* Header как в Windows */}
        <div className="bg-[#ff00ff] text-black font-bold font-vt text-base md:text-xl px-2 py-1 mb-2 flex justify-between items-center select-none">
          <span>SYSTEM_ERROR: TROLLED.EXE</span>
          <button 
            onClick={onClose}
            className="hover:bg-black hover:text-[#ff00ff] px-1 transition-colors"
          >
            [X]
          </button>
        </div>
        
        {/* Rick Astley GIF */}
        <img 
          src="https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif" 
          alt="Never Gonna Give You Up" 
          className="w-full max-w-[500px] h-auto block border-2 border-[#ff00ff]"
        />
        
        {/* Message */}
        <div className="text-[#ff00ff] font-vt text-xl md:text-3xl text-center mt-4 uppercase animate-pulse">
          <p>&gt; NEVER GONNA GIVE YOU UP</p>
          <p className="text-sm md:text-base mt-2 text-cyan-400">
            // Click anywhere to close
          </p>
        </div>
      </div>
    </div>
  );
};

const StatsSlide: React.FC = () => {
  const [rickrolled, setRickrolled] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-start justify-center max-w-7xl mx-auto relative">
      
      {/* Rickroll Easter Egg */}
      {rickrolled && <RickrollOverlay onClose={() => setRickrolled(false)} />}
      
      <h2 className="font-grotesk text-6xl md:text-8xl font-bold mb-8 text-white drop-shadow-[0_0_20px_#ffffff] w-full text-left">
        //CASES
      </h2>
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
        {CASES.map((caseData) => (
          <CaseWindow 
  key={caseData.id} 
  data={caseData} 
  onClose={() => {
    if (caseData.id === 1) {
      setRickrolled(true);
    } else {
      console.log('Window closed'); 
    }
  }} 
/>
        ))}
      </div>
    </div>
  );
};

export default StatsSlide;