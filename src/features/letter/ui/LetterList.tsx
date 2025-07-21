import { Letters } from "@/entities/letter";
import { LetterCard } from "@/shared/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { groupLettersBySender } from "@/entities/letter";

export const LetterList = ({ letters }: Letters) => {
  const groupedLetters = groupLettersBySender(letters);

  return (
    <div className="flex flex-col">
      {groupedLetters.map((group, idx) => (
        <div
          key={idx}
          className="font-gangwonEduAll border-b border-dashed border-borderColor-dashed"
        >
          {/* 타이틀 */}
          <div className="mt-[4.5rem] mb-[4.5rem]">
            <h3 className="text-[3.25rem] font-semibold text-black-400">
              ✉️ <span className="text-black-800">{group[0]?.senderNickname ?? "알 수 없음"}</span>{" "}
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
              slideToClickedSlide={true}
            >
              {group.map((letter) => (
                <SwiperSlide key={letter.id} style={{ width: "76%" }}>
                  <LetterCard letter={letter} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
};
