import { NextResponse } from "next/server";
import { parseSubmissionRecord, seedSubmissions } from "@/lib/memory-questions";

const CONTACT_API_URL = process.env.CONTACT_API_URL
  || process.env.NEXT_PUBLIC_CONTACT_API_URL
  || "https://contact.kirandhakal.me";
const CONTACT_FORM_KEY = process.env.NEXT_PUBLIC_CONTACT_FORM_KEY
  || "frm__09awUKy6LNQDgXB1DmLVBpE";
const CONTACT_ADMIN_API_KEY = process.env.CONTACT_ADMIN_API_KEY;

export async function GET() {
  const seed = seedSubmissions();
  if (!CONTACT_ADMIN_API_KEY) {
    return NextResponse.json({ submissions: seed, source: "seed" as const });
  }

  try {
    const response = await fetch(
      `${CONTACT_API_URL.replace(/\/$/, "")}/v1/admin/forms/${encodeURIComponent(CONTACT_FORM_KEY)}/submissions?limit=200`,
      {
        headers: { Authorization: `Bearer ${CONTACT_ADMIN_API_KEY}` },
        next: { revalidate: 30 },
      },
    );
    if (!response.ok) {
      return NextResponse.json({ submissions: seed, source: "seed" as const });
    }

    const body = (await response.json()) as unknown;
    const rows = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { items?: unknown[] }).items)
        ? (body as { items: unknown[] }).items
        : [];

    const fromApi = rows
      .map((row, index) => parseSubmissionRecord(row as Record<string, unknown>, index))
      .filter((item): item is NonNullable<typeof item> => item !== null);

    const merged = [...fromApi];
    for (const item of seed) {
      if (!merged.some((entry) => entry.id === item.id)) merged.push(item);
    }

    return NextResponse.json({ submissions: merged, source: "live" as const });
  } catch {
    return NextResponse.json({ submissions: seed, source: "seed" as const });
  }
}
