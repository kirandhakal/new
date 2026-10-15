"use client";

import React from 'react';
import useCurrentTime from '@/lib/useCurrentTime';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  const { currentTime } = useCurrentTime();
  const kathmanduTime = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kathmandu',
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[72px] lg:px-8">
        <button
          type="button"
          onClick={onHomeClick}
          className="group flex min-w-0 items-center gap-3 text-left"
          aria-label="Go to home"
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent font-display text-base font-extrabold tracking-tight text-accent-foreground transition-transform duration-300 group-hover:-rotate-6">
            KD
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-bold text-foreground sm:text-lg">Kiran Dhakal</span>
            <span className="block truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Full-stack developer</span>
          </span>
        </button>

        <div className="flex flex-none items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 lg:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to work
          </span>
          <span className="text-right leading-tight">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">KTM</span>
            <span className="tabular-nums text-foreground" suppressHydrationWarning>{kathmanduTime}</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
