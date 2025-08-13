"use client";

import { Button } from "@/components/ui/button";
import useLetter from "@/features/letter/model/useLetter";
import { useAuth } from "@/shared/hooks/useAuth";
import { LoadingSpinner, UrlLinkBox } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { useAtomValue } from "jotai";
import { letterApi, recipientCodeAtom } from "@/entities/letter";

function LetterSentContent() {
  const router = useRouter();
  const { createUserLink } = useLetter();
  const { isAuthenticated } = useAuth();
  const recipientCode = useAtomValue(recipientCodeAtom);
  const [recipientName, setRecipientName] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      await getRecipientData();
      await createUserLink();
    };
    init();
  }, [isAuthenticated, createUserLink]);

  const onGoToMain = () => {
    router.push("/main");
  };

  const getRecipientData = async () => {
    try {
      const res = await letterApi.getRecipientName(recipientCode);
      if (res.status != 200) {
        throw res.statusText;
      }
      setRecipientName(res.data?.data?.content?.nickname);
    } catch (error) {
      console.error("❌ getRecipientData error", error);
      console.log("🔍 수신자 정보 에러");
    }
  };

  return (
    <div className="h-full flex flex-col justify-between gap-[7.5rem] mt-10 mb-24">
      <div className="flex flex-col gap-[4.5rem] h-full">
        <div className="flex flex-col gap-12 font-gangwonEduAll font-bold">
          <h3 className="text-[4rem] leading-tight">
            ✉️ {recipientName} 님에게 <br />
            편지가 전달되었어요.
          </h3>
          <p className="text-5xl text-black-300">나에게 편지 써달라고 하기</p>
        </div>
        <UrlLinkBox backgroundColor="primary" />
      </div>
      <Button onClick={onGoToMain} variant="secondary">
        홈으로 돌아가기
      </Button>
    </div>
  );
}

export default function LetterSentPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LetterSentContent />
    </Suspense>
  );
}
