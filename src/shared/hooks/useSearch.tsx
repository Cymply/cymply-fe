import { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { actionModeType } from "@/shared/model/common_types";

interface BaseSearchState {
  limit?: number;
  timestamp?: number;
}

interface BaseTableState {
  pageSize?: number;
  page?: number;
}

interface SearchHookProps<
  State extends BaseSearchState = BaseSearchState,
  TableState extends BaseTableState = BaseTableState,
  Result = unknown
> {
  initialState: State;
  initialTableState: TableState;
  queryKey: string;
  queryFn: (
    params: State,
    setTableParams: (params: TableState) => void
  ) => Promise<Result>;
  enabled?: boolean;
}

const useSearch = <
  State extends BaseSearchState = BaseSearchState,
  TableState extends BaseTableState = BaseTableState,
  Result = unknown
>({
  initialState,
  initialTableState,
  queryKey,
  queryFn,
  enabled,
}: SearchHookProps<State, TableState, Result>) => {
  const initialParams = initialState;
  const initialTableParams = initialTableState;
  const [params, setParams] = useState<State>(initialState);
  const [tableParams, setTableParams] = useState<TableState>(initialTableState);
  const queryClient = useQueryClient();

  const query = useQuery<Result>({
    queryKey: [queryKey, params],
    queryFn: () => {
      return queryFn(params, setTableParams);
    },
    enabled,
    staleTime: 1000 * 0,
    gcTime: 1000 * 60, // staleTime 유지 후 1분 gc
  });

  const getData = (searchParams: State) => {
    if (
      JSON.stringify(params) ===
      JSON.stringify({ ...searchParams, limit: tableParams.pageSize, page: 1 })
    ) {
      query.refetch();
    } else {
      setParams({
        ...searchParams,
        limit: tableParams.pageSize,
        page: 1,
      });
    }
  };

  const removeCacheData = () => {
    queryClient.removeQueries({ queryKey: [queryKey, params] });
  };

  const refresh = useCallback(
    async (type: actionModeType) => {
      // 새로운 게시물 등록 할 떄, 검색어 옵션 초기화 하여 조회한다.
      if (type === "CREATE") {
        setParams((prev: State) => {
          return {
            ...initialParams,
            limit: prev.limit,
            timestamp: Date.now(),
          } as State;
        });
        setTableParams((prev: TableState) => {
          return {
            ...initialTableParams,
            pageSize: prev.pageSize,
            page: 1,
          } as TableState;
        });
      } else {
        query.refetch();
      }
    },
    [
      queryClient,
      queryKey,
      initialParams,
      initialTableParams,
      queryFn,
      query,
      setTableParams,
    ]
  );

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching,
    isStale: query.isStale,
    params,
    tableParams,
    setParams,
    setTableParams,
    refresh,
    getData,
    removeCacheData,
  };
};

export default useSearch;
