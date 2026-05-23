import './globals.css';
import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import ChatbaseWidget from '../src/components/ChatbaseWidget.client';

export const metadata = {
  title: 'Kiran Dhakal — Full-Stack Developer & Designer',
  description: 'Crafting exceptional digital experiences. Web development, UI/UX design, and modern solutions.',
  ogImage: '/kd.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatbaseWidget />
      </body>
    </html>
  );
}
