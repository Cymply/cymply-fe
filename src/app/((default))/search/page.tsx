"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchInput } from "@/features/search";

export default function SearchPage() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get("q") || "";

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col gap-12 h-full">
      <div className="flex flex-col gap-6 font-gangwonEduAll font-bold">
        <h3 className="text-black-800 text-5xl leading-snug">
          편지의 감정이 담긴 <br />
          노래를 골라주세요
        </h3>
        <p className="text-black-200 text-[2rem] leading-normal">
          노래를 더 정확하게 찾기 위해 <br />
          “가수 이름 + 곡명” 형태로 입력해 주세요.
        </p>
      </div>

      <SearchInput
        onSearch={handleSearch}
        initialValue={initialQuery}
        placeholder="가수명과 곡명을 함께 입력해 주세요"
      />

      {/* 노래 리스트 */}
      <div className="flex flex-col gap-12"></div>
    </div>
  );
}
