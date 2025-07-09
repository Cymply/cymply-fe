import React from "react";
import { LogoBtn } from "@/widgets/header";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex flex-col w-full h-full bg-[url('/images/img-login-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex justify-between items-center p-9 w-full box-border h-[var(--header-height)]">
        <LogoBtn />
      </div>
      <div className="flex flex-col w-full h-full pl-9 pr-9">{children}</div>
    </main>
  );
}
