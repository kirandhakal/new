'use client';
import React from 'react';
import NavBar from './NavBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100" role="banner">
      <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img src="/kd.png" alt="Kiran Dhakal" className="w-12 h-12 rounded-lg" />
          <div>
            <p className="font-bold text-lg text-gray-900">Kiran Dhakal</p>
            <p className="text-xs text-gray-500">Web Developer</p>
          </div>
        </a>
        <NavBar />
      </div>
    </header>
  );
}
