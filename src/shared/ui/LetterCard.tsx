import { Button } from "@/components/ui/button";
import { Letter } from "@/entities/letter";
import Image from "next/image";
import Link from "next/link";

type LetterCardProps = {
  letter: Letter;
  handleModalOpen: (letter: Letter) => void;
};

export const LetterCard = ({ letter, handleModalOpen }: LetterCardProps) => {
  return (
    <div className="flex flex-col pt-9 pl-9 pr-9 pb-[3.75rem] shadow-card bg-white text-xl">
      <div className="relative w-full h-[27.75rem] p-5 rounded-[0.625rem]">
        {letter.isRead && (
          <div className="absolute top-5 left-5 pt-4 pb-4 pl-6 pr-6 bg-primary rounded-full font-gangwonEduAll font-bold text-white text-[2rem]">
            New
          </div>
        )}

        <Link href={letter.videoUrl}>
          {letter.musicThumbnailUrl ? (
            <Image
              src={letter.musicThumbnailUrl}
              alt={letter.musicTitle}
              fill
              className="object-contain rounded-[0.625rem]"
              loading="lazy"
              unoptimized={true}
            />
          ) : (
            <div className="w-full bg-gray-600"></div>
          )}
        </Link>
      </div>
      <div className="flex flex-col gap-4 pt-[1.875rem] pb-11 text-4xl font-bold">
        <p className="text-black-600">{letter.title}</p>
        <p className="text-black-300">{letter.musicTitle}</p>
      </div>
      <Button variant={"border"} className="pt-7 pb-7" onClick={() => handleModalOpen(letter)}>
        편지 확인하기
      </Button>
    </div>
  );
};
