import React from 'react';
import { Home, User, Briefcase, Settings, Mail } from 'lucide-react';

const NavBar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'skills', icon: User, label: 'Skills' },
    { key: 'projects', icon: Briefcase, label: 'Projects' },
    { key: 'services', icon: Settings, label: 'Services' },
    { key: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-1">
          {navItems.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`p-3 rounded-full transition-all ${
                activeSection === key
                  ? 'bg-blue-600 text-white shadow-lg scale-110'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title={label}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;