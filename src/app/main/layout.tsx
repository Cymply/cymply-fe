import React from "react";
import { Header } from "@/widgets/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex flex-col w-full h-full bg-[url('/images/img-main-bg.png')] bg-cover bg-center bg-no-repeat">
      <Header />
      <div className="flex flex-col w-full h-full pl-9 pr-9">{children}</div>
    </main>
  );
}
