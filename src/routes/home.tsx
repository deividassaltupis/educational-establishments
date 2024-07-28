import { Box, Container, Table } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import EstablishmentsTable from "src/components/routes/home/establishments-table"
import { PROXY_SERVER_ENDPOINT_URL } from "src/constants/proxy-sever"
import useFetch from "src/hooks/useFetch"
import usePaginatedFetch from "src/hooks/usePaginatedFetch"
import { EducationalEstablishment } from "src/types/entities/educational-establishment"

const Home = () => {
  const [paginationOptions, setPaginationOptions] = useState({
    page: 1,
    size: 40
  })

  const { paginatedResponse, isLoading, error } =
    usePaginatedFetch<EducationalEstablishment>({
      url: PROXY_SERVER_ENDPOINT_URL.EDUCATIONAL_ESTABLISHMENTS,
      page: paginationOptions.page,
      size: paginationOptions.size
    })

  console.log(paginatedResponse?.data)

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
