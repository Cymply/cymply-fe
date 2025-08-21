"use client";

import useLetter from "@/features/letter/model/useLetter";
import { LetterEmpty, LetterList } from "@/features/letter";
import { Suspense, useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { lettersAtom } from "@/entities/letter/store/letterStore";
import { useAuth } from "@/shared/hooks/useAuth";
import { alertAtom } from "@/widgets/alert";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/shared/ui";
import {logout} from "@/shared/lib/apiClient";

function MainPageContent() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const letters = useAtomValue(lettersAtom);
  const setAlert = useSetAtom(alertAtom);
  const { getLetters } = useLetter(); // 이 훅 내부에서 useSearchParams() 사용
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        // 인증 로딩이 완료되고 인증된 상태에서만 API 호출
        if (!authLoading && isAuthenticated) {
          // console.log("✅ 인증 완료, 편지 목록 조회 시작");
          await getLetters();
        } else if (!authLoading && !isAuthenticated) {
          console.log("❌ 인증되지 않음, 편지 목록 조회 건너뜀");
        }
      } catch (error) {
        console.error("편지 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLetters();
  }, [isAuthenticated, authLoading, getLetters]);
  
  useEffect(() => {
    // 인증되지 않은 경우
    if (!loading && !authLoading && !isAuthenticated) {
      setAlert({
        open: true,
        title: (
          <>
            로그인 인증이 <br />
            만료되었습니다.
          </>
        ),
        message: "재로그인 해주시기 바립니다.",
        buttons: [
          {
            label: "로그인하러 가기",
            action: () => router.push("/login"),
          },
        ],
      });
    }
  }, [loading, authLoading, isAuthenticated, setAlert, router]);
  
  // 인증 로딩 중이거나 편지 로딩 중일 때
  if (authLoading || loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  console.log("📮 편지 목록:", letters);

  return letters.length >= 1 ? (
    <LetterList letters={letters} />
  ) : (
    <LetterEmpty />
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MainPageContent />
    </Suspense>
  );
}