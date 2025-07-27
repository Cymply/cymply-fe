import { Button } from "@/components/ui/button";
import { LetterDetail } from "@/entities/letter";
import { MusicItem } from "@/shared/ui";

interface LetterCardDetailProps {
  detailItem: LetterDetail;
}

export const LetterCardDetail = ({ detailItem }: LetterCardDetailProps) => {
  if (!detailItem) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-9">
        {/* 노래 영역 */}
        <div className="flex pt-9 pb-9">
          <MusicItem
            music={detailItem.music}
            option="play"
            className="w-full gap-9 flex"
          ></MusicItem>
        </div>
        {/* 컨텐츠 영역 */}
        <div className="flex flex-col gap-11 font-gangwonEduAll font-bold">
          <h3 className="text-5xl text-black-600">편지 제목</h3>
          <div className="text-4xl leading-normal text-black-300">{detailItem.content}</div>
        </div>
      </div>
      <div className="mt-28">
        <Button variant={"border"}>편지 보내기</Button>
      </div>
    </>
  );
};
