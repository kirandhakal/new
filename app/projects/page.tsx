import React from 'react';

export const metadata = {
  title: 'Projects',
  description: 'Selected projects and case studies',
};

export default function ProjectsPage() {
  return (
    <section className="container py-8">
      <h1 className="text-3xl font-semibold mb-4">Projects</h1>
      <p className="text-neutral-700 mb-6">Selected work demonstrating approach and impact.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">Project A — description</div>
        <div className="card">Project B — description</div>
      </div>
    </section>
  );
}
