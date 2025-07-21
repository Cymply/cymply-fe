import { Letter } from "@/entities/letter";
import Portal from "@/widgets/portal/ui/Potal";
import Image from "next/image";

type ModalProps = {
  isModalOpen: boolean;
  isLoading: boolean;
  detailItem: Letter | null;
  handleModalClose: () => void;
};

export const Modal = ({ isModalOpen, isLoading, detailItem, handleModalClose }: ModalProps) => {
  if (isLoading) {
    return <p>편지 불러오는 중...</p>;
  }
  return (
    <Portal containerId="modal-root">
      {isModalOpen && detailItem && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black-900/70"
          onClick={handleModalClose}
        >
          <div className="relative bg-white pt-9 pl-9 pr-9 pb-[3.75rem] w-[42.375rem] shadow-xl">
            <button onClick={handleModalClose} className="absolute top-9 right-9 w-12 h-12">
              <Image src="/icons/ico-close.svg" alt="icon-close" fill className="object-contain" />
            </button>
            <div className="flex flex-col"></div>
          </div>
        </div>
      )}
    </Portal>
  );
};
