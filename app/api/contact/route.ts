import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().optional(),
  form: z.string().optional(),
  // host
  city: z.string().optional(),
  propertyType: z.string().optional(),
  sqm: z.string().optional(),
  beds: z.string().optional(),
  photos: z.string().optional(),
  // property manager
  consulting: z.string().optional(),
  goal: z.string().optional(),
  // soggiorni
  dates: z.string().optional(),
  accommodation: z.string().optional(),
  reason: z.string().optional(),
  // altri form
  phone: z.string().optional(),
  property_type: z.string().optional(),
  units: z.string().optional(),
  role: z.string().optional(),
  experience: z.string().optional(),
  goals: z.string().optional(),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  guests: z.string().optional(),
});

const SECTION_LABELS: Record<string, string> = {
  contatti: "Contatti",
  about: "About",
  soggiorni: "Soggiorni",
  "property-manager": "Property Manager",
  proprietario: "Host",
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";

  let raw: Record<string, string> = {};
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData();
    fd.forEach((value, key) => {
      if (typeof value === "string") raw[key] = value;
    });
  } else {
    raw = await req.json();
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const data = result.data;
  const section = SECTION_LABELS[data.form ?? ""] ?? "Sito";

  const rows = Object.entries(data)
    .filter(([k, v]) => k !== "form" && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;text-transform:capitalize">${k.replace(/_/g, " ")}</td><td style="padding:4px 0">${v}</td></tr>`
    )
    .join("");

  let sendError: unknown = null;
  try {
    const { error } = await resend.emails.send({
      from: "7Sundays <onboarding@resend.dev>",
      to: "7sundays.prismic@gmail.com",
      replyTo: data.email,
      subject: `[${section}] Richiesta da ${data.name} #${crypto.randomUUID().slice(0, 8)}`,
      html: `
        <h2 style="margin:0 0 16px">[${section}] Richiesta da ${data.name}</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          ${rows}
        </table>
      `,
    });
    sendError = error;
  } catch (err) {
    console.error("Resend exception:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  if (sendError) {
    console.error("Resend error:", sendError);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
