import useFetch from "./useFetch"
import { formatUrlWithParams } from "src/utils/url"

type UsePaginatedFetch = {
  url: string
  page: number
  size: number
}

type PaginatedResponse<T> = {
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
  const { data, error, loading, refetch } = useFetch<PaginatedResponse<T>>(
    formatUrlWithParams(url, { page, size })
  )

  return {
    data,
    error,
    loading,
    refetch
  }
}

export default usePaginatedFetch
