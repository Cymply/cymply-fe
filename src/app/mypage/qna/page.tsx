"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function QnaPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-between h-[calc(100vh-var(--header-height))] text-center pt-[21.75rem] pb-24">
      <div className="flex flex-col gap-12">
        <Image
          src="/images/img-error.png"
          alt="img-error"
          width={180}
          height={180}
          className="w-[11.25rem] h-[11.25rem] m-auto"
        />
        <div className="flex flex-col gap-[3.75rem]">
          <h3 className="text-6xl text-black-700 font-semibold">페이지 준비중입니다.</h3>
          <p className="text-[2rem] text-black-400">
            현재 페이지 제작을 준비하고 있으니 조금만 기다려주세요. 감사합니다.
          </p>
        </div>
      </div>
      <Button onClick={() => router.push("/main")} variant="primary">
        홈으로 돌아가기
      </Button>
    </div>
  );
}
