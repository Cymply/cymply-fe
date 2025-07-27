"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-between h-screen text-center pt-[21.75rem] pb-24">
      <div className="flex flex-col gap-12">
        <Image
          src="/images/img-error.png"
          alt="img-error"
          width={180}
          height={180}
          className="w-[11.25rem] h-[11.25rem] m-auto"
        />
        <div className="flex flex-col gap-[3.75rem]">
          <h3 className="text-7xl text-black-400 font-semibold">404</h3>
          <p className="text-[2rem] text-black-400">
            요청하신 페이지를 찾을 수 없습니다. <br />
            새로고침을 하거나 잠시후 다시 이용해주세요.
          </p>
        </div>
      </div>
      <Button onClick={() => router.push("/main")} variant="primary">
        홈으로 돌아가기
      </Button>
    </div>
  );
}
