import { useEffect, useState } from "react";

const TARGET = new Date("2027-02-06T10:00:00Z").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();
  const items = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex min-w-[80px] flex-col items-center border border-gold/40 bg-ivory/50 px-4 py-5 md:min-w-[110px] md:px-6 md:py-6 backdrop-blur-sm"
        >
          <span className="font-display text-4xl md:text-6xl text-foreground tabular-nums">
            {String(it.value).padStart(2, "0")}
          </span>
          <span className="mt-2 text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}
