"use client";
import React from 'react';
import NavBar from './NavBar';

export default function Header() {
  return (
    <header className="border-b" role="banner">
      <div className="container flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/kd.png" alt="logo" className="w-10 h-10 rounded" />
          <span className="text-lg font-semibold">Kiran Dhakal</span>
        </a>
        <NavBar />
      </div>
    </header>
  );
}
