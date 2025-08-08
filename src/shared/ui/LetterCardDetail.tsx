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
      <div className="flex flex-col ga p-9">
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
          <h3 className="text-5xl text-black-600">{detailItem.title}</h3>
          <div className="text-4xl leading-normal text-black-300">{detailItem.content}</div>
        </div>
      </div>
      <div className="mt-28 font-gangwonEduAll font-bold">
        <Button variant={"border"} className="pt-7 pb-7">
          답장하기
        </Button>
      </div>
    </>
  );
};
