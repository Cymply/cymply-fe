
"use client";

import useLetter from "@/features/letter/model/useLetter";
import { LetterEmpty, LetterList } from "@/features/letter";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { lettersAtom } from "@/entities/letter/store/letterStore";
import { useAuth } from "@/shared/hooks/useAuth";
import {TokenManager} from "@/shared/lib/tokenManager";

export default function MainPage() {
  const letters = useAtomValue(lettersAtom);
  const { getLetters } = useLetter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        // 인증 로딩이 완료되고 인증된 상태에서만 API 호출
        if (!authLoading && isAuthenticated) {
          console.log('✅ 인증 완료, 편지 목록 조회 시작');
          await getLetters();
        } else if (!authLoading && !isAuthenticated) {
          console.log('❌ 인증되지 않음, 편지 목록 조회 건너뜀');
        }
      } catch (error) {
        console.error('편지 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLetters();
  }, [isAuthenticated, authLoading, getLetters]); // 의존성 배열에 필요한 값들 추가
  
  // 인증 로딩 중이거나 편지 로딩 중일 때
  if (authLoading || loading) {
    return <p>편지 불러오는 중...</p>;
  }
  
  // 인증되지 않은 경우
  if (!isAuthenticated) {
    return <p>로그인이 필요합니다.</p>;
  }
  
  console.log('📮 편지 목록:', letters);
  
  return letters?.length ? <LetterList letters={letters} /> : <LetterEmpty />;
}