import { Button } from "@/components/ui/button";
import { Letter } from "@/entities/letter";

type LetterCardProps = {
  letter: Letter;
};

export const LetterCard = ({ letter }: LetterCardProps) => {
  return (
    <div className="flex flex-col pt-9 pl-9 pr-9 pb-[3.75rem] shadow-xl bg-white text-xl">
      <div className="w-full h-[27.75rem] p-5 rounded-[0.625rem] bg-gray-300">앨범 커버</div>
      <div className="flex flex-col gap-4 pt-[1.875rem] pb-11 text-4xl font-bold">
        <p className="text-black-600">{letter.content}</p>
        <p className="text-black-300">노래 제목</p>
      </div>
      <Button variant={"border"} className="pt-7 pb-7">
        메세지 확인하기
      </Button>
    </div>
  );
};
