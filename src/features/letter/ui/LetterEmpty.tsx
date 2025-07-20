// src/features/letter/ui/LetterEmpty.tsx

"use client";

import { Button } from "@/components/ui/button";
import useLetter from "@/features/letter/model/useLetter";

export const LetterEmpty = () => {
  const { createUserLink, recipientUrl } = useLetter();
  return (
    <div className="flex flex-col gap-24 h-full mt-32">
      <div className="flex flex-col gap-28">
        <h3 className="font-gangwonEduAll font-bold text-black-800 text-6xl leading-tight">
          ✉️ 아직 도착한 <br/>
          편지가 없어요
        </h3>
        <h3 className="font-gangwonEduAll font-bold text-black-800 text-6xl leading-tight">
          먼저 당신의 마음을 <br/>
          건네볼까요?
        </h3>
        <div className="text-4xl">
          Cymply URL
          <br/>
          <span className="text-xl select-all">{recipientUrl}</span>
        </div>
      
      </div>
      <div>
        <Button onClick={createUserLink}>링크 복사하기</Button>
      </div>
    </div>
  );
};
