// features/myPage/ui/DeleteAccountButton.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { DeleteAccountModal } from "./DeleteAccountModal";

interface DeleteAccountButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function DeleteAccountButton({ children, className }: DeleteAccountButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const { deleteUser } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUser();
      // deleteUser 함수가 이미 리다이렉트를 처리하므로 추가 작업 불필요
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsDeleting(false);
      setShowModal(false);
    }
  };
  
  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={className}
        disabled={isDeleting}
      >
        {children}
      </button>
      
      {showModal && (
        <DeleteAccountModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowModal(false)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}