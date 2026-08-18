import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "jojosam@fynixtech.sg";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
  }

  const body = await request.json();
  const { name, company, email, phone, service, message } = body as {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
  };

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const text = `New submission received from company website form.

Enquirer Details:
Name: ${name}
Company: ${company || "-"}
Email: ${email}
Phone: ${phone}
Service Interest: ${service || "-"}
Message: ${message || "-"}

---
This email is auto-generated from website form.`;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Fynix Tech Website <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `New consultation request from ${name}`,
    text,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
