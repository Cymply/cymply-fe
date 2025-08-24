// 2. features/myPage/ui/LogoutButton.tsx
"use client";

import { useSetAtom } from "jotai";
import { useLogout } from "../hooks/useLogout";
import { alertAtom } from "@/widgets/alert";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton = ({ className, children }: LogoutButtonProps) => {
  const { handleLogout } = useLogout();
  const setAlert = useSetAtom(alertAtom);

  const onLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    setAlert({
      open: true,
      title: <>로그아웃 하시겠습니까?</>,
      message: "",
      buttons: [
        {
          label: "확인",
          action: () => handleLogout(),
        },
        {
          label: "취소",
          action: () => {},
        },
      ],
    });

    // if (confirm('정말 로그아웃 하시겠습니까?')) {
    //   await handleLogout();
    // }
  };

  return (
    <form onSubmit={onLogout}>
      <button type="submit" className={className}>
        {children || "로그아웃"}
      </button>
    </form>
  );
};
