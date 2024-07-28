import { useCallback, useEffect, useState } from "react"

type FetchState<T> = {
  data: T | null
  error: Error | null
  isLoading: boolean
}

type UseFetchResult<T> = FetchState<T> & {
  refetch: () => void
}

const useFetch = <T>(url: string, options?: RequestInit): UseFetchResult<T> => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true
  })

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = (await response.json()) as T
      setFetchState({ data, error: null, isLoading: false })
    } catch (error) {
      setFetchState({ data: null, error: error as Error, isLoading: false })
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    ...fetchState,
    refetch: fetchData
  }
}

export default useFetch
