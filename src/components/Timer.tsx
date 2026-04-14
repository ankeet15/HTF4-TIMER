
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  // Set to 36 hours from now or fixed date as per prompt
  // Prompt says "Countdown duration: 36 hours" but also has a fixed date "2026-04-15"
  // I will use the fixed date from provided code but ensure it's functional.
  const HtfDate = Date.parse("2026-04-15T18:00:00+05:30");

  const setTimeLeft = useCallback(() => {
    const difference = HtfDate - Date.now();
    if (difference <= 0)
      return setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const total = Math.floor(difference / 1000);
    setTimer({
      days: 0, // Not used in display anymore
      hours: Math.floor(total / 3600), // Cumulative hours
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
    { value: timer.hours, label: "Hours" },
    { value: timer.minutes, label: "Min" },
    { value: timer.seconds, label: "Sec" },
  ];

  const blockColors = ["#DA100C", "#FFE105", "#50BAEA"];

  return (
    <div
      className="relative overflow-hidden w-full timer-container"
      style={{
        border: "0.25rem solid #000",
        boxShadow: "0.5rem 0.5rem 0 #000",
        borderRadius: "0.5rem",
        background: "#fff",
        transition: "transform 0.3s ease",
      }}
    >
      <div
        style={{
          height: 8,
          background:
            "linear-gradient(to right, #DA100C 33.33%, #FFE105 33.33%, #FFE105 66.66%, #50BAEA 66.66%)",
        }}
      />

      <div
        className="relative"
        style={{
          padding: "clamp(1rem, 3vw, 2.5rem)",
          background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.08' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23000'><circle cx='25' cy='25' r='5'/><circle cx='75' cy='75' r='5'/><circle cx='75' cy='25' r='5'/><circle cx='25' cy='75' r='5'/></g></svg>"), #fff`,
          backgroundSize: "2rem 2rem, 100% 100%",
        }}
      >
        <h3
          className="hero-title font-black uppercase tracking-tighter"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.75rem)",
            color: "#111",
            marginBottom: "0.5rem",
            fontFamily: "var(--font-heading)",
          }}
        >
          Hack The Future Begins In
        </h3>

        <div
          style={{
            width: "60px",
            height: 4,
            background: "#DA100C",
            marginBottom: "2rem",
          }}
        />

        <div
          className="grid grid-cols-3"
          style={{ gap: "clamp(0.5rem, 1.5vw, 1.5rem)" }}
        >
          {blocks.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center p-animation"
              style={{
                background: "#fff",
                border: "3px solid #000",
                boxShadow: `4px 4px 0 ${blockColors[i]}`,
                padding: "1rem 0.5rem",
                position: "relative",
              }}
            >
              <span
                className="font-black tabular-nums"
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 4rem)",
                  color: "#111",
                  lineHeight: 1,
                  fontFamily: "var(--font-heading)",
                }}
              >
                {String(value).padStart(2, "0")}
              </span>

              <span
                className="uppercase font-black"
                style={{
                  fontSize: "clamp(0.5rem, 1vw, 0.8rem)",
                  color: "#000",
                  marginTop: "0.5rem",
                  letterSpacing: "0.1em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "2px solid #000",
            marginTop: "2rem",
            paddingTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: 900,
              fontSize: "1rem",
              color: "#000",
              textTransform: "uppercase",
            }}
          >
            15th April, 2026
          </span>
          <div className="flex gap-2">
             <div style={{ width: 12, height: 12, background: "#DA100C", borderRadius: "50%" }} />
             <div style={{ width: 12, height: 12, background: "#FFE105", borderRadius: "50%" }} />
             <div style={{ width: 12, height: 12, background: "#50BAEA", borderRadius: "50%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TimerSection() {
  const isMobile = useIsMobile();

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        gap: "2rem",
        padding: "0 1rem",
        zIndex: 10,
        position: "relative",
      }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: "50rem",
        }}
      >
        <Timer />
      </div>
      
      {!isMobile && (
        <h2
          className="text-white uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 6vw, 6rem)",
            WebkitTextStroke: "2px #000",
            textShadow: "6px 6px 0 #000",
            letterSpacing: "-0.05em",
            transform: "rotate(-2deg)",
            marginTop: "1rem"
          }}
        >
          Let's Build.
        </h2>
      )}
    </div>
  );
}
