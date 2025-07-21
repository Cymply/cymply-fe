"use client";

import { useState } from "react";
import { Letter, Letters } from "@/entities/letter";
import { LetterCard } from "@/shared/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { groupLettersBySender } from "@/entities/letter";
import { Modal } from "@/widgets/modal/ui/Modal";
import useLetter from "../model/useLetter";

export const LetterList = ({ letters }: Letters) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailLetter, setDetailLetter] = useState<Letter | null>(null);
  const groupedLetters = groupLettersBySender(letters);

  const { getLetter } = useLetter();

  const handleModalOpen = async (letter: Letter) => {
    try {
      if (!letter.id) {
        console.error("편지 id가 없습니다.");
        return;
      }

      setLoading(true);
      setIsModalOpen(true);

      await getLetter(letter.id);
      setDetailLetter(letter);
    } catch (error) {
      console.error("편지 상세 조회 실패:", error);
      setDetailLetter(letter);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDetailLetter(null);
  };

  return (
    <div>
      <div className="flex flex-col">
        {groupedLetters.map((group, idx) => (
          <div
            key={idx}
            className="font-gangwonEduAll border-b border-dashed border-borderColor-dashed"
          >
            {/* 타이틀 */}
            <div className="mt-[4.5rem] mb-[4.5rem]">
              <h3 className="text-[3.25rem] font-semibold text-black-400">
                ✉️{" "}
                <span className="text-black-800">{group[0]?.senderNickname ?? "알 수 없음"}</span>{" "}
                님에게 온 편지
              </h3>
            </div>

            {/* 편지 카드 */}
            <div className="mb-[7.5rem]">
              <Swiper
                spaceBetween={24}
                slidesPerView={"auto"}
                centeredSlides={false}
                style={{ width: "100%" }}
              >
                {group.map((letter) => (
                  <SwiperSlide key={letter.id} style={{ width: "76%" }}>
                    <LetterCard letter={letter} handleModalOpen={() => handleModalOpen(letter)} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isModalOpen={isModalOpen}
        isLoading={loading}
        detailItem={detailLetter}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};
