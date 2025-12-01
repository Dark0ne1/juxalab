import React, { useState, useEffect, useCallback, useRef } from 'react';
import FullScreenWipe from './WipeTransition';
import TVFrame from './TVFrame';
import RebootScreen from './RebootScreen';

// Slides
import IntroSlide from './slides/IntroSlide';
import StatsSlide from './slides/StatsSlide';
import CaseSlide from './slides/CaseSlide';
import ManifestoSlide from './slides/ManifestoSlide';
import StackSlide from './slides/StackSlide';
import ContactSlide from './slides/ContactSlide';

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [cyberpunkMode, setCyberpunkMode] = useState(false);
  const [wipeTrigger, setWipeTrigger] = useState(0); // Increment to trigger wipe
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next');
  const pendingIndex = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Touch handling
  const touchStartY = useRef<number | null>(null);
  const touchStartTarget = useRef<EventTarget | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || isRebooting) return;
    
    // Determine direction
    const newDirection = index < currentIndex ? 'prev' : 'next';
    setTransitionDirection(newDirection);

    // Infinite loop logic
    let targetIndex = index;
    if (targetIndex < 0) {
      targetIndex = SLIDES.length - 1;
    } else if (targetIndex >= SLIDES.length) {
      targetIndex = 0;
    }

    if (targetIndex === currentIndex) return;

    setIsTransitioning(true);
    pendingIndex.current = targetIndex;
    setWipeTrigger(prev => prev + 1);
  }, [currentIndex, isTransitioning, isRebooting]);

  const handleReboot = useCallback(() => {
    if (isRebooting || isTransitioning) return;
    
    setIsRebooting(true);
    
    // After animation completes, reset to start
    setTimeout(() => {
      setCurrentIndex(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      setIsRebooting(false);
      setCyberpunkMode(false); // Reset mode on reboot
    }, 4000); // 4 seconds for full reboot sequence
  }, [isRebooting, isTransitioning]);

  const enableCyberpunkMode = useCallback(() => {
    // Flash effect or sound could go here
    setCyberpunkMode(true);
  }, []);

  // Helper: Check if a child element consumes the scroll event
  const isChildScrollable = useCallback((target: EventTarget | null, deltaY: number) => {
    if (!target || !(target instanceof Element)) return false;
    
    let el = target as HTMLElement;
    const container = scrollContainerRef.current;

    while (el && el !== container && el !== document.body) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const isScrollContainer = (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight;

      if (isScrollContainer) {
        // Delta > 0: Scrolling Down (Moving content UP)
        if (deltaY > 0) {
           // Can scroll down more?
           if (el.scrollHeight - el.scrollTop - el.clientHeight > 1) return true;
        } 
        // Delta < 0: Scrolling Up (Moving content DOWN)
        else {
           // Can scroll up more?
           if (el.scrollTop > 0) return true;
        }
      }
      
      if (el.parentElement) el = el.parentElement;
      else break;
    }
    return false;
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioning || isRebooting) return;

    // 1. Check if inner content handles scroll
    if (isChildScrollable(e.target, e.deltaY)) return;

    // 2. Check main container scroll
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrollable = scrollHeight > clientHeight;

      if (isScrollable) {
        // Scrolling Down
        if (e.deltaY > 0) {
          if (scrollTop + clientHeight < scrollHeight - 5) return;
        } 
        // Scrolling Up
        else if (e.deltaY < 0) {
          if (scrollTop > 5) return;
        }
      }
    }

    // 3. Trigger Slide Change
    if (Math.abs(e.deltaY) > 30) {
      if (e.deltaY > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  }, [currentIndex, isTransitioning, isRebooting, goToSlide, isChildScrollable]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioning || isRebooting) return;
    
    // Check if input focused in Manifesto slide
    const activeElement = document.activeElement;
    if (activeElement && activeElement.tagName === 'INPUT') {
      return; // Don't navigate if typing
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, isTransitioning, isRebooting, goToSlide]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false }); 
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  useEffect(() => {
    // Проверяем, есть ли метрика в window
    if ((window as any).ym) {
      // Формируем "виртуальный" URL, чтобы в отчетах было понятно:
      // juxalab.ru/#slide-1, juxalab.ru/#slide-2 и т.д.
      const virtualUrl = `${window.location.protocol}//${window.location.hostname}/#slide-${currentIndex + 1}`;
      
      // Отправляем хит
      (window as any).ym(105501082, 'hit', virtualUrl, {
          title: `Slide ${currentIndex + 1}` // Можно добавить название слайда
      });
    }
  }, [currentIndex]); // Срабатывает каждый раз, когда меняется слайд

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTarget.current = e.target;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isTransitioning || isRebooting) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY; // > 0 = Swipe Up (Scroll Down)
    
    touchStartY.current = null;
    const target = touchStartTarget.current;
    touchStartTarget.current = null;

    if (Math.abs(deltaY) < 50) return; // Ignore small swipes

    // 1. Check if inner content handles scroll
    if (isChildScrollable(target, deltaY)) return;

    // 2. Check main container scroll
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
       const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
       const isScrollable = scrollHeight > clientHeight;
       
       if (deltaY > 0) {
           // Scrolling down. If we have room, don't change slide.
           if (isScrollable && (scrollHeight - scrollTop - clientHeight > 10)) return;
           goToSlide(currentIndex + 1);
       } else {
           // Scrolling up. If we have room, don't change slide.
           if (isScrollable && scrollTop > 10) return;
           goToSlide(currentIndex - 1);
       }
    } else {
       // Fallback
       if (deltaY > 0) goToSlide(currentIndex + 1);
       else goToSlide(currentIndex - 1);
    }
  };

  const handleWipeMiddle = () => {
    // This is called when the screen is fully covered (and distorted)
    setCurrentIndex(pendingIndex.current);
    // Reset scroll position
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  };

  const handleWipeEnd = () => {
    setIsTransitioning(false);
  };

  // Define slides array with props injection
  const SLIDES = [
    <IntroSlide />,
    <StatsSlide />,
    <CaseSlide />,
    <ManifestoSlide onWakeUp={enableCyberpunkMode} />,
    <StackSlide />,
    <ContactSlide />,
  ];

  return (
    <TVFrame currentSlide={currentIndex} onChannelClick={handleReboot}>
      {isRebooting && <RebootScreen />}
      
      {/* Cyberpunk Mode Styles Override */}
      {cyberpunkMode && (
        <style>{`
          /* Cyberpunk Yellow Theme Overrides */
          :root {
            --cp-yellow: #fcee0a;
            --cp-red: #ff003c;
            --cp-black: #000000;
          }
          /* Override all Cyan text/borders/shadows to Yellow */
          .text-\\[\\#00f0ff\\] { color: var(--cp-yellow) !important; text-shadow: 0 0 10px var(--cp-yellow), 0 0 20px var(--cp-yellow) !important; }
          .border-\\[\\#00f0ff\\] { border-color: var(--cp-yellow) !important; box-shadow: 0 0 15px var(--cp-yellow) !important; }
          .bg-\\[\\#00f0ff\\] { background-color: var(--cp-yellow) !important; }
          .shadow-\\[0_0_40px_rgba\\(0\\,240\\,255\\,0\\.2\\)\\,\\[inset_0_0_40px_rgba\\(0\\,0\\,0\\,0\\.6\\)\\]] {
             box-shadow: 0 0 40px rgba(252, 238, 10, 0.3), inset 0 0 40px rgba(0,0,0,0.6) !important;
          }

          /* Override Magenta to Red (Samurai Red) */
          .text-\\[\\#ff00ff\\] { color: var(--cp-red) !important; text-shadow: 0 0 10px var(--cp-red) !important; }
          .border-\\[\\#ff00ff\\] { border-color: var(--cp-red) !important; }
          
          /* Change intro button hover */
          .md\\:group-hover\\:text-black { color: var(--cp-black) !important; }
          
          /* Force Intro Button Highlight */
          .intro-slide-cta .absolute { width: 100% !important; }
          .intro-slide-cta span { color: var(--cp-black) !important; }

          /* Selection color */
          ::selection { background-color: var(--cp-red) !important; color: var(--cp-yellow) !important; }

          /* Window headers in Manifesto/Stats (Blue -> Dark Red) */
          .bg-\\[\\#0000AA\\], .from-\\[\\#000080\\] { background-color: #3d0000 !important; background-image: none !important; }
          
          /* General Glows */
          .drop-shadow-\\[0_0_15px_rgba\\(0\\,240\\,255\\,0\\.6\\)\\] { filter: drop-shadow(0 0 15px rgba(252, 238, 10, 0.8)) !important; }
          
          /* CRT Scanline tint change */
          .tv-screen::before {
             background: rgba(252, 238, 10, 0.05) !important;
             pointer-events: none;
             content: "";
             position: absolute;
             inset: 0;
             z-index: 50;
             mix-blend-mode: overlay;
          }
        `}</style>
      )}

      {/* Slide Content Wrapper with Distortion Effect */}
      <div 
        className={`slide-container ${isTransitioning ? 'distorting' : ''} w-full h-full`}
        key={wipeTrigger} 
      >
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar min-h-0"
          style={{ scrollBehavior: 'smooth', touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 
             Mobile Padding Logic:
             pt-28 (112px) clears the top overlay elements (CH-03, REC, PLAY timestamp).
             pb-24 (96px) clears the bottom navigation buttons.
          */}
          <div className="min-h-full w-full flex flex-col px-4 pt-28 pb-24 md:p-12">
              <div className="m-auto w-full flex justify-center">
                {SLIDES[currentIndex]}
              </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots - Hidden during reboot */}
      {!isRebooting && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`
                w-3 h-3 transition-all duration-300 border border-[#00f0ff]
                ${idx === currentIndex ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] scale-125' : 'bg-transparent opacity-50 hover:opacity-100'}
              `}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Nav Overlay (Bottom) - Hidden during reboot */}
      {!isRebooting && (
        <div className="absolute bottom-12 left-0 w-full flex justify-center gap-8 z-50 md:hidden pointer-events-none">
            <button 
              onClick={() => goToSlide(currentIndex - 1)}
              className="pointer-events-auto text-[#00f0ff] font-vt text-xl border border-[#00f0ff] px-4 py-1 bg-black/80 backdrop-blur-sm active:bg-[#00f0ff] active:text-black transition-colors"
            >
              PREV
            </button>
            <span className="font-vt text-white text-xl pt-1 drop-shadow-[0_0_2px_black]">{currentIndex + 1} / {SLIDES.length}</span>
            <button 
              onClick={() => goToSlide(currentIndex + 1)}
              className="pointer-events-auto text-[#00f0ff] font-vt text-xl border border-[#00f0ff] px-4 py-1 bg-black/80 backdrop-blur-sm active:bg-[#00f0ff] active:text-black transition-colors"
            >
              NEXT
            </button>
        </div>
      )}

      {/* OS Kernel Footer */}
      {!isRebooting && (
        <div className="absolute bottom-4 left-0 w-full flex justify-center z-30 pointer-events-none">
          <span className="font-vt text-[#00f0ff] opacity-40 text-xs md:text-sm tracking-[0.2em] drop-shadow-[0_0_2px_rgba(0,240,255,0.5)]">
            RUNNING ON JUXA OS KERNEL. BUILD 2025.
          </span>
        </div>
      )}

      <FullScreenWipe 
        trigger={wipeTrigger}
        direction={transitionDirection} 
        onMiddle={handleWipeMiddle} 
        onEnd={handleWipeEnd} 
      />
    </TVFrame>
  );
};

export default Home;
