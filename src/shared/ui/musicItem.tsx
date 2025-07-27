"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import useSelectMusicItem from "@/entities/music/hooks/useSelectMusicItem";

export type TMusicItem = {
  title: string;
  artist: string;
  thumbnail?: string;
};
interface MusicItemProps {
  music: TMusicItem;
  option?: "play" | "select" | "none";
  className?: string;
}

export const MusicItem = ({ music, option = "none", className = "" }: MusicItemProps) => {
  const { selectedMusic } = useSelectMusicItem();
  return (
    <div className={cn(className)}>
      {/* <div className="flex items-center gap-4 justify-center"> */}
      <div className="relative w-[7.5rem] min-w-[7.5rem] h-[7.5rem]">
        {music.thumbnail && (
          <Image
            src={music.thumbnail}
            alt={music.title}
            fill
            className="object-contain rounded-[0.625rem]"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex w-full gap-2 items-center justify-between">
        <div className="text-[2rem] flex-1 text-left">
          <p className="text-black-800">{music.title || "앨범명"}</p>
          <p className="text-black-300">{music.artist || "가수명"}</p>
        </div>
        {option === "play" && (
          <button onClick={() => {}} aria-label="재생" className="relative w-12 h-12">
            <Image
              src="/icons/ico-polygon.svg"
              alt="icon-polygon"
              fill
              className="object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
};
