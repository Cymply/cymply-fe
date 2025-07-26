// src/features/letter/ui/LetterEmpty.tsx

"use client";

import { Button } from "@/components/ui/button";
import useLetter from "@/features/letter/model/useLetter";
import { UrlLinkBox } from "@/shared/ui";

export const LetterEmpty = () => {
  const { createUserLink, recipientUrl } = useLetter();
  return (
    <div className="flex flex-col gap-24 h-full mt-[7.5rem]">
      <div className="flex flex-col font-gangwonEduAll font-bold">
        <h3 className="text-black-800 text-[4rem] leading-tight mb-[4.5rem]">
          ✉️ 아직 도착한 <br />
          편지가 없어요
        </h3>
        <h3 className="text-black-800 text-[4rem] leading-tight mb-9">
          먼저 당신의 마음을 <br />
          건네볼까요?
        </h3>
        <p className="text-black-300 text-[2rem]">윤슬은 링크를 통해서만 편지를 받을 수 있어요.</p>
      </div>
      <UrlLinkBox recipientUrl={recipientUrl} />
      <Button onClick={createUserLink} className="mt-3">
        링크 복사하기
      </Button>
    </div>
  );
};
