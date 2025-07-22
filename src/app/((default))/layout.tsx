// src/((default))/layout.tsx

import { BackBtn } from "@/widgets/header/ui/BackBtn";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex flex-col w-full h-full gradient-grad overflow-y-hidden">
      <div className="flex items-center justify-between p-9 w-full box-border h-[var(--header-height)]">
        <BackBtn />
      </div>
      <div className="flex flex-col w-full h-full pl-9 pr-9">{children}</div>
    </main>
  );
}
