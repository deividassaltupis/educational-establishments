/**
 * Formats a URL with the given search parameters.
 *
 * @param baseUrl - The base URL to which the search parameters will be added.
 * @param params - An object containing the search parameters as key-value pairs.
 * @returns The formatted URL with search parameters.
 */
export const formatUrlWithParams = (
  baseUrl: string,
  params: { [key: string]: string | number | boolean }
) => {
  const url = new URL(baseUrl)
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, String(params[key]))
  })
  return url.toString()
}
