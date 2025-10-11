"use client";
import React, { createContext, useContext, useState } from "react";

interface OverlayContextType {
  openOverlay: "chatbot" | "ml" | null;
  setOpenOverlay: (overlay: "chatbot" | "ml" | null) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [openOverlay, setOpenOverlay] = useState<"chatbot" | "ml" | null>(null);

  return (
    <OverlayContext.Provider value={{ openOverlay, setOpenOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) throw new Error("useOverlay must be used within OverlayProvider");
  return context;
};
