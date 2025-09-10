import { useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Watch for fullscreen changes (important if user presses ESC)
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen(); // whole page
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="p-2 rounded-xl hover:bg-accent transition *:size-5"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? <Minimize2 /> : <Maximize2 />}
    </button>
  );
}

export default FullscreenToggle;
