export function buildMetadata({ title, description, url, image }: { title: string; description?: string; url?: string; image?: string }) {
  const meta = {
    title,
    description: description || '',
    openGraph: {
      title,
      description: description || '',
      url: url || undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
  return meta;
}
