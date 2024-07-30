import usePaginatedFetch from "../usePaginatedFetch"
import { EducationalEstablishment } from "src/types/entities/educational-establishment"
import { PROXY_SERVER_ENDPOINT_URL } from "src/constants/proxy-sever"
import { useLocalStorage } from "../useLocalStorage"

type UseEducationalEstablishments = {
  paginationOptions: {
    page: number
    size: number
  }
}

const useEducationalEstablishments = ({
  paginationOptions
}: UseEducationalEstablishments) => {
  const { paginatedResponse, isLoading, error } =
    usePaginatedFetch<EducationalEstablishment>({
      url: PROXY_SERVER_ENDPOINT_URL.EDUCATIONAL_ESTABLISHMENTS,
      page: paginationOptions.page,
      size: paginationOptions.size
    })

  const { storedValue: storedEstablishments } = useLocalStorage<
    EducationalEstablishment[]
  >("establishments", [])

  const establishments = paginatedResponse?.data

  if (!establishments) {
    return {
      paginatedResponse: {
        page: 1,
        size: 40,
        total: 0,
        ...paginatedResponse,
        data: [] as EducationalEstablishment[]
      },
      isLoading,
      error
    }
  }

  if (!storedEstablishments || storedEstablishments.length === 0) {
    return {
      paginatedResponse: {
        ...paginatedResponse,
        data: establishments
      },
      isLoading,
      error
    }
  }

  const combinedEstablishments = establishments?.map((establishment) => {
    const storedEstablishment = storedEstablishments.find(
      (storedEstablishment) => storedEstablishment._id === establishment._id
    )

    return {
      ...establishment,
      ...storedEstablishment
    }
  })

  storedEstablishments.forEach((storedEstablishment) => {
    const establishment = combinedEstablishments.find(
      (establishment) => establishment._id === storedEstablishment._id
    )

    if (!establishment) {
      combinedEstablishments.push(storedEstablishment)
    }
  })

  return {
    paginatedResponse: {
      ...paginatedResponse,
      data: combinedEstablishments
    },
    isLoading,
    error
  }
}

export default useEducationalEstablishments
