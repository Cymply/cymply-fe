export interface ApiResponse<T> {
  success: boolean;
  data: {
    content: T;
    pagination: Pagination | null;
  };
  errorMessage: string | null;
}

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
