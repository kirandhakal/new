"use client";

import React, { useEffect, useState } from 'react';
import useCurrentTime from '@/lib/useCurrentTime';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onHomeClick: () => void;
}

/* IC-package monogram: an epoxy chip with pins on both sides and a pin-1 notch. */
const ChipLogo = () => (
  <span className="relative flex h-10 w-12 flex-none items-center justify-center" aria-hidden="true">
    <span className="absolute inset-y-1 left-0 flex flex-col justify-between">
      {[0, 1, 2, 3].map((i) => <span key={i} className="h-[2px] w-1.5 bg-copper" />)}
    </span>
    <span className="absolute inset-y-1 right-0 flex flex-col justify-between">
      {[0, 1, 2, 3].map((i) => <span key={i} className="h-[2px] w-1.5 bg-copper" />)}
    </span>
    <span className="relative flex h-10 w-9 items-center justify-center rounded-[4px] bg-chip font-display text-sm font-bold tracking-tight text-chip-foreground transition-transform duration-300 group-hover:scale-105">
      KD
      <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full border border-chip-foreground/50" />
    </span>
  </span>
);

const Header = ({ onHomeClick }: HeaderProps) => {
  const { currentTime } = useCurrentTime();
  const [bootedAt] = useState(() => Date.now());
  const [uptime, setUptime] = useState('00:00');

  useEffect(() => {
    const s = Math.floor((currentTime.getTime() - bootedAt) / 1000);
    setUptime(`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`);
  }, [bootedAt, currentTime]);

  const time = currentTime.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={onHomeClick} className="group flex min-w-0 items-center gap-3 text-left" aria-label="Back to top">
          <ChipLogo />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-bold uppercase tracking-wide text-foreground">Kiran Dhakal</span>
            <span className="block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Computer engineer · Full-stack</span>
          </span>
        </button>

        <div className="flex flex-none items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="hidden items-center gap-2 rounded-md border border-border px-2.5 py-1.5 md:inline-flex">
            <span className="led text-led-green" />
            SYS OK · open to work
          </span>
          <span className="hidden items-center gap-3 rounded-md border border-border px-2.5 py-1.5 sm:inline-flex" suppressHydrationWarning>
            <span>UP <span className="tabular-nums text-foreground" suppressHydrationWarning>{uptime}</span></span>
            <span className="text-border">|</span>
            <span>KTM <span className="tabular-nums text-foreground" suppressHydrationWarning>{time}</span></span>
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
