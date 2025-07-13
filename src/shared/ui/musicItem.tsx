"use client";
import { cn } from "@/lib/utils";
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

import Image from "next/image";

export const MusicItem = ({
  music,
  option = "none",
  className = "",
}: MusicItemProps) => {
  return (
    <div className={cn(className)}>
      {/* <div className="flex items-center gap-4 justify-center"> */}
      <div className="w-120 h-120 rounded-[0.625rem] bg-gray-700">
        {music.thumbnail && (
          <Image
            src={music.thumbnail}
            alt={music.title}
            width={120}
            height={120}
            className="rounded-lg"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex w-full gap-2 items-center">
        <div className="text-[2rem] flex-1 text-left">
          <p className="text-4xl">{music.title || "앨범명"}</p>
          <p className="text-xl">{music.artist || "가수명"}</p>
        </div>
        {option === "play" && (
          <button onClick={() => {}} aria-label="재생">
            <Image
              src="/icons/ico-polygon.svg"
              alt="icon-polygon"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </div>
  );
};
