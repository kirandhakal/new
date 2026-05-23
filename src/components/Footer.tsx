'use client';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-20">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Kiran Dhakal</h3>
            <p className="text-gray-600 text-sm">Full-stack developer crafting exceptional digital experiences.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/services" className="hover:text-primary transition">Services</a></li>
              <li><a href="/projects" className="hover:text-primary transition">Projects</a></li>
              <li><a href="/skills" className="hover:text-primary transition">Skills</a></li>
              <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Archives</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/robots.txt" className="hover:text-primary transition">robots.txt</a></li>
              <li><a href="/sitemap.xml" className="hover:text-primary transition">sitemap.xml</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Kiran Dhakal. All rights reserved.</p>
          <p>Built with Next.js + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
