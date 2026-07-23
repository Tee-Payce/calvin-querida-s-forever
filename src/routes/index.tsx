import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Envelope } from "@/components/Envelope";
import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";
import { MusicPlayer } from "@/components/MusicPlayer";
import { createFileRoute } from "@tanstack/react-router";
import lightsAsset from '@/assets/string-lights.png'
import bgMusic from '@/assets/background_music2.mp3'
import HomeVideo from "@/assets/HOME.mp4";
import dressCode from "@/assets/dress-code.png";
import flowersAsset from "@/assets/flowers.png";
import giftsAsset from '@/assets/envelope5.png'
import cc01 from "@/assets/cc01.JPG"
import cc02 from "@/assets/cc02.jpg"
import cc03 from "@/assets/cc03.jpg"
import cc04 from "@/assets/cc04.jpg"
import cc05 from "@/assets/cc05.jpg"
import cc06 from "@/assets/cc06.JPG"
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
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.play(); } else { audio.pause(); }
  }, [playing]);


  return (
    <>
      <Toaster position="top-center" />

      <audio ref={audioRef} src={bgMusic} loop />

      {/* Music toggle — fixed bottom right */}
      <button
        onClick={() => setPlaying(p => !p)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-background/80 backdrop-blur-sm shadow-lg transition-all hover:bg-gold hover:text-ivory"
        aria-label={playing ? "Pause music" : "Play music"}
        style={{ color: "var(--gold)" }}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="4" width="4" height="16" rx="1" />
            <rect x="15" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4l14 8-14 8V4z" />
          </svg>
        )}
      </button>

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
        <>
          <MusicPlayer autoPlay />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-background text-foreground"
        >
          {/* HERO */}
          <section className="relative min-h-screen w-full ">
            {/* background couple photo with overlay overflow-hidden*/}
            <div className="absolute inset-0">
              {/* <img
                src={coupleAsset}
                alt="Calvin and Querida"
                className="h-full w-full object-cover object-center"
              /> */}
               <video
                      src={HomeVideo}
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
              {/* <div
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
              /> */}
            </div>

            {/* Gold floral illustration — corner roses + vines */}
            {/* <svg
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
              <path d="M0 900 Q200 600 400 400 T800 100"  stroke="var(--gold)" strokeWidth="1.5" fill="none" opacity="0.35" />
              <path d="M1440 900 Q1200 600 1000 400 T600 100" stroke="var(--gold)" strokeWidth="1.5" fill="none" opacity="0.35" />
            </svg> */}

            {/* Falling gold petals */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
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
            </div> */}

            <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-end px-6 pb-30 pt-50 text-center text-foreground">
              {/* <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-[0.9rem] tracking-[0.5em] uppercase font-bold text-gold-soft"
                style={{color: '#3B3A2E'}}
              >
                Together with their families
              </motion.p> */}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="mt-1 italic text-lg md:text-lg"
                style={{ lineHeight: 1, color: "#3B3A2E" }}
              >
                Calvin <span style={{ color: "#5B6142" }}>&</span> Querida
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="gold-line my-4 w-40"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="max-w-2xl font-serif text-sm md:text-sm font-bold italic"
                style={{ color: "#4A4A3A", marginTop: 2 }}
              >
                Our Love Story
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="mt-2 max-w-2xl space-y-4 font-serif text-base md:text-sm leading-relaxed font-bold"
                style={{ color: "#4A4A3A" }}
              >
                <p>
                  Many years ago, our paths first crossed, and though our journey paused, God was still writing our story.
                
                  In His perfect timing, He brought us back togetheras we sought him and prayed for the person we would spend
                  our lives. </p>
                <p>
                  With grateful hearts, we invite you to celebrate the beginning of our forever.
                  
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-1 italic text-sm md:text-sm font-bold"
                style={{ color: "#beb66cff" }}
              >
                “He has made everything beautiful in its time.”
              </motion.p>
              <p className="mt-1 font-bold text-[0.7rem] tracking-[0.4em] uppercase" style={{ color: "#7A7A6A" }}>
                Ecclesiastes 3:11
              </p>

             
            </div>
          </section>

          {/* SCHEDULE */}
          <section className="mx-auto max-w-4xl px-6 py-8">
             <div className="mt-8 w-full align-center text-center mb-5">
                <p className="mb-6 text-[0.7rem] tracking-[0.5em] uppercase text-gold-hard">
                  Counting the days
                </p>
                <Countdown />
              </div>
              <div className="mt-5 flex justify-center">
              <img
                src={lightsAsset}
                alt="Floral decoration"
                className="w-full  object-contain mb-10"
              />
            </div>

            <SectionHeading eyebrow="6 · Feb · 2027" title="Schedule of the Day" />

            {/* Vertical timeline */}
            <div className="relative mx-auto max-w-sm">

              {[
                { time: "11:00", label: "Ceremony",             desc: "The most special moment of the day" },
                { time: "13:00", label: "Canapés & Drinks",     desc: "welcome mocktails" },
                { time: "14:30", label: "Wedding Reception",    desc: "Al fresco dining and celebration" },
                // { time: "18:00", label: "Party",                desc: "Let's dance the night away!" },
                // { time: "22:00", label: "Last Dance",           desc: "Farewell and beautiful memories" },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <p className="text-[0.65rem] tracking-[0.4em] uppercase mb-1" style={{ color: "var(--gold)" }}>
                    {s.time}
                  </p>
                  <p className="font-display text-2xl italic mb-1" style={{ color: "var(--foreground)" }}>
                    {s.label}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-[18rem]">
                    {s.desc}
                  </p>
                  {i < arr.length - 1 && (
                    <div className="flex flex-col items-center my-2">
                      {/* Short vertical spine segment between items */}
                      <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, var(--gold), color-mix(in oklab, var(--gold) 30%, transparent))" }} />
                      {/* <div className="gold-line w-12" /> */}
                      <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, color-mix(in oklab, var(--gold) 30%, transparent), var(--gold))" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Flowers image */}
            <div className="mt-5 flex justify-center">
              <img
                src={flowersAsset}
                alt="Floral decoration"
                className="w-full max-w-md object-contain"
              />
            </div>
          </section>

          {/* LOCATION */}
          <section className="mx-auto align-center text-center max-w-4xl px-6 ">
            <SectionHeading eyebrow="The Venue" title="Where We Gather" />
            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-md items-center justify-center sm:max-w-lg">
              <img
                src={badgeAsset}
                alt="Ornate venue badge"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-top px-2 pt-30 text-center">
                <p className="text-[0.65rem] tracking-[0.5em] uppercase text-gold">Location</p>
                <div className="gold-line mx-auto my-4 w-16" />
                <p className="script text-xl md:text-xl text-wax leading-tight">
                  Pabani Venue
                </p>
                <p className="mt-1 font-serif text-base md:text-lg italic text-foreground/75">
                  25 Highland Glen Road, Helensvale
                </p>
                
              </div>
              
            </div>
            <a
                  href="https://www.bing.com/ck/a?!&&p=2968c502f1d7e33b265806da5687e8cf3e81047fe5dd512b8b8c06c6cbb31026JmltdHM9MTc4NDQxOTIwMA&ptn=3&ver=2&hsh=4&fclid=2b0fa93d-d477-6894-05db-beabd0776a88&u=a1L21hcHM_Jm1lcGk9MH5-RW1iZWRkZWR-QWRkcmVzc19MaW5rJnR5PTE4JnE9UGFiYW5pJTIwVmVudWUmc3M9eXBpZC5ZTkM3NTkzODc5OENGQjkyMDEmcHBvaXM9LTE3LjczMDQyMTA2NjI4NDE4XzMxLjE3NTU4ODYwNzc4ODA4Nl9QYWJhbmklMjBWZW51ZV9ZTkM3NTkzODc5OENGQjkyMDF-JmNwPS0xNy43MzA0MjF-MzEuMTc1NTg5JnY9MiZzVj0xJkZPUk09TVBTUlBM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 mx-auto inline-flex items-center gap-2 border border-gold bg-background/60 px-5 py-2.5 text-[0.65rem] tracking-[0.35em] uppercase text-foreground transition-colors hover:bg-gold hover:text-ivory"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Open in Maps
                </a>
          </section>

          {/* DRESS CODE */}
          <section className="py-8">
            <div className="mx-auto max-w-4xl px-6">
              <SectionHeading eyebrow="Attire" title="Formal Elegance" />
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="border-l border-gold pl-6">
                  <p className="italic text-3xl text-wax">Ladies</p>
                  <p className="mt-3 font-serif text-lg text-foreground/85">
                    Elegant floor-length gowns or sophisticated cocktail dresses.
                  </p>
                </div>
                <div className="border-l border-gold pl-6">
                  <p className="italic text-3xl text-wax">Gentlemen</p>
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
          <section className="mx-auto max-w-4xl px-6 py-8 text-center">
            <SectionHeading eyebrow="Memories" title="Our Forever Begins Now" />
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
              {[cc01, cc02, cc03, cc05, cc04, cc06].map((src, i) => (
                <div
                  key={i}
                  className={[i === 3 ? "md:col-start-1" : "", i === 4 ? "md:col-start-2" : ""].join(" ").trim()}
                  style={{
                    padding: "10px",
                    background: "linear-gradient(135deg, #c9a84c 0%, #f5e6a3 40%, #c9a84c 60%, #8b6914 100%)",
                    boxShadow: "0 4px 24px rgba(180,140,40,0.2), inset 0 0 0 2px rgba(255,235,150,0.3)",
                  }}
                >
                  <div style={{ border: "1px solid rgba(201,168,76,0.5)", padding: "3px" }}>
                    <img
                      src={src}
                      alt={"Calvin and Querida " + (i + 1)}
                      className="w-full h-64 object-cover object-top"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RSVP */}
          <section className="py-12">
            <div className="mx-auto max-w-3xl px-6">
              <SectionHeading eyebrow="Kindly Respond" title="RSVP" />
              <p className="mb-4 text-center font-serif text-lg text-foreground/80">
                Please confirm your attendance by{" "}
                <span className="text-gold">30th October</span>.
              </p>
              <p className="mb-4 text-center text-sm italic text-muted-foreground">
                Each invitation includes named guests. Where a plus-one is included, this will be
                indicated on your invitation.
              </p>
              <RsvpForm />
            </div>
          </section>

          {/* GIFTS */}
          <section className="mx-auto max-w-3xl px-6 py-12 text-center">
            <div className="flex justify-center">
              <img
                src={giftsAsset}
                alt="Gift Assets"
                className="w-full max-w-md object-contain"
              />
            </div>
            <SectionHeading eyebrow="With Gratitude" title="Gifts" />
            <p className="font-serif text-lg italic text-foreground/80">
              Should you wish to honour us with a gift, we are truly grateful for any gesture of
              love and kindness. For those who wishing to do so, gift details are provided below.
            </p>
            <Accordion type="single" collapsible className="mt-8 w-full max-w-sm mx-auto text-left">
              <AccordionItem value="bank-details" className="border-border">
                <AccordionTrigger className="font-serif text-lg italic hover:text-gold hover:no-underline">
                  Bank Details
                </AccordionTrigger>
                <AccordionContent className="font-serif bg-white rounded-lg  text-base text-foreground/80 space-y-1">
                  <p><span className="text-gold ml-2">Bank Name:</span> Revolut</p>
                  <p><span className="text-gold ml-2">Sort Code:</span> 23-01-20</p>
                  <p><span className="text-gold ml-2">Account:</span> 53661849</p>
                  <p><span className="text-gold ml-2">Owner:</span> Querida Kuzamba</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* DIETARY */}
          <section className="py-8">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <p className="italic text-3xl text-wax">Our Message to You</p>
              <div className="gold-line mx-auto my-4 w-16" />
              <p className="font-serif italic text-foreground/80">
Your love, support, and presence mean the world to us, and we can't wait to celebrate our special day with you!
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
                  a: "Querida on +44 7496 296 808 or Calvin on +263 0783 746 903. Sharon on +44 749629808 and Natalie on +263 77 271 9986",
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
            <p className="italic text-5xl text-gold-soft">Calvin & Querida</p>
            <div className="gold-line mx-auto my-5 w-24" />
            <p className="text-xs tracking-[0.5em] uppercase px-8 text-primary-foreground/70">
              Six · February · Two Thousand & Twenty-Seven
            </p>
            {/* <p className="mt-8 text-xs tracking-[0.3em] uppercase text-primary-foreground/50">
              With love, and by God's grace
            </p> */}
          </footer>
        </motion.main>
        </>
      )}
    </>
  );
}
