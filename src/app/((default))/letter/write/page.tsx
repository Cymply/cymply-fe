"use client";

import { LetterForm } from "@/features/letter";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSelectMusicItem from "@/entities/music/hooks/useSelectMusicItem";
import { MusicItem, SelectMusicBox } from "@/shared/ui";
import { isEmpty } from "@/lib/utils";
import { Suspense } from "react";
import { useSetAtom } from "jotai";
import { alertAtom } from "@/widgets/alert";

export default function LetterWritePage() {
  const router = useRouter();
  const setAlert = useSetAtom(alertAtom);
  const { selectedMusic } = useSelectMusicItem();

  const onGoToMain = () => {
    setAlert({
      open: true,
      title: (
        <>
          작성한 편지 내용이 <br />
          모두 삭제됩니다.
        </>
      ),
      message: "홈으로 이동하시겠어요?",
      buttons: [
        {
          label: "홈으로 돌아가기",
          action: () => router.push("/main"),
        },
        {
          label: "계속 편지 작성하기",
          action: () => {},
        },
      ],
    });
  };

  return (
    <div className="flex flex-col justify-between h-full mt-6 mb-24">
      <div className="flex flex-col gap-6 h-full">
        <div className="flex items-center gap-9">
          {/* <div className="w-[7.5rem] h-[7.5rem] rounded-[0.625rem] bg-gray-700">
            {selectedMusic.thumbnail && (
              <Image
                src={selectedMusic.thumbnail || ""}
                alt="music-thumbnail"
                width={120}
                height={120}
              />
            )}
          </div> */}
          <div className="w-full">
            {isEmpty(selectedMusic.title) ? (
              <SelectMusicBox onGoToSearch={() => router.push("/search")} />
            ) : (
              <MusicItem
                music={selectedMusic}
                className="flex gap-4 w-full"
                option={isEmpty(selectedMusic) ? "none" : "play"}
              />
            )}
          </div>
          {/* <div className="text-[2rem]">
            <p className="text-black-800">{selectedMusic.title || "앨범명"}</p>
            <p className="text-black-300">{selectedMusic.artist || "가수명"}</p>
          </div> */}
        </div>
        <Suspense fallback={<div>편지 폼을 불러오는 중...</div>}>
          <LetterForm id="letterForm" />
        </Suspense>
      </div>
      <div className="flex flex-col gap-6">
        <Button
          type="submit"
          form="letterForm"
          variant={isEmpty(selectedMusic.title) ? "disabled" : "primary"}
        >
          편지 보내기
        </Button>
        <Button onClick={onGoToMain} variant="secondary">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
