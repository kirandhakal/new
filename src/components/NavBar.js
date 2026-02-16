import React from 'react';
import { Home, User, Briefcase, Settings, Mail } from 'lucide-react';

const NavBar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'services', icon: Settings, label: 'Services' },
    { key: 'skills', icon: User, label: 'Skills' },
    { key: 'projects', icon: Briefcase, label: 'Projects' },

    { key: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <>
      {/* Mobile: bottom nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-pb">
        <div className="relative mx-3 mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-2xl blur-xl animate-pulse-slow"></div>
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-orange-100/50 px-2 py-2">
            <div className="flex justify-around items-center gap-1">
              {navItems.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`relative flex flex-col items-center gap-0.5 p-2.5 rounded-xl min-w-[52px] transition-all duration-300 ${
                    activeSection === key
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                      : 'text-gray-600 active:bg-orange-50'
                  }`}
                  title={label}
                  aria-label={label}
                >
                  <Icon size={22} strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold">{label}</span>
                  {activeSection === key && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop: right side nav */}
      <nav className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-full shadow-2xl border-2 border-orange-100/50 p-3 animate-float-subtle">
            <div className="flex flex-col gap-2">
              {navItems.map(({ key, icon: Icon, label }, index) => (
                <div key={key} className="relative group">
                  <div className={`absolute -left-5 top-1/2 -translate-y-1/2 transition-all duration-500 ${
                    activeSection === key ? 'w-3 h-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full opacity-100' : 'w-0 h-0 opacity-0'
                  }`}></div>
                  <button
                    onClick={() => setActiveSection(key)}
                    className={`relative p-3.5 rounded-full transition-all duration-500 transform ${
                      activeSection === key
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg scale-110 rotate-0'
                        : 'bg-white/50 text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-rose-100 hover:scale-110 hover:text-orange-600 hover:rotate-12'
                    }`}
                    title={label}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon size={20} strokeWidth={2.5} />
                    {activeSection === key && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 animate-ping opacity-75"></div>
                    )}
                  </button>
                  <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl whitespace-nowrap shadow-xl transition-all duration-300 ${
                    activeSection === key ? 'opacity-0 translate-x-2 pointer-events-none' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none'
                  }`}>
                    {label}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
                  </div>
                  {index < navItems.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className={`w-1 h-1 rounded-full transition-all duration-500 ${
                        activeSection === navItems[index].key || activeSection === navItems[index + 1].key
                          ? 'bg-gradient-to-b from-orange-400 to-rose-400 opacity-100'
                          : 'bg-gray-300 opacity-40'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400 rounded-full animate-float-particle-1 opacity-60"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-rose-400 rounded-full animate-float-particle-2 opacity-60"></div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float-particle-1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(4px, -4px); }
          50% { transform: translate(0, -8px); }
          75% { transform: translate(-4px, -4px); }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-4px, 4px); }
          50% { transform: translate(0, 8px); }
          75% { transform: translate(4px, 4px); }
        }
        .animate-float-subtle {
          animation: float-subtle 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-float-particle-1 {
          animation: float-particle-1 6s ease-in-out infinite;
        }
        .animate-float-particle-2 {
          animation: float-particle-2 7s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default NavBar;