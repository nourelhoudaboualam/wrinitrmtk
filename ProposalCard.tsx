import React from 'react';
import EvasiveButton from './EvasiveButton';

interface ProposalCardProps {
  onAccept: () => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept }) => {
  return (
    <div className="kawaii-glass p-6 sm:p-12 text-center max-w-[95%] sm:max-w-xl w-full mx-auto z-10 transform transition-all relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* Decorative Emotes - Anchored to corners */}
      <div className="absolute top-4 left-4 text-4xl sm:text-6xl rotate-12 opacity-80 pointer-events-none">🍑</div>
      <div className="absolute top-4 right-4 text-4xl sm:text-6xl -rotate-12 opacity-80 pointer-events-none">🍆</div>
      <div className="absolute bottom-4 left-4 text-4xl sm:text-6xl -rotate-12 opacity-80 pointer-events-none">🍆</div>
      <div className="absolute bottom-4 right-4 text-4xl sm:text-6xl rotate-12 opacity-80 pointer-events-none">🍑</div>
      
      {/* Content Section */}
      <div className="mb-6 relative flex flex-col items-center z-10 w-full">
        <div className="text-8xl sm:text-[130px] leading-none mb-6 animate-bounce select-none drop-shadow-2xl">
            🍑
        </div>
        
        <h1 className="font-bratz text-4xl sm:text-6xl text-white mb-6 drop-shadow-[4px_4px_0px_#ff4500] leading-tight">
          Othmane, 3afak wrini tremtek
        </h1>
        
        <div className="flex gap-4 items-center justify-center">
          <p className="font-chunky text-sm sm:text-xl text-black tracking-widest uppercase bg-[#ffcc33] px-6 py-2 inline-block -rotate-2 border-2 border-black shadow-[4px_4px_0px_#000]">
            MA TZGELCH! 🍑🍆
          </p>
        </div>
      </div>

      {/* Button Playground Area */}
      <div className="w-full flex-grow flex flex-col items-center justify-center gap-10 mt-2 min-h-[350px] relative">
        {/* Yes Button - Always centered and prominent */}
        <div className="z-20">
          <button
            onClick={onAccept}
            className="bratz-button glow-hover w-full sm:w-auto px-12 py-6 bg-[#ff4500] hover:bg-[#ff8c00] text-white font-chunky rounded-full text-2xl sm:text-4xl tracking-tighter whitespace-nowrap shadow-[0_0_25px_rgba(255,69,0,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
          >
            Ok ghanwrik trmti
          </button>
        </div>

        {/* Evasive No Button Container */}
        <div className="w-full flex items-center justify-center pointer-events-none min-h-[80px]">
            <EvasiveButton />
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;