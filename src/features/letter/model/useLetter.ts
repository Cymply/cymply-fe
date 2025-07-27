// src/features/letter/model/useLetter.ts

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { letterApi } from "@/entities/letter/api/letterApi";
import { LetterFormValues } from "@/features/letter/model/types";
import { useCallback, useEffect } from "react";
import {useAtom, useAtomValue} from "jotai";
import {
  letterAtom,
  lettersAtom,
  recipientCodeAtom,
  recipientUrlAtom,
  userLetterLinkAtom
} from "@/entities/letter/store/letterStore";
import {useAuth} from "@/shared/hooks/useAuth";
import {musicAtom} from "@/store/musicStore";
import {SendLetterRequest} from "@/entities/letter";
import { TokenManager } from "@/shared/lib/tokenManager";
import { mockLetterDetailsById, mockLetters } from "@/entities/letter/mock/mockLetters";
import {AxiosError} from "axios";

export default function useLetter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [recipientUrl, setRecipientUrl] = useAtom(recipientUrlAtom);
  const recipientCode = useAtomValue(recipientCodeAtom);
  const [letter, setLetter] = useAtom(letterAtom);
  const [letters, setLetters] = useAtom(lettersAtom);
  const {isAuthenticated} = useAuth()
  const [selectedMusic, setSelectedMusic] = useAtom(musicAtom);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LetterFormValues>();
  
  // 편지 보내기
  const onSubmit = async (data: LetterFormValues) => {
    try {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      const sendRequest : SendLetterRequest = {
        recipientCode: recipientCode,
        content: data.contents,
        title: data.title,
        artist: selectedMusic.artist
      }
      console.log("편지 전송 확인, ", sendRequest)
      
      const res = await letterApi.sendLetter(sendRequest);
      if (res.status != 200) {
        throw res.statusText;
      }
      router.push("/letter/sent");
    } catch (error) {
      console.error(error);
    }
  };
  
  // 나의 편지를 받을 주소 생성하는 곳
  const createUserLink = async () => {
    try {
      // 토큰 체크로만 인증 확인 (상태 동기화 문제 해결)
      const token = TokenManager.getAccessToken();
      if (!token) {
        console.log("❌ AccessToken 없음 - createUserLink");
        router.push("/login");
        return;
      }
      
      console.log("✅ AccessToken 확인, 편지 링크 생성 시작");
      const res = await letterApi.createUserLetterLink();
      console.log("내 편지 받을 링크 조회", res);
      if (res.status != 200) throw res.statusText;
      setRecipientUrl(res.data.data?.content?.link);
    } catch (error) {
      console.error("편지 링크 생성 실패:", error);
      
      // API 호출 실패 시 토큰 문제일 수 있으므로 로그인으로 리다이렉트
      if (error.response?.status === 401) {
        router.push("/login");
      }
    }
  };
  
  const getLetter = useCallback(
    async (letterId: number) => {
      try {
        const isDev = process.env.NODE_ENV === "development";
        
        if (isDev) {
          console.log("⚙️ 개발 모드 - 목업 데이터 사용");
          return mockLetterDetailsById[letterId] || null; // ✅ 해당 ID의 LetterDetail 반환, 없으면 null
        }
        
        if (!isAuthenticated) {
          console.log("❌ 인증되지 않음 - getLetter");
          return;
        }
        
        const res = await letterApi.getLetter(letterId);
        console.log("편지 조회 단건", res);
        if (res.status != 200) throw res.statusText;
        setLetter(res.data.data.content);
      } catch (error) {
        console.error("편지 단건 조회 실패:", error);
      }
    },
    [isAuthenticated, setLetter]
  );
  
  // 내 편지 목록 전체 조회
  const getLetters = useCallback(async () => {
    try {
      // const isDev = process.env.NODE_ENV === "development";
      //
      // if (isDev) {
      //   console.log("⚙️ 개발 모드 - 목업 데이터 사용");
      //   setLetters(mockLetters);
      //   return;
      // }
      
      if (!isAuthenticated) {
        console.log("❌ 인증되지 않음 - getLetters");
        return;
      }
      
      // 토큰 확인
      const token = TokenManager.getAccessToken();
      if (!token) {
        console.log("❌ AccessToken 없음 - getLetters");
        throw new Error("No access token available");
      }
      
      console.log("✅ 토큰 확인 완료, 편지 목록 조회 시작");
      const res = await letterApi.getLetters();
      console.log("내 편지들 조회 결과:", res);
      
      if (res.status !== 200) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      
      setLetters(res.data.data.content);
      console.log("✅ 편지 목록 조회 완료");
    } catch (error) {
      console.error("편지 목록 조회 실패:", error);
      
      // 401 에러인 경우 로그인 페이지로 리다이렉트
      if (error instanceof AxiosError && error.response?.status === 401) {
        console.log("🔄 401 에러 - 로그인 페이지로 리다이렉트");
        TokenManager.clearTokens();
        router.push("/login");
      }
    }
  }, [isAuthenticated, setLetters, router]);
  
  return {
    register,
    handleSubmit,
    watch,
    onSubmit,
    errors,
    createUserLink,
    getLetter,
    getLetters,
    recipientUrl,
  };
}
