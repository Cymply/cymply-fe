"use client";

import { LetterLinkButton } from "@/shared/ui/LetterLinkButton";

export const LetterState = ({
  receivedLetterCount,
  sentLetterCount,
}: {
  receivedLetterCount: number;
  sentLetterCount: number;
}) => {
  return (
    <div className="flex gap-6">
      <LetterLinkButton
        className="w-1/2 h-[13.5rem] flex flex-col justify-between p-9 bg-gray-500 rounded-2xl"
        title="받은 편지"
        onClick={() => {}}
        iconUrl="/images/img-receivedLetter.png"
        count={receivedLetterCount}
      />
      <LetterLinkButton
        className="w-1/2 h-[13.5rem] flex flex-col justify-between p-9 bg-gray-500 rounded-2xl"
        title="보낸 편지"
        onClick={() => {}}
        iconUrl="/images/img-sendLetter.png"
        count={sentLetterCount}
      />
    </div>
  );
};
