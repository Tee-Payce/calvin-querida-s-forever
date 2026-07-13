import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please share your full name").max(100),
  attendance: z.enum(["accept", "decline"]),
  partnerName: z.string().trim().max(100).optional().or(z.literal("")),
  contact: z.string().trim().min(5, "Email or phone required").max(150),
  dietary: z.string().trim().max(300).optional().or(z.literal("")),
  song: z.string().trim().max(150).optional().or(z.literal("")),
});

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attendance, setAttendance] = useState<"accept" | "decline">("accept");
  const [withPartner, setWithPartner] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      fullName: fd.get("fullName"),
      attendance,
      partnerName: fd.get("partnerName") ?? "",
      contact: fd.get("contact"),
      dietary: fd.get("dietary") ?? "",
      song: fd.get("song") ?? "",
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Your RSVP has been received.");
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl border border-gold/40 bg-ivory/50 px-8 py-14 text-center">
        <p className="script text-4xl text-wax">With gratitude</p>
        <div className="gold-line mx-auto my-5 w-16" />
        <p className="text-base text-foreground/80">
          Thank you for your response. Your RSVP has been received.
        </p>
      </div>
    );
  }

  const field =
    "w-full border-0 border-b border-border bg-transparent px-1 py-3 text-base focus:border-gold focus:outline-none placeholder:text-muted-foreground/60";
  const label = "block text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground mb-1";

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-8">
      <div>
        <label className={label}>Full Name *</label>
        <input name="fullName" className={field} placeholder="Your name" />
        {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
      </div>

      <div>
        <label className={label}>Attendance *</label>
        <div className="mt-2 flex gap-3">
          {(["accept", "decline"] as const).map((v) => (
            <button
              type="button"
              key={v}
              onClick={() => setAttendance(v)}
              className={`flex-1 border border-radius-3  px-4 py-3 text-sm tracking-[0.25em] uppercase transition ${
                attendance === v
                  ? "border-gold bg-gold/10 text-foreground border-radius-3"
                  : "border-border text-muted-foreground hover:border-gold/60"
              }`}
            >
              {v === "accept" ? "Joyfully Accept" : "Regretfully Decline"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={withPartner}
            onChange={(e) => setWithPartner(e.target.checked)}
            className="h-4 w-4 accent-[color:var(--gold)]"
          />
          I am attending with a partner
        </label>
        {withPartner && (
          <div className="mt-4">
            <label className={label}>Partner's Full Name</label>
            <input name="partnerName" className={field} placeholder="Partner's name" />
          </div>
        )}
      </div>

      <div>
        <label className={label}>Email or Phone *</label>
        <input name="contact" className={field} placeholder="you@example.com or +44…" />
        {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact}</p>}
      </div>

      <div>
        <label className={label}>Dietary Requirements</label>
        <input name="dietary" className={field} placeholder="Allergies or preferences (optional)" />
      </div>

      <div>
        <label className={label}>Song Request</label>
        <input name="song" className={field} placeholder="A song to make you dance (optional)" />
      </div>

      <div className="pt-4 text-center">
        <button
          type="submit"
          className="border border-foreground/80 bg-foreground px-10 py-4 text-xs tracking-[0.4em] uppercase text-primary-foreground transition hover:bg-transparent hover:text-foreground"
        >
          Send RSVP
        </button>
      </div>
    </form>
  );
}
