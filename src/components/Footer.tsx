import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container py-6 text-sm text-neutral-600 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Kiran Dhakal</div>
        <div>
          <a href="/robots.txt" className="mr-4 hover:underline">robots</a>
          <a href="/sitemap.xml" className="hover:underline">sitemap</a>
        </div>
      </div>
    </footer>
  );
}
