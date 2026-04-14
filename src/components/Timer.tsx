
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const HtfDate = Date.parse("2026-04-15T18:00:00+05:30");

  const setTimeLeft = useCallback(() => {
    const difference = HtfDate - Date.now();
    if (difference <= 0)
      return setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const total = Math.floor(difference / 1000);
    setTimer({
      days: Math.floor(total / 86400),
      hours: Math.floor(total / 3600) % 24,
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
    { value: timer.days, label: "Days" },
    { value: timer.hours, label: "Hrs" },
    { value: timer.minutes, label: "Min" },
    { value: timer.seconds, label: "Sec" },
  ];

  const blockColors = ["#DA100C", "#FFE105", "#50BAEA", "#DA100C"];

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        border: "0.175rem solid #000",
        boxShadow: "0.25rem 0.25rem 0 #000",
        borderRadius: "0.25rem",
      }}
    >
      <div
        style={{
          height: 4,
          background:
            "linear-gradient(to right, #DA100C 33.33%, #FFE105 33.33%, #FFE105 66.66%, #50BAEA 66.66%)",
        }}
      />

      <div
        className="relative"
        style={{
          padding: "clamp(0.6rem, 2.5vw, 1.5rem)",
          background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.15' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='8'/><circle cx='75' cy='75' r='8'/><circle cx='75' cy='25' r='8'/><circle cx='25' cy='75' r='8'/></g></svg>"), #fff`,
          backgroundSize: "1rem 1rem, 100% 100%",
        }}
      >
        <h3
          className="hero-title font-black uppercase"
          style={{
            fontSize: "clamp(0.7rem, 1.8vw, 1.25rem)",
            color: "#111",
            marginBottom: "0.5rem",
          }}
        >
          HacktoFuture4.0 Starts In
        </h3>

        <div
          style={{
            width: "40px",
            height: 2,
            background: "#DA100C",
            marginBottom: "1rem",
          }}
        />

        <div
          className="grid grid-cols-4"
          style={{ gap: "0.75rem" }}
        >
          {blocks.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center"
              style={{
                background: "#fff",
                border: "2px solid #000",
                boxShadow: `2px 2px 0 ${blockColors[i]}`,
                padding: "0.75rem 0.25rem",
              }}
            >
              <span
                className="hero-title font-black"
                style={{
                  fontSize: "clamp(1.3rem, 4.5vw, 3rem)",
                  color: "#111",
                }}
              >
                {String(value).padStart(2, "0")}
              </span>

              <span
                className="uppercase font-bold"
                style={{
                  fontSize: "0.6rem",
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.1)",
            marginTop: "1rem",
            paddingTop: "0.5rem",
          }}
        >
          <span
            className="hero-title"
            style={{
              fontWeight: 800,
              fontSize: "0.8rem",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            15th April, 2026
          </span>
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
        gap: "1.5rem",
        padding: "0 1rem",
      }}
    >
      {!isMobile && (
        <h2
          className="text-white"
          style={{
            fontFamily: "Dela Gothic One",
            fontSize: "clamp(1.5rem, 4vw, 4rem)",
            textShadow: "2px 2px 0 #000",
          }}
        >
          HacktoFuture4.0
        </h2>
      )}

      <div
        className="w-full"
        style={{
          maxWidth: "40rem",
        }}
      >
        <Timer />
      </div>
    </div>
  );
}
