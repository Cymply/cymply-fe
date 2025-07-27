"use client";

import SetNickname from "@/entities/signup/ui/SetNickname";

export default function NicknameForm() {
  return (
    <div className="flex flex-col gap-[3.375rem]">
      <SetNickname placeholder="편지를 작성하고 받을 별명을 정해주세요" maxLength={10} showCount />
    </div>
  );
}
