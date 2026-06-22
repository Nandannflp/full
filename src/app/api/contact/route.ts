import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const LeadSchema = z.object({
  email: z.string().email().max(120),
  message: z.string().max(1000).optional(),
  source: z.string().max(60).optional(),
});

// In-memory rate limiting (per IP, simple): max 5 submissions / 10 min.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; first: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_HITS;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        email: parsed.data.email,
        message: parsed.data.message ?? null,
        source: parsed.data.source ?? "landing_cta",
      },
    });

    return NextResponse.json({
      ok: true,
      id: lead.id,
      message: "You're on the list! We'll be in touch within 24 hours.",
    });
  } catch (err) {
    console.error("[/api/contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.lead.count();
    return NextResponse.json({ ok: true, leads: count });
  } catch {
    return NextResponse.json({ ok: true, leads: 0 });
  }
}
