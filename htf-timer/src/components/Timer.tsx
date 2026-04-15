
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const THIRTY_SIX_HOURS_MS = 36 * 60 * 60 * 1000; // 129,600,000 ms

  const setTimeLeft = useCallback(() => {
    if (!isStarted || startTime === null) {
      setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, THIRTY_SIX_HOURS_MS - elapsed);

    if (remaining === 0) {
      setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const total = Math.floor(remaining / 1000);
    setTimer({
      days: 0,
      hours: Math.floor(total / 3600),
      minutes: Math.floor(total / 60) % 60,
      seconds: total % 60,
    });
  }, [isStarted, startTime]);

  const handleStartTimer = () => {
    setIsStarted(true);
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (!isStarted) return;

    setTimeLeft();
    const id = setInterval(setTimeLeft, 1000);
    return () => clearInterval(id);
  }, [setTimeLeft, isStarted]);

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

        {/* Start Button - Bottom Right */}
        {!isStarted && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "clamp(1rem, 2vw, 1.5rem)",
              paddingRight: "clamp(0.5rem, 1vw, 1rem)",
            }}
          >
            <button
              onClick={handleStartTimer}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                fontWeight: "bold",
                backgroundColor: "#DA100C",
                color: "#fff",
                border: "2px solid #000",
                boxShadow: "3px 3px 0 #000",
                cursor: "pointer",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s ease",
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "1px 1px 0 #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0 #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
              }}
              onMouseLeave={(e) => {
                (e.currentButton as HTMLButtonElement).style.boxShadow = "3px 3px 0 #000";
                (e.currentButton as HTMLButtonElement).style.transform = "translate(0, 0)";
              }}
            >
              START
            </button>
          </div>
        )}
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
