import { createAPIFileRoute } from "@tanstack/start/api";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendRsvpEmail } from "@/lib/email";

const schema = z.object({
  fullName:    z.string().trim().min(2).max(100),
  attendance:  z.enum(["accept", "decline"]),
  partnerName: z.string().trim().max(100).optional().or(z.literal("")),
  contact:     z.string().trim().min(5).max(150),
  dietary:     z.string().trim().max(300).optional().or(z.literal("")),
  song:        z.string().trim().max(150).optional().or(z.literal("")),
});

export const APIRoute = createAPIFileRoute("/api/rsvp")({
  // GET /api/rsvp — returns all responses (protected by a simple token)
  GET: async ({ request }) => {
    const token = new URL(request.url).searchParams.get("token");
    if (token !== process.env.ADMIN_TOKEN) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const rsvps = await prisma.rsvp.findMany({
      orderBy: { submittedAt: "desc" },
    });
    return new Response(JSON.stringify(rsvps), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },

  // POST /api/rsvp — submit a new RSVP
  POST: async ({ request }) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Validation failed", issues: parsed.error.issues }),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = parsed.data;

    // 1. Save to database
    const rsvp = await prisma.rsvp.create({
      data: {
        fullName:    data.fullName,
        attendance:  data.attendance,
        partnerName: data.partnerName || null,
        contact:     data.contact,
        dietary:     data.dietary     || null,
        song:        data.song        || null,
      },
    });

    // 2. Send email notification (non-blocking — don't fail the response if email errors)
    sendRsvpEmail({ ...rsvp, submittedAt: rsvp.submittedAt }).catch((err) =>
      console.error("[email] Failed to send RSVP notification:", err),
    );

    return new Response(JSON.stringify({ ok: true, id: rsvp.id }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  },
});
