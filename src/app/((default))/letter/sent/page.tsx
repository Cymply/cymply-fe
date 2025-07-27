"use client";

import { Button } from "@/components/ui/button";
import useLetter from "@/features/letter/model/useLetter";
import { useAuth } from "@/shared/hooks/useAuth";
import { CopyLinkButton, UrlLinkBox } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LetterSentPage() {
  const router = useRouter();
  const { createUserLink, recipientUrl } = useLetter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      await createUserLink();
    };
    init();
  }, [isAuthenticated]);

  const handleGoMain = () => {
    router.push("/main");
  };

  return (
    <div className="flex flex-col gap-[7.5rem] mt-10">
      <div className="flex flex-col gap-16 h-full">
        <div className="flex flex-col gap-12 font-gangwonEduAll font-bold">
          <h3 className="text-[4rem] leading-tight">
            ✉️ 방재현 님에게 <br />
            편지가 전달되었어요.
          </h3>
          <p className="text-5xl text-black-300">나에게 편지 써달라고 하기</p>
        </div>
        <UrlLinkBox recipientUrl={recipientUrl} />
      </div>
      <div className="flex flex-col gap-6">
        <CopyLinkButton url={recipientUrl} variant={"primary"} />
        <Button onClick={handleGoMain} variant="secondary">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
