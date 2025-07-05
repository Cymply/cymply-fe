"use client";

import { Button } from "@/components/ui/button";
// import {useRouter} from "next/navigation";
import process from "process";

export default function Home() {
  // const router = useRouter();

  return (
    <div className="flex flex-col gap-16">
      <div>
        <p className="font-pretendard font-bold text-primary text-7xl">Pretendard bold</p>
        <p className="font-gangwonEduAll font-bold text-6xl">gangwonEduAll bold</p>
        <p className="font-gangwonEduAll font-light text-black-600 text-4xl">gangwonEduAll light</p>
      </div>
      <div className="flex gap-3 flex-col">
        <Button>default</Button>
        <Button variant="primary">primary</Button>
        <Button variant="underline">underline</Button>
        <Button
          variant="kakao"
          onClick={() =>
            (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`)
          }
        >
          카카오로 로그인
        </Button>
        <Button variant="google">Google로 로그인</Button>
        <Button variant="active" size="sm">
          active small
        </Button>
        <Button variant="inactive" size="sm">
          inactive small
        </Button>
        <Button variant="border" size="md" className="font-gangwonEduAll font-bold">
          메세지 확인하기
        </Button>
      </div>
    </div>
  );
}
