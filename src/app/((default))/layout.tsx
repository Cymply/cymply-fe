"use client";

import React, { useContext, useState, createContext } from "react";
import { BackBtn } from "@/widgets/header/ui/BackBtn";

interface LayoutConfig {
  hasBackButton: boolean;
  hasGradient: boolean;
  hasPadding: boolean;
}

interface LayoutContextType {
  config: LayoutConfig;
  setConfig: (config: Partial<LayoutConfig>) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function useLayoutConfig() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutConfig must be used within LayoutProvider");
  }
  return context;
}

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [config, setConfigState] = useState<LayoutConfig>({
    hasBackButton: true,
    hasGradient: true,
    hasPadding: true,
  });

  const setConfig = (newConfig: Partial<LayoutConfig>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <LayoutContext.Provider value={{ config, setConfig }}>
      <main
        className={`relative flex flex-col w-full h-full overflow-y-hidden ${
          config.hasGradient ? "gradient-grad" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between p-[1.5625rem] w-full box-border h-[var(--header-height)]">
          {config.hasBackButton && <BackBtn />}
        </div>
        <div
          className={`flex flex-col w-full h-full ${config.hasPadding ? "pl-9 pr-9" : "pl-0 pr-0"}`}
        >
          {children}
        </div>
      </main>
    </LayoutContext.Provider>
  );
}
