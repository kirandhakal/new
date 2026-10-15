"use client";

import React from 'react';
import { Home, User, Briefcase, Settings, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionKey } from '@/types/navigation';
import navigationJson from '@/data/navigation/navigation.json';

interface NavItem {
  key: SectionKey;
  icon: LucideIcon;
  label: string;
}

interface NavBarProps {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
}

const iconMap: Record<string, LucideIcon> = { Home, Settings, User, Briefcase, Mail };
const navItems: NavItem[] = navigationJson.map((item) => ({
  ...item,
  key: item.key as SectionKey,
  icon: iconMap[item.icon],
}));

const Navbar = ({ activeSection, setActiveSection }: NavBarProps) => (
  <>
    {/* Mobile: floating bottom tab bar */}
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden safe-area-pb">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl border border-border bg-card/95 p-1.5 shadow-lifted backdrop-blur-xl">
        {navItems.map(({ key, icon: Icon, label }) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSection(key)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex h-12 items-center justify-center gap-1.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'flex-[1.8] bg-accent px-3 text-accent-foreground'
                  : 'flex-1 text-muted-foreground active:bg-secondary'
              }`}
            >
              <Icon size={19} strokeWidth={2.2} />
              {isActive && <span className="text-xs font-bold">{label}</span>}
            </button>
          );
        })}
      </div>
    </nav>

    {/* Desktop: centred pill nav that sits inside the header bar */}
    <nav aria-label="Primary" className="fixed left-1/2 top-3 z-50 hidden -translate-x-1/2 lg:block lg:top-[14px]">
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/90 p-1 backdrop-blur-xl">
        {navItems.map(({ key, label }) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSection(key)}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  </>
);

export default Navbar;
