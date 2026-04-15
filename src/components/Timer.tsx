
import { useState, useEffect, useCallback } from "react";

function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  // Target time: 17th Apr 2026, 7:00 AM IST
  const TARGET_DATE = new Date("2026-04-17T07:00:00+05:30").getTime();

  const setTimeLeft = useCallback(() => {
    const now = Date.now();
    const remaining = Math.max(0, TARGET_DATE - now);

    if (remaining === 0) {
      setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    setTimer({
      days: 0,
      hours: totalHours,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
    });
  }, [TARGET_DATE]);

  useEffect(() => {
    setTimeLeft();
    const id = setInterval(setTimeLeft, 1000);
    return () => clearInterval(id);
  }, [setTimeLeft]);

  const blocks = [
    { value: timer.hours, label: "Hrs" },
    { value: timer.minutes, label: "Min" },
    { value: timer.seconds, label: "Sec" },
  ];

  const blockColors = ["#DA100C", "#FFE105", "#50BAEA"];

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        border: "0.2rem solid #000",
        boxShadow: "0.4rem 0.4rem 0 #000",
        borderRadius: "0.4rem",
        background: "#fff"
      }}
    >
      <div
        className="relative"
        style={{
          padding: "clamp(1rem, 4vw, 2rem)",
          background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.05' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23000'><circle cx='25' cy='25' r='8'/><circle cx='75' cy='75' r='8'/><circle cx='75' cy='25' r='8'/><circle cx='25' cy='75' r='8'/></g></svg>"), #fff`,
          backgroundSize: "1.5rem 1.5rem, 100% 100%",
        }}
      >
        <div
          className="grid grid-cols-3"
          style={{ 
            gap: "clamp(0.5rem, 3vw, 3rem)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)"
          }}
        >
          {blocks.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center"
              style={{
                background: "#fff",
                border: "2.5px solid #000",
                boxShadow: `3px 3px 0 ${blockColors[i]}`,
                padding: "clamp(0.5rem, 2vw, 1.5rem) 0.25rem",
              }}
            >
              <span
                className="font-bold tabular-nums"
                style={{
                  fontSize: "clamp(1.5rem, 10vw, 12rem)",
                  color: "#111",
                  lineHeight: 1.1,
                  fontFamily: "var(--font-body)"
                }}
              >
                {String(value).padStart(2, "0")}
              </span>

              <span
                className="uppercase font-bold"
                style={{
                  fontSize: "clamp(0.6rem, 2.5vw, 2.5rem)",
                  color: "rgba(0,0,0,0.6)",
                  marginTop: "0.25rem"
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Removed Start Button logic as it is now an automated countdown */}
      </div>
    </div>
  );
}

/* ───────────────────── Timer Only Layout ───────────────────── */
export default function TimerSection() {

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        gap: "2rem",
        padding: "0 1rem",
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <h2
          className="text-white uppercase"
          style={{
            fontFamily: "Dela Gothic One",
            fontSize: "clamp(1.5rem, 8vw, 10rem)",
            textShadow: "clamp(4px, 1vw, 12px) clamp(4px, 1vw, 12px) 0 #000",
            letterSpacing: "-0.02em"
          }}
        >
          COUNTDOWN
        </h2>
        <span 
          className="text-white font-bold opacity-80" 
          style={{ letterSpacing: "0.2em", fontSize: "clamp(0.8rem, 2vw, 2rem)", cursor: "default" }}
        >
          HACKTOFUTURE 4.0
        </span>
      </div>

      <div
        className="w-full"
        style={{
          maxWidth: "80rem",
        }}
      >
        <Timer />
      </div>
    </div>
  );
}
