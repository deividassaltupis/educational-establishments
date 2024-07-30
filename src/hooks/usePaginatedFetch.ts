import { toast } from "react-toastify"
import useFetch from "./useFetch"
import { formatUrlWithParams } from "src/utils/url"

type UsePaginatedFetch = {
  url: string
  page: number
  size: number
}

export type PaginatedResponse<T> = {
  data: T[]
  page: number
  size: number
  total: number
}

const usePaginatedFetch = <T>({
  url,
  page = 1,
  size = 40
}: UsePaginatedFetch) => {
  if (size > 100) {
    size = 40
  }

  if (page < 1) {
    page = 1
  }

  const { data, error, isLoading, refetch } = useFetch<PaginatedResponse<T>>(
    formatUrlWithParams(url, { page, size })
  )

  return {
    paginatedResponse: data,
    error,
    isLoading,
    refetch
  }
}

export default usePaginatedFetch
