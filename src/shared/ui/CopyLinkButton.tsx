import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/useToast";
import { ComponentProps } from "react";

type ButtonVariant = ComponentProps<typeof Button>["variant"];

interface CopyLinkButtonProps {
  url: string | null;
  variant?: ButtonVariant;
}

export const CopyLinkButton = ({ url, variant }: CopyLinkButtonProps) => {
  const { addToast } = useToast();

  const handleCopyLink = async () => {
    if (!url) {
      addToast({
        message: "복사할 링크가 없어요.",
        type: "error",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
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
    <Button onClick={handleCopyLink} variant={variant}>
      링크 복사하기
    </Button>
  );
};
