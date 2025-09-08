"use client";

import { SearchInput } from "@/features/search";
import { useInfiniteSearch } from "@/shared/hooks/useInfiniteSearch";
import { useScrollInfiniteLoad } from "@/shared/hooks/useScrollInfiniteLoad";
import { MusicItem, TMusicItem } from "@/shared/ui";
import { isEmpty } from "../../../lib/utils";
import { Button } from "@/components/ui/button";
import { musicApi } from "@/entities/music/api/musicApi";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import useSelectMusicItem from "@/entities/music/hooks/useSelectMusicItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { LoadingSpinner } from "@/shared/ui"; // 실제 경로에 맞게 수정
import { usePageLayout } from "@/shared/hooks/usePageLayout";

function SearchPageContent() {
  const router = useRouter();
  const urlSearchParams = useSearchParams(); // 이 부분이 Suspense 필요
  const [userCode, setUserCode] = useState<string | null>(null);

  const { selectedMusic, handleMusicSelect, handleSelectedMusicReset } = useSelectMusicItem();

  const { data, search, loadMore, hasNextPage, isFetching, searchParams } =
    useInfiniteSearch<TMusicItem>({
      queryKey: "searchMusic",
      queryFn: async (params) => {
        const response = await musicApi.getMusic(params);
        return response.data;
      },
      initialLimit: 10,
    });

  // 스크롤 컨테이너 ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 기반 무한스크롤 설정
  useScrollInfiniteLoad({
    hasNextPage,
    isFetching,
    onLoadMore: loadMore,
    scrollContainerRef: scrollContainerRef as React.RefObject<HTMLElement | null>,
    threshold: 50,
  });

  // 음악 고유 식별자 생성 함수
  const getMusicId = (music: TMusicItem) =>
    `${music.title || ""}-${music.artist || ""}-${music.thumbnailUrl || ""}`;

  // user-code 파라미터 확인
  useEffect(() => {
    const code = urlSearchParams.get("user-code");
    if (code) {
      console.log("🔍 편지 받는 사람 코드:", code);
      setUserCode(code);
    }
  }, [urlSearchParams]);

  useEffect(() => {
    handleSelectedMusicReset();
  }, []); // 컴포넌트 마운트 시에만 실행

  // layout 설정
  usePageLayout({
    hasGradient: false,
    hasPadding: false,
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* 헤더 영역 */}
      <div className="flex flex-col gap-[1.875rem] font-gangwonEduAll font-bold flex-shrink-0 mt-[2.8rem] pl-9 pr-9">
        <h3 className="text-black-800 text-5xl leading-snug">
          편지의 감정이 담긴 <br />
          노래를 골라주세요
        </h3>
        <p className="text-black-200 text-[2rem] leading-normal">
          노래를 더 정확하게 찾기 위해 <br />
          &quot;가수 이름 + 곡명&quot; 형태로 입력해 주세요.
        </p>
      </div>

      {/* 검색창 */}
      <div className="mt-6 mb-6 flex-shrink-0 pl-9 pr-9">
        <SearchInput
          onSearch={(query) => {
            handleSelectedMusicReset();
            search(query);
          }}
          initialValue={searchParams.keyword || ""}
          placeholder="가수명과 곡명을 함께 입력해 주세요"
        />
      </div>

      {/* 검색 결과 영역 - 최대 높이 제한 */}
      <div ref={scrollContainerRef} className="overflow-y-auto flex-1">
        {!isEmpty(searchParams.keyword) && data.length > 0 ? (
          <RadioGroup
            value={
              selectedMusic.title && selectedMusic.artist ? getMusicId(selectedMusic) : undefined
            }
            onValueChange={(value) => {
              // 선택된 value로 전체 음악 객체 찾기
              const selectedMusicItem = data.find(
                (music: TMusicItem) => getMusicId(music) === value
              );

              if (selectedMusicItem) {
                handleMusicSelect({
                  title: selectedMusicItem.title,
                  artist: selectedMusicItem.artist,
                  thumbnailUrl: selectedMusicItem.thumbnailUrl || "",
                });
              }
            }}
            className="flex flex-col gap-4"
          >
            {data.map((result: TMusicItem, index: number) => (
              <RadioGroupItem
                value={getMusicId(result)}
                key={`${result.title}-${result.artist}-${result.thumbnailUrl}-${index}`}
                className={cn(
                  "pt-6 pb-6 pl-9 pr-9 flex items-center gap-4 justify-center transition delay-100 duration-300 ease-in-out",
                  selectedMusic.title === result.title &&
                    selectedMusic.artist === result.artist &&
                    selectedMusic.thumbnailUrl === result.thumbnailUrl &&
                    "!bg-primary-light"
                )}
              >
                <MusicItem
                  key={`${result.title}-${result.artist}-${result.thumbnailUrl}-${index}`}
                  music={result}
                  className="w-full gap-9 flex"
                />
              </RadioGroupItem>
            ))}

            {/* 로딩 표시 */}
            {isFetching && (
              <div className="h-4 flex items-center justify-center">
                <div className="text-gray-500 text-sm">로딩 중...</div>
              </div>
            )}
          </RadioGroup>
        ) : (
          // 아직 검색하지 않은 경우
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-800"></div>
          </div>
        )}
      </div>

      {/* 하단 버튼 영역 - 고정 간격 */}
      <div className="block mb-40 w-full shadow-button pl-9 pr-9">
        {selectedMusic.title || selectedMusic.artist ? (
          <Button
            onClick={() => {
              router.push("/letter/write");
            }}
            variant="primary"
            // disabled={!selectedMusic.title || !selectedMusic.artist}
          >
            노래 선택
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchPageContent />
    </Suspense>
  );
}
