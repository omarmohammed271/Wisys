import { useState, useEffect } from "react";

interface Scalars {
  textScalar: number;
  barScalar: number;
  iScalar: number;
}

export function useResponsiveScalars(): Scalars {
  const [scalars, setScalars] = useState<Scalars>({
    textScalar: 1,
    barScalar: 1,
    iScalar: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      let newTextScalar = 1;
      let newBarScalar = 1;
      let newIScalar = 1;

      // Small Screens (Mobile Portrait)
      if (width <= 600) {
        newTextScalar = 1;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Medium Screens (Tablets and Large Phones)
      else if (width <= 1024) {
        newTextScalar = 1;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Medium Screens (Tablets and Large Phones)
      else if (width <= 1224) {
        newTextScalar = 1;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Large Screens (Laptops and Small Desktops)
      else if (width <= 1366) {
        newTextScalar = 0.6;
        newBarScalar = 1;
        newIScalar = 1;
      }
      // Extra Large Screens (Desktops)
      else if (width <= 1520) {
        newTextScalar = 0.8;
        newBarScalar = 1.4;
        newIScalar = 1;
      }
      // Extra Large Screens (Desktops)
      else if (width <= 1920) {
        newTextScalar = 1;
        newBarScalar = 1.4;
        newIScalar = 1;
      }
      // WQHD Screens
      else if (width <= 3460) {
        newTextScalar = 1.5;
        newBarScalar = 2.3;
        newIScalar = 1.4;
      }
      // 4K Screens
      else if (width <= 3840) {
        newTextScalar = 2.35;
        newBarScalar = 2.3;
        newIScalar = 1.4;
      }
      // Ultra-Wide Screens
      else if (width <= 4850) {
        newTextScalar = 4.5;
        newBarScalar = 3;
        newIScalar = 2.6;
      }
      // Very Large Displays
      else {
        newTextScalar = 4.5;
        newBarScalar = 3;
        newIScalar = 2.6;
      }

      setScalars({
        textScalar: newTextScalar,
        barScalar: newBarScalar,
        iScalar: newIScalar,
      });
    };

    // 👉 Call immediately on mount
    handleResize();

    // 👉 Attach listener
    window.addEventListener("resize", handleResize);

    // 👉 Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // runs once on mount

  return scalars;
}
