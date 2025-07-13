import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface InfiniteSearchParams {
  keyword: string;
  limit: number;
}

interface InfiniteSearchResponse<T> {
  data: {
    content: T[];
    totalCount: number;
  };
}

interface UseInfiniteSearchProps<T> {
  queryKey: string;
  queryFn: (
    params: InfiniteSearchParams & { page: number }
  ) => Promise<InfiniteSearchResponse<T>>;
  initialLimit?: number;
}

export const useInfiniteSearch = <T,>({
  queryKey,
  queryFn,
  initialLimit = 10,
}: UseInfiniteSearchProps<T>) => {
  const [searchParams, setSearchParams] = useState<InfiniteSearchParams>({
    keyword: "",
    limit: initialLimit,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true); // 초기값은 true

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey, searchParams, currentPage],
    queryFn: () => queryFn({ ...searchParams, page: currentPage }),
    enabled: searchParams.keyword.length > 0,
    staleTime: 1000 * 60,
  });

  // 데이터가 변경될 때마다 누적 데이터 업데이트
  useEffect(() => {
    if (data) {
      const newContent = data.data.content;

      if (currentPage === 1) {
        // 새로운 검색일 때는 기존 데이터 초기화
        setAllData(newContent);
      } else {
        // 페이지 추가 로드일 때는 기존 데이터에 추가
        setAllData((prev) => [...prev, ...newContent]);
      }

      setTotalCount(data.data.totalCount);

      // hasNextPage 업데이트 로직
      if (newContent.length === 0) {
        // 받은 데이터가 없으면 더 이상 페이지가 없음
        setHasNextPage(false);
      } else if (newContent.length < searchParams.limit) {
        // 받은 데이터가 요청한 limit보다 적으면 마지막 페이지
        setHasNextPage(false);
      } else {
        // 정상적으로 limit만큼 받았으면 더 있을 수 있음
        setHasNextPage(true);
      }
    }
  }, [data, currentPage, searchParams.limit]);

  const search = useCallback((keyword: string) => {
    setSearchParams((prev) => ({ ...prev, keyword }));
    setCurrentPage(1);
    setAllData([]);
    setHasNextPage(true); // 새로운 검색 시 다시 true로 설정
  }, []);

  const loadMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isFetching, hasNextPage]);

  return {
    data: allData,
    isLoading,
    isFetching,
    hasNextPage,
    totalCount,
    search,
    loadMore,
    searchParams,
  };
};
