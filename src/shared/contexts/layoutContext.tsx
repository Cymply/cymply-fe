"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

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

interface LayoutProviderProps {
  children: React.ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [config, setConfigState] = useState<LayoutConfig>({
    hasBackButton: true,
    hasGradient: true,
    hasPadding: true,
  });

  const setConfig = useCallback((newConfig: Partial<LayoutConfig>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const contextValue = useMemo(
    () => ({
      config,
      setConfig,
    }),
    [config, setConfig]
  );

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
}
