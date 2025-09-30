// app/api/contact/route.js
import { NextResponse } from "next/server";

/**
 * Simple server handler for contact submissions.
 * - Validates required fields
 * - Logs submission to server console
 * - Optional: send email via SendGrid if SENDGRID_API_KEY set
 *
 * Save as: app/api/contact/route.js
 *
 * If you want SendGrid: npm i @sendgrid/mail and set SENDGRID_API_KEY in env.
 */

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, phone, service, budget, deadline, urgency, file } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    // basic server-side email format check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    // log
    console.log("=== New Contact Submission ===");
    console.log({ name, email, phone, service, budget, deadline, urgency, message });
    if (file) {
      console.log("Attachment:", { name: file.name, size: file.size, type: file.type });
      // file.base64 is available if client included it
      // NOTE: storing base64 in logs is heavy — avoid in production
    }

    // Optional: send email via SendGrid (uncomment after installing @sendgrid/mail and setting SENDGRID_API_KEY)
    /*
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: "hello@visionads.com",
        from: "no-reply@visionads.com",
        subject: `New enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nBudget: ${budget}\nDeadline: ${deadline}\n\nMessage:\n${message}`,
      };
      await sgMail.send(msg);
    }
    */

    return NextResponse.json({ ok: true, message: "Thanks! Your request has been received. We'll reply within 24 hours." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
// this is a comment