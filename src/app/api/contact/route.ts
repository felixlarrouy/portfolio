import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

type Payload = {
  name: string;
  email: string;
  message: string;
  // Honeypot (bots fill it, humans don't)
  company?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();
    const company = (body.company ?? "").trim();

    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: "Payload too large" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: getEnv("SMTP_HOST"),
      port: Number(getEnv("SMTP_PORT")),
      secure: getEnv("SMTP_SECURE") === "true",
      auth: {
        user: getEnv("SMTP_USER"),
        pass: getEnv("SMTP_PASS"),
      },
    });

    const to = getEnv("CONTACT_TO");
    const from = getEnv("CONTACT_FROM");

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject: `Nouveau message portfolio — ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}

