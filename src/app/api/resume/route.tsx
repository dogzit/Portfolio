import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/ResumeDocument";

// @react-pdf/renderer needs Node APIs (Buffer, streams) — force Node runtime.
export const runtime = "nodejs";

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Zolbayar-Resume.pdf"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
