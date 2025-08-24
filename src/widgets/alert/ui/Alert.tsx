"use client";

import { useAtom } from "jotai";
import { alertAtom } from "../model/alertAtom";
import Portal from "@/widgets/portal/ui/Potal";
import { cn } from "@/lib/utils";

export const Alert = () => {
  const [{ open, title, message, buttons = [] }, setAlert] = useAtom(alertAtom);

  const close = () => {
    setAlert({ open: false, title: "", message: "", buttons: [] });
  };

  const hasCloseButton = buttons.some(
    (btn) => btn.label === "취소" || btn.label.toLowerCase() === "cancel"
  );

  if (!open) return null;

  return (
    <Portal containerId="portal-root">
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black-900/70"
        onClick={hasCloseButton ? close : undefined}
      >
        <div
          className="bg-white pt-[3.75rem] pl-11 pr-11 pb-[4.5rem] rounded-lg w-[42.375rem] text-left shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-[3.75rem]">
            <h3 className="pb-6 text-5xl leading-tight font-bold text-black-600">{title}</h3>
            <p className="text-4xl leading-tight text-gray-800">{message}</p>
          </div>
          <div className="flex justify-center gap-[1.125rem] w-full">
            {buttons.map((btn, idx) => {
              // 버튼이 2개 이상일 때 홀수/짝수 인덱스에 따라 다른 색상 적용
              const buttonStyle =
                buttons.length >= 2
                  ? idx % 2 === 0
                    ? "bg-black-200" // 짝수 인덱스 (0, 2, 4...)
                    : "bg-primary" // 홀수 인덱스 (1, 3, 5...)
                  : "bg-black-200"; // 버튼이 1개일 때
              return (
                <button
                  className={cn(
                    "w-full rounded-[0.625rem] pt-[2.625rem] pb-[2.625rem] text-[1.75rem] text-white",
                    buttonStyle
                  )}
                  key={idx}
                  onClick={() => {
                    btn.action();
                    close();
                    // setAlert({ open: false, title: "", message: "", buttons: [] });
                  }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Portal>
  );
};
