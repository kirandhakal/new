import React from 'react';

export const metadata = {
  title: 'Skills',
  description: 'Skills and technologies',
};

export default function SkillsPage() {
  return (
    <section className="container py-8">
      <h1 className="text-3xl font-semibold mb-4">Skills</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="card">React</div>
        <div className="card">TypeScript</div>
        <div className="card">Accessibility</div>
      </div>
    </section>
  );
}
