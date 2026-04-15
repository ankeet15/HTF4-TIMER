
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

function App() {
  return (
    <div className="app-container">
      {/* ── Background Frames (Canvas) ── */}
      <div className="bg-video-container">
        <FrameBackground />
      </div>

      {/* ── Optional Overlays for contrast/clarity ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
        pointerEvents: "none"
      }} />

      {/* ── Bottom color bar ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 6, zIndex: 5,
        background: "linear-gradient(to right, #DA100C 33.33%, #FFE105 33.33%, #FFE105 66.66%, #50BAEA 66.66%)"
      }} />

      {/* ── Central Timer Content ── */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "90rem",
        padding: "0 clamp(2rem, 5vw, 6rem)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(1.5rem, 4vw, 4rem)"
      }}>
        <TimerSection />
      </div>
    </div>
  );
}

export default App;
