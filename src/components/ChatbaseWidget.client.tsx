"use client";
import { useEffect } from 'react';

export default function ChatbaseWidget() {
  useEffect(() => {
    // preserve existing behavior from CRA ChatbaseWidget
    const id = 'chatbase-script';
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.id = id;
    s.async = true;
    s.src = 'https://example.com/chatbase.js';
    document.body.appendChild(s);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return null;
}
