import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Skip static assets, internal Next.js routes, and API calls
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|api/).*)",
  ],
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // request.ip and request.geo were removed in Next.js 15 — use headers instead
  const forwarded = request.headers.get("x-forwarded-for");
  const ip        = forwarded ? forwarded.split(",")[0].trim() : null;

  // Vercel injects these geo headers automatically in production
  const country = request.headers.get("x-vercel-ip-country")        ?? null;
  const city    = request.headers.get("x-vercel-ip-city")            ?? null;
  const region  = request.headers.get("x-vercel-ip-country-region")  ?? null;
  const ua      = request.headers.get("user-agent")                  ?? null;

  // Non-blocking fire-and-forget INSERT via Neon HTTP driver.
  // We never await this — analytics failure must not slow the page.
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    const sql = neon(dbUrl);
    sql`
      INSERT INTO visitor_logs (id, ip, user_agent, path, country, city, region, created_at)
      VALUES (gen_random_uuid(), ${ip}, ${ua}, ${path}, ${country}, ${city}, ${region}, now())
    `.catch(() => {
      // Swallow silently — never surface analytics errors to users
    });
  }

  return NextResponse.next();
}
