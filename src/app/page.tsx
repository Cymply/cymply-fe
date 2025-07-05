"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
// import {useRouter} from "next/navigation";
import process from "process";

export default function Home() {
  // const router = useRouter();

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-20 font-gangwonEduAll mt-44">
        <h3 className="text-black-800 text-7xl leading-snug">
          마음 위로 번진 빛, <br /> 빛을 담은 <br />{" "}
          <span className="font-bold">마음을 전해보세요.</span>
        </h3>
        <p className="text-black-400 text-5xl leading-normal">
          펼쳐진 마음의 물결 위로 <br />
          편지 한 장 띄워보세요.
        </p>
      </div>
      <div className="flex gap-7 flex-col mb-24">
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
        <Button variant="google">
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
