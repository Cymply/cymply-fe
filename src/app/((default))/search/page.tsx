"use client";

import { SearchInput } from "@/features/search";
import { useInfiniteSearch } from "@/shared/hooks/useInfiniteSearch";
import { useScrollInfiniteLoad } from "@/shared/hooks/useScrollInfiniteLoad";
import { MusicItem, TMusicItem } from "@/shared/ui/musicItem";
import { isEmpty } from "../../../lib/utils";
import { Button } from "@/components/ui/button";
import { musicApi } from "@/entities/music/api/musicApi";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import useSelectMusicItem from "@/entities/music/hooks/useSelectMusicItem";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SearchPage() {
  const router = useRouter();
  const { selectedMusic, handleMusicSelect, handleSelectedMusicReset } =
    useSelectMusicItem();

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
    scrollContainerRef:
      scrollContainerRef as React.RefObject<HTMLElement | null>,
    threshold: 50,
  });

  // 음악 고유 식별자 생성 함수
  const getMusicId = (music: TMusicItem) =>
    `${music.title || ""}-${music.artist || ""}-${music.thumbnail || ""}`;

  useEffect(() => {
    handleSelectedMusicReset();
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      {/* 헤더 영역 */}
      <div className="flex flex-col gap-6 font-gangwonEduAll font-bold flex-shrink-0">
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
      <div className="mt-6 mb-6 flex-shrink-0">
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
      <div
        ref={scrollContainerRef}
        className=" overflow-y-auto pr-2 border border-gray-100 rounded-lg p-4"
      >
        {!isEmpty(searchParams.keyword) && data.length > 0 ? (
          <RadioGroup
            value={
              selectedMusic.title && selectedMusic.artist
                ? getMusicId(selectedMusic)
                : undefined
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
                  thumbnail: selectedMusicItem.thumbnail || "",
                });
              }
            }}
            className="flex flex-col gap-4"
          >
            {data.map((result: TMusicItem, index: number) => (
              <RadioGroupItem
                value={getMusicId(result)}
                key={`${result.title}-${result.artist}-${result.thumbnail}-${index}`}
                className="flex items-center gap-4 justify-center"
              >
                <MusicItem
                  key={`${result.title}-${result.artist}-${result.thumbnail}-${index}`}
                  music={result}
                  className={cn(
                    "w-full gap-4 flex",
                    selectedMusic.title === result.title &&
                      selectedMusic.artist === result.artist &&
                      selectedMusic.thumbnail === result.thumbnail &&
                      "!bg-yellow-50 border-[0.1875rem] !border-amber-400 "
                  )}
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
            <div className="text-center text-gray-800">
              <p className="text-lg mb-2">검색어를 입력해주세요</p>
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 영역 - 고정 간격 */}
      <div className="flex flex-col gap-6 mt-6 mb-6 flex-shrink-0">
        <Button
          onClick={() => {
            router.push("/letter/write");
          }}
          variant="primary"
          disabled={!selectedMusic.title || !selectedMusic.artist}
        >
          편지 보내기
        </Button>
        <Button
          onClick={() => {
            router.push("/main");
          }}
          variant="secondary"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
