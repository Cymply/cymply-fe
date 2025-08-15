"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/useToast";
import CopyIcon from "@/assets/icons/ico-copy.svg";
import { isEmpty } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { userApi } from "@/entities/user/api/userApi";
import { useAtom } from "jotai";
import { recipientUrlAtom } from "@/entities/letter";

interface UrlLinkBoxProps {
  backgroundColor?: string;
}

export const UrlLinkBox = ({ backgroundColor = "black-600" }: UrlLinkBoxProps) => {
  const [letterRecipientUrl, setLetterRecipientUrl] = useAtom(recipientUrlAtom);
  const { addToast } = useToast();
  
  // 환경에 따라 도메인을 교체하는 함수
  const replaceDomainForDev = (url: string): string => {
    if (!url) return url;
    
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
      // 개발 환경에서는 cymply.kr 도메인을 localhost:3000으로 교체
      return url.replace(/https?:\/\/(www\.)?cymply\.kr/g, 'http://localhost:3000');
    }
    
    return url; // 프로덕션에서는 그대로 반환
  };
  
  // **표시용 URL - atom의 URL을 항상 환경에 맞게 변환**
  const displayUrl = useMemo(() => {
    return replaceDomainForDev(letterRecipientUrl);
  }, [letterRecipientUrl]);
  
  // **복사용 URL - 표시용과 동일**
  const copyUrl = useMemo(() => {
    return replaceDomainForDev(letterRecipientUrl);
  }, [letterRecipientUrl]);
  
  const handleCopyLink = async () => {
    if (!letterRecipientUrl) {
      addToast({
        message: "복사할 링크가 없어요.",
        type: "error",
      });
      return;
    }
    
    try {
      await navigator.clipboard.writeText(copyUrl);
      addToast({
        message: "내 링크가 복사되었어요!",
        type: "success",
      });
    } catch (err) {
      addToast({
        message: "링크 복사를 실패했습니다. 재시도 해주세요.",
        type: "error",
      });
      console.error("링크 복사 실패:", err);
    }
  };
  
  useEffect(() => {
    const getUrl = async () => {
      try {
        const res = await userApi.makeUrl();
        const originalUrl = res?.content?.link || "";
        
        // **atom에는 원본 URL을 저장** (변환하지 않음)
        // 표시할 때 변환하므로 원본을 저장해야 함
        setLetterRecipientUrl(originalUrl);
        
        // 디버깅용 로그
        if (process.env.NODE_ENV === 'development') {
          console.log('🔗 원본 URL (atom 저장):', originalUrl);
          console.log('🔗 표시용 URL:', replaceDomainForDev(originalUrl));
        }
        
      } catch (error) {
        console.error("링크 생성 실패:", error);
      }
    };
    
    // letterRecipientUrl이 없을 때만 API 호출
    if (!letterRecipientUrl) {
      getUrl();
    }
  }, [letterRecipientUrl, setLetterRecipientUrl]);
  
  return (
    <div
      className={`flex flex-col gap-12 pt-12 pb-12 pl-9 pr-9 bg-${backgroundColor} rounded-[0.625rem] w-full`}
    >
      <div className="flex flex-col gap-6">
        <p className="text-[2rem] font-bold text-white">✉️ 내 링크</p>
        {displayUrl ? (
          <p className="text-[2rem] font-medium text-white break-all">{displayUrl}</p>
        ) : (
          <p className="text-[2rem] font-medium text-white">링크를 생성하는 중...</p>
        )}
      </div>
      <Button
        onClick={handleCopyLink}
        variant="default"
        className="flex items-center justify-center bg-white text-black-600 rounded-full text-[2rem] hover:bg-white"
        disabled={isEmpty(letterRecipientUrl)}
      >
        <div className="relative w-[1.5625rem] h-8">
          <CopyIcon className={`absolute !w-auto !h-auto text-${backgroundColor}`} />
        </div>
        <span className={`text-${backgroundColor}`}>복사하기</span>
      </Button>
    </div>
  );
};