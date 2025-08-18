"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import process from "process";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height)-6rem)] justify-between">
      <div className="flex flex-col gap-8 md:gap-16 font-gangwonEduAll flex-1 justify-center">
        <h3 className="text-black-400 text-7xl leading-snug">
          마음 위로 번진 빛, <br /> 빛을 담은 <br />{" "}
          <span className="font-bold text-black-800">마음을 전해보세요.</span>
        </h3>
        <p className="text-black-400 text-5xl leading-normal">
          윤슬은 편지와 음악으로 <br />
          마음을 전하는 공간이에요.
        </p>
      </div>
      <div className="flex gap-7 flex-col flex-shrink-0">
        <Button
          variant="kakao"
          onClick={() =>
            (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`)
          }
        >
          <Image
            src="/images/img-kakao-logo.png"
            alt="kakao-logo"
            width={54}
            height={54}
            className="w-[3.375rem] h-[3.375rem] object-contain"
          />
          카카오로 쉬운 시작
        </Button>
        <Button
          variant="google"
          onClick={() =>
            (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`)
          }
        >
          <Image
            src="/images/img-google-logo.png"
            alt="kakao-logo"
            width={54}
            height={54}
            className="w-[3.375rem] h-[3.375rem] object-contain"
          />
          Google로 로그인
        </Button>
      </div>
    </div>
  );
}
