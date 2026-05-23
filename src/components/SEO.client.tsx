"use client";
import React from 'react';

export default function SEO({ jsonLd }: { jsonLd: Record<string, any> | null }) {
  if (!jsonLd) return null;
  return (
    <script key="ldjson" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
