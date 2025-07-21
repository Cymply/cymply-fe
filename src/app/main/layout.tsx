import React from "react";
import { Header } from "@/widgets/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Header />
      <div className="absolute inset-0 bg-[url('/images/img-main-bg.png')] bg-cover bg-center bg-no-repeat z-0"></div>
      <div className="relative z-10 pt-[var(--header-height)] overflow-y-scroll h-full px-9 pb-[4.5rem]">
        {children}
      </div>
    </main>
  );
}
