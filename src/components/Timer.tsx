
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const HtfDate = Date.parse("2026-04-16T05:50:00+05:30");

  const setTimeLeft = useCallback(() => {
    const difference = HtfDate - Date.now();
    if (difference <= 0)
      return setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const total = Math.floor(difference / 1000);
    setTimer({
      days: 0,
      hours: Math.floor(total / 3600),
      minutes: Math.floor(total / 60) % 60,
      seconds: total % 60,
    });
  }, [HtfDate]);

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
            gap: "clamp(0.5rem, 2vw, 1rem)",
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
                className="hero-title font-black"
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 4rem)",
                  color: "#111",
                  lineHeight: 1.1
                }}
              >
                {String(value).padStart(2, "0")}
              </span>

              <span
                className="uppercase font-bold"
                style={{
                  fontSize: "clamp(0.6rem, 1.2vw, 0.9rem)",
                  color: "rgba(0,0,0,0.6)",
                  marginTop: "0.25rem"
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── Timer Only Layout ───────────────────── */
export default function TimerSection() {
  const isMobile = useIsMobile();

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
            fontSize: "clamp(1.5rem, 5vw, 4.5rem)",
            textShadow: "4px 4px 0 #000",
            letterSpacing: "-0.02em"
          }}
        >
          COUNTDOWN
        </h2>
        <span className="text-white font-bold opacity-80" style={{ letterSpacing: "0.2em", fontSize: "0.8rem" }}>
          HACKTOFUTURE 4.0
        </span>
      </div>

      <div
        className="w-full"
        style={{
          maxWidth: "50rem",
        }}
      >
        <Timer />
      </div>
    </div>
  );
}
