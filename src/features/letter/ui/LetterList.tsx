// src/features/letter/ui/LetterList.tsx

import { Letters } from "@/entities/letter";

export const LetterList = ({ letters }: Letters) => {
  return (
    <div className="space-y-4">
      {letters?.length && letters.map((letter) => (
        <div
          key={letter.id}
          className="mt-20 mb-[7.5rem] border-b border-dashed border-borderColor-dashed"
        >
          <h3 className="text-[3.25rem] font-semibold">{letter.senderNickname} 님에게 온 편지</h3>
          <p>{letter.content}</p>
        </div>
      ))}
    </div>
  );
};
