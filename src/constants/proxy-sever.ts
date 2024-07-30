const DEFAULT_SCHEME = process.env.PROXY_SERVER_URL_SCHEME || "http://"
const PROXY_SERVER_HOST = process.env.PROXY_SERVER_HOST || "127.0.0.1:5000"

const PROXY_SERVER_URL = `${DEFAULT_SCHEME}${PROXY_SERVER_HOST}`

export const PROXY_SERVER_PATH = {
  TEST_CONNECTION: "/api",
  EDUCATIONAL_ESTABLISHMENTS: "/api/educational-establishments"
}

type ProxyServerPath = typeof PROXY_SERVER_PATH

export const PROXY_SERVER_ENDPOINT_URL: {
  [K in keyof ProxyServerPath]: string
} = Object.entries(PROXY_SERVER_PATH).reduce(
  (acc, [key, value]) => {
    acc[key as keyof ProxyServerPath] = `${PROXY_SERVER_URL}${value}`
    return acc
  },
  {} as { [K in keyof ProxyServerPath]: string }
)
