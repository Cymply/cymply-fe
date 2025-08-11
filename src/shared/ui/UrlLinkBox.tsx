"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/useToast";
import CopyIcon from "@/assets/icons/ico-copy.svg";
import { isEmpty } from "@/lib/utils";

interface UrlLinkBoxProps {
  recipientUrl: string | null;
  backgroundColor?: string;
}

export const UrlLinkBox = ({
  recipientUrl,
  backgroundColor = "black-600",
}: UrlLinkBoxProps) => {
  const { addToast } = useToast();

  const handleCopyLink = async () => {
    if (!recipientUrl) {
      addToast({
        message: "복사할 링크가 없어요.",
        type: "error",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(recipientUrl);
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

  return (
    <div
      className={`flex flex-col gap-12 pt-12 pb-12 pl-9 pr-9 bg-${backgroundColor} rounded-[0.625rem] w-full`}
    >
      <div className="flex flex-col gap-6">
        <p className="text-[2rem] font-bold text-white">✉️ 내 링크</p>
        {recipientUrl ? (
          <p className="text-[2rem] font-medium text-white break-all">{recipientUrl}</p>
        ) : (
          <p></p>
        )}
      </div>
      <Button
        onClick={handleCopyLink}
        variant="default"
        className="flex items-center justify-center bg-white text-black-600 rounded-full text-[2rem] hover:bg-white"
        disabled={isEmpty(recipientUrl)}
      >
        <div className="relative w-[1.5625rem] h-8">
          <CopyIcon
            className={`absolute !w-auto !h-auto text-${backgroundColor}`}
          />
        </div>
        <span className={`text-${backgroundColor}`}>복사하기</span>
      </Button>
    </div>
  );
};
