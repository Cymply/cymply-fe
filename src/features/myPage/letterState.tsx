"use client";

import { letterApi } from "@/entities/letter/api/letterApi";
import { LetterLinkButton } from "@/shared/ui/LetterLinkButton";
import { useQuery } from "@tanstack/react-query";

export const LetterState = () => {
  const { data: letterInfo } = useQuery({
    queryKey: ["letterInfo"],
    queryFn: () => letterApi.getLetterCount(),
  });

  return (
    <div className="flex gap-6">
      <LetterLinkButton
        className="w-1/2 h-[13.5rem] flex flex-col justify-between p-9 bg-gray-500 rounded-2xl"
        title="받은 편지"
        onClick={() => {}}
        iconUrl="/images/img-receivedLetter.png"
        count={letterInfo?.data?.data?.content?.receivedCount || 0}
      />
      <LetterLinkButton
        className="w-1/2 h-[13.5rem] flex flex-col justify-between p-9 bg-gray-500 rounded-2xl"
        title="보낸 편지"
        onClick={() => {}}
        iconUrl="/images/img-sendLetter.png"
        count={letterInfo?.data?.data?.content?.sentCount || 0}
      />
    </div>
  );
};
