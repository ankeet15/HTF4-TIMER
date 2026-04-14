import { useEffect, useState, useRef } from "react";
import TimerSection from "./components/Timer";
import "./index.css";

// Frame-by-frame background animation
const FrameBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 168;
  const fps = 30;

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameIndex = 0;
    let lastTime = 0;
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[frameIndex];
        
        // Cover logic for canvas (aspect ratio preservation)
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = -(drawHeight - canvas.height) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawHeight = canvas.height;
          offsetX = -(drawWidth - canvas.width) / 2;
          offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        frameIndex = (frameIndex + 1) % frameCount;
        lastTime = time;
      }
      requestAnimationFrame(animate);
    };

    const requestId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  return (
    <canvas
      ref={canvasRef}
      className="bg-video"
      style={{
        background: "#000",
        display: "block",
      }}
    />
  );
};

// Floating decorative shapes for parallax layers
const FloatingShapes = () => (
  <div className="floating-shapes-wrapper" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {/* Background layer - slow drift */}
    <div className="shape shape-circle layer-bg" style={{ top: "10%", left: "5%", width: 80, height: 80, background: "rgba(218,16,12,0.18)", border: "4px solid #DA100C", borderRadius: "50%", filter: "blur(1px)" }} />
    <div className="shape shape-square layer-bg" style={{ top: "70%", left: "3%", width: 60, height: 60, background: "rgba(255,225,5,0.15)", border: "3px solid #FFE105", transform: "rotate(20deg)" }} />
    <div className="shape shape-circle layer-bg" style={{ bottom: "15%", right: "6%", width: 100, height: 100, background: "rgba(80,186,234,0.15)", border: "4px solid #50BAEA", borderRadius: "50%", filter: "blur(2px)" }} />
    <div className="shape shape-diamond layer-bg" style={{ top: "40%", left: "2%", width: 50, height: 50, background: "#FFE105", opacity: 0.3, transform: "rotate(45deg)" }} />

    {/* Midground layer - medium drift */}
    <div className="shape shape-circle layer-mid" style={{ top: "20%", right: "8%", width: 55, height: 55, background: "rgba(218,16,12,0.25)", border: "3px solid #DA100C", borderRadius: "50%" }} />
    <div className="shape shape-square layer-mid" style={{ bottom: "20%", right: "4%", width: 70, height: 70, background: "rgba(80,186,234,0.2)", border: "3px solid #50BAEA", transform: "rotate(-15deg)" }} />
    <div className="shape shape-triangle layer-mid" style={{ top: "55%", right: "12%", width: 0, height: 0, borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderBottom: "52px solid rgba(255,225,5,0.35)", background: "transparent", border: "none" }} />
    <div className="shape shape-circle layer-mid" style={{ top: "8%", right: "20%", width: 30, height: 30, background: "#DA100C", opacity: 0.5, borderRadius: "50%" }} />

    {/* Foreground layer - faster & larger */}
    <div className="shape shape-cross layer-fg" style={{ top: "80%", left: "10%", fontSize: 60, color: "#FFE105", opacity: 0.4, fontWeight: 900, lineHeight: 1 }}>+</div>
    <div className="shape shape-cross layer-fg" style={{ top: "5%", right: "30%", fontSize: 40, color: "#50BAEA", opacity: 0.5, fontWeight: 900, lineHeight: 1 }}>✦</div>
    <div className="shape shape-dot-grid layer-fg" style={{ bottom: "5%", right: "15%", opacity: 0.25 }} />

    {/* Glowing orbs / light pulses */}
    <div className="glow-orb glow-red" style={{ top: "30%", left: "0%" }} />
    <div className="glow-orb glow-blue" style={{ bottom: "20%", right: "0%" }} />
    <div className="glow-orb glow-yellow" style={{ top: "5%", right: "25%" }} />

    {/* Comic dots top-left corner */}
    <div style={{ position: "absolute", top: 20, left: 20, display: "grid", gridTemplateColumns: "repeat(6,10px)", gap: 5, opacity: 0.3 }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
      ))}
    </div>
    {/* Comic dots bottom-right corner */}
    <div style={{ position: "absolute", bottom: 20, right: 20, display: "grid", gridTemplateColumns: "repeat(6,10px)", gap: 5, opacity: 0.3 }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#FFE105" }} />
      ))}
    </div>
  </div>
);

function App() {
  return (
    <div className="app-container">
      {/* ── Background Frames (Canvas) ── */}
      <div className="bg-video-container">
        <FrameBackground />
      </div>

      {/* ── Halftone / Grain Overlays ── */}
      <div className="halftone-overlay" />
      <div className="overlay-texture" />

      {/* ── Dark vignette for contrast ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
        pointerEvents: "none"
      }} />

      {/* ── Left & Right Edge Darkening for safe zone ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)",
        pointerEvents: "none"
      }} />

      {/* ── Floating Parallax Shapes ── */}
      <FloatingShapes />

      {/* ── Scanlines ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        pointerEvents: "none"
      }} />

      {/* ── HTF Branding Corners ── */}
      <div style={{ position: "absolute", top: 24, left: 32, zIndex: 5 }}>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(1rem, 2vw, 1.5rem)",
          color: "#fff", WebkitTextStroke: "1px #000",
          textShadow: "3px 3px 0 #000, 0 0 20px rgba(218,16,12,0.8)",
          letterSpacing: "0.05em"
        }}>HTF&apos;26</span>
      </div>
      <div style={{
        position: "absolute", top: 28, right: 32, zIndex: 5,
        display: "flex", gap: 6, alignItems: "center"
      }}>
        <div style={{ width: 10, height: 10, background: "#DA100C", borderRadius: "50%", boxShadow: "0 0 8px #DA100C" }} className="blink-dot" />
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#fff", opacity: 0.8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Live Countdown</span>
      </div>

      {/* ── Bottom color bar ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 6, zIndex: 5,
        background: "linear-gradient(to right, #DA100C 33.33%, #FFE105 33.33%, #FFE105 66.66%, #50BAEA 66.66%)"
      }} />

      {/* ── Central Timer Content ── */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "48rem",
        padding: "0 2rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem"
      }}>
        <TimerSection />
      </div>
    </div>
  );
}

export default App;
