"use client";
import { Header } from "@/widgets/header";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-full h-full">
      <Header />
      <div>{children}</div>
    </main>
  );
};
