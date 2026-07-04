import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface EnvelopeProps {
  onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.22 0.02 80) 0%, oklch(0.11 0.01 80) 100%)",
      }}
    >
      {/* subtle vignette pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.72 0.09 78 / 0.3), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.72 0.09 78 / 0.2), transparent 40%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: opened ? 0 : 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="script mb-10 text-center text-3xl md:text-4xl text-gold relative z-10"
      >
        You are cordially invited
      </motion.p>

      {/* Envelope */}
      <motion.button
        onClick={handleOpen}
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{
          scale: opened ? 1.15 : 1,
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative group cursor-pointer focus:outline-none"
        style={{ width: "min(90vw, 460px)", aspectRatio: "1.5 / 1" }}
        aria-label="Open invitation"
      >
        {/* Envelope body (back) */}
        <div
          className="absolute inset-0 rounded-sm shadow-2xl envelope-paper"
          style={{
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.08)",
          }}
        />

        {/* Left triangle flap */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "50%",
            background: "linear-gradient(135deg, var(--envelope) 0%, var(--envelope-dark) 100%)",
            clipPath: "polygon(0 0, 0 100%, 100% 50%)",
            boxShadow: "inset -2px 0 4px rgba(0,0,0,0.05)",
          }}
        />
        {/* Right triangle flap */}
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "50%",
            background: "linear-gradient(225deg, var(--envelope) 0%, var(--envelope-dark) 100%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
            boxShadow: "inset 2px 0 4px rgba(0,0,0,0.05)",
          }}
        />
        {/* Bottom flap */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "60%",
            background: "linear-gradient(0deg, var(--envelope-dark) 0%, var(--envelope) 100%)",
            clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
          }}
        />

        {/* Top flap — animates open */}
        <motion.div
          className="absolute inset-x-0 top-0 origin-top z-20"
          style={{
            height: "60%",
            background: "linear-gradient(180deg, var(--envelope) 0%, var(--envelope-dark) 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          animate={{ rotateX: opened ? -180 : 0 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />

        {/* Wax seal */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full"
          style={{
            width: "22%",
            aspectRatio: "1",
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.55 0.15 25), oklch(0.32 0.09 22) 60%, oklch(0.22 0.06 22) 100%)",
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.5), inset 0 -4px 8px rgba(0,0,0,0.4), inset 0 3px 6px rgba(255,255,255,0.15)",
          }}
          animate={{
            scale: opened ? 0 : 1,
            opacity: opened ? 0 : 1,
            rotate: opened ? 180 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="text-gold-soft"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              lineHeight: 1,
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            C&Q
          </span>
        </motion.div>

        {/* Envelope opening — reveals white card rising */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-10 rounded-sm bg-ivory"
              style={{
                width: "85%",
                aspectRatio: "1.3 / 1",
                top: "20%",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: "-60%", opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <p className="script text-3xl text-wax mb-2">Calvin & Querida</p>
                <div className="gold-line w-24 my-2" />
                <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground">
                  Six · February · MMXXVII
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="mt-10 text-xs tracking-[0.4em] uppercase text-gold-soft relative z-10"
      >
        Tap to open
      </motion.p>

      {/* Fade to home */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-ivory z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      />
    </div>
  );
}
