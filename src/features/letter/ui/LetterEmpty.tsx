"use client";

import useLetter from "@/features/letter/model/useLetter";
import { useAuth } from "@/shared/hooks/useAuth";
import { CopyLinkButton, UrlLinkBox } from "@/shared/ui";
import { useEffect } from "react";

export const LetterEmpty = () => {
  const { createUserLink, recipientUrl } = useLetter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      await createUserLink();
    };
    init();
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col gap-[3.75rem] mt-[6.25rem]">
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
      <CopyLinkButton url={recipientUrl} />
    </div>
  );
};
