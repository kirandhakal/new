"use client";

import React from 'react';
import useCurrentTime from '@/lib/useCurrentTime';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  const { currentTime } = useCurrentTime();
  const opts = { timeZone: 'Asia/Kathmandu', hour12: false } as const;
  const time = currentTime.toLocaleTimeString('en-GB', { ...opts, hour: '2-digit', minute: '2-digit' });
  const hour = Number(currentTime.toLocaleString('en-GB', { ...opts, hour: '2-digit' }));
  const isNight = hour < 6 || hour >= 18;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={onHomeClick} className="group flex min-w-0 items-center gap-3 text-left" aria-label="Back to base camp">
          {/* Mountain monogram */}
          <span className="relative flex h-10 w-10 flex-none items-end justify-center overflow-hidden rounded-xl bg-secondary">
            <svg viewBox="0 0 40 40" className="h-10 w-10 transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true">
              <path d="M2 36 L15 16 L21 24 L27 12 L38 36 Z" fill="hsl(var(--foreground))" />
              <path d="M27 12 L23.5 19 L26 18 L28 20 L30.5 17.5 Z" fill="hsl(var(--background))" />
              <path d="M27 12 V5" stroke="hsl(var(--accent))" strokeWidth="1.4" />
              <path d="M27 5 h6 l-1.6 2 l1.6 2 h-6 Z" fill="hsl(var(--accent))" />
            </svg>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-bold tracking-tight text-foreground">Kiran Dhakal</span>
            <span className="block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Full-stack · Kathmandu</span>
          </span>
        </button>

        <div className="flex flex-none items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 sm:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flag-green opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flag-green" />
            </span>
            Open for new climbs
          </span>
          <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5" suppressHydrationWarning>
            <span aria-hidden="true">{isNight ? '☾' : '☀'}</span>
            <span className="tabular-nums text-foreground" suppressHydrationWarning>KTM {time}</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
