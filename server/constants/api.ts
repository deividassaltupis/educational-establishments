const DEFAULT_SCHEME = "https://"
const GOVERNMENT_API_HOST = "get.data.gov.lt"
const GOVERNMENT_API_URL = `${DEFAULT_SCHEME}${GOVERNMENT_API_HOST}`

export const PATHS = {
  EDUCATIONAL_ESTABLISHMENTS:
    "/datasets/gov/lsd/svietimo_istaigos/SvietimoIstaiga"
}

type GovernmentAPIPath = typeof PATHS

export const GOVERNMENT_API_ENDPOINT_URL: {
  [K in keyof GovernmentAPIPath]: string
} = Object.entries(PATHS).reduce(
  (acc, [key, value]) => {
    acc[key as keyof GovernmentAPIPath] = `${GOVERNMENT_API_URL}${value}`
    return acc
  },
  {} as { [K in keyof GovernmentAPIPath]: string }
)

export const CACHE_KEYS = {
  EDUCATIONAL_ESTABLISHMENTS: "educational-establishments"
}
