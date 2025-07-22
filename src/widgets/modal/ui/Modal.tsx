import { Button } from "@/components/ui/button";
import { LetterDetail } from "@/entities/letter";
import { cn } from "@/lib/utils";
import { MusicItem } from "@/shared/ui";
import Portal from "@/widgets/portal/ui/Potal";
import Image from "next/image";

type ModalProps = {
  isModalOpen: boolean;
  isLoading: boolean;
  detailItem: LetterDetail | null;
  handleModalClose: () => void;
};

export const Modal = ({ isModalOpen, isLoading, detailItem, handleModalClose }: ModalProps) => {
  if (isLoading) {
    return <p>편지 불러오는 중...</p>;
  }

  console.log(detailItem);

  return (
    <Portal containerId="modal-root">
      {isModalOpen && detailItem && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black-900/70"
          onClick={handleModalClose}
        >
          <div className="relative bg-white pt-[5.25rem] pl-9 pr-9 pb-[3.75rem] w-[42.375rem] shadow-xl">
            <button onClick={handleModalClose} className="absolute top-9 right-9 w-12 h-12">
              <Image src="/icons/ico-close.svg" alt="icon-close" fill className="object-contain" />
            </button>
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
          </div>
        </div>
      )}
    </Portal>
  );
};
