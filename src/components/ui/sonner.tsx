"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "h-auto w-full p-4 rounded-md border font-pretendard text-[2rem] group toast group-[.toaster]:bg-black-500 group-[.toaster]:opacity-80 group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-white",
          actionButton: "group-[.toast]:!bg-transparent",
          cancelButton: "group-[.toast]:!bg-transparent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
