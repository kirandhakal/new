import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';

const Header = () => {
  const { currentTime, formatDate } = useCurrentTime();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-40 px-3 sm:px-4 py-2 sm:py-3 pt-[env(safe-area-inset-top)]">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-2 min-h-[56px] sm:min-h-0">
        <div className="flex items-center gap-2 sm:space-x-3 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            <img className="w-6 h-5 sm:w-10 sm:h-8" src="/kd.png" alt="Kiran Dhakal" />
          </div>
          <span className="font-bold text-gray-800 text-lg sm:text-2xl md:text-3xl truncate">Kiran Dhakal</span>
        </div>
        <div className="flex-shrink-0 text-gray-800 text-xs sm:text-base md:text-lg tabular-nums">
          <div className="hidden sm:block">{formatDate(currentTime)}</div>
          <div>{currentTime.toLocaleTimeString('en-US', { hour12: false })}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;