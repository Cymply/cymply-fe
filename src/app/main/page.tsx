"use client";

import useLetter from "@/features/letter/model/useLetter";
import { LetterEmpty, LetterList } from "@/features/letter";
import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { lettersAtom } from "@/entities/letter/store/letterStore";
import { useAuth } from "@/shared/hooks/useAuth";
import { alertAtom } from "@/widgets/alert";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  
  const letters = useAtomValue(lettersAtom);
  const { getLetters } = useLetter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  const router = useRouter();
  const setAlert = useSetAtom(alertAtom);
  
  useEffect(() => {
    const handleAuthAndData = async () => {
      // 인증 로딩이 완료될 때까지 대기
      if (authLoading) return;
      
      try {
        if (isAuthenticated) {
          console.log("✅ 인증 완료, 편지 목록 조회 시작");
          await getLetters();
        } else {
          console.log("❌ 인증되지 않음, 로그인 알림 표시");
          // 인증되지 않은 경우 바로 알림 표시
          // setAlert({
          //   open: true,
          //   title: (
          //     <>
          //       로그인 인증이 <br />
          //       만료되었습니다.
          //     </>
          //   ),
          //   message: "재로그인 해주시기 바립니다.",
          //   buttons: [
          //     {
          //       label: "로그인하러 가기",
          //       action: () => router.push("/login"),
          //     },
          //   ],
          // });
        }
      } catch (error) {
        console.error("편지 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    
    handleAuthAndData();
  }, [isAuthenticated, authLoading, getLetters, setAlert, router]);
  
  // 인증 로딩 중이거나 편지 로딩 중일 때
  if (authLoading || loading) {
    return <p>편지 불러오는 중...</p>;
  }
  
  // 인증되지 않은 경우 (알림이 이미 표시됨)
  if (!isAuthenticated) {
    return null;
  }
  
  console.log("📮 편지 목록:", letters);
  
  return letters.length > 1 ? <LetterList letters={letters} /> : <LetterEmpty />;
}