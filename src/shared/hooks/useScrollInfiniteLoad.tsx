import { useEffect, useCallback } from "react";

interface UseScrollInfiniteLoadProps {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  threshold?: number;
}

export const useScrollInfiniteLoad = ({
  hasNextPage,
  isFetching,
  onLoadMore,
  scrollContainerRef,
  threshold = 50,
}: UseScrollInfiniteLoadProps) => {
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isFetching || !hasNextPage) return;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // 스크롤이 하단에서 threshold 픽셀 이내에 있으면 다음 페이지 로드
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      console.log("무한스크롤 트리거! 다음 페이지 로드");
      onLoadMore();
    }
  }, [hasNextPage, isFetching, onLoadMore, scrollContainerRef, threshold]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, scrollContainerRef]);
};
