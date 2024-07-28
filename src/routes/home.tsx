import { Box, Container } from "@mui/material"
import { useEffect, useState } from "react"

import { Link, useSearchParams } from "react-router-dom"
import EstablishmentsTable from "src/components/routes/home/establishments-table"
import { PROXY_SERVER_ENDPOINT_URL } from "src/constants/proxy-sever"
import useFetch from "src/hooks/useFetch"
import usePaginatedFetch from "src/hooks/usePaginatedFetch"
import { EducationalEstablishment } from "src/types/entities/educational-establishment"

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialPage = parseInt(searchParams.get("page") || "1", 10)
  const initialSize = parseInt(searchParams.get("size") || "40", 10)

  const [paginationOptions, setPaginationOptions] = useState({
    page: initialPage,
    size: initialSize
  })

  const { paginatedResponse, isLoading, error } =
    usePaginatedFetch<EducationalEstablishment>({
      url: PROXY_SERVER_ENDPOINT_URL.EDUCATIONAL_ESTABLISHMENTS,
      page: paginationOptions.page,
      size: paginationOptions.size
    })

  useEffect(() => {
    setSearchParams({
      page: paginationOptions.page.toString(),
      size: paginationOptions.size.toString()
    })
  }, [paginationOptions, setSearchParams])

  return (
    <Box component="main">
      <Container>
        <Link to="establishment/2">esablishment 2</Link>

        <EstablishmentsTable
          paginatedData={paginatedResponse}
          isLoading={isLoading}
          error={error}
          paginationOptions={paginationOptions}
          setPaginationOptions={setPaginationOptions}
        />
      </Container>
    </Box>
  )
}

export default Home
