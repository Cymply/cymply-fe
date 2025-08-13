import { useLayoutConfig } from "../contexts/layoutContext";
import { useLayoutEffect } from "react";

interface PageLayoutConfig {
  hasBackButton?: boolean;
  hasGradient?: boolean;
  hasPadding?: boolean;
}

export function usePageLayout(config: PageLayoutConfig) {
  const { setConfig } = useLayoutConfig();

  useLayoutEffect(() => {
    setConfig(config);

    return () => {
      setConfig({
        hasBackButton: true,
        hasGradient: true,
        hasPadding: true,
      });
    };
  }, [setConfig, config.hasBackButton, config.hasGradient, config.hasPadding]);
}
