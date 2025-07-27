import Portal from "@/widgets/portal/ui/Potal";
import Image from "next/image";
import { ReactNode } from "react";

type ModalProps = {
  isModalOpen: boolean;
  isLoading: boolean;
  handleModalClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isModalOpen, isLoading, handleModalClose, children }: ModalProps) => {
  if (isLoading) {
    return (
      <Portal containerId="modal-root">
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-900/70">
            <p className="text-white text-lg">편지 불러오는 중...</p>
          </div>
        )}
      </Portal>
    );
  }

  return (
    <Portal containerId="modal-root">
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black-900/70"
          onClick={handleModalClose}
        >
          <div
            className="relative bg-white pt-[5.25rem] pl-9 pr-9 pb-[3.75rem] w-[42.375rem] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleModalClose} className="absolute top-9 right-9 w-12 h-12">
              <Image src="/icons/ico-close.svg" alt="icon-close" fill className="object-contain" />
            </button>
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};
