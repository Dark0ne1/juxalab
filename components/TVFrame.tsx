import React from 'react';
import VhsOverlay from './VhsOverlay';

interface TVFrameProps {
  children: React.ReactNode;
  currentSlide: number;
  onChannelClick?: () => void;
}

const TVFrame: React.FC<TVFrameProps> = ({ children, currentSlide, onChannelClick }) => {
  return (
    <div className="tv-bezel">
      <main className="tv-screen text-white selection:bg-[#00f0ff] selection:text-black">
        <div className="relative z-10 w-full h-full overflow-hidden">
          {children}
        </div>
        <VhsOverlay currentSlide={currentSlide} onChannelClick={onChannelClick} />
      </main>
    </div>
  );
};

export default TVFrame;