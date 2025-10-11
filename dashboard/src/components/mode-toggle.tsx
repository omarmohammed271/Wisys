import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { iScalar } = useResponsiveScalars(); // we can use iScalar for icon sizing

  const iconSize = iScalar; // scales with screen

  return (
    <Button
      variant="ghost"
      size="icon"
      className="z-50 ring-0 relative"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun
        className={`absolute transition-all`}
        style={{
          width: `${iconSize}rem`,
          height: `${iconSize}rem`,
          transform: theme === "light" ? "scale(1) rotate(0deg)" : "scale(0) rotate(-90deg)",
        }}
      />
      <Moon
        className={`absolute transition-all`}
        style={{
          width: `${iconSize}rem`,
          height: `${iconSize}rem`,
          transform: theme === "dark" ? "scale(1) rotate(0deg)" : "scale(0) rotate(90deg)",
        }}
      />
    </Button>
  );
}
