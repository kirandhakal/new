import React from 'react';

export const metadata = {
  title: 'Contact',
  description: 'Contact information and form',
};

export default function ContactPage() {
  return (
    <section className="container py-8">
      <h1 className="text-3xl font-semibold mb-4">Contact</h1>
      <div className="card">
        <p className="mb-4">Feel free to reach out via email or PDF resume in the public folder.</p>
        <a className="inline-block px-4 py-2 bg-primary text-white rounded" href="/Kiran%20Dhakal%20-%20Web%20Developer.pdf">Download Resume</a>
      </div>
    </section>
  );
}
