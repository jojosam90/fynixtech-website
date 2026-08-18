import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "jojosam@fynixtech.sg";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
  }

  const body = await request.json();
  const { phone } = body as { phone?: string };

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const text = `New callback request received from the website chat widget.

Phone: ${phone}

---
This email is auto-generated from website chat widget.`;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Fynix Tech Website <onboarding@resend.dev>",
    to: TO_EMAIL,
    subject: `New callback request: ${phone}`,
    text,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
