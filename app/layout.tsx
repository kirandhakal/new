import './globals.css';
import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export const metadata = {
  title: 'Portfolio',
  description: 'Professional portfolio built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
