"use client";
import { Header } from "@/widgets/header";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center gap-12 h-[calc(100%-var(--header-height))] p-9">
        {children}
      </div>
    </main>
  );
};
