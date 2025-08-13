"use client";

import React from "react";
import { BackBtn } from "@/widgets/header/ui/BackBtn";
import { LayoutProvider, useLayoutConfig } from "@/shared/contexts/layoutContext";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { config } = useLayoutConfig();

  return (
    <main
      className={`relative flex flex-col w-full h-full overflow-y-hidden ${
        config.hasGradient ? "gradient-grad" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between p-[1.5625rem] w-full box-border h-[var(--header-height)]">
        {config.hasBackButton && <BackBtn />}
      </div>
      <div className={`flex flex-col w-full h-full ${config.hasPadding ? "px-9" : "px-0"}`}>
        {children}
      </div>
    </main>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </LayoutProvider>
  );
}
