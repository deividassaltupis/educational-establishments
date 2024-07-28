export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  SIZE: 40
}

export const paginate = <T>(
  data: T[],
  page = PAGINATION_DEFAULTS.PAGE,
  size = PAGINATION_DEFAULTS.SIZE
) => {
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size

  return {
    total: data.length,
    page,
    size,
    data: data.slice(startIndex, endIndex)
  }
}

export const containsOnlyNumbers = (value: string) => {
  const regex = /^[0-9]+$/
  return regex.test(value)
}
