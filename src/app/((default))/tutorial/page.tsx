"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { clearRedirectCookies, getRedirectUrl } from "@/utils/authUtils";
import { useSetAtom } from "jotai";
import { recipientCodeAtom } from "@/entities/letter";
import { usePageLayout } from "@/shared/hooks/usePageLayout";

const TutorialSlideData = [
  {
    id: 1,
    title: "나만의 편지함 주소 생성",
    description: `내 링크를 받은 친구만 나에게 편지를 보낼 수 있어요. \n 링크는 간편하게 복사가 가능해요.`,
    image: "/images/img-tutorial-01.png",
  },
  {
    id: 2,
    title: "친구가 편지 쓰기",
    description:
      "친구는 내가 보낸 편지함 링크를 통해 편지를 작성해요. \n 친구의 마음이 담긴 음악을 받을 수 있어요.",
    image: "/images/img-tutorial-02.png",
  },
  {
    id: 3,
    title: "편지 도착",
    description:
      "음악과 함께 도착한 따뜻한 말을 확인해보세요. \n 아직 읽지 않은 편지에는 NEW 표시가 붙어있어요.",
    image: "/images/img-tutorial-03.png",
  },
];

export default function TutorialPage() {
  const router = useRouter();
  const setRedirectCode = useSetAtom(recipientCodeAtom);

  // layout 설정
  usePageLayout({
    hasBackButton: false,
  });

  const onGoToMain = () => {
    // router.push("/main");
    // 리다이렉트 URL 결정
    const redirect = getRedirectUrl();
    console.log("✅ 회원가입 완료, 리다이렉트 URL:", redirect.redirectUrl);

    if (redirect?.recipientCode) {
      setRedirectCode(redirect?.recipientCode);
    }

    // 쿠키 정리
    clearRedirectCookies();

    console.log("🚀 페이지 이동:", redirect.redirectUrl);
    router.push(redirect.redirectUrl);
  };

  return (
    <div className="h-full flex flex-col justify-between gap-[7.5rem] mt-[5.75rem] mb-24 overflow-x-hidden">
      <div className="overflow-x-hidden">
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
          }}
          style={
            {
              overflow: "visible",
              "--swiper-pagination-color": "#EEB33D",
              "--swiper-pagination-bullet-inactive-color": "#d9d9d9",
              "--swiper-pagination-bullet-size": "1.125rem",
              "--swiper-pagination-bullet-horizontal-gap": "0.5rem",
              "--swiper-pagination-bottom": "-6.75rem",
            } as React.CSSProperties
          }
        >
          {TutorialSlideData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-5xl font-bold text-black-600 mb-6">{slide.title}</h3>
                <p className="text-[1.75rem] text-center text-black-300 mb-[6.75rem] whitespace-pre-line">
                  {slide.description}
                </p>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={544}
                  height={620}
                  className="w-[34rem] h-[38.75rem]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Button onClick={onGoToMain} variant="primary">
        시작하기
      </Button>
    </div>
  );
}
