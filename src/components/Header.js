import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';

const Header = () => {
  const { currentTime, formatDate } = useCurrentTime();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-40 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              <img className ="w-10 h-8"src='/kd.png' alt='kiran-logo'></img>
            </span>
          </div>
          <span className="font-bold text-gray-800 text-3xl">Kiran Dhakal</span>
        </div>
        <div className="text-lg text-gray-800">
          <div>{formatDate(currentTime)}</div>
          <div className="text-center">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;