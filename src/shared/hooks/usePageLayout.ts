import { useLayoutConfig } from "@/app/((default))/layout";
import { useEffect } from "react";

interface PageLayoutConfig {
  hasBackButton?: boolean;
  hasGradient?: boolean;
  hasPadding?: boolean;
}

export function usePageLayout(config: PageLayoutConfig) {
  const { setConfig } = useLayoutConfig();

  useEffect(() => {
    setConfig(config);

    return () => {
      setConfig({
        hasBackButton: true,
        hasGradient: true,
        hasPadding: true,
      });
    };
  }, [setConfig]);
}
