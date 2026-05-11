import { NextRequest, NextResponse } from "next/server";
import type { VisitorLog } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Protect with a secret key stored in env — set ADMIN_SECRET_KEY in Vercel dashboard
function isAuthorized(req: NextRequest): boolean {
  const key = req.headers.get("x-admin-key") ?? req.nextUrl.searchParams.get("key");
  return key === process.env.ADMIN_SECRET_KEY && !!process.env.ADMIN_SECRET_KEY;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [logs, messages] = await Promise.all([
    prisma.visitorLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const uniqueIps   = new Set(logs.map((l: VisitorLog) => l.ip).filter(Boolean)).size;
  const uniquePaths = new Set(logs.map((l: VisitorLog) => l.path)).size;
  const countryBreakdown = logs.reduce<Record<string, number>>((acc, l: VisitorLog) => {
    const c = l.country ?? "Unknown";
    acc[c] = (acc[c] ?? 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({ logs, messages, stats: { uniqueIps, uniquePaths, countryBreakdown } });
}

// Mark a message as read
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
  return NextResponse.json({ ok: true });
}
