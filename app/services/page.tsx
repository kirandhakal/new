import React from 'react';

export const metadata = {
  title: 'Services',
  description: 'Services offered',
};

export default function ServicesPage() {
  return (
    <section className="container py-8">
      <h1 className="text-3xl font-semibold mb-4">Services</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">UI/UX Design</div>
        <div className="card">Frontend Engineering</div>
      </div>
    </section>
  );
}
