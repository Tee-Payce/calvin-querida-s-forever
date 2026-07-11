import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Envelope } from "@/components/Envelope";
import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";
import { createFileRoute } from "@tanstack/react-router";
import coupleAsset from "@/assets/couple.png";
import dressCode from "@/assets/dress-code.png";
import flowersAsset from "@/assets/flowers.png";
import badgeAsset from "@/assets/Ornate venue badge.png";
import { MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Home,
});

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <p className="mb-3 text-[0.7rem] tracking-[0.5em] uppercase text-gold">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-5xl italic text-foreground">{title}</h2>
      <div className="gold-line mx-auto mt-6 w-24" />
    </div>
  );
}

function Home() {
  const [phase, setPhase] = useState<"loading" | "envelope" | "site">("loading");

  return (
    <>
      <Toaster position="top-center" />

      {/* Phase 1 — loading screen */}
      <AnimatePresence>
        {phase === "loading" && (
          <LoadingScreen onComplete={() => setPhase("envelope")} />
        )}
      </AnimatePresence>

      {/* Phase 2 — envelope invitation */}
      <AnimatePresence>
        {phase === "envelope" && (
          <Envelope onOpen={() => setPhase("site")} />
        )}
      </AnimatePresence>

      {/* Phase 3 — main site */}
      {phase === "site" && (
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-background text-foreground"
        >
          {/* HERO */}
          <section className="relative min-h-screen w-full overflow-hidden">
            {/* background couple photo with overlay */}
            <div className="absolute inset-0">
              <img
                src={coupleAsset}
                alt="Calvin and Querida"
                className="h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.15 0.01 80 / 0.55) 0%, oklch(0.18 0.02 80 / 0.7) 50%, oklch(0.12 0.01 80 / 0.85) 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, oklch(0.72 0.09 78 / 0.12) 100%)",
                }}
              />
            </div>

            {/* Gold floral illustration — corner roses + vines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 2, opacity: 0.18 }}
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
            >
              {[
                { cx: 160,  cy: 160,  r: 110 },
                { cx: 1280, cy: 130,  r: 95  },
                { cx: 80,   cy: 780,  r: 85  },
                { cx: 1370, cy: 760,  r: 100 },
                { cx: 720,  cy: 40,   r: 70  },
              ].map((c, i) => (
                <g key={i}>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((a, j) => {
                    const rad = (a * Math.PI) / 180;
                    const px = c.cx + Math.cos(rad) * c.r * 0.5;
                    const py = c.cy + Math.sin(rad) * c.r * 0.5;
                    return (
                      <ellipse
                        key={j}
                        cx={px} cy={py}
                        rx={c.r * 0.35} ry={c.r * 0.55}
                        transform={`rotate(${a + 90}, ${px}, ${py})`}
                        fill="var(--gold)"
                        opacity="0.55"
                      />
                    );
                  })}
                  <circle cx={c.cx} cy={c.cy} r={c.r * 0.14} fill="var(--gold-soft)" opacity="0.9" />
                </g>
              ))}
              {/* Vine stems */}
              <path d="M0 900 Q200 600 400 400 T800 100"  stroke="var(--gold)" strokeWidth="1.5" fill="none" opacity="0.35" />
              <path d="M1440 900 Q1200 600 1000 400 T600 100" stroke="var(--gold)" strokeWidth="1.5" fill="none" opacity="0.35" />
            </svg>

            {/* Falling gold petals */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
              {Array.from({ length: 18 }).map((_, i) => {
                const left    = `${5 + (i * 5.5) % 90}%`;
                const delay   = i * 0.7;
                const dur     = 8 + (i % 5) * 2;
                const opacity = 0.4 + (i % 4) * 0.15;
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left, top: "-30px" }}
                    animate={{
                      y: ["0vh", "110vh"],
                      x: [0, i % 2 === 0 ? 40 : -40],
                      rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                      opacity: [0, opacity, opacity, 0],
                    }}
                    transition={{
                      duration: dur,
                      delay,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
                      <path
                        d="M8 1 C12 1 14 7 14 12 C14 18 11 21 8 21 C5 21 2 18 2 12 C2 7 4 1 8 1Z"
                        fill="var(--gold)"
                        fillOpacity="0.55"
                      />
                      <path
                        d="M8 3 C8 3 8 17 8 21"
                        stroke="var(--gold-soft)"
                        strokeWidth="0.5"
                        strokeOpacity="0.6"
                        fill="none"
                      />
                    </svg>
                  </motion.div>
                );
              })}
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center text-ivory">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-[0.7rem] tracking-[0.5em] uppercase text-gold-soft"
              >
                Together with their families
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="mt-8 script text-6xl md:text-8xl text-gold-soft"
                style={{ lineHeight: 1 }}
              >
                Calvin <span className="text-ivory">&</span> Querida
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="gold-line my-8 w-40"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="max-w-2xl font-serif text-lg md:text-xl italic text-ivory/85"
              >
                Our Love Story
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="mt-6 max-w-2xl space-y-4 font-serif text-base md:text-lg text-ivory/80 leading-relaxed"
              >
                <p>
                  Many years ago, our paths first crossed, and we quickly grew fond of one another.
                  Although our journey did not continue then, God was still writing our story.
                </p>
                <p>
                  In His perfect timing and divine alignment, He brought us back together during a
                  season when we were both seeking Him and praying for the person we would spend
                  the rest of our lives with. Looking back now, we know this was all part of His
                  perfect plan.
                </p>
                <p>
                  With grateful hearts, we invite you to celebrate the beginning of our forever.
                  Please join us on <span className="text-gold-soft">6th February 2027</span> as we
                  say <em>I do</em>, and celebrate this special day with our family and friends.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-10 script text-2xl md:text-3xl text-gold-soft"
              >
                “He has made everything beautiful in its time.”
              </motion.p>
              <p className="mt-2 text-[0.7rem] tracking-[0.4em] uppercase text-ivory/60">
                Ecclesiastes 3:11
              </p>

              <div className="mt-14 w-full">
                <p className="mb-6 text-[0.7rem] tracking-[0.5em] uppercase text-gold-soft">
                  Counting the days
                </p>
                <Countdown />
              </div>
            </div>
          </section>

          {/* SCHEDULE */}
          <section className="mx-auto max-w-4xl px-6 py-24">

            {/* Flowers background behind heading */}
            <div className="relative">
              <img
                src={flowersAsset}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-20 pointer-events-none select-none"
              />
              <SectionHeading eyebrow="6 · Feb · 2027" title="Schedule of the Day" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { time: "10:00", label: "Ceremony" },
                { time: "12:00", label: "Canapés" },
                { time: "13:00", label: "Reception" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border border-border bg-card/50 px-6 py-10 text-center"
                >
                  <p className="font-display text-5xl italic text-gold">{s.time}</p>
                  <div className="gold-line mx-auto my-4 w-12" />
                  <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm italic text-muted-foreground">
              An intentional celebration — no end times will be shared.
            </p>
          </section>

          {/* LOCATION */}
          <section className="mx-auto max-w-4xl px-6 py-24">
            <SectionHeading eyebrow="The Venue" title="Where We Gather" />
            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-md items-center justify-center sm:max-w-lg">
              <img
                src={badgeAsset}
                alt="Ornate venue badge"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-16 text-center">
                <p className="text-[0.65rem] tracking-[0.5em] uppercase text-gold">Location</p>
                <div className="gold-line mx-auto my-4 w-16" />
                <p className="script text-4xl md:text-5xl text-wax leading-tight">
                  Golden Conifer
                </p>
                <p className="mt-3 font-serif text-base md:text-lg italic text-foreground/75">
                  Functions Venue
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Golden+Conifer+Functions+Venue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 border border-gold bg-background/60 px-5 py-2.5 text-[0.65rem] tracking-[0.35em] uppercase text-foreground transition-colors hover:bg-gold hover:text-ivory"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Open in Maps
                </a>
              </div>
            </div>
          </section>

          {/* DRESS CODE */}
          <section className="bg-secondary/40 py-24">
            <div className="mx-auto max-w-4xl px-6">
              <SectionHeading eyebrow="Attire" title="Formal Elegance" />
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="border-l border-gold pl-6">
                  <p className="script text-3xl text-wax">Ladies</p>
                  <p className="mt-3 font-serif text-lg text-foreground/85">
                    Elegant floor-length gowns or sophisticated cocktail dresses.
                  </p>
                </div>
                <div className="border-l border-gold pl-6">
                  <p className="script text-3xl text-wax">Gentlemen</p>
                  <p className="mt-3 font-serif text-lg text-foreground/85">
                    A tuxedo or formal suit paired with a tie or bow tie.
                  </p>
                </div>
              </div>

              {/* Dress code illustration */}
              <div className="mt-12 flex justify-center">
                <div className="relative w-full max-w-lg">
                  {/* White floor — starts at 50% from top, rounded bottom edges */}
                  <div
                    className="absolute left-0 right-0 bottom-0 rounded-b-3xl"
                    style={{ top: "50%" }}
                  />
                  {/* White panel with rounded corners, sits behind the image */}
                  <div
                    className="absolute inset-x-4 bottom-0 rounded-3xl bg-white"
                    style={{ top: "50%" }}
                  />
                  <img
                    src={dressCode}
                    alt="Dress code illustration"
                    className="relative w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PHOTOGRAPHS */}
          <section className="mx-auto max-w-3xl px-6 py-24 text-center">
            <SectionHeading eyebrow="Memories" title="Couple Photographs" />
            <p className="font-serif text-lg italic text-foreground/80">
              We would be delighted to capture memories with our loved ones. Further details will
              be shared on the day.
            </p>
          </section>

          {/* RSVP */}
          <section className="bg-secondary/40 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <SectionHeading eyebrow="Kindly Respond" title="RSVP" />
              <p className="mb-4 text-center font-serif text-lg text-foreground/80">
                Please confirm your attendance by{" "}
                <span className="text-gold">30th October</span>.
              </p>
              <p className="mb-12 text-center text-sm italic text-muted-foreground">
                Each invitation includes named guests. Where a plus-one is included, this will be
                indicated on your invitation.
              </p>
              <RsvpForm />
            </div>
          </section>

          {/* GIFTS */}
          <section className="mx-auto max-w-3xl px-6 py-24 text-center">
            <SectionHeading eyebrow="With Gratitude" title="Gifts" />
            <p className="font-serif text-lg italic text-foreground/80">
              Should you wish to honour us with a gift, we are truly grateful for any gesture of
              love and kindness. Details will be provided upon request on the day.
            </p>
          </section>

          {/* DIETARY */}
          <section className="bg-secondary/40 py-16">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <p className="script text-3xl text-wax">A gentle note on dietary needs</p>
              <div className="gold-line mx-auto my-4 w-16" />
              <p className="font-serif italic text-foreground/80">
                Please share any dietary requirements or allergies when completing your RSVP form.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto max-w-3xl px-6 py-24">
            <SectionHeading eyebrow="Good to Know" title="Frequently Asked" />
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "What time should I arrive?",
                  a: "Guests are kindly requested to arrive at least 30 minutes before the ceremony to allow for seating.",
                },
                {
                  q: "Can I bring a plus-one?",
                  a: "Plus-one guests are only included where indicated on your invitation.",
                },
                {
                  q: "Are children invited?",
                  a: "As much as we love little ones, we will not be including them in the ceremony or reception due to limited numbers.",
                },
                {
                  q: "Is there a dress code?",
                  a: "Yes, we kindly request Formal Elegance attire.",
                },
                {
                  q: "What should I do if I have dietary requirements?",
                  a: "Please include any dietary requirements or allergies in your RSVP form.",
                },
                {
                  q: "How do I RSVP?",
                  a: "Please complete the RSVP form on this website by the stated deadline.",
                },
                {
                  q: "Will parking be available?",
                  a: "Yes — there is plenty of parking at the venue.",
                },
                {
                  q: "Who can I contact for questions?",
                  a: "Querida on +44 7496 296 808 or Calvin on +263 0783 746 903.",
                },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-serif text-lg italic hover:text-gold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-serif text-base text-foreground/80">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-border bg-foreground py-16 text-center text-primary-foreground">
            <p className="script text-5xl text-gold-soft">Calvin & Querida</p>
            <div className="gold-line mx-auto my-5 w-24" />
            <p className="text-xs tracking-[0.5em] uppercase text-primary-foreground/70">
              Six · February · Two Thousand & Twenty-Seven
            </p>
            <p className="mt-8 text-xs tracking-[0.3em] uppercase text-primary-foreground/50">
              With love, and by God's grace
            </p>
          </footer>
        </motion.main>
      )}
    </>
  );
}
