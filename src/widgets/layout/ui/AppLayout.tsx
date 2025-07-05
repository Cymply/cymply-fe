"use client";
import { Header } from "@/widgets/header";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-col items-center w-full pl-6 pr-6">{children}</div>
    </main>
  );
};
