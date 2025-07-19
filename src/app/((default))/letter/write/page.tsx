"use client";

import { LetterForm } from "@/features/letter";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSelectMusicItem from "@/entities/music/hooks/useSelectMusicItem";
// import Image from "next/image";
import { MusicItem } from "@/shared/ui/musicItem";
import { isEmpty } from "@/lib/utils";

export default function LetterWritePage() {
  const router = useRouter();
  const { selectedMusic } = useSelectMusicItem();

  const handleGoMain = () => {
    router.push("/main");
  };

  return (
    <div className="flex flex-col justify-between h-full mt-12 mb-24">
      <div className="flex flex-col gap-12 h-full">
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
              <div
                className="w-full h-40 border border-gray-300 flex items-center justify-center rounded-[0.625rem] text-2xl"
                onClick={() => {
                  router.push("/search");
                }}
              >
                음악을 선택해주세요
              </div>
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
        <div>
          <LetterForm id="letterForm" />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Button type="submit" form="letterForm" variant="primary">
          편지 보내기
        </Button>
        <Button onClick={handleGoMain} variant="secondary">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
