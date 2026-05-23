"use client";
import React from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-4">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-neutral-800 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
