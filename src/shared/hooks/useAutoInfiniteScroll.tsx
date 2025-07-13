import { useEffect, useRef } from "react";

interface UseAutoInfiniteScrollProps {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  scrollContainerRef?: React.RefObject<HTMLDivElement | HTMLElement | null>;
}

export const useAutoInfiniteScroll = ({
  hasNextPage,
  isFetching,
  onLoadMore,
  rootMargin = "100px",
  scrollContainerRef,
}: UseAutoInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          onLoadMore();
        }
      },
      {
        root: scrollContainerRef?.current || null,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetching, onLoadMore, rootMargin, scrollContainerRef]);

  return { targetRef };
};
