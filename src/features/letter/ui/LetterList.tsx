"use client";

import { useEffect, useState } from "react";
import { Letter, LetterDetail, Letters, recipientCodeAtom } from "@/entities/letter";
import { LetterCard, LetterCardDetail } from "@/shared/ui";
import { Modal } from "@/widgets/modal/ui/Modal";
import useLetter from "../model/useLetter";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSetAtom } from "jotai/index";

interface LetterListProps {
  letters: Letters[];
}

export const LetterList = ({ letters }: LetterListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailLetter, setDetailLetter] = useState<LetterDetail | null>(null);
  const setRecipientCode = useSetAtom(recipientCodeAtom);

  const { getLetter } = useLetter();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleModalOpen = async (letter: Letter) => {
    try {
      if (!letter.letterId) {
        console.error("편지 id가 없습니다.");
        return;
      }

      setLoading(true);
      setIsModalOpen(true);

      const fetchedDetail = await getLetter(letter.letterId);
      setDetailLetter(fetchedDetail ?? null);
      setRecipientCode(fetchedDetail?.recipientCode || null);
      // 쿠키에도 recipient코드 저장
      if (fetchedDetail?.recipientCode) {
        const maxAge = 60 * 60; // 1시간
        const encodedCode = encodeURIComponent(fetchedDetail.recipientCode);

        document.cookie = `recipientCode=${encodedCode}; max-age=${maxAge}; path=/; samesite=lax`;

        console.log("📝 recipientCode 쿠키 저장:", fetchedDetail.recipientCode);
      }
    } catch (error) {
      console.error("편지 상세 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDetailLetter(null);
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col mt-2">
        {letters.map((group, idx) => (
          <div
            key={idx}
            className="font-gangwonEduAll border-b border-dashed border-borderColor-dashed"
          >
            {/* 타이틀 */}
            <div className="mt-[4.5rem] mb-[4.5rem]">
              <h3 className="text-[3.25rem] font-semibold text-black-400">
                ✉️ <span className="text-black-800">{group.senderName ?? "알 수 없음"}</span> 님에게
                온 편지
              </h3>
            </div>

            {/* 편지 카드 */}
            <div className="mb-[7.5rem]">
              <Swiper
                spaceBetween={24}
                slidesPerView={"auto"}
                centeredSlides={false}
                style={{ width: "100%", overflow: "visible" }}
              >
                {!loading &&
                  group.letters
                    .slice()
                    .reverse()
                    .map((letter) => (
                      <SwiperSlide key={letter.letterId} style={{ width: "76%" }}>
                        <LetterCard
                          letter={letter}
                          handleModalOpen={() => handleModalOpen(letter)}
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
      <Modal isModalOpen={isModalOpen} isLoading={loading} handleModalClose={handleModalClose}>
        {detailLetter ? (
          <LetterCardDetail detailItem={detailLetter} />
        ) : (
          !loading && isModalOpen && <p>편지 내용을 불러올 수 없습니다.</p>
        )}
      </Modal>
    </div>
  );
};
